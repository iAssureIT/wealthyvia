var moment 			= require('moment');
const mongoose	    = require("mongoose");
var ObjectID 		= require('mongodb').ObjectID;
const OfferSub      = require('../models/offeringsubscriptions.js');
const WMSub 		= require('../models/wmsubscriptions.js');
const Offering 		= require('../models/offerings.js');
var ObjectID 		= require('mongodb').ObjectID;
	
function getOfferingStatus(wmsub_id,offering_ID){
	return new Promise(function (resolve, reject) {
		OfferSub.findOne({
							"offering_ID" 			: offering_ID,
							"wmSubscription_ID"		: wmsub_id
					})
				.sort({"createdAt":-1})
				.exec()
				.then(data=>{
						resolve(data);
					})
				.catch(err=>{
						reject(err);
					});
	});
}
function update_offering(offering){
	return new Promise(function (resolve, reject) {
		OfferSub.findOne({
						"wmSubscription_ID" : offering.wmSub_ID,
						"user_ID"			: offering.user_ID,
						"offering_ID"		: offering.offering_ID,
						"offeringStatus"	: "Active",
				})
				.sort({createdAt:1})
				.exec()
				.then(offersub=>{
					if(!offersub && offering.offeringStatus === "Active"){
						const offersub = new OfferSub({
												"_id"           	: mongoose.Types.ObjectId(), 
												"user_ID" 			: offering.user_ID,
												"offering_ID"		: offering.offering_ID,
												"offeringTitle"		: offering.offeringTitle,
												"wmSubscription_ID"	: offering.wmSub_ID,
												"startDate" 		: offering.startDate,
												"endDate" 			: offering.endDate,
												"offeringStatus" 	: "Active",
												"createdAt"			: new Date(),
											});
						offersub.save()
			                    .then(data=>{
			                    		resolve(true);
			                        })
			                        .catch(err =>{
			                            console.log(err);
			                            res.status(500).json({
			                                error: err
			                            });
			                        });
					}else if(offersub && offering.offeringStatus != "Active"){
						OfferSub.updateOne(
										{ "_id" : offersub._id},
										{
											$set : {
												"endDate" 			: moment(new Date()).format("YYYY-MM-DD"),
												"offeringStatus"	: "Inactive",
											}
										}
								)
								.exec()
								.then(data=>{
									resolve(true);
								})
								.catch(err =>{
					                console.log(err);
					                reject(err);
					            });								
					}else{
						resolve(true);
					}
				})
				.catch(err =>{
		                console.log(err);
		                reject(err);
		            });				

	});
}
exports.create_offerSub_wsSub = (req, res, next) => {
	WMSub.findOne({
						"user_ID" 		: req.body.user_ID,
						"wsSubStatus"	: "Active"
			})
		 .sort({createdAt:-1})
		 .exec()
		 .then(wssub=>{
			 	if(wssub){
			 		getData();
            		async function getData(){
            			var date = new Date();
				 		date.setDate(date.getDate()+365);
				 		//need to check for leap year
						var FullDate =  date; 
            			var offeringData = req.body.offering;
                        var j = 0;
                        for(j = 0 ; j < offeringData.length; j++){
                        	var status = await update_offering({
                        								"wmSub_ID" 		: wssub._id,
                        								"user_ID"  		: req.body.user_ID,
                        								"offering_ID"	: offeringData[j].offering_ID,
                        								"offeringStatus": offeringData[j].offeringStatus,
                        								"offeringTitle"	: offeringData[j].offeringTitle,
                        								"startDate"		: moment(new Date()).format("YYYY-MM-DD"),
                        								"endDate"		: wssub.endDate,
                        							});
                        }
                        if(j >= offeringData.length){
                        	res.status(200).json("Offering Inserted");
                        }
            		}
			 	}else{
			 		var date = new Date();
			 		date.setDate(date.getDate()+365);
			 		//need to check for leap year
					var FullDate =  date; 
			 		const wmsub_var = new WMSub({
			                    "_id"           	: mongoose.Types.ObjectId(), 
			                    // "wmSubscription_ID"	: wssub._id,
			                    "user_ID"			: req.body.user_ID,
								"startDate" 		: moment(new Date()).format("YYYY-MM-DD"),
								"endDate" 			: moment(FullDate).format("YYYY-MM-DD"),
								"wsSubStatus" 		: "Active",
			                    "createdBy"     	: req.body.createdBy, //_id of User or null
			                    "createdAt"     	: new Date(),     
			                });		 		
	                wmsub_var.save()
	                    .then(data=>{
	                    		console.log("data ",data);
	                    		getData();
	                    		async function getData(){
		                    		if(data){
		                    			var offeringData = req.body.offering;
			                            var j = 0;
			                            for(j = 0 ; j < offeringData.length; j++){
			                            	var status = await update_offering({
			                            								"wmSub_ID" 		: data._id,
			                            								"user_ID"  		: req.body.user_ID,
			                            								"offering_ID"	: offeringData[j].offering_ID,
			                            								"offeringStatus": offeringData[j].offeringStatus,
			                            								"offeringTitle"	: offeringData[j].offeringTitle,
			                            								"startDate"		: moment(new Date()).format("YYYY-MM-DD"),
			                            								"endDate"		: moment(FullDate).format("YYYY-MM-DD")
			                            							});
			                            }
			                            if(j >= offeringData.length){
			                            	res.status(200).json("Offering Inserted");
			                            }
		                    		}else{
								 		res.status(200).json("wmSub is giving some issuse");
		                    		}
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
exports.list_offerSub_wsSub = (req,res,next) => {
	Offering.find({})
			.sort({createdAt : 1})
			.exec()
			.then(offeringData=>{
				var offering = [];
				var i = 0;
				for(i = 0; i < offeringData.length; i++){
					offering.push({
									"offering_ID"		: offeringData[i]._id,
									"offeringTitle" 	: offeringData[i].offeringTitle,
									"offeringStatus"	: "Inactive",
									"startDate"			: "",
									"endDate"			: "",
									"statements"		: "",
							});
				}
				if(i >= offering.length){
					WMSub.findOne({
									"user_ID" 		: req.params.user_ID,
									"wsSubStatus"	: "Active"
							})
						 .sort({createdAt : -1})
						 .exec()
						 .then(wmsub=>{
						 		if(wmsub){
						 			getData();
						 			async function getData(){
						 				var returnData = {
							 					"user_ID" 			: req.params.user_ID,
							 					"startDate"			: wmsub.startDate,
							 					"endDate"			: wmsub.endDate,
							 					"performanceDoc"	: wmsub.performanceDoc,
							 					"offering"			: offering
							 			};
							 			var j = 0;
							 			for(j = 0 ; j < returnData.offering.length; j++){
								 			var offeringStatus = await getOfferingStatus(wmsub._id,returnData.offering[j].offering_ID);
								 			if(offeringStatus && offeringStatus.offeringStatus === 'Active'){
									 			console.log("offeringStatus ",offeringStatus);
								 				returnData.offering[j].offeringStatus = 'Active';
								 				returnData.offering[j].startDate 	  = offeringStatus.startDate;
								 				returnData.offering[j].endDate 	  	  = offeringStatus.endDate;
								 				returnData.offering[j].statements  	  = offeringStatus.statements;
								 			}
							 			}
							 			if(j >= returnData.offering.length){
							 				res.status(200).json(returnData);
							 			}
						 			}
						 		}else{
						 			res.status(200).json({
							 						"user_ID" 		: req.params.user_ID,
								 					"startDate"		: "",
								 					"endDate"		: "",
								 					"offering"		: offering,
								 					"statements"	: []
						 						});
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
exports.list_offerSub = (req,res,next) =>{
	Offering.find({})
			.sort({createdAt : 1})
			.exec()
			.then(offeringData=>{
				var offering = [];
				var i = 0;
				for(i = 0; i < offeringData.length; i++){
					offering.push({
									"offering_ID"		: offeringData[i]._id,
									"offeringTitle" 	: offeringData[i].offeringTitle,
									"offeringStatus"	: "Inactive",
									"startDate"			: "",
									"endDate"			: "",
									"statements"		: "",
							});
				}
				if(i >= offering.length){
					WMSub.aggregate([
										{
											$match : {"wsSubStatus": "Active"}
										},
										{
											$lookup : {
														   	from: "users",
													       	localField: "user_ID",
													       	foreignField: "_id",
													       	as: "user"
														}
										},
										{
											$unwind : "$user"
										},
										{
											$project : {
															"wmSub_id"		: "$_id",
															"startDate"		: 1,
															"endDate"		: 1,
															"wsSubStatus"	: 1,
															"user_ID"		: 1,
															"userName"		: "$user.profile.fullName",
															"email"			: "$user.profile.emailId",
															"mobileNumber"	: "$user.profile.mobNumber",
															"clientID"		: "$user.profile.clientId",
															"offering"      : offering,
															"_id"			: 0
													}
										}
									])
							.sort({createdAt : 1})
							.exec()
							.then(offeringData=>{
								getData();
								async function getData(){
									var i = 0 ;
									for(i = 0; i < offeringData.length; i++){
										var j = 0;
										for(j = 0; j < offeringData[i].offering.length; j++){
											var offeringStatus = await getOfferingStatus(offeringData[i].wmSub_id,offeringData[i].offering[j].offering_ID);
											if(offeringStatus){
									 			console.log("offeringStatus ",offeringStatus);
								 				offeringData[i].offering[j].offeringStatus = offeringStatus.offeringStatus;
								 				offeringData[i].offering[j].startDate 	   = offeringStatus.startDate;
								 				offeringData[i].offering[j].endDate 	   = offeringStatus.endDate;
								 				offeringData[i].offering[j].statements     = offeringStatus.statements;
								 			}
										}
									}
									if(i >= offeringData.length){
										res.status(200).json(offeringData);	
									}
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
function fetch_user_wmsub(user_ID){
	return new Promise(function (resolve, reject) {
		WMSub.findOne({
						"user_ID" 		: user_ID,
						"wsSubStatus"	: "Active"
				})
			 .sort({createdAt : -1})
			 .exec()
			 .then(wmsub=>{
			 		if(wmsub){
			 			getData();
			 			async function getData(){
			 				var returnData = {
				 					"user_ID" 		: user_ID,
				 					"startDate"		: wmsub.startDate,
				 					"endDate"		: wmsub.endDate,
				 					"offering"		: offering
				 			};
				 			var j = 0;
				 			for(j = 0 ; j < returnData.offering.length; j++){
					 			var offeringStatus = await getOfferingStatus(wmsub._id,returnData.offering[j].offering_ID);
					 			if(offeringStatus && offeringStatus.offeringStatus === 'Active'){
						 			console.log("offeringStatus ",offeringStatus);
					 				returnData.offering[j].offeringStatus = 'Active';
					 				returnData.offering[j].startDate 	  = offeringStatus.startDate;
					 				returnData.offering[j].endDate 	  	  = offeringStatus.endDate;
					 			}
				 			}
				 			if(j >= returnData.offering.length){
				 				resolve(returnData);
				 			}
			 			}
			 		}else{
			 			resolve({
				 						"user_ID" 		: req.params.user_ID,
					 					"startDate"		: "",
					 					"endDate"		: "",
					 					"offering"		: offering
			 						});
			 		}
			 	})
			 .catch(err =>{
		            console.log(err);
		            reject(err);
		        });
	});
}
exports.list_offer_wise_status = (req,res,next)=>{
	var query = "1";
	if(req.params.offeringID === 'all'){
		if(req.params.status === 'all'){
			query = {
					$match :{ 
								"_id" 				: { $exists: true },
							}
				};
		}else{
			query = {
					$match :{ 
								"_id" 				: { $exists: true },
								"offeringStatus"	: req.params.status
							}
				};	
		}
		
	}else{
		if(req.params.status === 'all'){
			query = {
					$match :{
								"offering_ID" : ObjectID(req.params.offeringID),
							}
				};
		}else{
			query = {
					$match :{
								"offering_ID" : ObjectID(req.params.offeringID),
								"offeringStatus"	: req.params.status
							}
				};	
		}
	}
	if(query != "1"){
		OfferSub.aggregate([
								query,
								{
									$lookup :{
											from: "users",
									       	localField: "user_ID",
									       	foreignField: "_id",
									       	as: "user"
									} 
								},
								{
									$unwind : "$user"
								},
								{
									$project : {
												"user_ID"			: "$user._id",
												"name" 				: "$user.profile.fullName",
												"mobileNumber"		: "$user.profile.mobNumber",
												"emailId"			: "$user.profile.emailId",
												"clientId"			: "$user.profile.clientId",
												"startDate" 		: "$startDate",
												"endDate"			: "$endDate",
												"offerSub_ID"		: "$_id"
											}
								}
							])
				.exec()
				.then(data=>{
					res.status(200).json(data);
				})
				.catch(err=>{
					res.status(500).json({
	                    error: err
	                });
				})
	}
};
exports.update_statements = (req,res,next)=>{
	OfferSub.updateOne(
							{
								"_id" : ObjectID(req.params.offeringSubID)
							},
							{
								$set : { 
											statements : req.body.statements
										}
										
							}
				)
				.exec()
				.then(data=>{
					if(data.nModified === 1){
						res.status(200).json("Statement uploaded");
					}else{
						res.status(200).json("Statement not uploaded");
					}
				})
				.catch(err=>{
					res.status(500).json({
	                    error: err
                	});
				});
};
