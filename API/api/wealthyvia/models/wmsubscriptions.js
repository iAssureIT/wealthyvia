const mongoose = require('mongoose');

const wmsubscriptionsSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	user_ID			: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	startDate 		: String, //"YYYY-MM-DD"
	endDate 		: String, //"YYYY-MM-DD"
	wsSubStatus 	: String, //"Active" or "Inactive"
	performanceDoc 	:  [{
								name	    : String,
								key 		: String,
								createdAt   : Date,

					  }],
	createdAt 		: Date,
	createdBy		: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('wmsubscriptions',wmsubscriptionsSchema);

/*const mongoose = require('mongoose');

const wmsubscriptionsSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	user_ID			: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	startDate 		: String, //"YYYY-MM-DD"
	endDate 		: String, //"YYYY-MM-DD"
	wsSubStatus 	: String, //"Active" or "Inactive"
	performanceDoc 	: [{
								name	: String,
								key 		: String,
								createdAt   : Date,
					  }],
	createdAt 		: Date,
	createdBy		: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('wmsubscriptions',wmsubscriptionsSchema);
*/