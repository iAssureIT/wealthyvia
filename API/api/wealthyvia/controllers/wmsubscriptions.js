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
exports.listwmSub_list_statuswise = (req,res,next) =>{
	WMSub.aggregate([
									{
										$match : {
											wsSubStatus : req.params.status
										}
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
														"name"			: "$user.profile.fullName",
														"emailId"		: "$user.profile.emailId",
														"mobileNumber"	: "$user.profile.mobNumber",
														"clientId"		: "$user.profile.clientId",
														"_id"			: 0,
												}
									},
							])
						 .exec()
						 .then(data=>{
						 	res.status(200).json(data);
						 })
						 .catch(err=>{
								res.status(500).json({
				                    error: err
				            	});
							});
};
exports.detaillistoffersub = (req,res,next) =>{
	WMSub.aggregate([
						{
							$match : {
								_id : ObjectID(req.params.wmsubID)
							}
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
											"performanceDoc": 1,
											"name"			: "$user.profile.fullName",
											"emailId"		: "$user.profile.emailId",
											"mobileNumber"	: "$user.profile.mobNumber",
											"clientId"		: "$user.profile.clientId",
											"_id"			: 0,
									}
						},
						{
							$lookup : {
										   	from: "offeringsubscriptions",
									       	localField: "wmSub_id",
									       	foreignField: "wmSubscription_ID",
									       	as: "offering"
										}
						},
						//Code to be executed if offering data is present
						{
							$unwind : "$offering"
						},
						{
							$match : {
										"offering.offeringStatus" : "Active"
									} 
						},
						{
							$group : {
										"_id" : {
													"wmSub_id"		: "$wmSub_id",
													"performanceDoc": "$performanceDoc",
													"startDate"		: "$startDate",
													"endDate"		: "$endDate",
													"wsSubStatus"	: "$wsSubStatus",
													"user_ID"		: "$user_ID",
													"name"			: "$name",
													"emailId"		: "$emailId",
													"mobileNumber"	: "$mobileNumber",
													"clientId"		: "$clientId",
												},
										"offerings" : { $push : "$offering"}
									}
						},
						{
							$project : {
											"wmSub_id" 		: "$_id.wmSub_id",
											"performanceDoc": "$_id.performanceDoc",
											"startDate"		: "$_id.startDate",
											"endDate"		: "$_id.endDate",
											"wsSubStatus"	: "$_id.wsSubStatus",
											"user_ID"		: "$_id.user_ID",
											"name"			: "$_id.name",
											"emailId"		: "$_id.emailId",
											"mobileNumber"	: "$_id.mobileNumber",
											"clientId"		: "$_id.clientId",
											"offerings"		: "$offerings",
											"_id"			: 0
										}
						}
				])
			 .exec()
			 .then(data=>{
			 	if(data.length > 0){
				 	res.status(200).json(data);
				}else{
						WMSub.aggregate([
										{
											$match : {
												_id : ObjectID(req.params.wmsubID)
											}
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
															"performanceDoc": 1,
															"name"			: "$user.profile.fullName",
															"emailId"		: "$user.profile.emailId",
															"mobileNumber"	: "$user.profile.mobNumber",
															"clientId"		: "$user.profile.clientId",
															"_id"			: 0,
															"offerings"     : []
													}
										},
								])
							 .exec()
							 .then(data=>{
							 	res.status(200).json(data);
							 })
							 .catch(err=>{
									res.status(500).json({
					                    error: err
					            	});
								});
				}
			 })
			 .catch(err=>{
					res.status(500).json({
	                    error: err
	            	});
				});
	
};
exports.upload_performance_doc = (req,res,next) =>{
	console.log(" req.body", req.body);
	console.log(" req.body", req.params.wmsubID);
	WMSub.updateOne(
				{ _id : ObjectID(req.params.wmsubID)},
				{
					$set : {	
						performanceDoc : req.body.performanceDoc
					}
				}
		)
		 .exec()
		 .then(data=>{
			console.log("data",data)
		 	if(data.nModified === 1){
			 	res.status(200).json("Document uploaded");
		 	}else{
			 	res.status(200).json("Document not uploaded");
		 	}
		 })
		 .catch(err=>{
				res.status(500).json({
                    error: err
            	});
			});		
};