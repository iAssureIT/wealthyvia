const mongoose	        = require("mongoose");
const Distributormaster = require('../models/distributormaster.js');
var request             = require('request-promise');
const globalVariable    = require("../../../nodemon.js");
const User              = require('../../coreAdmin/models/users.js');
const Counter = require('../models/counter.js');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getNextSequence(code) {
    return new Promise( (resolve, reject)=>{ 
        Counter.findByIdAndUpdate(
            { "_id": code },
            { "$inc": { "seq": 1 } }
            )
            .then(counter => {
                if(counter){
                    console.log("counter", counter);
                    let num = counter.seq;
                    let str = num.toString().padStart(4, "0")
                    console.log(str) 
                    resolve( str ) ;
                }
                else{
                    const distributorCounter = new Counter({
                        "_id"   : code, 
                        "seq"   : 101,
                     });
                
                    distributorCounter.save()
                        .then(data=>{
                            let num = 100;
                            let str = num.toString().padStart(4, "0")
                            console.log(str) 
                            resolve( str ) ;

                            })
                            .catch(err =>{
                                reject(error);
                            });
                }
                
            })
            .catch(error=>{
                reject(error);
            });

    });  
      
}

exports.create_distributor = (req, res, next) => {
	Distributormaster.findOne({"email.address":req.body.email })
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message : 'DISTRIBUTOR_EmailID Allready exits.',
                    details : data
				});
			}else{
                const distributermaster = new Distributormaster({
                    "_id"               : mongoose.Types.ObjectId(), 
                        "firstname"         : req.body.firstname,
                        "lastname"          : req.body.lastname, 
                        "dob"               : req.body.dob,
                        "phone"             : req.body.phone,
                        "email"             : {
                            "address" : req.body.email,
                            "verified": true
                        },
                        "ownOffice"         : req.body.ownOffice,   
                        "address"         : {
                            "adressLine"        : req.body.adressLine,
                            "pincode"           : req.body.pincode,
                            "city"              : req.body.city,
                            "state"             : req.body.state,
                            "stateCode"         : req.body.stateCode,         
                            "latitude"          : req.body.latitude,
                            "longitude"         : req.body.longitude
                        },
                        "currentDate"          : req.body.currentDate, 
                        "fileUpload"           : req.body.fileUpload, 
                        "fileUpload1"           : req.body.fileUpload1, 
                        "education"            : req.body.education, 
                        "description"          : req.body.description, 
                        "website"            : req.body.website, 
                        "gst"               : req.body.gst, 
                        "status"            : "New", 
                        "userId"            : null,
                        "createdBy"         : req.body.createdBy, //_id of User or null
                        "createdAt"         : new Date(),    
                        "updateLog"         :[{
                                            updatedBy : req.body.updatedBy, 
                                            updatedAt :new Date,
                                        }] 
                });
                console.log("distributermaster",distributermaster);
                distributermaster.save()
                    .then(data=>{
                        res.status(200).json({
                            message : "DISTRIBUTOR_MASTER_DETAILS_INSERTED",
                            ID      : data._id
                        });
                    console.log("distributermaster",data);

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

exports.fetch_distributor_list = (req,res,next) => {
    Distributormaster.find({"status":req.params.status})
         .exec()
         .then(data=>{
            if(data.length > 0){
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

function getusercountsbycode(distributorCode) {
  return new Promise((resolve, reject) => {
    User.find({distributorCode:distributorCode, roles:'user'})
        .count()
        .exec()
        .then(countuser=>{          
                    resolve(countuser);            
        })
        .catch(err =>{
            reject(err);
        });   
  })
}

exports.fetch_All_distributor_list = (req,res,next) => {
    Distributormaster.find({})
        .sort({createdAt : -1})
         .exec()
         .then(data=>{
            if(data.length > 0){
                let promises = data.map(element => {
                if(element.distributorCode){
                    return getusercountsbycode(element.distributorCode)
                    .then(usercount => {
                        var obj = element.toObject();
                        obj.usercount = usercount;
                        //console.log("Record ",obj);
                        
                      return obj;
                    })
                }
                else{
                    var obj = element.toObject();
                    obj.usercount = 0;                        
                    return obj;                    
                }
                
                });

                // Wait for all Promises to complete
                Promise.all(promises)
                  .then(results => {
                    //console.log("result", results);
                    res.status(200).json(results);
                  })
                  .catch(e => {
                    console.error(e);
                  })
                
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


exports.fetch_my_subfranchise_list = (req,res,next) => {
    Distributormaster.find({franchiseCode: req.params.distributorCode})
        .sort({createdAt : -1})
         .exec()
         .then(data=>{
            if(data.length > 0){
                let promises = data.map(element => {
                if(element.distributorCode){
                    return getusercountsbycode(element.distributorCode)
                    .then(usercount => {
                        var obj = element.toObject();
                        obj.usercount = usercount;
                        //console.log("Record ",obj);
                        
                      return obj;
                    })
                }
                else{
                    var obj = element.toObject();
                    obj.usercount = 0;                        
                    return obj;                    
                }
                
                });

                // Wait for all Promises to complete
                Promise.all(promises)
                  .then(results => {
                    //console.log("result", results);
                    res.status(200).json(results);
                  })
                  .catch(e => {
                    console.error(e);
                  })
                
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

exports.patch_distributor = (req,res,next) => {
    console.log("inside a update function");
    Distributormaster.updateOne(
                        {_id:req.params.ID},
                        {
                            $set : {
                                "firstname"         : req.body.firstname,
                                "lastname"          : req.body.lastname, 
                                "dob"               : req.body.dob,
                                "phone"             : req.body.phone,
                                "email"             : {
                                    "address" : req.body.email,
                                    "verified": true
                                },
                                "ownOffice"         : req.body.ownOffice,
                                "address"           : {
                                    "adressLine"        : req.body.adressLine,
                                    "pincode"           : req.body.pincode,
                                    "city"              : req.body.city,
                                    "state"             : req.body.state,
                                    "stateCode"         : req.body.stateCode,         
                                }, 
                                "gst"               : req.body.gst, 
                                "education"         : req.body.education, 
                                "description"          : req.body.description, 
                                "fileUpload"        : req.body.fileUpload, 
                                "fileUpload1"        : req.body.fileUpload1, 
                                "website"        : req.body.website, 
                                // "status"            : req.body.status, 
                                "updateLog"         :[{
                                            updatedBy : req.body.updatedBy, 
                                            updatedAt :new Date,
                                        }] 
                            }
                        }
                    )
        .exec()
        .then(data=>{
            console.log("data",data);
            res.status(200).json({
                data : data,
                message :"DISTRIBUTOR_UPDATED"
            })
        })
        .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while updating Distributer Data!"
                })
        });
            // console.log("if data",data);
            /*if(data.nModified === 1){
               return  res.status(200).json({message : "DISTRIBUTOR_UPDATED"})

            }else{
               return  res.status(200).json({message : "DISTRIBUTOR_NOT_UPDATED"})
            console.log("else data",data);*/         
}

exports.add_additional_info_distributor = (req,res,next) => {
    console.log("inside a additional info update function");
    Distributormaster.updateOne(
                        {userId:req.params.ID},
                        {
                            $set : {
                                "firstname"         : req.body.firstname,
                                "lastname"          : req.body.lastname, 
                                "dob"               : req.body.dob,
                                "phone"             : req.body.phone,
                                "ownOffice"         : req.body.ownOffice,
                                "address"           : {
                                    "adressLine"        : req.body.adressLine,
                                    "pincode"           : req.body.pincode,
                                    "city"              : req.body.city,
                                    "state"             : req.body.state,
                                    "stateCode"         : req.body.stateCode,         
                                }, 
                                "gst"               : req.body.gst, 
                                "education"         : req.body.education, 
                                "description"          : req.body.description, 
                                "fileUpload"        : req.body.fileUpload, 
                                "fileUpload1"        : req.body.fileUpload1, 
                                "website"        : req.body.website, 
                                "aadharnumber"   : req.body.aadharnumber,
                                "pannumber"    : req.body.pannumber,
                                "accountnumber": req.body.accountnumber,
                                "bankname"     : req.body.bankname,
                                "branchname"   : req.body.branchname,
                                "IFSCcode"     : req.body.IFSCcode,
                                "MICRcode"     : req.body.MICRcode,
                                // "status"            : req.body.status, 
                                "updateLog"         :[{
                                            updatedBy : req.body.updatedBy, 
                                            updatedAt :new Date,
                                        }] 
                            }
                        }
                    )
        .exec()
        .then(data=>{
            console.log("data",data);
            res.status(200).json({
                data : data,
                message :"DISTRIBUTOR_UPDATED"
            })
        })
        .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while updating Distributer Data!"
                })
        });
            // console.log("if data",data);
            /*if(data.nModified === 1){
               return  res.status(200).json({message : "DISTRIBUTOR_UPDATED"})

            }else{
               return  res.status(200).json({message : "DISTRIBUTOR_NOT_UPDATED"})
            console.log("else data",data);*/         
}

//*****************set Status (approve Or reject) Update Function *********************//

exports.setstatus_distributor = (req,res,next) => {
    console.log("inside a set statusfunction");
    
    getdistributorcode();
    async function getdistributorcode(){
        var distributorCode = await getNextSequence("distributorCode");
        console.log("ds code", distributorCode);
            Distributormaster.updateOne(
                {_id:req.body.id},
                {
                    $set : {
                         "status"            : req.body.status, 
                         "userId"            : req.body.userId,
                         "distributorCode"   : "WVP"+distributorCode,
                        "updateLog"          : [{
                                updatedBy    : req.body.updatedBy, 
                                updatedAt    : new Date,
                                }] 
                    }
                }
            )
            .exec()
            .then(data=>{
                console.log("data",data);
                res.status(200).json({
                    data : data,
                    message :"DISTRIBUTOR_UPDATED"
                })
            })
            .catch(error=>{
                    res.status(500).json({
                        error : error,
                        message : "Some issue occurred while updating Distributer Data!"
                    })
            });
        }
                   
     
}


exports.delete_distributor = (req,res,next) =>{
    Distributormaster.findOneAndRemove({_id:req.params.ID})
         .exec()
         .then(data=>{
            //console.log("deleted record", data);
            User.findOneAndRemove({
                    emails  : {$elemMatch:{address:data.email.address}},
                    roles   : ["distributor"]
                })
            .exec()
            .then(userdata => {
                //console.log("user deleted", userdata)
                if(data.deletedCount === 1){
                    res.status(200).json({message : "DISTRIBUTOR_AND_USERDELETED"})
                }else{
                    res.status(200).json({message : "DISTRIBUTOR_AND_USER_NOT_DELETED"})
                }
            })
            .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while deleting user Data!"
                })
            });
            
         })
         .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while deleting distributor Data!"
                })
          });
};

exports.fetch_distributor_name = (req,res,next) => {
    // console.log("inside fun");
    Distributormaster.findOne({_id : req.params.ID})
         .exec()
         .then(data=>{
                    // console.log("data",data);

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

exports.fetch_distributor_by_userid = (req,res,next) => {
    // console.log("inside fun");
    Distributormaster.findOne({ userId : req.params.ID })
         .exec()
         .then(data=>{
                    // console.log("data",data);

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

exports.distributor_join_email_otp = (req,res,next)=>{
    
        Distributormaster.findOne({ "email.address"  : req.body.email })
            .exec()
            .then(distributor =>{
                console.log("distributor", distributor);
                if(distributor){
                    return res.status(200).json({
                        message: 'Email Id already exits.',
                        distributor: distributor
                    });
                }
                else{
                    
                    var emailOTP = getRandomInt(1000,9999);
                    if(emailOTP){
                            const distributermaster = new Distributormaster({
                                    "_id"               : mongoose.Types.ObjectId(), 
                                        "firstname"         : req.body.firstname,
                                        "lastname"          : req.body.lastname, 
                                        "dob"               : req.body.dob,
                                        "phone"             : req.body.phone,
                                        "email"             : {
                                            "address" : req.body.email,
                                            "verified": false,
                                            "optEmail": emailOTP
                                        },
                                        "ownOffice"         : req.body.ownOffice,   
                                        "address"         : {
                                            "adressLine"        : req.body.adressLine,
                                            "pincode"           : req.body.pincode,
                                            "city"              : req.body.city,
                                            "state"             : req.body.state,
                                            "stateCode"         : req.body.stateCode,         
                                            "latitude"          : req.body.latitude,
                                            "longitude"         : req.body.longitude
                                        },
                                        "currentDate"          : req.body.currentDate, 
                                        "fileUpload"           : req.body.fileUpload, 
                                        "fileUpload1"           : req.body.fileUpload1, 
                                        "education"            : req.body.education, 
                                        "description"          : req.body.description, 
                                        "website"            : req.body.website, 
                                        "gst"               : req.body.gst, 
                                        "status"            : "New", 
                                        "franchiseCode"     : req.body.franchiseCode, 
                                        "userId"            : null,
                                        "createdBy"         : req.body.createdBy, //_id of User or null
                                        "createdAt"         : new Date(),    
                                        "updateLog"         :[{
                                                            updatedBy : req.body.updatedBy, 
                                                            updatedAt :new Date,
                                                        }] 
                                });
                                console.log("distributermaster",distributermaster);
                                distributermaster.save()
                                    .then(result=>{
                                            if(result){
                                                request({
                                                        "method"    : "POST", 
                                                        "url"       : "http://localhost:"+globalVariable.port+"/send-email",
                                                        "body"      : {
                                                                            email   : req.body.email, 
                                                                            subject : "Verify your Account on Wealthyvia",
                                                                            mail    : "Dear "+req.body.firstname+" "+req.body.lastname+",<br/> To verify your account of Wealthyvia, please enter following OTP. <br/> Your OTP is "+ emailOTP+ "<br/><br/> Regards, <br/> Team Wealthyvia.", 
                                                                       },
                                                        "json"      : true,
                                                        "headers"   : {
                                                                        "User-Agent": "Test Agent"
                                                                    }
                                                    })
                                                    .then(source=>{
                                                        res.status(201).json({message:"Distributer__CREATED",ID:result._id})
                                                    })
                                                    .catch(err =>{
                                                        console.log(err);
                                                        res.status(500).json({
                                                            error: err
                                                        });
                                                    });        
                                            }else{
                                                res.status(200).json({message:"Distributor_NOT_CREATED"})
                                            }

                                        })
                                        .catch(err =>{
                                            console.log(err);
                                            res.status(500).json({
                                                error: err
                                            });
                                        });
                             
                   }
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    
};

exports.check_DistributorEmailOTP = (req,res,next)=>{
    Distributormaster.findOne({_id : req.params.ID, "email.optEmail" : req.params.emailotp})
        .exec()
        .then(data=>{
            if(data){
                Distributormaster.updateOne(
                            {_id : req.params.ID}, 
                            {
                                $set:{
                                    "email.verified" : true,
                                    "email.optEmail" : 0
                                }
                            }
                    )
                    .exec()
                    .then(updateddata=>{
                        if(updateddata.nModified === 1){
                            res.status(200).json({message:"SUCCESS", distributor: data});
                        }else{
                            res.status(200).json({message:"SUCCESS_OTP_NOT_RESET"});            
                        }
                    })
                    .catch(err =>{
                        console.log('user error ',err);
                        res.status(500).json({
                            error: err
                        });
                    })
            }else{
                res.status(200).json({message:"FAILED"});
            }
        })
        .catch(err =>{
            console.log('Distributor error ',err);
            res.status(500).json({
                error: err
            });
        });     
};

exports.distributor_update_email_otp = (req,res,next) =>{
    var optEmail = getRandomInt(1000,9999);
    //console.log("otp", optEmail);
    Distributormaster.findOne({ _id  : req.params.ID })
            .exec()
            .then(distributor =>{
                //console.log("distributor", distributor);
                if(distributor){
                    Distributormaster.updateOne(
                        {_id:req.params.ID},
                        {
                            $set:{
                                "email.optEmail"      : optEmail,
                            },
                        }
                    )
                    .exec()
                    .then(data=>{
                        if(data.nModified == 1){
                            //console.log("data", data);
                            request({
                                        "method"    : "POST", 
                                        "url"       : "http://localhost:"+globalVariable.port+"/send-email",
                                        "body"      : {
                                                            email   : distributor.email.address, 
                                                            subject : "Wealthyvia OTP",
                                                            mail    : "Wealthyvia updated OTP is "+ optEmail, 
                                                       },
                                        "json"      : true,
                                        "headers"   : {
                                                        "User-Agent": "Test Agent"
                                                    }
                                    })
                                    .then(source=>{
                                        res.status(201).json({message:"OTP_UPDATED"})
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        });
                                    });
                        }else{
                            res.status(401).status("USER_NOT_UPDATED")
                        }
                    })
                    .catch(err =>{
                        console.log('user error ',err);
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

exports.fetch_distributor_by_distributorcode = (req,res,next) => {
    // console.log("inside fun get by distributor code");
    Distributormaster.findOne({ distributorCode : req.params.ID })
         .exec()
         .then(data=>{
                    // console.log("data",data);

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