const mongoose = require('mongoose');
const distributorSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	firstname		: String,
	lastname		: String,
	dob				: String,
	phone			: String,
	ownOffice		: String,
	gst				: String,
	email 			: {
							address: String,
							verified: Boolean,
							optEmail: String,
					},
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
	website			: String,
	// pan 			: [], 
	fileUpload 		: String, 
	fileUpload1 	: String, 
	status 			: String,
	userId          : { type: mongoose.Schema.Types.ObjectId,ref: 'users'},
	aadharnumber	: String,
	pannumber    	: String,
	accountnumber	: String,
	bankname     	: String,
	branchname   	: String,
	IFSCcode     	: String,
	MICRcode     	: String,
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
