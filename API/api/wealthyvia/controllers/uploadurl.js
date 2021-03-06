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
                        "tag"               : req.body.tag,
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

exports.get_url = (req,res,next) => {
    console.log("get_url");
    Uploadurl.find({})
         .sort({ pinOrder : -1, createdAt : -1})
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




exports.search_tool = (req,res,next) =>{
    console.log("inside search_tool")
    Uploadurl.find(
                    { $text: { $search: String(req.params.searchtext) } }
                  )
            .sort({ pinOrder : -1, createdAt : -1})
            .exec()
            .then(data=>{
                res.status(200).json(data);
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
                                "tag"               : req.body.tag,
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

exports.fetch_tool_list_bydate = (req,res,next) => {
    console.log("grater",new Date(req.body.startDate),"less",new Date(req.body.endDate));
    Uploadurl.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        { "$sort": { pinOrder : -1, "createdAt": -1 } },        
    ])
    .exec()
    .then(data=>{
        console.log("date data",data);
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

exports.patch_pinOrder = (req,res,next) => {
    // console.log("patch pin order inside");
    Uploadurl.find({ pinOrder: { $ne: null }})
            .sort('-pinOrder')  // give me the max
            .exec() 
            .then(data=>{
                // console.log(data);
                Uploadurl.findOne({_id:req.params.ID})
                .exec()
                .then(toolsdata=>{
                    if(toolsdata){
                        // console.log("toolsdata.pinOrder",toolsdata.pinOrder);
                        if(toolsdata.pinOrder){
                            // console.log("pin already present -unpin");
                            var pinOrder = '';
                            getdata();
                            async function getdata(){
                                var pindata = await update_pinOrder(req.params.ID, pinOrder);
                                if(pindata){
                                        res.status(200).json({message : "Unpin_successfully"})                        
                                }else{
                                        res.status(200).json({message : "tools_NOT_UPDATED"})
                                }
                            }    
                        }
                        else{
                                // console.log("length", data.length);
                                // console.log("null or undefined to pin");
                                if(data.length > 0){
                                    var lastpin = data[0].pinOrder;
                                }
                                else{
                                    //console.log("firstpin pin");
                                    var lastpin = 0;
                                }
                                if(data.length === 3){
                                    res.status(200).json({message : "MAX_PIN"}) 
                                }
                                else{
                                    var pinOrder =lastpin + 1;
                                    getdata();
                                    async function getdata(){
                                        var pindata = await update_pinOrder(req.params.ID, pinOrder);
                                        if(pindata){
                                                res.status(200).json({message : "Pin_successfully"})                        
                                        }else{
                                                res.status(200).json({message : "tools_NOT_UPDATED"})
                                        }
                                    }
                                    
                            }
                        }
                    }    
                })
                .catch(err =>{
                    console.log(err);
                    reject(false);
                }); 
                                 
             })
            .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
   
};

function update_pinOrder(user_id, pinorder){
    return new Promise( (resolve, reject)=>{ 
         Uploadurl.updateOne(
                {_id:user_id},
                {
                    $set : {
                        "pinOrder"          : pinorder,
                          
                    }
                }
            )
            .exec()
            .then(pindata=>{
                // console.log("data",pindata);
                resolve(true);
            })
            .catch(err =>{
                console.log(err);
                reject(false);
            });
            
    });
}