const mongoose			= require("mongoose");
const bcrypt			= require("bcrypt");
const jwt				= require("jsonwebtoken");
const globalVariable 	= require("../../../nodemon.js");
var ObjectID 			= require('mongodb').ObjectID;
var request             = require('request-promise');
const User 				= require('../../coreAdmin/models/users.js');
const Counter = require('../../wealthyvia/models/counter.js');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getNextSequence(code) {
    return new Promise( (resolve, reject)=>{ 
        Counter.findByIdAndUpdate(
            { "_id": code },
            { "$inc": { "seq": 1 } }
            )
            .then(counter => {
                if(counter){
                    console.log("counter", counter);
                    let num = counter.seq;
                    let str = num.toString().padStart(5, "0")
                    console.log(str) 
                    resolve( str ) ;
                }
                else{
                    const distributorCounter = new Counter({
                        "_id"   : code, 
                        "seq"   : 2,
                     });
                
                    distributorCounter.save()
                        .then(data=>{
                            let num = 1;
                            let str = num.toString().padStart(5, "0")
                            console.log(str) 
                            resolve( str ) ;

                            })
                            .catch(err =>{
                                reject(error);
                            });
                }
                
            })
            .catch(error=>{
                reject(error);
            });

    });  
      
}


exports.user_signup_admin = (req,res,next)=>{
	if(req.body.email && req.body.pwd){
		User.find({"emails.address":req.body.email })
			.exec()
			.then(user =>{
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Email Id already exits.'
					});
				}else{
					bcrypt.hash(req.body.pwd,10,(err,hash)=>{
						if(err){
							return res.status(500).json({
								error:err
							});
						}else{
							const user = new User({
											_id			: new mongoose.Types.ObjectId(),
											createdAt	: new Date,
											services	: {
												password:{
															bcrypt:hash
															
														},
											},
											username	: req.body.email,
											emails		: [
													{
														address  : req.body.email,
														verified : true 
													}
											],
											profile		:
													{
														firstname     : req.body.firstname,
														lastname      : req.body.lastname,
														fullName      : req.body.firstname+' '+req.body.lastname,
														emailId       : req.body.email,
														mobNumber     : req.body.mobNumber,
														createdOn     : new Date(),
														status		  : 'Active',
													},
											roles 		: [req.body.role]
							});	
							if(!req.body.firstname){
								user.profile.fullName = req.body.fullName;
							}
							user.save()
								.then(result =>{
									res.status(201).json({
										message	: 'USER_CREATED',
										ID 		: result._id,
									})
								})
								.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
						}			
					});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}else{
		res.status(200).json({message:"Email and pwd are mandatory"});
	}
};
exports.user_signup_user = (req,res,next)=>{
	if(req.body.role && req.body.email && req.body.pwd){
		User.find({"emails.address":req.body.email })
			.exec()
			.then(user =>{
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Email Id already exits.'
					});
				}else{
					bcrypt.hash(req.body.pwd,10,(err,hash)=>{
						if(err){
							return res.status(500).json({
								error:err
							});
						}else{
							const user = new User({
											_id: new mongoose.Types.ObjectId(),
											createdAt	: new Date,
											createdBy   : req.body.createdBy,
											services	: {
												password:{
															bcrypt:hash
															
														},
											},
											username	: req.body.email,
											emails		: [
													{
														address  : req.body.email,
														verified : true 
													}
											],
											profile		:
													{
														firstname     : req.body.firstname,
														lastname      : req.body.lastname,
														fullName      : req.body.firstname+' '+req.body.lastname,
														emailId       : req.body.email,
														mobNumber     : req.body.mobNumber,
														createdOn     : new Date(),
														status		  : req.body.status,
													},
											roles 		: [req.body.role]
							});	
							if(!req.body.firstname){
								user.profile.fullName = req.body.fullName;
							}
							user.save()
								.then(result =>{
									res.status(201).json({
										message	: 'User created',
										ID 		: result._id,
									})
								})
								.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
						}			
					});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}else{
		res.status(200).json({message:"Email , pwd and Role are mandatory"});
	}
};

exports.user_signup_distributor = (req,res,next)=>{
	if(req.body.role && req.body.email && req.body.pwd){
		User.find({"emails.address":req.body.email})
			.exec()
			.then(user =>{
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Email Id already exits.'
					});
				}else{
					bcrypt.hash(req.body.pwd,10,(err,hash)=>{
						if(err){
							return res.status(500).json({
								error:err
							});
						}else{
							const user = new User({
											_id: new mongoose.Types.ObjectId(),
											createdAt	: new Date,
											createdBy   : req.body.createdBy,
											services	: {
												password:{
															bcrypt:hash
															
														},
											},
											username	: req.body.email,
											emails		: [
													{
														address  : req.body.email,
														verified : true 
													}
											],
											profile		:
													{
														firstname     : req.body.firstname,
														lastname      : req.body.lastname,
														fullName      : req.body.firstname+' '+req.body.lastname,
														emailId       : req.body.email,
														mobNumber     : req.body.mobNumber,
														createdOn     : new Date(),
														status		  : req.body.status,
														passwordreset : false
													},
											roles 		: [req.body.role]
							});	
							if(!req.body.firstname){
								user.profile.fullName = req.body.fullName;
							}
							user.save()
								.then(result =>{
									res.status(201).json({
										message	: 'User created',
										ID 		: result._id,
									})
								})
								.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
						}			
					});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}else{
		res.status(200).json({message:"Email , pwd and Role are mandatory"});
	}
};

exports.user_signup_user_email_otp = (req,res,next)=>{
	if(req.body.role && req.body.email && req.body.pwd){
		User.find({"emails.address":req.body.email})
			.exec()
			.then(user =>{
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Email Id already exits.'
					});
				}else{
					bcrypt.hash(req.body.pwd,10,(err,hash)=>{
						if(err){
							return res.status(500).json({
								error:err
							});
						}else{
							getclientcode();
    						async function getclientcode(){
							var clientCode = await getNextSequence("clientCode");
							
									var emailOTP = getRandomInt(1000,9999);
									if(emailOTP){
										const user = new User({
														_id: new mongoose.Types.ObjectId(),
														createdAt	: new Date,
														createdBy   : req.body.createdBy,
														services	: {
															password:{
																		bcrypt:hash
																		
																	},
														},
														username	: req.body.email,
														emails		: [
																{
																	address  : req.body.email,
																	verified : true 
																}
														],
														profile		:
																{
																	firstname     	: req.body.firstname,
																	lastname      	: req.body.lastname,
																	fullName      	: req.body.firstname+' '+req.body.lastname,
																	emailId       	: req.body.email,
																	mobNumber     	: req.body.mobNumber,
																	createdOn     	: new Date(),
																	optEmail 	  	: emailOTP,
																	status		  	: req.body.status,																	
																	clientId 	  : "WVC"+clientCode,
																	city          : req.body.city,
																	states        : req.body.states,
																	dob           : req.body.dob
																},
														distributorCode	: req.body.distributorCode,		
														roles 		: [req.body.role]
										});	
										if(!req.body.firstname){
											user.profile.fullName = req.body.fullName;
										}
										user.save()
											.then(result =>{
												if(result){
													request({
											                "method"    : "POST", 
											                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
											                "body"      : {
											                					email 	: req.body.email, 
											                					subject : "Verify your Account on Wealthyvia",
											                					mail    : "Dear "+result.profile.fullName+",<br/>"+
											                								"To verify your account of Wealthyvia, please enter following OTP: <br/>"+
											                								"Your OTP is "+ emailOTP+"<br/><br/>"+
											                								"Regards,<br/>"+
											                								"Team Wealthyvia.", 
											                			   },
											                "json"      : true,
											                "headers"   : {
											                                "User-Agent": "Test Agent"
											                            }
											            })
											            .then(source=>{
											            	res.status(201).json({message:"USER__CREATED",ID:result._id})
											            })
											    		.catch(err =>{
															console.log(err);
															res.status(500).json({
																error: err
															});
														});        
												}else{
													res.status(200).json({message:"USER_NOT_CREATED"})
												}
											})
											.catch(err =>{
												console.log(err);
												res.status(500).json({
													error: err
												});
											})
										}
									}									
						}			
					});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}else{
		res.status(200).json({message:"Email , pwd and Role are mandatory"});
	}
};

/*exports.user_signup_user_email_otp = (req,res,next)=>{
	if(req.body.role && req.body.email && req.body.pwd){
		User.find({"emails.address":req.body.email})
			.exec()
			.then(user =>{
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Email Id already exits.'
					});
				}else{
					bcrypt.hash(req.body.pwd,10,(err,hash)=>{
						if(err){
							return res.status(500).json({
								error:err
							});
						}else{
							User.find({"roles":"user"})
								.count()
								.exec()
								.then(countuser=>{
									var emailOTP = getRandomInt(1000,9999);
									if(emailOTP){
										const user = new User({
														_id: new mongoose.Types.ObjectId(),
														createdAt	: new Date,
														createdBy   : req.body.createdBy,
														services	: {
															password:{
																		bcrypt:hash
																		
																	},
														},
														username	: req.body.email,
														emails		: [
																{
																	address  : req.body.email,
																	verified : true 
																}
														],
														profile		:
																{
																	firstname     	: req.body.firstname,
																	lastname      	: req.body.lastname,
																	fullName      	: req.body.firstname+' '+req.body.lastname,
																	emailId       	: req.body.email,
																	mobNumber     	: req.body.mobNumber,
																	createdOn     	: new Date(),
																	optEmail 	  	: emailOTP,
																	status		  	: req.body.status,																	
																	clientId 	  : "WL"+(countuser+1),
																	city          : req.body.city,
																	states        : req.body.states,
																	dob           : req.body.dob
																},
														distributorCode	: req.body.distributorCode,		
														roles 		: [req.body.role]
										});	
										if(!req.body.firstname){
											user.profile.fullName = req.body.fullName;
										}
										user.save()
											.then(result =>{
												if(result){
													request({
											                "method"    : "POST", 
											                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
											                "body"      : {
											                					email 	: req.body.email, 
											                					subject : "Verify your Account on Wealthyvia",
											                					mail    : "Dear "+result.profile.fullName+",<br/>"+
											                								"To verify your account of Wealthyvia, please enter following OTP: <br/>"+
											                								"Your OTP is "+ emailOTP+"<br/><br/>"+
											                								"Regards,<br/>"+
											                								"Team Wealthyvia.", 
											                			   },
											                "json"      : true,
											                "headers"   : {
											                                "User-Agent": "Test Agent"
											                            }
											            })
											            .then(source=>{
											            	res.status(201).json({message:"USER__CREATED",ID:result._id})
											            })
											    		.catch(err =>{
															console.log(err);
															res.status(500).json({
																error: err
															});
														});        
												}else{
													res.status(200).json({message:"USER_NOT_CREATED"})
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
								})
						}			
					});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}else{
		res.status(200).json({message:"Email , pwd and Role are mandatory"});
	}
};
*/
exports.user_login = (req,res,next) =>{
	User.findOne({"emails.address":req.body.email})
		.exec()
		.then(user => {
			if(user){
				var pwd = user.services.password.bcrypt;
				if(pwd){
					bcrypt.compare(req.body.password,pwd,(err,result)=>{
						console.log("err ",err,"result",result);
						if(err || !result){
							return res.status(401).json({
								message: 'Auth failed'
							});		
						}
						if(result){
							console.log("result ====> ",globalVariable); 
							const token = jwt.sign({
								email 	: req.body.email,
								userId	:  user._id ,
							},globalVariable.JWT_KEY,
							{
								expiresIn: "365d"
							}
							);
							User.updateOne(
									{ "emails.address":req.body.email},
									{
										$push : {
											"services.resume.loginTokens" : {
													when: new Date(),
													hashedToken : token
												}
										}
									}
								)
								.exec()
								.then(updateUser=>{
									if(updateUser.nModified == 1){
										res.status(200).json({
													message	: 'Auth successful',
													token	: token,
													ID 		: user._id
										});	
									}else{
										return res.status(401).json({
												message: 'Auth failed'
											});
									}
								})
								.catch(err=>{
									console.log("500 err ",err);
									res.status(500).json(err);
								});	
						}
					})
				}else{
                    res.status(409).json({message:"Password not found"}); 
				}
			}else{
                res.status(409).json({message:"User Not found"});
			}			
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
exports.admin_login = (req,res,next) =>{
	console.log("admin login")
	User.findOne({
					"emails.address":req.body.email,
					roles   : ["admin"]
				})
		.exec()
		.then(user => {
			console.log("user ",user);
			if(user != null && user != undefined){
				var pwd = user.services.password.bcrypt;
				if(pwd){
					bcrypt.compare(req.body.password,pwd,(err,result)=>{
						console.log("admin err ",err,"result",result);
						if(err || !result){
							return res.status(401).json({
								message: 'Auth failed'
							});		
						}
						if(result){
							console.log("admin result ====> ",globalVariable); 
							const token = jwt.sign({
								email 	: req.body.email,
								userId	:  user._id ,
							},globalVariable.JWT_KEY,
							{
								expiresIn: "1h"
							}
							);
							User.updateOne(
									{ "emails.address":req.body.email },
									{
										$push : {
											"services.resume.loginTokens" : {
													when: new Date(),
													hashedToken : token
												}
										}
									}
								)
								.exec()
								.then(updateUser=>{
									console.log("admin updateUser ",updateUser);
									if(updateUser.nModified == 1){
										res.status(200).json({
													message	: 'Auth successful',
													token	: token,
													ID 		: user._id
										});	
									}else{
										return res.status(401).json({
												message: 'Auth failed'
											});
									}
								})
								.catch(err=>{
									console.log("500 err ",err);
									res.status(500).json(err);
								});	
						}
					})
				}else{
                    res.status(409).json({message:"Password not found"}); 
				}
			}else{
                res.status(409).json({message:"User Not found Or User is not a admin"});
			}			
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
exports.distributor_login = (req,res,next) =>{
	//console.log("distributor login")
	User.findOne({
					"emails.address" :req.body.email ,
					roles   : ["distributor"]
				})
		.exec()
		.then(user => {
			//console.log("user ",user);
			if(user != null && user != undefined){
				var pwd = user.services.password.bcrypt;
				if(pwd){
					bcrypt.compare(req.body.password,pwd,(err,result)=>{
						//console.log("distributor err ",err,"result",result);
						if(err || !result){
							return res.status(401).json({
								message: 'Auth failed'
							});		
						}
						if(result){
							//console.log("distributor result ====> ",globalVariable); 
							const token = jwt.sign({
								email 	: req.body.email,
								userId	:  user._id ,
							},globalVariable.JWT_KEY,
							{
								expiresIn: "1h"
							}
							);
							User.updateOne(
									{ "emails.address":req.body.email },
									{
										$push : {
											"services.resume.loginTokens" : {
													when: new Date(),
													hashedToken : token
												}
										}
									}
								)
								.exec()
								.then(updateUser=>{
									console.log("admin updateUser ",updateUser);
									if(updateUser.nModified == 1){
										res.status(200).json({
													message			: 'Auth successful',
													token			: token,
													ID 				: user._id,
													passwordreset 	: user.profile.passwordreset,
										});	
									}else{
										return res.status(401).json({
												message: 'Auth failed'
											});
									}
								})
								.catch(err=>{
									console.log("500 err ",err);
									res.status(500).json(err);
								});	
						}
					})
				}else{
                    res.status(409).json({message:"Password not found"}); 
				}
			}else{
                res.status(409).json({message:"User Not found Or User is not a distributor"});
			}			
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.user_update_name_mobile = (req,res,next)=>{
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				User.updateOne(
					{_id:req.params.ID},
					{
						$set:{
							"profile.firstname"     : req.body.firstname,
							"profile.lastname"      : req.body.lastname,
							"profile.fullName"      : req.body.firstname+' '+req.body.lastname,
							"profile.mobNumber"     : req.body.mobNumber,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){
						res.status(200).json("USER_UPDATED");
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			console.log('update user error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.user_update_status = (req,res,next)=>{
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				User.updateOne(
					{_id:req.params.ID},
					{
						$set:{
							"profile.status"     : req.body.status,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){
						res.status(200).json("USER_STATUS_UPDATED");
					}else{
						res.status(401).status("USER_STATUS_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			console.log('update user error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.user_update_role = (req,res,next)=>{
	switch(req.params.action){
		case 'assign' :
				User.updateOne(
						{_id:req.params.ID},
						{
							$push:{
								roles : req.body.role
							}
						}
					)
					.exec()
					.then(data=>{
						if(data.nModified == 1){
							res.status(200).json("USER_ROLE_ASSIGNED");
						}else{
							res.status(401).json("USER_ROLE_NOT_ASSIGNED");
						}
					})
					.catch(err =>{
						console.log('user error ',err);
						res.status(500).json({
							error: err
						});
					});
			break;
		case 'remove' :
			User.updateOne(
						{_id:req.params.ID},
						{
							$pull:{
								roles : req.body.role
							}
						}
					)
					.exec()
					.then(data=>{
						if(data.nModified == 1){
							res.status(200).json("USER_ROLE_REMOVED");
						}else{
							res.status(401).json("USER_ROLE_NOT_REMOVED");
						}
					})
					.catch(err =>{
						console.log('user error ',err);
						res.status(500).json({
							error: err
						});
					});
			break;
		default :
			res.status(200).json({message:"INVALID_ACTION"})
	}
};
exports.user_update_password_ID = (req,res,next)=>{
	console.log("user_update_password_ID params ",req.params);
	console.log("user_update_password_ID body ",req.body);
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				bcrypt.hash(req.body.pwd,10,(err,hash)=>{
				    User.updateOne(
				        {_id:req.params.ID},  
				        {
				            $set:{
								services: {
									password: {
										bcrypt:hash
									},
								},
							}			
				        }
				    )
				    .exec()
				    .then(data=>{
				        // console.log('data ',data);
				        if(data.nModified == 1){
				            res.status(200).json("PASSWORD_RESET");
				        }else{
				            res.status(401).json("PASSWORD_NOT_RESET");
				        }
				    })
				    .catch(err =>{
				        console.log(err);
				        res.status(500).json({
				            error: err
				        });
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			// console.log('update user status error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.fetch_user_ID = (req,res,next)=>{
	User.findOne({_id:req.params.ID})
		.select("profile.firstname profile.lastname profile.status profile.fullName roles profile.emailId profile.mobNumber")
		.exec()
		.then(data=>{
			if(data){
				res.status(200).json({
									"firstname" : data.profile.firstname,
									"lastname"	: data.profile.lastname,
									"email"		: data.profile.emailId, //Mandatory 
									"mobNumber" : data.profile.mobNumber,
									"role"      : data.roles, //Mandatory
									"status"	: data.profile.status, //Either "Active" or "Inactive"
									"fullName"	: data.profile.fullName,
							});
			}else{
				res.status(200).json({message:"USER_NOT_FOUND"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.fetch_users_kycrisk = (req,res,next)=>{
	User.findOne({_id:req.params.ID})
		.exec()
		.then(data=>{
			if(data){
				res.status(200).json({
									"firstname" : data.profile.firstname,
									"lastname"	: data.profile.lastname,
									"email"		: data.profile.emailId, //Mandatory 
									"mobNumber" : data.profile.mobNumber,
									"role"      : data.roles, //Mandatory
									"status"	: data.profile.status, //Either "Active" or "Inactive"
									"fullName"	: data.profile.fullName,
									"kycsubmit" : data.profile.kycsubmit,
									"risksubmit" : data.profile.risksubmit,
									"panNumber" : data.profile.panNumber,
									"gstNumber" : data.profile.gstNumber,
									"city" 		: data.profile.city,
									"states" 	: data.profile.states,
									"dob" 		: data.profile.dob,
							});
			}else{
				res.status(200).json({message:"USER_NOT_FOUND"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.fetch_users = (req,res,next)=>{
	var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
	User.find({})
		.select("profile.firstname profile.lastname profile.status profile.fullName roles profile.emailId profile.mobNumber profile.clientId")
		.sort({createdAt : -1})
        // .skip(startRange)
        // .limit(limitRange)
		.exec()
		.then(data=>{
			if(data){
				var i = 0;
				var returnData = [];
				for(i = 0 ; i < data.length ; i++){
					returnData.push({
										"_id"		: data[i]._id,
										"firstname" : data[i].profile.firstname,
										"lastname"	: data[i].profile.lastname,
										"email"		: data[i].profile.emailId, //Mandatory 
										"mobNumber" : data[i].profile.mobNumber,
										"role"      : data[i].roles, //Mandatory
										"status"	: data[i].profile.status, //Either "Active" or "Inactive"
										"fullName"	: data[i].profile.fullName,
										"clientId"	: data[i].clientId
									});
				}
				if( i >= data.length){
					res.status(200).json(returnData);
				}
			}else{
				res.status(200).json({message:"USER_NOT_FOUND"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.fetch_users_by_distibutorcode = (req,res,next)=>{
	//var limitRange    = 10;
    //var countNum2   = limitRange * req.params.pageno;
    //var startRange  = countNum2 - limitRange;
	User.find({distributorCode:req.params.distributorCode, roles:req.params.role})
		.select("profile.firstname profile.lastname profile.status profile.fullName roles profile.emailId profile.mobNumber profile.clientId")
		.sort({createdAt : -1})
        // .skip(startRange)
        // .limit(limitRange)
		.exec()
		.then(data=>{
			if(data){
				var i = 0;
				var returnData = [];
				for(i = 0 ; i < data.length ; i++){
					returnData.push({
										"_id"		: data[i]._id,
										"firstname" : data[i].profile.firstname,
										"lastname"	: data[i].profile.lastname,
										"email"		: data[i].profile.emailId, //Mandatory 
										"mobNumber" : data[i].profile.mobNumber,
										"role"      : data[i].roles, //Mandatory
										"status"	: data[i].profile.status, //Either "Active" or "Inactive"
										"fullName"	: data[i].profile.fullName,
										"clientId"	: data[i].profile.clientId
									});
				}
				if( i >= data.length){
					res.status(200).json(returnData);
				}
			}else{
				res.status(200).json({message:"USER_NOT_FOUND"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.fetch_users_roles = (req,res,next)=>{
	var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
	User.find({roles:req.params.role})
		.select("profile.firstname profile.lastname profile.status profile.fullName roles profile.emailId profile.mobNumber profile.clientId distributorCode")
		.sort({createdAt : -1})
        // .skip(startRange)
        // .limit(limitRange)
		.exec()
		.then(data=>{
			if(data){
				var i = 0;
				var returnData = [];
				for(i = 0 ; i < data.length ; i++){
					returnData.push({
										"_id"		: data[i]._id,
										"firstname" : data[i].profile.firstname,
										"lastname"	: data[i].profile.lastname,
										"email"		: data[i].profile.emailId, //Mandatory 
										"mobNumber" : data[i].profile.mobNumber,
										"role"      : data[i].roles, //Mandatory
										"status"	: data[i].profile.status, //Either "Active" or "Inactive"
										"fullName"	: data[i].profile.fullName,
										"clientId"	: data[i].profile.clientId,
										"distributorCode"	: data[i].distributorCode,
									});
				}
				if( i >= data.length){
					res.status(200).json(returnData);
				}
			}else{
				res.status(200).json({message:"USER_NOT_FOUND"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.fetch_users_status = (req,res,next)=>{
	var limitRange    = 10;
    var countNum2   = limitRange * req.params.pageno;
    var startRange  = countNum2 - limitRange;
	User.find({"profile.status":req.params.status})
		.select("profile.firstname profile.lastname profile.status profile.fullName roles profile.emailId profile.mobNumber profile.clientId")
		.sort({createdAt : -1})
        // .skip(startRange)
        // .limit(limitRange)
		.exec()
		.then(data=>{
			if(data){
				var i = 0;
				var returnData = [];
				for(i = 0 ; i < data.length ; i++){
					returnData.push({
										"_id"		: data[i]._id,
										"firstname" : data[i].profile.firstname,
										"lastname"	: data[i].profile.lastname,
										"email"		: data[i].profile.emailId, //Mandatory 
										"mobNumber" : data[i].profile.mobNumber,
										"role"      : data[i].roles, //Mandatory
										"status"	: data[i].profile.status, //Either "Active" or "Inactive"
										"fullName"	: data[i].profile.fullName,
										"clientId"	: data[i].profile.clientId
									});
				}
				if( i >= data.length){
					res.status(200).json(returnData);
				}
			}else{
				res.status(200).json({message:"USER_NOT_FOUND"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.delete_user_ID = (req,res,next)=>{
	User.deleteOne({_id:req.params.ID})
		.exec()
		.then(data=>{
			
			if(data.deletedCount === 1){
				res.status(200).json({message:"USER_DELETED"});
			}else{
				res.status(200).json({message:"USER_NOT_DELETED"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.check_EmailOTP = (req,res,next)=>{
	console.log("email otp: ",req.params.ID, req.params.emailotp);
	User.find({_id : req.params.ID, "profile.optEmail" : req.params.emailotp})
		.exec()
		.then(data=>{
			if(data.length > 0){
				User.updateOne(
							{_id : req.params.ID}, 
							{
								$set:{
									"profile.optEmail" : 0
								}
							}
					)
				    .exec()
				    .then(data=>{
				    	console.log("data", data);
				    	if(data.nModified === 1){
							res.status(200).json({message:"SUCCESS"});
				    	}else{
							res.status(200).json({message:"SUCCESS_OTP_NOT_RESET"});    		
				    	}
				    })
				    .catch(err =>{
						console.log('user error ',err);
						res.status(500).json({
							error: err
						});
					})
			}else{
				res.status(200).json({message:"FAILED"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});		
};
exports.update_email_otp = (req,res,next) =>{
	var optEmail = getRandomInt(1000,9999);
	User.updateOne(
					{_id:req.params.ID},
					{
						$set:{
							"profile.optEmail"     : optEmail,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){
						request({
					                "method"    : "POST", 
					                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
					                "body"      : {
					                					email 	: req.body.email, 
					                					subject : "Wealthyvia OTP",
					                					text    : "Wealthyvia updated OTP is "+ optEmail, 
					                			   },
					                "json"      : true,
					                "headers"   : {
					                                "User-Agent": "Test Agent"
					                            }
					            })
					            .then(source=>{
					            	res.status(201).json({message:"OTP_UPDATED"})
					            })
					    		.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
};
exports.update_email_otp_email = (req,res,next) =>{
	var optEmail = getRandomInt(1000,9999);
	User.updateOne(
					{_username:req.body.emailId},
					{
						$set:{
							"profile.optEmail"     : optEmail,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){
						request({
					                "method"    : "POST", 
					                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
					                "body"      : {
					                					email 	: req.body.emailId, 
					                					subject : "Wealthyvia OTP",
					                					text    : "Wealthyvia updated OTP is "+ optEmail, 
					                			   },
					                "json"      : true,
					                "headers"   : {
					                                "User-Agent": "Test Agent"
					                            }
					            })
					            .then(source=>{
					            	res.status(201).json({message:"OTP_UPDATED"})
					            })
					    		.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
};
exports.change_password_email_verify = (req,res,next)=>{
	console.log("email ",req.body);
	User.findOne({username : req.body.emailId})
		.exec()
		.then(data=>{
			if(data){
				request({
			                "method"    : "PATCH", 
			                "url"       : "http://localhost:"+globalVariable.port+"/api/users/patch/optEmail/"+data._id,
			                "body"		: {email : data.username},
			                "json"      : true,
			                "headers"   : {
			                                "User-Agent": "Test Agent"
			                            }
			            })
			            .then(source=>{
			            	if(source.message === "OTP_UPDATED"){
				            	res.status(201).json({message:"OTP_UPDATED",ID:data._id})
			            	}else{
			            		res.status(201).json({message:"OTP_NOT_UPDATED"})
			            	}
			            })
			    		.catch(err =>{
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
			}else{ //end of if data
				res.status(200).json({message:"USER_NOT_FOUND"})
			}
		})
		.catch(err =>{
				console.log('user error ',err);
				res.status(500).json({
					error: err
				});
			})
};

exports.reset_distributor_password = (req,res,next)=>{
	console.log("user_update_password_ID params ",req.params);
	console.log("user_update_password_ID body ",req.body);
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				bcrypt.hash(req.body.pwd,10,(err,hash)=>{
				    User.updateOne(
				        {_id:req.params.ID},  
				        {
				            $set:{
								"services.password.bcrypt" : hash,
								"profile.passwordreset"    : true								
							}			
				        }
				    )
				    .exec()
				    .then(data=>{
				        // console.log('data ',data);
				        if(data.nModified == 1){
				            res.status(200).json("PASSWORD_RESET");
				        }else{
				            res.status(401).json("PASSWORD_NOT_RESET");
				        }
				    })
				    .catch(err =>{
				        console.log(err);
				        res.status(500).json({
				            error: err
				        });
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			// console.log('update user status error ',err);
			res.status(500).json({
				error:err
			});
		});
};

exports.map_distributor_code_to_client = (req,res,next) =>{
	console.log("patch",req.body.ID, req.body.distributorCode);
	User.updateOne(
					{_id:req.body.ID},
					{
						$set:{
							"distributorCode"     : req.body.distributorCode,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){					
					    res.status(201).json({message:"User_UPDATED"})					
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
};

exports.user_update_kyc = (req,res,next)=>{
	console.log("userkyc",req.params.ID, req.body.panNumber );
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				console.log("found");
				User.updateOne(
					{_id:req.params.ID},
					{
						$set:{
							"profile.panNumber"     : req.body.panNumber,
							"profile.gstNumber"     : req.body.gstNumber,
							"profile.kycsubmit"     : true,     
							
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){
						res.status(200).json("USER_UPDATED");
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			console.log('update user error ',err);
			res.status(500).json({
				error:err
			});
		});
};

exports.user_update_risk = (req,res,next)=>{
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				User.updateOne(
					{_id:req.params.ID},
					{
						$set:{
							"profile.risksubmit"     : true,     							
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified == 1){
						res.status(200).json("USER_UPDATED");
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			console.log('update user error ',err);
			res.status(500).json({
				error:err
			});
		});
};

exports.send_otp_for_admin_verify = (req,res,next) =>{
	var optEmail = getRandomInt(1000,9999);
	User.updateOne(
					{ username:req.body.emailId},
					{
						$set:{
							"profile.optEmail"     : optEmail,
						},
					}
				)
				.exec()
				.then(data=>{
					console.log("data",data);
					if(data.nModified == 1){
						request({
					                "method"    : "POST", 
					                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
					                "body"      : {
					                					email 	: "pritamdeuskar@gmail.com", 
					                					subject : "Admin- Reset Password",
					                					mail    : "Admin wants to reset the password from Wealthyvia admin<br /> "+
					                								"Following is the OTP to complete reset password process<br />"+
					                								"OTP: "+optEmail, 
					                			   },
					                "json"      : true,
					                "headers"   : {
					                                "User-Agent": "Test Agent"
					                            }
					            })
					            .then(source=>{
					            	console.log("email sent");
					            	res.status(200).json({message:"OTP_UPDATED"})
					            })
					    		.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
					}else{
						res.status(401).status("USER_NOT_UPDATED")
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						error: err
					});
				});
};
