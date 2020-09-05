const mongoose = require('mongoose');

const blogsSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
    blogTitle	: String,
	blogContent : String, //(CK Editor Rich text)
	blogURL 	: String,
	bannerImage : {
						"path"  	: String,
						"name"		: String,
						"size"		: String,
						"extension" : String,
					},
	images		: [{
						"path"  	: String,
						"name"		: String,
						"size"		: String,
						"extension" : String,
						"sequence"	: Number
					}],
	videos 		: String, //(YouTube Link only)
	typeOfBlog 	: String, //(Regular/Premium)
	summary 	: String,
	videoURL 	: String,
    createdAt   : Date,
    createdBy   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    comments 	: [
    					{
    						"comment" 	: String,
    						"name"	  	: String,
    						"email"	  	: String,
    						"website" 	: String,
    						"createdAt"	: Date
    					}
    				],
    noofVisited : Number
});

blogsSchema.index({ blogTitle: 'text', blogContent: 'text', summary: 'text' });
module.exports = mongoose.model('blogs',blogsSchema);
