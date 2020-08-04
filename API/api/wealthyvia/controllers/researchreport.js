const mongoose	        = require("mongoose");
const ResearchReport    = require('../models/researchreport.js');
const ObjectID          = require('mongodb').ObjectID;

exports.create_researchreport = (req, res, next) => {
	
                const Researchreport = new ResearchReport({
                    "_id"               : mongoose.Types.ObjectId(), 
                    "title"             : req.body.title,
                    "description"       : req.body.description, //(CK Editor Rich text)
                    "reportImage"       : req.body.reportImage,
                    "researchreport"    : req.body.researchreport,
                    "createdBy"         : ObjectID(req.body.createdBy), //_id of User or null
                    "createdAt"         : new Date(),     
                });
                Researchreport.save()
                    .then(data=>{
                            res.status(200).json({
                                                message : "RESEARCH REPORT INSERTED",
                                                ID      : data._id
                     
                                            });
                        })
                        .catch(err =>{
                            console.log("error",err);
                            res.status(500).json({
                                error: err
                            });
                        });
            
};
exports.fetch_researchreport = (req,res,next) => {
    ResearchReport.findOne({_id : req.params.ID})
         .exec()
         .then(data=>{
            if(data){
                res.status(200).json(data);
            }else{
                res.status(200).json({message : "DATA_NOT_FOUND"})
            }
         })
         .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
};
exports.fetch_researchreport_all = (req,res,next) => {
    var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
    ResearchReport.find({})
         .sort({createdAt : -1})
         .skip(startRange)
         .limit(limitRange)
         .exec()
         .then(data=>{
            if(data.length > 0 ){
                res.status(200).json(data);
            }else{
                res.status(200).json({message : "DATA_NOT_FOUND"})
            }
         })
         .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
};
exports.fetch_researchreport_all_list = (req,res,next) => {
    var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
    ResearchReport.find({})
         .sort({createdAt : -1})
         .select("title description reportImage researchreport createdBy createdAt")
         .exec()
         .then(data=>{
            if(data.length > 0 ){
                res.status(200).json(data);
            }else{
                res.status(200).json({message : "DATA_NOT_FOUND"})
            }
         })
         .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
};


exports.patch_researchreport = (req,res,next) => {
    console.log("research report", req.body.researchreport);
    var updateLog = { 
                "updatedBy"     : req.body.updatedBy,
                "updatedAt"     : new Date()
            }
    if(!req.body.newuploaded){
        ResearchReport.updateOne(
                        {_id:req.params.ID},
                        {
                            $push: { updateLog: updateLog }  ,
                            $set : {
                                "title"             : req.body.title,
                                "description"       : req.body.description,
                                "reportImage"       : req.body.reportImage
                            }
                        }
                    )
         .exec()
         .then(data=>{
            if(data.nModified === 1){
                res.status(200).json({message : "Research report_UPDATED"})
            }else{
                res.status(200).json({message : "Research report_UPDATED"})
            }
         })
    }
    else{
        ResearchReport.updateOne(
                        {_id:req.params.ID},
                        {
                            $push: { updateLog: updateLog }  ,
                            $set : {
                                "title"             : req.body.title,
                                "description"       : req.body.description,
                                "reportImage"       : req.body.reportImage, 
                                "researchreport"    : req.body.researchreport,
                            }
                        }
                    )
         .exec()
         .then(data=>{
            if(data.nModified === 1){
                res.status(200).json({message : "Research report_UPDATED"})
            }else{
                res.status(200).json({message : "Research report_UPDATED"})
            }
         })
    }
    
};
exports.delete_researchreport = (req,res,next) =>{
    ResearchReport.deleteOne({_id:req.params.ID})
         .exec()
         .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({message : "Research report_DELETED"})
            }else{
                res.status(200).json({message : "Resrach report_NOT_DELETED"})
            }
         })
};

exports.search_researchreport = async (req,res,next) =>{
    //console.log(await ResearchReport.listIndexes());
    ResearchReport.find(
                    { $text: { $search: String(req.params.searchtxt) } }
                )
            .exec()
            .then(data=>{
                res.status(200).json(data);
             })
            .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });


};

