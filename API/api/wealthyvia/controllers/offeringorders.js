// import moment from 'moment';
var moment 			= require('moment');
const mongoose	    = require("mongoose");
var ObjectID 		= require('mongodb').ObjectID;
const https         = require('https')
const Razorpay      = require("razorpay");
var request         = require('request-promise')
var sha256          = require('js-sha256');
var CryptoJS        = require("crypto-js");
var globalVariable  = require("../../../nodemon.js");

const Orders        = require('../models/offeringorders.js');
const Invoice 		= require('../models/invoice.js');

const OfferSub      = require('../models/offeringsubscriptions.js');
const WMSub 		= require('../models/wmsubscriptions.js');

var instance 		= new Razorpay({
  key_id     : 'rzp_test_lQNmCUfCX3Wkh4',
  key_secret : 'VgF165CC3e5vKlfqwPnbeckJ'
});

exports.payment_response = (req,res,next) =>{
	var _id = req.params.order_id;
	
	var generated_signature = sha256.hmac('VgF165CC3e5vKlfqwPnbeckJ', req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id);
	console.log("generated_signature",generated_signature);
	if (generated_signature == req.body.razorpay_signature) { 
	  Orders.updateOne(
                    { "_id": _id},

                    {
                        $set : {
								"transactionId" 	: req.body.razorpay_payment_id,
								"paymentStatus"		: "Paid",
                        }
                    }
                    )
 		
         .exec()
         .then(data=>{
         	// res.redirect("http://localhost:3000/paymentResponse");
            if(data.nModified === 1){
         	console.log("req.body.razorpay_order_id",req.body.razorpay_order_id);

         		Orders.findOne({ "paymentOrderId":req.body.razorpay_order_id})
         		.then((orderDetails)=>{
         			console.log("orderDetails--",orderDetails);
         			console.log("globalVariable.url ",globalVariable.url);
         			
         			setofferingsubscription();
         			async function setofferingsubscription(){
         				var paymentinfo = await paymentOrderDetailsforemail(orderDetails.paymentOrderId);
         				if(paymentinfo.states === 'Maharashtra'){
         					var taxinfo = 	"Subtotal: </b>₹ "+parseInt(((paymentinfo.amountPaid)/100)/1.18).toLocaleString("en-IN")+"</b><br/>"+
         									"CGST @ 9% : </b>₹ "+(parseInt(((paymentinfo.amountPaid)/100)/1.18)*0.09).toLocaleString("en-IN")+"</b><br/>"+
         									"SGST @ 9% : </b>₹ "+(parseInt(((paymentinfo.amountPaid)/100)/1.18)*0.09).toLocaleString("en-IN")+"</b><br/>";
         				}
         				else{
         					var taxinfo = "Subtotal: </b>₹ "+parseInt(((paymentinfo.amountPaid)/100)/1.18).toLocaleString("en-IN")+"</b><br/>"+
         									"IGST @18%: </b>₹ "+parseInt(parseInt((paymentinfo.amountPaid/100)) - parseInt(((paymentinfo.amountPaid)/100)/1.18)).toLocaleString("en-IN")+"</b><br/>";
         				}
         				 
         				request({
                                        "method"    : "POST", 
                                        "url"       : "http://localhost:"+globalVariable.port+"/send-email",
                                        "body"      : {
                                                            email   : "monikapawashe25@gmail.com", 
                                                            subject : "A Client has invested in a Product",
                                                            mail    : "Dear admin, <br/>"+
                                                            			"Following are the details of the Client & his investment:<br/>"+
                                                            			"<b>Transaction Status: </b>"+paymentinfo.paymentStatus+"<br/>"+
											                          	"<b>Client Name: </b>"+paymentinfo.userName+"<br/>"+
											                          	"<b>Phone Number: </b>"+paymentinfo.mobileNumber+"<br/>"+
											                          	"<b>Email: </b>"+paymentinfo.email+"<br/>"+
											                          	"<b>Pan Number: </b>"+paymentinfo.panNumber+"<br/>"+
											                          	"<b>GST Number: </b>"+paymentinfo.gstNumber+"<br/>"+
											                          	"<b>State: </b>"+paymentinfo.states+"<br/>"+											                          	
											                          	"<b>Product opted for : </b>"+paymentinfo.offeringTitle+"<br/>"+
											                          	""+taxinfo+"<br/>"+
											                          	"<b>Amount Paid: </b>₹ "+((paymentinfo.amountPaid)/100).toLocaleString('en-IN')+"<br/>"+
											                          	"<b>Start Date: </b>"+moment(paymentinfo.createdAt).format('DD-MM-YYYY')+"<br/>"+
											                          	"<b>End Date: </b>"+moment(paymentinfo.createdAt).add(paymentinfo.validityPeriod, 'months').format("DD-MM-YYYY")+"<br/>",
											                          
                                                       },
                                        "json"      : true,
                                        "headers"   : {
                                                        "User-Agent": "Test Agent"
                                                    }
                                    })
                                    .then(source=>{
                                    	console.log("mail sent")
                                        //res.status(201).json({message:"OTP_UPDATED"})
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                        
                                    });
                        request({
                                        "method"    : "POST", 
                                        "url"       : "http://localhost:"+globalVariable.port+"/send-email",
                                        "body"      : {
                                                            email   : paymentinfo.email, 
                                                            subject : "Thank you for investing in Wealthyvia. Your payment has been successful",
                                                            mail    : "Dear "+paymentinfo.userName+", <br/>"+
                                                            			"Following are the details of your latest investment in our product:<br/>"+
                                                            			"<b>Transaction Status: </b>"+paymentinfo.paymentStatus+"<br/>"+
											                          	"<b>Product opted for : </b>"+paymentinfo.offeringTitle+"<br/>"+
											                          	"<b>Amount Paid: </b>₹ "+((paymentinfo.amountPaid)/100).toLocaleString('en-IN')+"<br/>"+
											                          	"<b>Start Date: </b>"+moment(paymentinfo.createdAt).format('DD-MM-YYYY')+"<br/>"+
											                          	"<b>End Date: </b>"+moment(paymentinfo.createdAt).add(paymentinfo.validityPeriod, 'months').format("DD-MM-YYYY")+"<br/>"+
											                			"<br/><br/> Thank You, <br/> Team, <br/> www.wealthyvia.com " ,         
                                                       },
                                        "json"      : true,
                                        "headers"   : {
                                                        "User-Agent": "Test Agent"
                                                    }
                                    })
                                    .then(source=>{
                                    	console.log("mail sent")
                                        //res.status(201).json({message:"OTP_UPDATED"})
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                        
                                    });            
         				var result = await create_offerSub_wsSub(orderDetails);
         				var url = globalVariable.url+"product-payment-response/"+orderDetails.paymentOrderId;
	         			if(url){
							res.redirect(url);
	         			}
         			}
         			
         		})
	            .catch(err =>{
	                console.log(err);
	                res.status(500).json({
	                    error: err
	                });
	            });	
            }else{
                res.status(200).json({message : "SIGNATURE_MATCHED_BUT_ORDER_NOT_UPDATED"})
            }
         })
	} else {
		console.log("payment Failed",JSON.stringify(req.body));
		console.log("req.body.razorpay_order_id",req.body.razorpay_order_id);
		Orders.updateOne(
                        { "_id" : _id},
                        {
                            $set : {
								"transactionId" 	: req.body.razorpay_payment_id,
								"paymentStatus"		: "Failed",
                            }
                        }
                    )
         .exec()
         .then(data=>{
         	if(data.nModified === 1){
         	console.log("req.body.razorpay_order_id",req.body.razorpay_order_id);

         		Orders.findOne({ "_id":_id})
         		.then((orderDetails)=>{
         			console.log("orderDetails--",orderDetails);
         			console.log("globalVariable.url ",globalVariable.url);
         			var url = globalVariable.url+"product-payment-response/"+orderDetails.paymentOrderId;
         			if(url){
						res.redirect(url);
         			}
         		})
	            .catch(err =>{
	                console.log(err);
	                res.status(500).json({
	                    error: err
	                });
	            });	
            }else{
                res.status(200).json({message : "SIGNATURE_MATCHED_BUT_ORDER_NOT_UPDATED"})
            }
         	
         })
	}
}
//End of payment gateway integration
exports.create_order = (req, res, next) => {
	var paymentData = {
		"amount" 			: req.body.amount,
		"currency"			: req.body.currency,
		"receipt"			: req.body.receipt,
		"payment_capture"	: req.body.payment_capture,
	};
	instance.orders.create(paymentData, function(err, payment_order) {
      	if(err){
	        res.status(500).json({
	            error: err
	        }); 
	    }else if(payment_order){
	        // res.status(200).json(order);
	        // console.log("payment_order ",payment_order);

			Orders  .find()
					.count()
				    .then((maxInvoiceNum)=>{
				    	var invoicenumber = maxInvoiceNum + 1,
				    	invoicenumber = invoicenumber.toString().padStart(5, "0");
				    	invoicenumber = "Aa"+invoicenumber;
						var order = new Orders({
												"_id"           	: mongoose.Types.ObjectId(), 
												"invoiceNum" 		: invoicenumber,
												"offering_ID"		: req.body.productID,
											    "userID"			: req.body.userID,
											    "offeringTitle"		: req.body.offeringTitle,
											    "offering_ID"		: req.body.offering_ID,
												"offeringAmount"  	: req.body.offeringAmount, 
												"validityPeriod" 	: req.body.validityPeriod, //1 month or 1 year
												"purchaseDate"		: req.body.purchaseDate, //"YYYY-MM-DD"
												"startDate" 		: req.body.startDate, //"YYYY-MM-DD"
												"endDate" 			: moment(req.body.startDate).add(req.body.validityPeriod, 'M').format("YYYY-MM-DD"), //"YYYY-MM-DD"
												"paymentOrderId" 	: payment_order.id,
												"amountPaid"		: payment_order.amount,
												"paymentStatus"		: "unPaid",
												"createdBy"			: req.body.createdBy,
												"createdAt"			: new Date(),
											});
						console.log("order ",order);


						order.save()
					        .then(data=>{
					                res.status(200).json(payment_order);
					            })
					            .catch(err =>{
					                console.log(err);
					                res.status(500).json({
					                	message: "Some issue occured in Order Insert",
					                    error: err
					                });
					            });	

				    })
		            .catch(err =>{
		                console.log(err);
		                res.status(500).json({
		                	message: "Some issue occured while finding Max Invoice Number",
		                    error: err
		                });
		            });	
	    }
    });
};
exports.paymentOrderDetails = (req,res,next) =>{
	Invoice.find()
	Orders.aggregate([
						{
							$match : {  
								"paymentOrderId" : req.params.paymentOrderId
							}
						},
						{
							$lookup : {
										   	from 			: "users",
									       	localField		: "userID",
									       	foreignField	: "_id",
									       	as 				: "user"
										}
						},
						{
							$unwind : "$user"
						},
						{
							$project : {
											"transactionId"	: 1,
											"paymentStatus"	: 1,
											"invoiceNum"	: 1,
											"createdAt"		: 1,
											"user_ID"		: 1,
											"amountPaid"	: 1,
											"paymentOrderId": 1,
											"offeringTitle"	: 1,
											"user_ID"		: "$user._id",
											"userName"		: "$user.profile.fullName",
											"email"			: "$user.profile.emailId",
											"mobileNumber"	: "$user.profile.mobNumber",
											"panNumber"		: "$user.profile.panNumber",
											"gstNumber"		: "$user.profile.gstNumber",
											"city"			: "$user.profile.city",
											"states"		: "$user.profile.states",
											"_id"			: 1,
											"validityPeriod": 1,
									}
						}
					])
		  .then(orders=>{
		  	res.status(200).json(orders[0]);
		  })
		  .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
};
exports.paymentOrderDetails_user = (req,res,next) =>{

	Orders.aggregate([
						{
							$match : {  
								"userID" 		: ObjectID(req.params.userId),
							}
						},
						{
							$lookup : {
										   	from 			: "users",
									       	localField		: "userID",
									       	foreignField	: "_id",
									       	as 				: "user"
										}
						},
						{
							$unwind : "$user"
						},
						{
							$project : {
											"transactionId"	: 1,
											"paymentStatus"	: 1,
											"invoiceNum"	: 1,
											"createdAt"		: 1,
											"user_ID"		: 1,
											"amountPaid"	: 1,
											"paymentOrderId": 1,
											"offeringTitle"	: 1,
											"user_ID"		: "$user._id",
											"userName"		: "$user.profile.fullName",
											"email"			: "$user.profile.emailId",
											"mobileNumber"	: "$user.profile.mobNumber",
											"_id"			: 1,
											"validityPeriod": 1,
									}
						}
					])
		  .then(orders=>{
		  	res.status(200).json(orders);
		  })
		  .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
};


exports.paymentOrderDetails_all = (req,res,next) =>{
	Orders.aggregate([
						{
							$lookup : {
										   	from 			: "users",
									       	localField		: "userID",
									       	foreignField	: "_id",
									       	as 				: "user"
										}
						},
						{
							$unwind : "$user"
						},
						{
							$project : {
											"transactionId"	: 1,
											"paymentStatus"	: 1,
											"invoiceNum"	: 1,
											"createdAt"		: 1,
											"user_ID"		: 1,
											"amountPaid"	: 1,
											"paymentOrderId": 1,
											"offeringTitle"	: 1,
											"user_ID"		: "$user._id",
											"userName"		: "$user.profile.fullName",
											"email"			: "$user.profile.emailId",
											"mobileNumber"	: "$user.profile.mobNumber",
											"_id"			: 0,
											"validityPeriod": 1,
									}
						}
					])
		  .then(orders=>{
		  	res.status(200).json(orders);
		  })
		  .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
};


exports.get_clientRevenue = (req,res,next)=>{

			var clientList = JSON.parse(req.query.clientList);
			// console.log("clientList => ", clientList);
			getData();
			var newTransArr = [];

			async function getData(){
				var totalAmount = 0;
				for(var i=0; i<clientList.length; i++){
					// Get User Name 
					var user_id = clientList[i]._id;
					// console.log("userid", user_id);
					orderData = await getUserOrderdetails(user_id); 
					// console.log("order", orderData);
					if(orderData && orderData.length > 0){
						for(let k=0; k<orderData.length; k++){
							newTransArr.push({
								clientCode : clientList[i].clientId,
								clientName : clientList[i].fullName,
								mobNumber : clientList[i].mobNumber,
								invoiceNum : orderData[k].invoiceNum,
								offeringTitle : orderData[k].offeringTitle,
								offeringAmount : orderData[k].amountPaid / 100,
								purchaseDate : orderData[k].purchaseDate,
								startDate : orderData[k].startDate,
								endDate : orderData[k].endDate,
								paymentStatus : orderData[k].paymentStatus,
								createdAt : orderData[k].createdAt,
								
							});
						}
						
					}
					

				}

				if(i === clientList.length){
					res.status(200).json({clientRevenue : newTransArr});
				}

			}//async function ends

		
}



function getUserOrderdetails(user_id){
	return new Promise( (resolve, reject)=>{ 

			Orders.find({userID : user_id})
				.then(userData => {
					resolve( userData ) ;
				})
				.catch(error=>{
					reject(error);
				});

	});
}

function update_offering(offering){
	return new Promise(function (resolve, reject) {
		console.log("offering", offering.wmSub_ID, offering.user_ID,offering.offering_ID );
		OfferSub.findOne({
						"wmSubscription_ID" : offering.wmSub_ID,
						"user_ID"			: offering.user_ID,
						"offering_ID"		: offering.offering_ID,
						
				})
				.sort({createdAt:1})
				.exec()
				.then(offersub=>{
					console.log("off", offersub);
					if(!offersub ){
						console.log("active", offering.offeringStatus);
						const offersub = new OfferSub({
												"_id"           	: mongoose.Types.ObjectId(), 
												"user_ID" 			: offering.user_ID,
												"offering_ID"		: offering.offering_ID,
												"offeringTitle"		: offering.offeringTitle,
												"amountPaid"		: offering.offeringAmount,
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
					}else if(offersub && offersub.offeringStatus != "Active"){
						console.log("not", offering.offeringStatus);
						OfferSub.updateOne(
										{ "_id" : offersub._id},
										{
											$set : {
												"endDate" 			: offering.endDate,
												"offeringStatus"	: "Active",
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

function create_offerSub_wsSub (offeringorder) {
	return new Promise(function (resolve, reject) {
		console.log("offeringorder", offeringorder);
	WMSub.findOne({
						"user_ID" 		: offeringorder.userID,
						"wsSubStatus"	: "Active"
			})
		 .sort({createdAt:-1})
		 .exec()
		 .then(wssub=>{
			 	if(wssub){
			 		
			 		    getdata();
			 		    async function getdata(){
			 		    	var date = new Date();
					 		date.setDate(date.getDate()+365);
					 		//need to check for leap year
							var FullDate =  date; 
	            			
	                        var j = 0;
	                        
	                        	var status = await update_offering({
	                        								"wmSub_ID" 		: wssub._id,
	                        								"user_ID"  		: offeringorder.userID,
	                        								"offering_ID"	: offeringorder.offering_ID,
	                        								"offeringAmount": (offeringorder.amountPaid) / 100,
	                        								"offeringStatus": 'Active',
	                        								"offeringTitle"	: offeringorder.offeringTitle,
	                        								"startDate"		: moment(new Date()).format("YYYY-MM-DD"),
	                        								"endDate"		: moment(FullDate).format("YYYY-MM-DD"),
	                        							});
	                        
	                        resolve(true);
			 		    }
            			            		
			 	}else{
			 		
			 			var date = new Date();
			 		date.setDate(date.getDate()+365);
			 		//need to check for leap year
					var FullDate =  date; 
			 		const wmsub_var = new WMSub({
			                    "_id"           	: mongoose.Types.ObjectId(), 
			                    // "wmSubscription_ID"	: wssub._id,
			                    "user_ID"			: offeringorder.userID,
								"startDate" 		: moment(new Date()).format("YYYY-MM-DD"),
								"endDate" 			: moment(FullDate).format("YYYY-MM-DD"),
								"wsSubStatus" 		: "Active",
			                    "createdBy"     	: null, //_id of User or null
			                    "createdAt"     	: new Date(),     
			                });		 		
	                wmsub_var.save()
	                    .then(data=>{
	                    		console.log("data ",data);
	                    		getdata();
			 					async function getdata(){
			                            	var status = await update_offering({
			                            								"wmSub_ID" 		: data._id,
			                            								"user_ID"  		: offeringorder.userID,
			                            								"offering_ID"	: offeringorder.offering_ID,
			                            								"offeringAmount": (offeringorder.amountPaid) / 100,
			                            								"offeringStatus": 'Active',
			                            								"offeringTitle"	: offeringorder.offeringTitle,
			                            								"startDate"		: moment(new Date()).format("YYYY-MM-DD"),
			                            								"endDate"		: moment(FullDate).format("YYYY-MM-DD")
			                            							});
			                            resolve(true)
			                    }     
	                    		
	                        })
	                        .catch(err =>{
	                            reject(err);
	                        });
			 					 		
			 	}
		 	})
		 .catch(err =>{
                reject(err);
            });	
		});
};


function paymentOrderDetailsforemail(paymentOrderId){ 
	return new Promise(function (resolve, reject) {
	Invoice.find()
	Orders.aggregate([
						{
							$match : {  
								"paymentOrderId" : paymentOrderId
							}
						},
						{
							$lookup : {
										   	from 			: "users",
									       	localField		: "userID",
									       	foreignField	: "_id",
									       	as 				: "user"
										}
						},
						{
							$unwind : "$user"
						},
						{
							$project : {
											"transactionId"	: 1,
											"paymentStatus"	: 1,
											"invoiceNum"	: 1,
											"createdAt"		: 1,
											"user_ID"		: 1,
											"amountPaid"	: 1,
											"paymentOrderId": 1,
											"offeringTitle"	: 1,
											"user_ID"		: "$user._id",
											"userName"		: "$user.profile.fullName",
											"email"			: "$user.profile.emailId",
											"mobileNumber"	: "$user.profile.mobNumber",
											"panNumber"		: "$user.profile.panNumber",
											"gstNumber"		: "$user.profile.gstNumber",
											"city"			: "$user.profile.city",
											"states"		: "$user.profile.states",
											"_id"			: 1,
											"validityPeriod": 1,
									}
						}
					])
		  .then(orders=>{
		  	resolve(orders[0]);
		  })
		  .catch(err =>{
                console.log(err);
               reject(err)
            })
	})	  
};