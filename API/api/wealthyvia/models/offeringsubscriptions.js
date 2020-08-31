const mongoose = require('mongoose');

const offeringsubscriptionsSchema = mongoose.Schema({
	_id					: mongoose.Schema.Types.ObjectId,
	user_ID 			: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	offering_ID			: {type: mongoose.Schema.Types.ObjectId, ref: 'offerings'},
	offeringTitle		: String,
	wmSubscription_ID	: {type: mongoose.Schema.Types.ObjectId, ref: 'wssubscriptions'},
	startDate 			: String, //"YYYY-MM-DD"
	endDate 			: String, //"YYYY-MM-DD"
	offeringStatus 		: String, //"Active or Inactive"
	amountPaid          : Number,
	statements 			: [{
								name	: String,
								key 		: String,
								createdAt   : Date,
					  		}],
	createdAt 			: Date,
	createdBy			: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('offeringsubscriptions',offeringsubscriptionsSchema);
