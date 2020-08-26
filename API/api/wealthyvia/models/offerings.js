const mongoose = require('mongoose');
const offeringsSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
    offeringTitle	: String,
	offeringContent : String, //(CK Editor Rich text)
	bannerImage 	: {
							"path"  	: String,
							"name"		: String,
							"size"		: String,
							"extension" : String,
						},
	images			: [{
						"path"  	: String,
						"name"		: String,
						"size"		: String,
						"extension" : String,
						"sequence"	: Number
					}],
	videos 			: String, //(YouTube Link only)
	typeOfOffering 	: String, //(Regular/Premium)
	price           : Number,
    createdAt   : Date,
    createdBy   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('offerings',offeringsSchema);
