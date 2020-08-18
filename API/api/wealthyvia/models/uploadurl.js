const mongoose = require('mongoose');
const uploadUrlSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	url 			: String, 
	title 			: String,
	fileUpload 		: String,

    createdAt   	: Date,
    createdBy   	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	

});

module.exports = mongoose.model('tools',uploadUrlSchema);
