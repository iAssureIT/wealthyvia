const mongoose = require('mongoose');
const uploadUrlSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	url 			: String, 
	title 			: String,
	fileUpload 		: String,
	tag 			: String,
	pinOrder		: Number,
    createdAt   	: Date,
    createdBy   	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	

});
uploadUrlSchema.index({ title: 'text', tag: 'text' });

module.exports = mongoose.model('tools',uploadUrlSchema);
