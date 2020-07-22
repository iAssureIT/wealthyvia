const mongoose	        = require("mongoose");
const Offering             = require('../models/offerings.js');

exports.create_offerings = (req, res, next) => {
	Offering.findOne({offeringTitle:req.body.offeringTitle})
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message : 'OFFERING_ALREADY_EXISTS.',
                    details : data
				});
			}else{
                const offering = new Offering({
                    "_id"               : mongoose.Types.ObjectId(), 
                    "offeringTitle"     : req.body.offeringTitle,
                    "offeringContent"   : req.body.offeringContent, //(CK Editor Rich text)
                    "bannerImage"       : req.body.bannerImage,
                    "images"            : req.body.images,
                    "videos"            : req.body.videos, //(YouTube Link only)
                    "typeOfOffering"    : req.body.typeOfOffering, //(Regular/Premium)
                    "createdBy"         : req.body.createdBy, //_id of User or null
                    "createdAt"         : new Date(),     
                });
                offering.save()
                    .then(data=>{
                            res.status(200).json({
                                                message : "OFFERING_DETAILS_INSERTED",
                                                ID      : data._id
                                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.fetch_offering = (req,res,next) => {
    Offering.findOne({_id : req.params.ID})
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
exports.fetch_offering_all = (req,res,next) => {
    var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
    Offering.find({})
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
exports.fetch_offering_all_list = (req,res,next) => {
    var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
    Offering.find({})
         .sort({createdAt : -1})
         .skip(startRange)
         .limit(limitRange)
         .select("offeringTitle bannerImage createdBy createdAt")
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
exports.fetch_offering_all_type = (req,res,next) => {
    var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
    Offering.find({"typeOfOffering":req.params.type})
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
exports.fetch_offering_all_type_list = (req,res,next) => {
    var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
    Offering.find({"typeOfOffering":req.params.type})
         .sort({createdAt : -1})
         .skip(startRange)
         .limit(limitRange)
         .select("offeringTitle bannerImage createdBy createdAt")
         .exec()
         .then(data=>{
            if(data.length > 0){
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
exports.patch_offering = (req,res,next) => {
    Offering.updateOne(
                        {_id:req.params.ID},
                        {
                            $set : {
                                "offeringTitle"     : req.body.offeringTitle,
                                "offeringContent"   : req.body.offeringContent, //(CK Editor Rich text)
                                "bannerImage"       : req.body.bannerImage,
                                "images"            : req.body.images,
                                "videos"            : req.body.videos, //(YouTube Link only)
                                "typeOfOffering"    : req.body.typeOfOffering, //(Regular/Premium)
                                "createdBy"         : req.body.createdBy, //_id of User or null
                            }
                        }
                    )
         .exec()
         .then(data=>{
            if(data.nModified === 1){
                res.status(200).json({message : "OFFERING_UPDATED"})
            }else{
                res.status(200).json({message : "OFFERING_NOT_UPDATED"})
            }
         })
};
exports.delete_offering = (req,res,next) =>{
    Offering.deleteOne({_id:req.params.ID})
         .exec()
         .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({message : "OFFERING_DELETED"})
            }else{
                res.status(200).json({message : "OFFERING_NOT_DELETED"})
            }
         })
};
exports.fetch_offering_name = (req,res,next) => {
    Offering.findOne({offeringTitle : req.params.offeringTitle})
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

