const mongoose	        = require("mongoose");
const ProjectSettings   = require('../models/projectsettings');

exports.create_projectSettings_S3 = (req, res, next) => {
    if(req.body.key && req.body.secret && req.body.bucket && req.body.region){
    	ProjectSettings.findOne({type:req.body.type})
    		.exec()
    		.then(data =>{
    			if(data){
    				return res.status(200).json({
    					message : 'S3 Details already exists.',
                        details : data
    				});
    			}else{
                const projectsetting = new ProjectSettings({
                    _id             : mongoose.Types.ObjectId(),      
                    key             : req.body.key,
                    secret          : req.body.secret,
                    bucket          : req.body.bucket,
                    region          : req.body.region,
                    type            : 'S3'
                });
                
                projectsetting.save(
                    function(err){
                        if(err){
                            console.log(err);
                            return  res.status(500).json({
                                error: err
                            });          
                        }
                        res.status(200).json({ 
                            message: 'S3 Details Inserted!',
                            data: projectsetting
                        });
                    }
                );
            }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }else{
        res.status(200).json({message : "ALL_ARE_REQUIRED_FIELDS:keys,secret,bucket,region"});
    }
};
exports.fetch_projectsettings_S3 = (req, res, next)=>{
    ProjectSettings.findOne({"type": 'S3'})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json({
                    "key"         : data.key,
                    "secret"      : data.secret,
                    "bucket"      : data.bucket,
                    "region"      : data.region,
                });
            }else{
                res.status(200).json({
                    message : "DATA_NOT_FOUND",
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });            
};


exports.get_projectsettings = (req, res, next)=>{
    var type = req.params.type;
    ProjectSettings.findOne({"type": type})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json(data);
            }else{
                res.status(200).json({
                    message : "DATA_NOT_FOUND",
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });            
};


exports.fetch_projectsettings_all = (req, res, next)=>{
    ProjectSettings.find({})
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
exports.patch_projectsettings_S3 = (req, res, next)=>{
    if(req.body.key && req.body.secret && req.body.bucket && req.body.region){
        ProjectSettings.updateOne(
                                    {"type": 'S3'},
                                    {
                                        $set : {
                                                "key"         : req.body.key,
                                                "secret"      : req.body.secret,
                                                "bucket"      : req.body.bucket,
                                                "region"      : req.body.region,                    
                                        }
                                    }
                                )
            .exec()
            .then(data=>{
                console.log("data ",data);
                if(data.nModified == 1){
                    res.status(200).json({
                        message : "S3_DETAILS_UPDATED",
                        data    : {
                                    "key"         : req.body.key,
                                    "secret"      : req.body.secret,
                                    "bucket"      : req.body.bucket,
                                    "region"      : req.body.region,
                                  }
                    });
                }else{
                    res.status(200).json({
                        message : "DATA_NOT_FOUND",
                    })
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });            
    }else{
        res.status(200).json({
                message : "ALL_ARE_REQUIRED_FIELDS:keys,secret,bucket,region",
            });        
    }
};
exports.delete_projectsettings_S3 = (req, res, next)=>{
    ProjectSettings.deleteOne({"type": "S3"})
        .exec()
        .then(data=>{
            console.log("data ",data);
            if(data.deletedCount === 1){
                res.status(200).json({
                    message : "S3_DETAILS_DELETED",
                });
            }else{
                res.status(200).json({
                    message : "DATA_NOT_FOUND",
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });            
};



