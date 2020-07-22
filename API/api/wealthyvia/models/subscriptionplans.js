const mongoose = require('mongoose');

const subscriptionPlanSchema = mongoose.Schema({
	_id			            : mongoose.Schema.Types.ObjectId,
	planName  	            : String,
	typeOfPlan 				: String,
	description	            : String,
	price 			        : Number,
	validity            	: String,
	discount 				: Number,
	createdBy 	            : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	createAt 		        : Date,
});

module.exports = mongoose.model('subscriptionplan',subscriptionPlanSchema);