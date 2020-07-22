const mongoose	= require("mongoose");
const ObjectID          = require('mongodb').ObjectID;
const ProductRates = require('../models/productrates.js');
const moment               = require('moment');

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
        var rowheader = [];
        if(productratedata.length > 0){
            for(var key in productratedata[0]){
                rowheader.push(key);
            } 
            //console.log("heading", rowheader);
        }
        
        //console.log("length", productratedata.length);
        if(allproductrates)  {
            //console.log("inupdate");
            //console.log("Product rates database", allproductrates);
            for(var k = 0 ; k < productratedata.length ; k++){
                //console.log("date", productratedata[k][rowheader[0]]);
                if (productratedata[k][rowheader[0]] == '-') {
                    remark += "Date not found, " ;  
                }
                if (productratedata[k][rowheader[1]] == '-') {
                    remark += rowheader[1]+" rate not found, " ;  
                }
                if (productratedata[k][rowheader[2]] == '-') {
                    remark += rowheader[2]+" rate not found, " ;  
                }
                
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
                        remark += "Date of Rate already exist";                       
                        
                        invalidData.push({
                            date           : date,
                            productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : parseFloat(productratedata[k][rowheader[1]]),
                            indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : parseFloat(productratedata[k][rowheader[2]]),
                            fileName       : req.body.fileName,
                            failedRemark   : remark
                        });
                    }else{
                        Count++;
                        
                            validrates.push({
                                date           : date,
                                productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : parseFloat(productratedata[k][rowheader[1]]),
                                indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : parseFloat(productratedata[k][rowheader[2]]),
                                fileName       : req.body.fileName

                            }); 
                        
                        
                    }
                } 
                else {
                    
                    invalidData.push({
                            date           : date,
                            productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : parseFloat(productratedata[k][rowheader[1]]),
                            indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : parseFloat(productratedata[k][rowheader[2]]),
                            fileName       : req.body.fileName,
                            failedRemark   : remark
                    });
                }
                remark= '';
            }//listControls end
            //console.log("DuplicateCount",DuplicateCount, "validdata", validData, "invalid data", invalidData);
            
            var updateLog = { 
                "updatedBy" 	: req.body.reqdata.userID,
    			"updatedAt"	  	: new Date()
            }
            //console.log("validrates",validrates[0]);                
            ProductRates.update({ _id: allproductrates._id }, 
                { "$push": { "rates": { "$each": validrates }, updateLog: updateLog } } )
            .then(data=>{
                console.log("data",data);
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
                    remark += "Date not found, " ;  
                }
                if (productratedata[k][rowheader[1]] == '-') {
                    remark += rowheader[1]+" rate not found, " ;  
                }
                if (productratedata[k][rowheader[2]] == '-') {
                    remark += rowheader[2]+" rate not found, " ;  
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
                                productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : parseFloat(productratedata[k][rowheader[1]]),
                                indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : parseFloat(productratedata[k][rowheader[2]]),
                                fileName       : req.body.fileName

                            }); 
                            
                            //console.log("validrates", validrates);
                      
                } 
                else {
                    
                    invalidData.push({
                            date           : date,
                            productRate    : isNaN(Number(productratedata[k][rowheader[1]]))   ? 0 : parseFloat(productratedata[k][rowheader[1]]),
                            indexRate      : isNaN(Number(productratedata[k][rowheader[2]]))   ? 0 : parseFloat(productratedata[k][rowheader[2]]),
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
        
        failedRecords.FailedRecords = invalidData
        failedRecords.fileName = req.body.fileName;
        failedRecords.productName    = rowheader[1];
        failedRecords.indexName      = rowheader[2];
        failedRecords.productID    = req.body.reqdata.productID;
        failedRecords.totalRecords = req.body.totalRecords;

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
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName, productID: invalidData.productID})  
            .exec()
            .then(data=>{
            if(data.length>0){
                //console.log('data',data)   
                if (data[0].failedRecords.length>0) {
                    if (updateBadData) {
                        FailedRecords.updateOne({ fileName:invalidData.fileName},  
                        {   $set:   { 'failedRecords': [] } })
                        .then(data=>{
                        if(data.nModified == 1){
                            FailedRecords.updateOne({ fileName:invalidData.fileName},  
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
                            resolve(0);
                        }
                        })
                        .catch(err =>{ reject(err); });
                    }else{
                        FailedRecords.updateOne({ fileName:invalidData.fileName},  
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
                    } 

                }else{
                    FailedRecords.updateOne({ fileName:invalidData.fileName},  
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
                }
            }else{
                    const failedRecords = new FailedRecords({
                    _id                     : new mongoose.Types.ObjectId(),  
                    productID               : invalidData.productID,                  
                    failedRecords           : invalidData.FailedRecords,
                    fileName                : invalidData.fileName,
                    productName             : invalidData.productName,
                    indexName               : invalidData.indexName,
                    totalRecords            : invalidData.totalRecords,
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
                         
    ProductRates.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: { $and:  [
            { "productID": {$eq: ObjectID(req.params.productID) } },
            { "rates.fileName":req.params.fileName } ]} 
        },
        {$project: {
            rates: {$filter: {
                input: "$rates",
                as: "rate",
                cond: {$eq: ["$$rate.fileName", req.params.fileName]}
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
        
        FailedRecords.find({fileName:req.params.fileName, "productID": req.params.productID })  
            .exec()
            .then(badData=>{
                finaldata.failedRecords = badData[0].failedRecords
                finaldata.totalRecords = badData[0].totalRecords
                finaldata.productName = badData[0].productName
                finaldata.indexName = badData[0].indexName
                res.status(200).json(finaldata);
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
    console.log("get_productrates", req.body);
    ProductRates.findOne({ productID: req.body.productID })
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
    //var ondate = moment().format("YYYY-MM-DDTHH:mm:ss");
    //console.log("current date", ondate);
   /* var curdate = new Date();
    var prevdate = new Date();
    //curdate.setDate(curdate.getDate()-5);
    console.log("cur date", curdate);
    prevdate.setDate(curdate.getDate()-8);
    console.log("prev date", prevdate);

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
                    { $lt: ["$$rate.date", curdate] }, 
                    { $gt: ["$$rate.date", prevdate] }
                ]}
            }},
            _id: 1,
            productName: 1,  indexName: 1
        }}
        
        
    ])
    .exec()
            .then(productdata=>{
                res.status(200).json( productdata);
                console.log("product data", productdata[0].rates);
            })
            .catch((err)=>{
                console.log("error", err);
                res.status(500).json({
                    "err" : err
                });
            })*/

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