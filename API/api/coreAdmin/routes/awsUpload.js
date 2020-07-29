const express 			= require("express");
const router 			= express.Router();
const mongoose  		= require("mongoose");
const aws 				= require('aws-sdk' );
const multerS3 			= require('multer-s3' );
const multer 			= require('multer');
const path 				= require('path' );
const url 				= require('url');
const globalVariable 	= require('../../../nodemon.js');


function checkFileType( file, cb ){
 // Allowed ext
 const filetypes = /jpeg|jpg|png|gif|pdf/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
 const mimetype = filetypes.test( file.mimetype );
if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: Images Only!' );
 }
}

const s3 = new aws.S3({
					 accessKeyId		: globalVariable.accessKeyId,
					 secretAccessKey	: globalVariable.secretAccessKey,
					 Bucket 			: globalVariable.bucket,
					 region				: globalVariable.region
					});



const fileUpload = multer({
	 storage: multerS3({
		  s3: s3,
		  bucket: globalVariable.bucket,
		  acl: 'bucket-owner-full-control',
		  metadata: function (req, file, cb) {
		      cb(null, {fieldName: file.fieldname});
    	  },
		  key: function (req, file, cb) {
		  	// console.log("Name ",path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ));
			var datenow = Date.now();
		  	// console.log("datenow = ",datenow);
		  	// console.log("req.files.length = ",req.files.length);
		  	// console.log("req.key = ",req.key);
		  	var keyList = req.key ? req.key : [];
		  	// console.log("keyList ",keyList);
		  	var currentfile = path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname );
		  	// keyList.push(path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ));
		  	keyList.push({
		  					name  	  : file.originalname,
		  					key 	  : currentfile,
		  					createdAt : new Date()
		  				});
		  	// console.log("keyList ",keyList);
			req.key = keyList;
			// console.log("1 => req.key = ",req.key);
			cb(null, currentfile)
		  }
	 }),
	 limits:{ fileSize: 4000000 }, // In bytes: 2000000 bytes = 2 MB
	 fileFilter: function( req, file, cb ){
	  	checkFileType( file, cb );
	 }
});


router.post('/', fileUpload.array('file', 5), function(req, res, next) {
	// console.log("2 => req.key = ",req.key);
  
  res.status(200).json({
  							keyList : req.key,
  							message : "Number of file uploaded " + req.files.length 
  						});
});


router.get("/image/:imageId", function(req, res, next) {
    var params = { Bucket: globalVariable.bucket, Key: req.params.imageId };
    s3.getObject(params, function(err, data) {
      if (err) {
        return res.send({ error: err });
      }
      res.send(data.Body);
    });
});

module.exports = router; 
