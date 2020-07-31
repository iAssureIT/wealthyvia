const mongoose	= require("mongoose");
const ObjectID          = require('mongodb').ObjectID;
const ProductRates = require('../models/productrates.js');
const moment               = require('moment');
const _         = require("underscore");

const FailedRecords = require('../models/failedRecords');

exports.bulk_upload_productrates = (req,res,next)=>{
    var productratedata = req.body.data;
    var newbenificiaryLst = [];
    var validData = [];
    var validrates = []
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = ''; 
    var failedRecords = [];
    var Count = 0;
    var countmy = 0;
    var DuplicateCount = 0;

    if(!req.body.reqdata.productID  ){
        console.log("please select product");
        res.status(200).json({
            "message": "Select product",
            "completed": true
        });
    }
    else{
        getProductrateData();
    }
    

    async function getProductrateData(){
        
        var allproductrates = await fetchAllProductrates(req.body.reqdata.productID);
        //console.log("productrates", allproductrates);
        //console.log("Product rate excel data", productratedata);
       // console.log("req.body.totalRecords", req.body.totalRecords, req.body.uploadTime)
        var rowheader = [];
        var uploadTime = req.body.uploadTime;
      //  var uptimr =  moment(req.body.uploadTime,'YYYY-MM-DD')._i
        console.log("uploadtime", uploadTime);
        if(productratedata.length > 0){
            for(var key in productratedata[0]){
                rowheader.push(key);
            } 
            //console.log("heading", rowheader);
        }
        console.log("productname",req.body.reqdata.productName, "row", rowheader[1]);

        console.log("match", rowheader[1].includes(req.body.reqdata.productName));
        if(!rowheader[1].includes(req.body.reqdata.productName)){
            console.log("please upload excel sheet with proper product name", );
            res.status(200).json({
                "message": "please upload correct excel sheet of selected product",
                "productName": req.body.reqdata.productName,
                "completed": true
            });
        }
        else{
        //console.log("rat fjfe", productratedata[12][rowheader[2]]);
        //console.log("length", productratedata.length);
        if(allproductrates)  {
            //console.log("inupdate");
            //console.log("Product rates database", allproductrates);
            for(var k = 0 ; k < productratedata.length ; k++){

                //console.log("date", productratedata[k][rowheader[0]]);
                if (productratedata[k][rowheader[0]] === '-' || productratedata[k][rowheader[1]] == '') {
                    remark += "Date not found. " ;  
                }
                if (productratedata[k][rowheader[1]] === '-' || productratedata[k][rowheader[1]] == '') {
                    remark += rowheader[1]+" Rate not found. " ;  
                }
                if (productratedata[k][rowheader[2]] === '-' || productratedata[k][rowheader[2]] == '') {
                    //console.log("ratefdfd", productratedata[k][rowheader[2]]);
                    remark += rowheader[2]+" Rate not found. " ;  
                    //console.log("remarks", remark);
                }
                countmy++;
                if (remark == '') {
                    
                    if (typeof productratedata[k][rowheader[0]] == 'number') {
                        date = moment(new Date(Math.round((productratedata[k][rowheader[0]] - 25569)*86400*1000))).format("YYYY-MM-DD");
                    }else{
                        date = moment(productratedata[k][rowheader[0]],'YYYY-MM-DD')._i
                    }
                    //console.log("actual date", date);

                    var rates = allproductrates.rates.filter((data)=>{
                        
                        if ( data.date == date )
                            return data;
                        
                    })  

                    //console.log("rates", rates);
                    if (rates.length>0) {
                        DuplicateCount++;
                        remark += "Date of Rate already exists";                       
                        
                        invalidData.push({
                            date           : date,
                            productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : productratedata[k][rowheader[1]],
                            indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : productratedata[k][rowheader[2]],
                            fileName       : req.body.fileName,
                            failedRemark   : remark
                        });
                    }else{
                        Count++;
                        
                            validrates.push({
                                date           : date,
                                productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : productratedata[k][rowheader[1]],
                                indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : productratedata[k][rowheader[2]],
                                fileName       : req.body.fileName,
                                uploadTime     : uploadTime

                            }); 
                        
                        
                    }
                } 
                else {
                    //console.log("invalid", remark);
                    if (typeof productratedata[k][rowheader[0]] == 'number') {
                        date = moment(new Date(Math.round((productratedata[k][rowheader[0]] - 25569)*86400*1000))).format("YYYY-MM-DD");
                    }else{
                        date = moment(productratedata[k][rowheader[0]],'YYYY-MM-DD')._i
                    }
                    invalidData.push({
                            date           : date,
                            productRate    : productratedata[k][rowheader[1]],
                            indexRate      : productratedata[k][rowheader[2]],
                            fileName       : req.body.fileName,
                            failedRemark   : remark,

                    });
                    //console.log("invalidData", invalidData);
                }
                remark= '';
            }//listControls end
            //console.log("DuplicateCount",DuplicateCount, "validdata", validData, "invalid data", invalidData);
            //console.log("invalid dat", o=invalidData);
            var updateLog = { 
                "updatedBy" 	: req.body.reqdata.userID,
    			"updatedAt"	  	: new Date()
            }
            //console.log("validrates",validrates[0]);                
            ProductRates.update({ _id: allproductrates._id }, 
                { 
                    $set: { productName : rowheader[1], indexName : rowheader[2] },
                    "$push": { "rates": { "$each": validrates }, updateLog: updateLog } 
                })
            .then(data=>{
                //console.log("data",data);
            })
            .catch(err =>{
                console.log(err);
            });
        }
        else{
            //console.log("in insert");
            //console.log("rowheader", rowheader[1]);
            for(var k = 0 ; k < productratedata.length ; k++){
            //console.log("productratedata[k]", productratedata[k][rowheader[0]]);
                if (productratedata[k][rowheader[0]] == '-') {
                    remark += "Date not found. " ;  
                }
                if (productratedata[k][rowheader[1]] == '-') {
                    remark += rowheader[1]+" Rate not found. " ;  
                }
                if (productratedata[k][rowheader[2]] == '-') {
                    remark += rowheader[2]+" Rate not found. " ;  
                }
                
                if (remark == '') {
                    
                    if (typeof productratedata[k][rowheader[0]] == 'number') {
                        date = moment(new Date(Math.round((productratedata[k][rowheader[0]] - 25569)*86400*1000))).format("YYYY-MM-DD");
                    }else{
                        date = moment(productratedata[k][rowheader[0]],'YYYY-MM-DD')._i
                    }
                    //console.log("date", date, "rate", productratedata[k][rowheader[1]]);
                            Count++;

                            validrates.push({
                                date           : date,
                                productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : productratedata[k][rowheader[1]],
                                indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : productratedata[k][rowheader[2]],
                                fileName       : req.body.fileName,
                                uploadTime     : uploadTime

                            }); 
                            
                            //console.log("validrates", validrates);
                      
                } 
                else {
                    if (typeof productratedata[k][rowheader[0]] == 'number') {
                        date = moment(new Date(Math.round((productratedata[k][rowheader[0]] - 25569)*86400*1000))).format("YYYY-MM-DD");
                    }else{
                        date = moment(productratedata[k][rowheader[0]],'YYYY-MM-DD')._i
                    }
                    
                    invalidData.push({
                            date           : date,
                            productRate    : productratedata[k][rowheader[1]],
                            indexRate      : productratedata[k][rowheader[2]],
                            fileName       : req.body.fileName,
                            failedRemark   : remark
                    });
                }
                remark= '';
            }//listControls end
            //console.log("validrates", validrates);
            validData._id            = new mongoose.Types.ObjectId(),
            validData.productID      = req.body.reqdata.productID;
            validData.productName    = rowheader[1];
            validData.indexName      = rowheader[2];
            validData.rates          = validrates;
            validData.createdBy      = req.body.reqdata.userID;
            validData.createdAt      = new Date();
                        

            //console.log("DuplicateCount",DuplicateCount, "validdata", validData, "invalid data", invalidObjects);
            const ProductRate = new ProductRates(validData);
            ProductRate.save()
            .then(data=>{
                //console.log("data",data);
            })
            .catch(err =>{
                console.log(err);
            });
        }
        
        //console.log("mycount", countmy, Count, DuplicateCount, invalidData);
        failedRecords.FailedRecords = invalidData
        failedRecords.fileName = req.body.fileName;
        failedRecords.productName    = rowheader[1];
        failedRecords.indexName      = rowheader[2];
        failedRecords.productID    = req.body.reqdata.productID;
        failedRecords.totalRecords = req.body.totalRecords;
        failedRecords.uploadTime = uploadTime;

        await insertFailedRecords(failedRecords,req.body.updateBadData);

        if(k >= productratedata.length){
           // res.status(200).json({"uploadedData": newbenificiaryLst,"message":"Beneficiaries Uploaded Successfully"})
        }
        var msgstr = "";
        if (DuplicateCount > 0 && Count > 0) {
            if (DuplicateCount > 1 && Count > 1) {
               msgstr =  " " + Count+" product rates are added successfully and "+"\n"+DuplicateCount+" product rates are duplicate";
            }
            else if(DuplicateCount ==1 && Count == 1 ){
                msgstr =  " " + Count+" product rate is added successfully and "+"\n"+DuplicateCount+" product rate is duplicate";
            }
            else if(DuplicateCount > 1 && Count == 1)
            {
                msgstr =  " " + Count+" product rate is added successfully and "+"\n"+DuplicateCount+" product rates are duplicate";
            }else if(DuplicateCount == 1 && Count > 1){
                msgstr =  " " + Count+" product rates are added successfully and "+"\n"+DuplicateCount+" product rate is duplicate";
            }
        }
        else if(DuplicateCount > 0 && Count == 0)
        {
            if (DuplicateCount > 1) {
                msgstr = "Failed to add product rates as "+DuplicateCount+" product rates are duplicate";
            }else{
                msgstr = "Failed to add product rate as "+DuplicateCount+" product rate is duplicate";
            }
            
        }
        else if(DuplicateCount == 0 && Count > 0)
        { 
            if (Count > 1) {
                msgstr = " " + Count+" product rates are added successfully";
            }else{
                msgstr = " " + Count+" product rate is added successfully";
            }            
        }else{
            console.log('DuplicateCount',DuplicateCount,"Count",Count);
            msgstr = "Failed to add product rates";
        }
        res.status(200).json({
            "message": msgstr,
            "completed": true
        });
    }    
}
} 

function fetchAllProductrates(productID){
    return new Promise((resolve,reject)=>{
        //console.log('Family_ID',familyID)
        ProductRates.findOne({ productID: productID })
            .exec()
            .then(data=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            })
    });
}

var insertFailedRecords = async (invalidData,updateBadData) => {
    //console.log('updateBadData',updateBadData);
    console.log("inserttime", invalidData.uploadTime);
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName, productID: invalidData.productID, uploadTime: invalidData.uploadTime})  
            .exec()
            .then(data=>{
                //console.log("data", data)
            if(data.length>0){
                console.log('datafalied ', invalidData.FailedRecords.length);   
                  FailedRecords.updateOne({ fileName:invalidData.fileName, uploadTime: invalidData.uploadTime},  
                        {   $set:   {'totalRecords': invalidData.totalRecords},
                            $push:  { 'failedRecords' : invalidData.FailedRecords } 
                        })
                    .then(data=>{
                        if(data.nModified == 1){
                            resolve(data);
                        }else{
                            resolve(data);
                        }
                    })
                    .catch(err =>{ reject(err); });
                
            }else{
                console.log('datafalied insert ', invalidData.FailedRecords.length);  
                    const failedRecords = new FailedRecords({
                    _id                     : new mongoose.Types.ObjectId(),  
                    productID               : invalidData.productID,                  
                    failedRecords           : invalidData.FailedRecords,
                    fileName                : invalidData.fileName,
                    productName             : invalidData.productName,
                    indexName               : invalidData.indexName,
                    totalRecords            : invalidData.totalRecords,
                    uploadTime              : invalidData.uploadTime,
                    createdAt               : new Date()
                    });
                    
                    failedRecords
                    .save()
                    .then(data=>{
                        resolve(data._id);
                    })
                    .catch(err =>{
                        console.log(err);
                        reject(err);
                    });
            }
            })  
    
    })            
}

exports.filedetails = (req,res,next)=>{
    var finaldata = {};
    /*ProductRates.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: { "rates.fileName":req.params.fileName}},
        {$project: {
            rates: {$filter: {
                input: '$rates',
                as: 'rate',
                cond: {$eq: ['$$rate.fileNamer', req.params.fileName]}
            }},
            _id: 0,
            productName: 1,  indexName: 1
        }}
    ])*/
    //console.log(req.params.fileName)
   /* ProductRates.find({productID: req.params.productID,"rates.fileName":req.params.fileName},
                         {_id: 0, "rates": 1, productName: 1,  indexName: 1 })*/
                        // console.log("upload time in good rec", req.params.uploadTime, new Date(req.params.uploadTime));
                         var uploadTime = new Date(req.params.uploadTime);
                         console.log("uploadin  file details", uploadTime);
    ProductRates.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: 
            { "productID": {$eq: ObjectID(req.params.productID) } },
            
        },
        {$project: {
            rates: {$filter: {
                input: "$rates",
                as: "rate",
                cond: {$and : [ 
                        { $eq: ["$$rate.fileName", req.params.fileName] }, 
                        {$eq :["$$rate.uploadTime", uploadTime] } 
                        ]
                    }
            }},
            _id: 0,
            productName: 1,  indexName: 1
        }}
    ])
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
        finaldata.goodrecords = [];
        if(data.length > 0){
            finaldata.goodrecords = data[0].rates;
        }
        //console.log("uploadtime",  new Date(req.params.uploadTime).toISOString(), moment(req.params.uploadTime,'YYYY-MM-DD')._i);
        FailedRecords.find({fileName:req.params.fileName, "productID": req.params.productID, "uploadTime" : uploadTime })  
            .exec()
            .then(badData=>{
               // console.log("badadat", badData);
               if(badData.length > 0){ 
                finaldata.failedRecords = badData[0].failedRecords
                finaldata.totalRecords = badData[0].totalRecords
                finaldata.productName = badData[0].productName
                finaldata.indexName = badData[0].indexName
                res.status(200).json(finaldata);
                }
                else{
                    res.status(200).json("data not found");
                }
            })
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.get_productrates = (req,res,next)=>{
    //console.log("get_productrates", req.body);
    ProductRates.findOne({ productID: req.params.productID })
            .exec()
            .then(productdata=>{
                res.status(200).json( productdata);
            })
            .catch((err)=>{
                res.status(500).json({
                    "err" : err
                });
            })
}

exports.get_productratesbyproductid = (req,res,next)=>{
    //console.log("product id", req.params.productID);
    var productid = req.params.productID;
    var limit = req.params.limit;

    var curdate = new Date();
    var prevdate = new Date();
    var ProductData = new Object();
    var maxdata = new Object();
    ProductRates.findOne({ productID: req.params.productID })
        .exec()
            .then(productdata=>{
                if(productdata){

                    if(productdata.rates.length > 0){
                    ProductRates.aggregate([
                    // Get just the docs that contain a shapes element where color is 'red'
                            {$match: 
                                { "productID": {$eq: ObjectID(req.params.productID) } } 
                            },
                            {$project: {
                                rates: { '$map': { 
                                    'input': '$rates', 
                                    'as': 'rate', 
                                    'in': { 
                                        'date':  {$dateFromString:  {dateString: "$$rate.date"} } ,
                                        'productRate'   : "$$rate.productRate",
                                        'indexRate'  : "$$rate.indexRate",
                                        'fileName'      : "$$rate.fileName",
                                    }
                                } },
                                
                                
                                _id: 1,
                                productName: 1,  indexName: 1
                            }},
                            {$unwind: "$rates"}, 
                              {$sort: {"rates.date": 1}}, 
                              {$group: {_id: { prateid: "$_id",  productName : "$productName", indexName: "$indexName" },
                                "indexName": { "$first": "$indexName" }, rates: {$push:"$rates"}}},
                            {$project: {
                                rates: 1,
                                _id: "$_id.prateid",
                                productName: "$_id.productName",
                                indexName: "$_id.indexName",
                                
                            }}
                        ])
                    .exec().then(prmaxdata=>{

                        maxdata = prmaxdata[0];
                         getlimitasync();
                        })
                        .catch((err)=>{
                            res.status(500).json({
                                "err" : err
                            });
                        })

                    }
                    else{
                        res.status(200).json( productdata);
                    }
                }
                else{
                    res.status(200).json( "data not found");
                }
                
                
                //res.status(200).json( productdata);
            })
            .catch((err)=>{
                res.status(500).json({
                    "err" : err
                });
            })
   

    async function getlimitasync(){
        //1M
            //prevdate.setDate(curdate.getDate()-8);
            prevdate.setDate(curdate.getDate()-31);
            console.log("cur date", curdate);
            console.log("prev date", prevdate);
            //prevdate = moment(prevdate).format("YYYY-MM-DDT00:00:00.000Z");
            var rate1mdata = await getProductrateByLimit(productid, curdate, prevdate);
            
            if(rate1mdata && rate1mdata.rates ){
                //console.log("1m", rate1mdata);
                if( maxdata.rates.length > rate1mdata.rates.length )
                ProductData["1M"] = rate1mdata;
            }
            
        //3M
            prevdate = new Date();
            prevdate.setMonth(curdate.getMonth()-3);
            var rate3mdata = await getProductrateByLimit(productid, curdate, prevdate);
            
            if(rate3mdata && rate3mdata.rates ){
                if( maxdata.rates.length > rate3mdata.rates.length )
                ProductData["3M"] = rate3mdata;
            }
            
        
            prevdate = new Date();
            prevdate.setMonth(curdate.getMonth()-6);
            var rate6mdata = await getProductrateByLimit(productid, curdate, prevdate);
            
            if(rate6mdata && rate6mdata.rates ){
                if( maxdata.rates.length > rate6mdata.rates.length )
                ProductData["6M"] = rate6mdata;
            }

            prevdate = new Date();        
            prevdate.setFullYear(curdate.getFullYear()-1);
            var rate1ydata = await getProductrateByLimit(productid, curdate, prevdate);
            
            if(rate1ydata && rate1ydata.rates ){
                if( maxdata.rates.length > rate1ydata.rates.length )
                ProductData["1Y"] = rate1ydata;
            }

            prevdate = new Date();
            prevdate.setFullYear(curdate.getFullYear()-2);
            var rate2ydata = await getProductrateByLimit(productid, curdate, prevdate);

            if(rate2ydata && rate2ydata.rates ){
                if( maxdata.rates.length > rate2ydata.rates.length )
                ProductData["2Y"] = rate2ydata;
            }

            
            ProductData["MAX"]= maxdata;
            if(ProductData){
                //console.log("productdata", ProductData);
                res.status(200).json( ProductData);

            }
            
    
    //var ondate = moment().format("YYYY-MM-DDTHH:mm:ss");
    }
       
        
}


var getProductrateByLimit = async (productid, curdate, prevdate) => {

    return new Promise(function(resolve,reject){ 
    ProductRates.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: 
            { "productID": {$eq: ObjectID(productid) } } 
        },
        {$project: {
            rates: { '$map': { 
                'input': '$rates', 
                'as': 'rate', 
                'in': { 
                    'date':  {$dateFromString:  {dateString: "$$rate.date"} } ,
                    'productRate'   : "$$rate.productRate",
                    'indexRate'  : "$$rate.indexRate",
                    'fileName'      : "$$rate.fileName",
                }
            } },
            
            
            _id: 1,
            productName: 1,  indexName: 1
        }},
        {$project: {
            rates: {$filter: {
                input: "$rates",
                as: "rate",
                cond: { $and: [ 
                    { $lte: ["$$rate.date", curdate] }, 
                    { $gte: ["$$rate.date", prevdate] }
                ]}
            }},
            _id: 1,
            productName: 1,  indexName: 1
        }},
        {$unwind: "$rates"}, 
          {$sort: {"rates.date":1}}, 
          {$group: {_id:"$_id", "productName": { "$first": "$productName" },
            "indexName": { "$first": "$indexName" }, rates: {$push:"$rates"}}},
        {$project: {
            rates: 1,
            _id: 1,
            productName: 1,  indexName: 1
        }},
        {$project: {
            rates: { '$map': { 
                'input': '$rates', 
                'as': 'rate', 
                'in': { 
                    'date':  {$dateToString:  {format: "%Y-%m-%d", date: "$$rate.date"} } ,
                    'productRate'   : "$$rate.productRate",
                    'indexRate'  : "$$rate.indexRate",
                    'fileName'      : "$$rate.fileName",
                }
            } },
            _id: 1,
            productName: 1,  indexName: 1
        }},
        
        
    ])
    .exec()
            .then(productdata=>{
                if(productdata.length > 0){
                    //console.log("product data", productdata[0].rates.length);
                    resolve(productdata[0]);
                    //res.status(200).json( productdata[0]);
                    //console.log("product data", productdata[0].rates.length);
                }
                else{
                    resolve(productdata);
                    //res.status(200).json( productdata);
                }
                
            })
            .catch((err)=>{
                console.log("error", err);
                reject(err);
            })
    })
}

exports.fetch_file = (req,res,next)=>{
    // ProductRates.find({ productID: ObjectID(req.body.productID)})
    ProductRates.aggregate([
                {
                  $match: {productID: ObjectID(req.body.productID)  }
                },
                {
                    $group: {
                        _id : {
                            "rates" :  "$rates",
                            "fileName"   :"$rates.fileName", 
                            "uploadTime" :"$rates.uploadTime",
                            
                        }, 
                        'count':{$sum:1} 
                    }  
                },
                {
                    $project: {    
                        "fileName"   :"$_id.fileName", 
                        "rates"   :"$_id.rates", 
                        "uploadTime" :"$_id.uploadTime",
                        'count'      : 1
                    }
                }
            ])
    .exec()
    .then(data=>{
        //console.log("rates", data);
        if(data.length > 0 && data[0].rates && data[0].rates.length > 0){
            var rates = data[0].rates;
            var x = _.unique(_.pluck(rates, "fileName"));
                //console.log('x',x);
            var utime = _.pluck(rates, "uploadTime");


            let results = utime.map(date => date.toISOString())
            var updatetime = _.unique(results);
                console.log('utime',updatetime);    
            var z = [];
            for(var ti=0; ti<updatetime.length; ti++){
                var timefilter = rates.filter((a)=> a.uploadTime.toISOString() == updatetime[ti]);
                //console.log('timefiler',timefilter);
                //console.log('x[i]',x[i]);
                for(var i=0; i<x.length; i++){
                var y = timefilter.filter((a)=> a.fileName == x[i]);
                //console.log('y',y);
                //console.log('x[i]',x[i]);
                if(y.length > 0){
                    z.push({
                    "fileName": x[i] !== undefined ? x[i] : "Manual",
                    'count': y.length,
                    "uploadTime" :  updatetime[ti],
                    "_id" : x[i]
                    })
                }
                
            //console.log('z',z);
            }
                }
                        
            res.status(200).json(z.slice(req.body.startRange, req.body.limitRange));
        }
        else{
            res.status(200).json("data not found");
        }
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

/*exports.fetch_file = (req,res,next)=>{
    ProductRates.find({ productID: ObjectID(req.body.productID)})
    .exec()
    .then(data=>{
        //console.log("rates", data[0].rates);
        if(data.length > 0 && data[0].rates && data[0].rates.length > 0){
            var rates = data[0].rates;
            var x = _.unique(_.pluck(rates, "fileName"));
                console.log('x',x);
            var z = [];
            for(var i=0; i<x.length; i++){
                var y = rates.filter((a)=> a.fileName == x[i]);
                console.log('y',y);
                console.log('x[i]',x[i]);
                z.push({
                    "fileName": x[i] !== undefined ? x[i] : "Manual",
                    'count': y.length,
                    "_id" : x[i]
                })
            //console.log('z',z);
            }
            res.status(200).json(z.slice(req.body.startRange, req.body.limitRange));
        }
        else{
            res.status(200).json("data not found");
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};*/



exports.fetch_file_count = (req,res,next)=>{
    ProductRates.find({ productID: ObjectID(req.params.productID)})
    .exec()
    .then(data=>{
        if(data.length > 0 && data[0].rates && data[0].rates.length > 0 ){
            var rates = data[0].rates;
            var x = _.unique(_.pluck(rates, "fileName"));
            var z = [];
            for(var i=0; i<x.length; i++){
                var y = rates.filter((a)=> a.fileName == x[i]);
                z.push({
                    "fileName": x[i],
                    'count': y.length,
                    "_id" : x[i]
                })
            }
            res.status(200).json(z.length);
        }
        else{
            res.status(200).json("data not found");
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.delete_file = (req,res,next)=>{
    console.log("productid", req.params.productID, "filename", req.params.fileName, req.params.uploadTime);
    ProductRates.updateOne( { productID: req.params.productID },
     { $pull: { 'rates': { fileName: req.params.fileName, uploadTime: req.params.uploadTime } } }, { safe: true, multi:true }
    )
    .exec()
    .then(data=>{
        res.status(200).json({
            "message" : "Product rates of file "+req.params.fileName+" deleted successfully"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });  
};