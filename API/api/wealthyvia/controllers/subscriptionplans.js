const mongoose	        = require("mongoose");
const SubscriptionPlans = require("../models/subscriptionplans.js");

exports.create_subscriptionPlan = (req, res, next) => {
	SubscriptionPlans.findOne({})
					 .exec()
					 .then(data=>{
					 	if(data){
					 		res.status(200).json("Plan already Exists");
					 	}else{
					 		const subscriptionplan = new SubscriptionPlans({
					 			"_id"           : mongoose.Types.ObjectId(),
					 			"planName"  	: String,
								"typeOfPlan" 	: String,
								"description"	: String,
								"price" 		: Number,
								"validity"      : String,
								"discount" 		: Number,
								"createdBy" 	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
								"createAt" 		: new Date(),
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