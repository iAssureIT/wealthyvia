var moment 			= require('moment');
const mongoose	    = require("mongoose");
var ObjectID 		= require('mongodb').ObjectID;
const Invoice 		= require('../models/invoice.js');

exports.create_invoice = (req, res, next) => {
	Invoice.find()
			.count()
			.then(invoiceCount=>{
				// res.status(200).json(invoice);
				const invoice = Invoice({
										"_id"           	: mongoose.Types.ObjectId(), 
										"invoiceNum"		: invoiceCount + 1,
										"user_ID"			: req.body.user_ID,
										"userName"			: req.body.userName,
										"userEmail"			: req.body.userEmail,
										"userMobile" 		: req.body.userMobile,
										"itemName"			: req.body.itemName,
										"qty"				: req.body.qty,
										"price"				: req.body.price,
										"total"				: req.body.total,
										"features" 			: req.body.features,
										"subTotal" 			: req.body.total,
										"tax"				: req.body.tax,
										"grandTotal"		: req.body.grandTotal,
										"createdAt" 		: new Date(),
										"createdBy"			: req.body.createdBy
									});
				invoice.save()
					   .then(data=>{
					   		res.status(200).json({
					   			message : "Invoice Saved",
					   			ID      : data._id
					   		})
					   })
					   .catch(err=>{
					   		res.status(500).json({
					   				message : "Failed to save the invoice",
							   		error   : err
							   })
					   	});
			})
			.catch(err=>{
				res.status(500).json({
					message : "Failed to find Invoice Count",
					error   : err
				});
			});
};
exports.get_invoice = (req,res,next) =>{
	
};

