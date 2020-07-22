const mongoose = require('mongoose');

const FailedRecordSchema = mongoose.Schema({
	_id			        : mongoose.Schema.Types.ObjectId, 
	productName			: String,
	indexName   		: String, 
	productID   		: {type: mongoose.Schema.Types.ObjectId, ref: 'offerings'},
	totalRecords 		: Number,
    failedRecords       : Array,
    fileName       		: String,
   	createdAt 			: Date
});

module.exports = mongoose.model('failedrecords',FailedRecordSchema);

