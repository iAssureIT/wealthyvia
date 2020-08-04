const mongoose = require('mongoose');

const researchReportSchema = mongoose.Schema({
	_id					: mongoose.Schema.Types.ObjectId,
	title				: String,
	description			: String,
	reportImage 		: String,
	researchreport 		: [{
								name	: String,
								key 		: String,
								createdAt   : Date,
					  		}],
	createdAt 			: Date,
	createdBy			: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	updateLog 	: [
    					{
    						"updatedBy" 	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    						"updatedAt"	  	: Date
    					}
    			]
});

researchReportSchema.index({ title: 'text', description: 'text', "researchreport.name": 'text' });
module.exports = mongoose.model('researchreports',researchReportSchema);
