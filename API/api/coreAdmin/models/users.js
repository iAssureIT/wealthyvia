const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: {type:Date},
	createdBy	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	services	: {
		password:{
					bcrypt:String
				  },
		resume: {
			loginTokens:[
				{
					whenLogin: Date,
					whenLogout: Date,
					ValidateTill: Date,
					hashedToken : String
				}
			]
		}
	},
	username	: {type:String},
	emails		: [
						{
							address:{type:String},
							verified: Boolean
						}
				  ],
	profile 	:
					{
						firstname 				: String,
						lastname  				: String,
						fullName  				: String,
						emailId   				: String,
						mobNumber 				: String,
						status					: String,
						otpMobile	  			: String,
						optEmail	  			: String,
						createdOn 				: String,
						clientId 				: String,
						passwordreset           : Boolean
					},
	roles : [String],
	heartbeat : Date
});

module.exports = mongoose.model('users',userSchema);
