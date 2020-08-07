const mongoose = require('mongoose');
const distributorSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	firstname		: String,
	lastname		: String,
	dob				: String,
	phone			: String,
	ownOffice		: String,
	gst				: String,
	email 			: String,
	address 		: {
		adressLine		: String,
		pincode 		: String,
		city			: String,	
		state			: String,
		stateCode		: String,	
		latitude		: String,
		longitude		: String,
	},
	currentDate		: String, 
	education		: String,
	description		: String,
	// pan 			: [], 
	fileUpload 		: String, 
	status 			: String,
    createdAt   	: Date,
    createdBy   	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    updateLog		:[
						{ 	updatedBy : { type: mongoose.Schema.Types.ObjectId,ref: 'users'}, 
							updatedAt : Date,
							remark	  : String,
						}
	]
});

module.exports = mongoose.model('distributormaster',distributorSchema);
