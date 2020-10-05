const express           = require('express');
const app 				= express();
const morgan 			= require('morgan');// morgan call next function if problem occure
const bodyParser 		= require('body-parser');// this package use to formate json data 
const mongoose 			= require ('mongoose');
var  nodeMailer 			= require('nodemailer');
const globalVariable	= require("./nodemon.js");

// Routes which should handle requests - Core Admin
const userRoutes 					= require('./api/coreAdmin/routes/users.js');
const rolesRoutes					= require('./api/coreAdmin/routes/roles.js');
const masternotificationRoutes		= require('./api/coreAdmin/routes/masternotification.js');
const notificationRoutes			= require('./api/coreAdmin/routes/notification.js');
const companysettingsRoutes			= require('./api/coreAdmin/routes/companysettings.js');
const projectSettingRoutes 			= require('./api/coreAdmin/routes/projectsettings.js');
const awsUploadRoutes 				= require('./api/coreAdmin/routes/awsUpload.js');

//Wealthyvia Modules
const blogRoutes 					= require('./api/wealthyvia/routes/blogs.js');
const offeringsRoutes 				= require('./api/wealthyvia/routes/offerings.js');
const subscriptionorderRoutes 		= require('./api/wealthyvia/routes/subscriptionorders.js');
const offerSubscriptionRoutes 		= require('./api/wealthyvia/routes/offeringsubscriptions.js');
const wmSubscriptionRoutes 			= require('./api/wealthyvia/routes/wmsubscriptions.js');
const invoiceRoutes 				= require('./api/wealthyvia/routes/invoice.js');
const productratesRoutes 			= require('./api/wealthyvia/routes/productrates.js');
const researchreportRoutes 			= require('./api/wealthyvia/routes/researchreport.js');
const distributorMasterRoutes 		= require('./api/wealthyvia/routes/distributormaster.js');
const toolsRoutes 	 				= require('./api/wealthyvia/routes/uploadurl.js');
const offeringorderRoutes 			= require('./api/wealthyvia/routes/offeringorders.js');

const ProjectSettings    			= require('./api/coreAdmin/models/projectsettings.js');

// global.JWT_KEY = "secret";

mongoose.connect('mongodb://localhost/'+globalVariable.dbname,{
	useNewUrlParser		: true,
	useUnifiedTopology	: true
})
mongoose.promise = global.Promise;

global.titleCase = function(Str){
    return new Promise(function(resolve,reject){
        resolve(Str.charAt(0).toUpperCase()+Str.slice(1));
    });
}

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

//URL's collection wise
//coreAdmin
app.use("/api/users", userRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/masternotifications",masternotificationRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/companysettings',companysettingsRoutes);
app.use('/api/projectsettings',projectSettingRoutes);
app.use('/api/fileUpload',awsUploadRoutes);

//wealthyvia
app.use('/api/blogs',blogRoutes);
app.use('/api/offerings',offeringsRoutes);
app.use('/api/subscriptionorders',subscriptionorderRoutes);
app.use('/api/offeringsubscriptions',offerSubscriptionRoutes);
app.use('/api/wmsubscriptions',wmSubscriptionRoutes);
app.use('/api/invoice',invoiceRoutes);
app.use('/api/productrates',productratesRoutes);
app.use('/api/researchreport',researchreportRoutes);
app.use('/api/distributormaster',distributorMasterRoutes);
app.use('/api/uploadVideoUrl',toolsRoutes);
app.use('/api/offeringorders',offeringorderRoutes);



function getEmaildata(){
	return new Promise(function (resolve, reject) {
		ProjectSettings.findOne({"type": "EMAIL"})
        .exec()
        .then(data=>{
            if(data){         	
            	
                resolve(data);
            }else{
                resolve(false);
            }
        })
        .catch(err =>{
            reject(err);
        });   
	})
} 

function getPartnerEmaildata(){
	return new Promise(function (resolve, reject) {
		ProjectSettings.findOne({"type": "PARTNEREMAIL"})
        .exec()
        .then(data=>{
            if(data){         	
            	
                resolve(data);
            }else{
                resolve(false);
            }
        })
        .catch(err =>{
            reject(err);
        });   
	})
} 

app.post('/send-email', (req, res)=> {
	// console.log('req',req.body);
	getdataasync();

	async function getdataasync(){
		var emailsettings = await getEmaildata();
		// console.log("emailsettings", emailsettings);
		if(emailsettings){
			let transporter = nodeMailer.createTransport({
					// service: 'Gmail',
					host: emailsettings.emailHost,
					// port: 587,
					port: emailsettings.port,
					auth: {
						user: emailsettings.user,
						pass: emailsettings.password
						
					}
				});
				console.log('after transport');
				let mailOptions = {
					
					from   : '"Wealthyvia" <'+emailsettings.user+'>', // sender address
					// from   : '"Wealthyvia" <iassureitmail@gmail.com>', // sender address
					to     : req.body.email, // list of receivers
					subject: req.body.subject, // Subject line
					text   : req.body.text, // plain text body
					html   : req.body.mail, // html body
					attachments : req.body.attachments
				};
				console.log('after mailoption');
				//name email mobilenumber message
				// console.log("mailOptions",mailOptions);
				
				transporter.sendMail(mailOptions, (error, info) => {
					console.log('in mail');
					if (error) {
						
						console.log("send mail error",error);
						return "Failed";
					}
					if(info){
						console.log('in info');
						// return "Success";
						res.status(200).json({ 
							
							message: "Success",
							// return "Success",

						});
					}
			
					res.render('index');
				});
		}
	}
});

app.post('/send-partner-email', (req, res)=> {
	// console.log('req',req.body);
	getdataasync();

	async function getdataasync(){
		var emailsettings = await getPartnerEmaildata();
		// console.log("emailsettings", emailsettings);
		if(emailsettings){
			let transporter = nodeMailer.createTransport({
					// service: 'Gmail',
					host: emailsettings.emailHost,
					// port: 587,
					port: emailsettings.port,
					auth: {
						user: emailsettings.user,
						pass: emailsettings.password
						
					}
				});
				console.log('after transport');
				let mailOptions = {
					
					from   : '"Wealthyvia" <'+emailsettings.user+'>', // sender address
					// from   : '"Wealthyvia" <iassureitmail@gmail.com>', // sender address
					to     : req.body.email, // list of receivers
					subject: req.body.subject, // Subject line
					text   : req.body.text, // plain text body
					html   : req.body.mail, // html body
					attachments : req.body.attachments
				};
				console.log('after mailoption');
				//name email mobilenumber message
				// console.log("mailOptions",mailOptions);
				
				transporter.sendMail(mailOptions, (error, info) => {
					console.log('in mail');
					if (error) {
						
						console.log("send mail error",error);
						return "Failed";
					}
					if(info){
						console.log('in info');
						// return "Success";
						res.status(200).json({ 
							
							message: "Success",
							// return "Success",

						});
					}
			
					res.render('index');
				});
		}
	}
});

app.post('/send-email-admin', (req, res)=> {
	// console.log('req',req.body);
	getdataasync();

	async function getdataasync(){
		var emailsettings = await getPartnerEmaildata();
		// console.log("emailsettings", emailsettings);
		if(emailsettings){
			let transporter = nodeMailer.createTransport({
					// service: 'Gmail',
					host: emailsettings.emailHost,
					// port: 587,
					port: emailsettings.port,
					auth: {
						user: emailsettings.user,
						pass: emailsettings.password
						
					}
				});
				console.log('after transport', req.body.emaillist);
				let mailOptions = {
					
					from   : '"Wealthyvia" <'+emailsettings.user+'>', // sender address
					// from   : '"Wealthyvia" <iassureitmail@gmail.com>', // sender address
					to     : req.body.emaillist,
					subject: req.body.subject, // Subject line
					text   : req.body.text, // plain text body
					html   : req.body.mail, // html body
					attachments : req.body.attachments
				};
				console.log('after mailoption');
				//name email mobilenumber message
				// console.log("mailOptions",mailOptions);
				
				transporter.sendMail(mailOptions, (error, info) => {
					console.log('in mail');
					if (error) {
						
						console.log("send mail error",error);
						return "Failed";
					}
					if(info){
						console.log('in info');
						// return "Success";
						res.status(200).json({ 
							
							message: "Success",
							// return "Success",

						});
					}
			
					res.render('index');
				});
		}
	}
});
app.post('/send-email/portalreview', (req, res)=> {
	// console.log('req',req.body);
	let transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		auth: { 
			// user: 'review.wealthyvia@gmail.com',
			// pass: 'Artha123$'
			user : 'iassureitmail@gmail.com',
				pass : 'iAssureIT@123'
		}
	});
	let mailOptions = {
			// from   : '"Wealthyvia" <review.wealthyvia@gmail.com>', // sender address
			from   : '"Wealthyvia" <iassureitmail@gmail.com>', // sender address
			to     : req.body.email, // list of receivers
			subject: req.body.subject, // Subject line
			text   : req.body.text, // plain text body
			html   : req.body.mail // html body
		};
		// console.log("mailOptions",mailOptions);

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log("send mail error",error);
				return "Failed";
			}
			if(info){
			   return "Success";
			}
			// console.log('Message %s sent: %s', info.messageId, info.response);
			res.render('index');
		});
});
// handle all other request which not found 
app.use((req, res, next) => {
	const error = new Error('Not Found Manual ERROR');
	error.status = 404;
	next(error);
		// when we get 404 error it send to next 
});
// it will handel all error in the application
app.use((error, req, res, next) => {
	// 500 type error is used when we use database
	res.status(error.status || 500);
	res.json({
		error:{
			message:error.message
		}
	})
});

module.exports = app;
