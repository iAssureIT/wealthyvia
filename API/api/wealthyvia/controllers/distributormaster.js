const mongoose	        = require("mongoose");
const Distributormaster = require('../models/distributormaster.js');



exports.create_distributor = (req, res, next) => {
	Distributormaster.findOne({email:req.body.email})
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message : 'DISTRIBUTOR_EmailID Allready exits.',
                    details : data
				});
			}else{
                const distributermaster = new Distributormaster({
                    "_id"               : mongoose.Types.ObjectId(), 
                        "firstname"         : req.body.firstname,
                        "lastname"          : req.body.lastname, 
                        "dob"               : req.body.dob,
                        "phone"             : req.body.phone,
                        "email"             : req.body.email,
                        "ownOffice"         : req.body.ownOffice,   
                        "address"         : {
                            "adressLine"        : req.body.adressLine,
                            "pincode"           : req.body.pincode,
                            "city"              : req.body.city,
                            "state"             : req.body.state,
                            "stateCode"         : req.body.stateCode,         
                            "latitude"          : req.body.latitude,
                            "longitude"         : req.body.longitude
                        },
                        "currentDate"          : req.body.currentDate, 
                        "fileUpload"           : req.body.fileUpload, 
                        "education"            : req.body.education, 
                        "description"          : req.body.description, 
                        "gst"               : req.body.gst, 
                        "status"            : "New", 
                        "createdBy"         : req.body.createdBy, //_id of User or null
                        "createdAt"         : new Date(),    
                        "updateLog"         :[{
                                            updatedBy : req.body.updatedBy, 
                                            updatedAt :new Date,
                                        }] 
                });
                console.log("distributermaster",distributermaster);
                distributermaster.save()
                    .then(data=>{
                        res.status(200).json({
                            message : "DISTRIBUTOR_MASTER_DETAILS_INSERTED",
                            ID      : data._id
                        });
                    console.log("distributermaster",data);

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

exports.fetch_distributor_list = (req,res,next) => {
    Distributormaster.find({"status":req.params.status})
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

exports.fetch_All_distributor_list = (req,res,next) => {
    Distributormaster.find({})
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

exports.patch_distributor = (req,res,next) => {
    console.log("inside a update function");
    Distributormaster.updateOne(
                        {_id:req.params.ID},
                        {
                            $set : {
                                "firstname"         : req.body.firstname,
                                "lastname"          : req.body.lastname, 
                                "dob"               : req.body.dob,
                                "phone"             : req.body.phone,
                                "email"             : req.body.email, 
                                "ownOffice"         : req.body.ownOffice,
                                "address"           : {
                                    "adressLine"        : req.body.adressLine,
                                    "pincode"           : req.body.pincode,
                                    "city"              : req.body.city,
                                    "state"             : req.body.state,
                                    "stateCode"         : req.body.stateCode,         
                                }, 
                                "gst"               : req.body.gst, 
                                "education"         : req.body.education, 
                                "fileUpload"        : req.body.fileUpload, 
                                // "status"            : req.body.status, 
                                "updateLog"         :[{
                                            updatedBy : req.body.updatedBy, 
                                            updatedAt :new Date,
                                        }] 
                            }
                        }
                    )
        .exec()
        .then(data=>{
            console.log("data",data);
            res.status(200).json({
                data : data,
                message :"DISTRIBUTOR_UPDATED"
            })
        })
        .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while updating Distributer Data!"
                })
        });
            // console.log("if data",data);
            /*if(data.nModified === 1){
               return  res.status(200).json({message : "DISTRIBUTOR_UPDATED"})

            }else{
               return  res.status(200).json({message : "DISTRIBUTOR_NOT_UPDATED"})
            console.log("else data",data);*/         
}

//*****************set Status (approve Or reject) Update Function *********************//

exports.setstatus_distributor = (req,res,next) => {
    console.log("inside a set statusfunction");
    Distributormaster.updateOne(
                        {_id:req.body.id},
                        {
                            $set : {
                                 "status"            : req.body.status, 
                                "updateLog"          : [{
                                        updatedBy    : req.body.updatedBy, 
                                        updatedAt    : new Date,
                                        }] 
                            }
                        }
                    )
        .exec()
        .then(data=>{
            console.log("data",data);
            res.status(200).json({
                data : data,
                message :"DISTRIBUTOR_UPDATED"
            })
        })
        .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while updating Distributer Data!"
                })
        });
 
}


exports.delete_distributor = (req,res,next) =>{
    Distributormaster.deleteOne({_id:req.params.ID})
         .exec()
         .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({message : "DISTRIBUTOR_DELETED"})
            }else{
                res.status(200).json({message : "DISTRIBUTOR_NOT_DELETED"})
            }
         })
};

exports.fetch_distributor_name = (req,res,next) => {
    console.log("inside fun");
    Distributormaster.findOne({_id : req.params.ID})
         .exec()
         .then(data=>{
                    console.log("data",data);

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


