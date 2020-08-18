const mongoose	        = require("mongoose");
const Uploadurl = require('../models/uploadurl.js');

exports.insert_url = (req, res, next) => {
	Uploadurl.findOne({url:req.body.url})
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message : 'upload url Allready exits.',
                    details : data
				});
			}else{
                const uploadurl = new Uploadurl({
                    "_id"                   : mongoose.Types.ObjectId(),
                        "url"               :req.body.url,
                        "title"             : req.body.title,
                        "fileUpload"        : req.body.fileUpload,
                        "createdBy"         : req.body.createdBy, //_id of User or null
                        "createdAt"         : new Date(),    
                });
                console.log("uploadurl",uploadurl);
                uploadurl.save()
                    .then(data=>{
                        res.status(200).json({
                            message : "Upload_Video_url_INSERTED",
                            ID      : data._id
                        });
                    console.log("Upload url",data);

                        })

                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



exports.get_url = (req,res,next) => {
    Uploadurl.find({})
         .exec()
         .then(data=>{
            if(data.length > 0 ){
                res.status(200).json(data);
            }else{
                res.status(200).json({message : "DATA_NOT_FOUND"})
            }
         })
         .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
};
exports.fetch_url = (req,res,next) => {
    console.log("inside")
    Uploadurl.findOne({_id : req.params.ID})
         .exec()
         .then(data=>{
            console.log("data",data);
            if(data){
                res.status(200).json(data);
            }else{
                res.status(200).json({message : "DATA_NOT_FOUND"})
            }
         })
         .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
};

exports.patch_url = (req,res,next) => {
    console.log("patch inside");
    Uploadurl.updateOne(
                        {_id:req.params.ID},
                        {
                            $set : {
                                "url"               : req.body.url,
                                "title"             : req.body.title,
                                "fileUpload"        : req.body.fileUpload,
                                "createdAt"         : new Date(),    
                            }
                        }
                    )
         .exec()
         .then(data=>{
            console.log("data",data);
            if(data.nModified === 1){

                res.status(200).json({message : "tools_UPDATED"})
                console.log("res.data",res.data);
            }else{
                res.status(200).json({message : "tools_NOT_UPDATED"})
            }
         })
};


exports.delete_url = (req,res,next) =>{
    console.log("inside url", req.params.ID);
    Uploadurl.deleteOne({_id:req.params.ID})
         .exec()
         .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({message : "Tools_DELETED"})
            }else{
                res.status(200).json({message : "Tools_NOT_DELETED"})
            }
         })
};
