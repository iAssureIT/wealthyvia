const mongoose = require('mongoose'); 

const projectSettingsSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
    type        : String,
    key         : String,
    secret      : String,
    bucket      : String,
    region      : String,
    
    SENDER_ID 	: String,
    authToken 	: String,
    sourceMobile: String,

    googleapikey: String,

    user            : String,
    password        : String,
    port            : Number,
    emailHost       : String,
    projectName     : String,
    
    environment   : String,
    sandboxAPI    : String,
    sandboxKey    : String,
    sandboxSecret : String,
    prodAPI       : String,
    prodKey       : String,
    prodSecret    : String,

    createdBy   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt   : { type: Date, default: Date.now() },
    updateLog           : [
                            {
                                updatedAt           : Date,
                                updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                            }
                        ],
});

module.exports = mongoose.model('projectsettings',projectSettingsSchema);
