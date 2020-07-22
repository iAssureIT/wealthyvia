const mongoose	= require("mongoose");
const Role = require('../models/roles.js');
exports.create_role = (req,res,next)=>{
	Role.findOne({role:req.body.role})
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message: ' Role already exists'
				});
			}else{
				const role = new Role({
                    _id         : new mongoose.Types.ObjectId(),
                    role        : req.body.role,
                    createdBy   : req.body.user_ID,
                    createdAt   : new Date(),

                });
                role.save()
                    .then(data=>{
                        res.status(200).json({
                                            message : "ROLE_ADDED",
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
exports.list_role = (req,res,next)=>{
    Role.find()
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
exports.detail_role = (req,res,next)=>{
    Role.findOne({_id:req.params.ID})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json('ROLE_NOT_FOUND');
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.update_role = (req,res,next)=>{
    var roleData = req.params.ID;
    Role.findOne({role:req.params.ID})
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message: ' Role already exists'
				});
			}else{
				Role.updateOne(
                            { _id:req.params.ID},  
                            {
                                $set:{
                                    "role" : req.body.role
                                }
                            }
                        )
                        .exec()
                        .then(data=>{
                            console.log('data ',data);
                            if(data){
                                res.status(200).json("ROLE_UPDATED");
                            }else{
                                res.status(401).json("ROLE_NOT_UPDATED");
                            }
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
exports.delete_role = (req,res,next)=>{
    console.log("req.params.ID ",req.params.ID);
    Role.deleteOne({_id:req.params.ID})
        .exec()
        .then(data=>{
            console.log('data ',data);
            if(data.deletedCount === 1){
                res.status(200).json("ROLE_DELETED");
            }else{
                res.status(200).json("ROLE_NOT_DELETED");
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.delete_all_role = (req,res,next)=>{
    Role.deleteMany({})
        .exec()
        .then(data=>{
            res.status(200).json("All Roles deleted");
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
