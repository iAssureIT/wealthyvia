const mongoose = require('mongoose');

const productratesSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
    productName	: String,
	indexName   : String, 
	productID   : {type: mongoose.Schema.Types.ObjectId, ref: 'offerings'},
	rates : [{
                    "date"  	    : String,
                    "productRate"	: Number,
                    "indexRate"		: Number,
                    "fileName"      : String
			}],
	createdAt   : Date,
    createdBy   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    updateLog 	: [
    					{
    						"updatedBy" 	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    						"updatedAt"	  	: Date
    					}
    			]
});


module.exports = mongoose.model('productrates',productratesSchema);
