import React, { Component } from 'react';

import axios                      from 'axios';
import swal                       from 'sweetalert';
import moment from 'moment';
import $ from 'jquery';
// import S3 from 'react-aws-s3';
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import "./JoinAsPartnerForm.css";

export default class JoinAsPartnerForm extends Component {

  constructor(props) {

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

   
    super(props);
      this.state = {
          "firstname"    :"",
          "lastname"     :"",
          "phone"        :"",
          "dob"          :"",
          "email"        :"",
          "adressLine"   :"",
          "city"         :"",
          "gst"          :"",
          "state"        :"",
          "pincode"      :"",
          "ownOffice"    :"",
          "website"      :"",
          "education"    :"",
          "fileUpload"   :[],
          "fileUpload1"   :[],
          "education"    :"",
          "description"  :"",
          "errors"       :{},
          "fields2"      :{},
          "errors2"      :{},

          submit         :true,
          gmapsLoaded    : false,

          currentDate: date,
        
        "editId"          : this.props.match.params ? this.props.match.params.ID : ''



      }
      this.baseState = this.state;

    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount () {

    axios
          .get('/api/projectsettings/get/S3')
          .then((response)=>{
            // console.log("response",response);
            const config = {
                              bucketName      : response.data.bucket,
                              // dirName         : "testwealthyvia",
                              region          : response.data.region,
                              accessKeyId     : response.data.key,
                              secretAccessKey : response.data.secret,
                           }
            this.setState({
              config : config
            })

          })
          .catch(function(error){
            console.log(error);
              if(error.message === "Request failed with status code 401")
                  {
                       swal("Your session is expired! Please login again.","", "error");
                       this.props.history.push("/");
                  }
          });
//================placeautocomplete==============//

    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE&libraries=places&callback=initMap`    
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  
//==================edit=================// 
  

  
  }


  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

  handleChange(event){
    var name = event.currentTarget.name;
    this.setState({ [name] : event.currentTarget.value });
    let fields2 = this.state.fields2;  
    fields2[event.target.name] = event.target.value;
    this.setState({
      fields2
    });
  
  }

  validateFormReqReview() {
      let fields = this.state.fields2;
      let errors = {};
      let formIsValid = true;
        if (!fields["firstname"]) {
          formIsValid = false;
          errors["firstname"] = "This field is required.";
        }     
         if (!fields["lastname"]) {
          formIsValid = false;
          errors["lastname"] = "This field is required.";
        }     
        if (!fields["email"]) {
          formIsValid = false;
          errors["email"] = "This field is required.";
        }     
        /* if (!fields["education"]) {
          formIsValid = false;
          errors["education"] = "This field is required.";
        }*/
        // if (!fields["adressLine"]) {
        //   formIsValid = false;
        //   errors["adressLine"] = "This field is required.";
        // }
       /* if (!fields["address"]) {
          formIsValid = false;
          errors["address"] = "This field is required.";
        }*/
        /*if (!fields["dob"]) {
          formIsValid = false;
          errors["dob"] = "This field is required.";
        } */         
        /*if (!fields["fileUpload"]) {
          formIsValid = false;
          errors["fileUpload"] = "This field is required.";
        }  */        
        if (!fields["phone"]) {
          formIsValid = false;
          errors["phone"] = "This field is required.";
        }
        /*if (!fields["gst"]) {
          formIsValid = false;
          errors["gst"] = "This field is required.";
        }
        if (!fields["website"]) {
          formIsValid = false;
          errors["website"] = "This field is required.";
        }   */ 
        if (!fields["description"]) {
          formIsValid = false;
          errors["description"] = "This field is required.";
        }   
         if (!fields["ownOffice"]) {
          formIsValid = false;
          errors["ownOffice"] = "This field is required.";
        }     
        this.setState({
          errors2: errors
        });
        console.log("errors",errors);

        return formIsValid;
  
  }

  validateFormReview() {
    let fields = this.state.fields2;
    let errors = {};
    let formIsValid = true;
      if (typeof fields["email"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "Please enter valid email-ID.";
        }
      }
      if (typeof fields["phone"] !== "undefined") {
        if (!fields["phone"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["phone"] = "Please enter valid mobile no.";
        }
        console.log("phone",errors["phone"]);
      }     
      this.setState({
        errors2: errors
      });
      return formIsValid;
  
  }

  SubmitReview(event){
    event.preventDefault();
     var firstname = this.state.firstname;
     var lastname  = this.state.lastname;
     var phone = this.refs.phone.value;
     var email = this.refs.email.value;
    if (this.validateFormReview() && this.validateFormReqReview()) {
      var dataArray1={
        "firstname"           : this.state.firstname,
        "lastname"            : this.state.lastname,
        "phone"               : this.refs.phone.value,
        "dob"                 : this.refs.dob.value,
        "email"               : this.refs.email.value,
        "gst"                 : this.refs.gst.value,
        "adressLine"          : this.state.adressLine,
        "pincode"              : this.state.pincode,
            "country"         : this.state.country,
            "countryCode"     : this.state.countryCode,
            "state"           : this.state.state,
            "stateCode"       : this.state.stateCode,
            "city"            : this.state.city,
            "latitude"        : this.state.latLng, 
         "longitude"           : this.state.latLng,   
        "latitude"            : this.state.latLng ? this.state.latLng.lat : "",
        "longitude"           : this.state.latLng ? this.state.latLng.lng : "",        
        "fileUpload"          : this.state.portfolioImage1,
        "fileUpload1"          : this.state.portfolioImage2,
        "ownOffice"           : this.state.ownOffice,
        "website"             : this.state.website,
        "education"           : this.refs.education.value,
        "description"         : this.refs.description.value,
        "status"              : "New",
        "currentDate"         :  this.state.currentDate ,

        }
      console.log("dataArray1",dataArray1);
      console.log("dataArray1 fileUpload1 ",this.state.portfolioImage2);

      axios.post('/api/distributormaster/post/distributor/emailotp',dataArray1)
                    .then((response)=> {
                      console.log("res", response);
                      if(response)
                      {
                        if(response.data.message === 'Email Id already exits.'){
                          var partnerdata = response.data.distributor;

                          if(partnerdata.status == 'New' && !partnerdata.email.verified ){
                            swal("","Your Email address is not verified");
                            this.props.history.push("/partner-emailotp/"+partnerdata._id);
                          }
                          else if(partnerdata.status == 'New'){
                            swal("","Your profile is already pending for Approval. You'll receive an Email after Admin approves your Profile.");
                            this.props.history.push("/");
                            //window.location.reload();
                          }
                          else if(partnerdata.status == 'Active'){
                            swal("","You are already an Active partner. Please login with your registered email id to continue.");
                            this.props.history.push("/");
                          }
                          else if(partnerdata.status == 'Rejected'){
                            swal("","To activate your profile again, please contact wealthyvia@gmail.com Email ID.");
                            this.props.history.push("/");
                          }
                        }
                        else{
                          swal("Great","Information submitted successfully and OTP is sent to your registered Email ID.");
                          this.props.history.push("/partner-emailotp/"+response.data.ID);
                        }
                      }else{
                      swal("Warning","Something went wrong...","warning");

                      }
                    })
                    .catch(error=> {
                      
                        console.log(error);
                    this.setState({
                        buttonHeading : 'Sign Up',
                      });
                        if(error === "Error: Request failed with status code 409")
                        {
                      swal("Warning..","Email id already exist..","warning");
                    

                        }else{
                      swal("Something went wrong..","Unable to submit data.","warning");
                      }
                    })  

    /*  axios
        .post("api/distributormaster/post",dataArray1)
        .then((response) =>{

          axios.get("/api/users/get/list/role/admin/1")
            .then((adminusers) => {
              console.log('admin data', adminusers.data);
              var adminemaillist = [];
              var admindata = adminusers.data;
              if(admindata && admindata.length > 0){
                for(let i = 0 ; i < admindata.length ; i++){
                  adminemaillist.push(admindata[i].email);
                }
              }
              console.log("admin email list", adminemaillist);
              const formValues2 = {
                "emaillist"     : adminemaillist ,
                "subject"       : "Distributor joined Wealthyvia!",
                "text"          : "", 
                "mail"          : 'Dear Admin,' + '<br/>'+
                                  'A Distributor has joined Wealthyvia as a Partner!'+                          
                                  "<br/>"+
                                  "Please Approve/Reject Distributor's Profile after reviewing it. Following are the details of the Distributor:<br/>"+ 
                                  "Name: " + firstname +' '+ lastname+  "<br/>" +
                                  "Email:  " + email + "<br/>" +
                                  "Contact:  " + phone + "<br/>" +
                                  "<br/><br/> " +
                                  "Regards<br/> " +
                                  "Team Wealthyvia. " ,
                                  

              };
              console.log("notification",formValues2); 
              
                axios
                .post('/send-email-admin',formValues2)
                .then((res)=>{
                          if(res.status === 200){
                            //console.log("Mail Sent TO ADMIN successfully!")
                          }
                        })
                        .catch((error)=>{
                          console.log("error = ", error);
                          
                        });

              const formValues1 = {
                "email"         : email ,
                "subject"       : "Welcome to Wealthyvia!",
                "text"          : "", 
                "mail"          : 'Dear' + firstname +' '+ lastname + ', <br/><br/>'+                          
                                  "Thank you for joining Wealthyvia as a Partner! <br/> " + 
                                  "Your Distributor Profile will be approved soon by Admin & you will be notified with your login credentials after approval." +
                                  "<br/> <br/> " + 
                                  "Regards<br/> " +
                                  "Team Wealthyvia. " ,

              };
              console.log("notification",formValues1); 
              
                axios
                .post('/send-email',formValues1)
                .then((res)=>{
                           if(res.status === 200){
                            this.props.history.push('/'); 

                           // this.props.history.push('/'); 
                           //  Swal("Thank you for contacting us. We will get back to you shortly.")
                            }
                        })
                        .catch((error)=>{
                          console.log("error = ", error);
                          
                        });        

              
          })
          .catch((error) => { console.log('user error: ',error)})

             
          var sendData = {
                  "event"         : "Distributer_Event", //Event Name
                  "toUser_id"     : "", // ref:toDistributerRole _id
                  "toUserRole"    :"Distributer", // toDistributerRole role
                  "variables": {
                    "FullName"    : this.refs.firstname.value +' '+ this.refs.lastname.value,
                    "Mobile"      : this.refs.phone.value,
                    "Email"       : this.refs.email.value
                    }
                  }
                  console.log('sendDataToUser==>', sendData)
                  axios.post('/api/masternotifications/post', sendData)
            .then((res) => {
            console.log('sendDataToUser in result==>>>', res.data)
            })
            .catch((error) => { console.log('notification error: ',error)})
          //console.log("Distributer Master Data inserted successfully!", response);
          swal( "Thank you for submitting your information.","We will get back to you very shortly.", "success");    
          //this.setState(this.baseState);
          // this.props.history.push('/'); 

        })
        .catch((error) =>{
          console.log("Some Error occured in Insert = ", error);
          swal("Oops... ", "Somthing went wrong <br/> "+ error, "error" );
        });
*/
   
      }
  }

  selectownOffice(event){
    var value = event.currentTarget.value;
      this.setState({ownOffice : value});
    let fields2 = this.state.fields2;  
      fields2[event.target.name] = event.target.value;
      this.setState({
        fields2
      });
  }

  uploadLogoImage(event){
   event.preventDefault();
    var file = event.target.files[0];

    if(file){
     if(file.size>=2097152)
     {
        swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
        event.target.value ="";
     }else{
          this.setState({
              "fileUpload":event.target.value,
            });
        }
      }
      let fields2 = this.state.fields2;
    fields2[event.target.name] = event.target.value;
    this.setState({
      fields2
    });
      let errors2 = {};
      errors2[event.target.name] = "";
      this.setState({
        errors2: errors2
      });
    var index = event.target.getAttribute('id');

    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
        fileUpload : newFile.name,
      })
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf"){ 
          if (newFile) {
            if(this.state.fileUpload && this.state.fileUpload.length === 0){
            console.log("this.state.confiq",this.state.config);
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    portfolioImage1 : Data.location,
                  },()=>{console.log("this.state.portfolioImage1",this.state.portfolioImage1)})
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            this.setState({
                              portfolioImage1 : Data.location,
                            })
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }         
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");  
        }
      }
    }
  }
  deleteimageLogo(index){
    var data = index.split("/");
    var imageName = data[4];
      if(index){
        S3FileUpload
          .deleteFile(imageName,this.state.config)
          .then((response) =>{
            console.log("Deletedddd...",response)
            swal("Image deleted successfully");
          })
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
          })
      }
  }
  uploadLogoImage1(event){
   event.preventDefault();
    var file = event.target.files[0];

    if(file){
     if(file.size>=2097152)
     {
        swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
        event.target.value ="";
     }else{
          this.setState({
              "fileUpload1":event.target.value,
            });
        }
      }
      let fields2 = this.state.fields2;
    fields2[event.target.name] = event.target.value;
    this.setState({
      fields2
    });
      let errors2 = {};
      errors2[event.target.name] = "";
      this.setState({
        errors2: errors2
      });
    var index = event.target.getAttribute('id');

    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
        fileUpload1 : newFile.name,
      })
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf"){ 
          if (newFile) {
            if(this.state.fileUpload1 && this.state.fileUpload1.length === 0){
            console.log("this.state.confiq",this.state.config);
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    portfolioImage2 : Data.location,
                  },()=>{console.log("this.state.portfolioImage2",this.state.portfolioImage2)})
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            this.setState({
                              portfolioImage2 : Data.location,
                            })
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }         
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");  
        }
      }
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please enter valid email-ID.";
      }
    }
    if (typeof fields["phone"] !== "undefined") {
      if (!fields["phone"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phone"] = "Please enter valid mobile no.";
      }
    }        
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

//====================Auto places=====================================//
  
  handleChangePlaces = address => {
        this.setState({ adressLine : address});
  };

  handleSelect = address => {
   console.log("address=>",address);
    geocodeByAddress(address)
     .then((results) =>{ 
      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'sublocality_level_2':
                      area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      var stateCode = results[0].address_components[i].short_name;
                      break;
                  case 'administrative_area_level_2':
                      var district = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                     var countryCode = results[0].address_components[i].short_name;
                      break; 
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
                  default :
                        break;
              }
          }
      }

      this.setState({
        area : area,
        city : city,
        district : district,
        states: state,
        country:country,
        pincode: pincode,
        stateCode:stateCode,
        countryCode:countryCode
      },()=>{
        console.log("countrt=>",this.state.country)
        console.log("countryCode=>",this.state.countryCode)
      })

       
        })
     
      .catch(error => console.error('Error', error));

      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'latLng': latLng}))
      .catch(error => console.error('Error', error));
     
      this.setState({ addressLine1 : address});
  };


  render() {
  	     var oldDate = new Date();
		    oldDate.setFullYear(oldDate.getFullYear() - 18);
        const searchOptions = {componentRestrictions: {country: "in"}}
    return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginLeft page">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10  col-xs-offset-1 formContainer2 ">                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter marginT headerSet">
                  <h4 className="formNameTitle"><span className="">Join as a Partner</span></h4>
                  <h6 className="ApplicationName"><span className="">Distributor Application </span></h6>
                </div>
                <form>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd boxMarg">
                        <span className="blocking-span noIb">
                          <input type="text" className="form-control abacusTextbox oesSignUpForm sentanceCase" name="firstname" ref="firstname" id="firstname"  
                            onChange={this.handleChange.bind(this)}
                            value={this.state.firstname}  required
                          />
                          {this.state.errors2.firstname  && (
                            <span className="text-danger">{this.state.errors2.firstname}</span> 
                          )}
                          <span className="floating-label">
                            <i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
                            First Name
                          </span>                 
                        </span>
                      </div>
                      <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd1 boxMarg">
                        <span className="blocking-span noIb">   
                          <input type="text" className="form-control abacusTextbox oesSignUpForm sentanceCase" name="lastname" ref="lastname" id="lastname" required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.lastname} 
                          />
                            {this.state.errors2.lastname  && (
                              <span className="text-danger">{this.state.errors2.lastname}</span> 
                            )}
                            <span className="floating-label1 lbfloatpass">
                              <i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
                              Last Name
                            </span>                 
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent textpd boxMarg">
                        <span className="blocking-span noIb">
                            <input type="text" maxLength="10" className="form-control abacusTextbox oesSignUpForm sentanceCase" id="phone" ref="phone" name="phone"  
                                onChange={this.handleChange.bind(this)}
                                value={this.state.phone} required
                            />
                            {this.state.errors2.phone  && (
                              <span className="text-danger">{this.state.errors2.phone}</span> 
                            )}
                            <span className="floating-label">
                              <i className="fa fa-mobile signupIconFont" aria-hidden="true"/> 
                              Mobile Number
                            </span>                 
                        </span>
                      </div>
                      <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent textpd2 textpd1 boxMarg">
                        <span className="blocking-span noIb">   
                          <input type="email" className="form-control abacusTextbox oesSignUpForm" name="email"  ref="email" required
                            onChange={this.handleChange.bind(this)}
                            value={this.state.email}
                          />
                            {this.state.errors2.email  && (
                              <span className="text-danger">{this.state.errors2.email}</span> 
                            )}
                            <span className="floating-label1 lbfloatpass smsetMargin">
                              <i className="fa fa-envelope-o signupIconFont" aria-hidden="true"/> 
                              Email ID
                            </span>                 
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent  textpd boxMarg">
                        <span className="blocking-span noIb">
                            <input type="text" className="form-control abacusTextbox oesSignUpForm sentanceCase" id="education" ref="education" name="education"  
                                onChange={this.handleChange.bind(this)}
                                value={this.state.education} required
                            />
                            {this.state.errors2.education  && (
                              <span className="text-danger">{this.state.errors2.education}</span> 
                            )}
                            <span className="floating-label">
                              <i className="fa fa-graduation-cap signupIconFont" aria-hidden="true"/> 
                              Education
                            </span>                 
                        </span>
                      </div>
                      <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent textpd2 textpd1 boxMarg">
                        <span className="blocking-span noIb">   
                          <input type="number" className="form-control abacusTextbox oesSignUpForm sentanceCase"  name="gst"  ref="gst"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.gst} required
                          />
                            {this.state.errors2.gst  && (
                              <span className="text-danger">{this.state.errors2.gst}</span> 
                            )}
                            <span className="floating-label1 lbfloatpass">
                              <i className="fa fa-id-card signupIconFont" aria-hidden="true"/> 
                              GST Number
                            </span>                 
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-7 col-md-7 col-xs-12 col-sm-12 inputContent textpd setplusZindex boxMarg">
                        <span className="blocking-span noIb">
                         {this.state.gmapsLoaded ?                        
                          <PlacesAutocomplete
                                value         ={this.state.adressLine} 
                                onChange      ={this.handleChangePlaces}
                                onSelect      ={this.handleSelect}
                                searchOptions ={searchOptions}
                          >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input required
                                  {...getInputProps({
                                    className: "form-control  abacusTextbox oesSignUpForm sentanceCase",
                                    
                                  })} 
                                />
                                <span className="floating-label">
                                  <i className="fa fa-map-marker signupIconFont" aria-hidden="true"/> 
                                    Location
                                </span>
                                <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                      ? 'suggestion-item--active'
                                      : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                      <div
                                        {...getSuggestionItemProps(suggestion, {
                                          className,
                                          style,
                                        })}
                                      >
                                        <span>{suggestion.description}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                            </div>
                            )}
                          </PlacesAutocomplete>
                          :
                          <input type="text" className="form-control setplusZindex abacusTextbox oesSignUpForm sentanceCase" name="adressLine" ref="adressLine"
                              onChange={this.handleChange} 
                              value={this.state.adressLine}
                            />
                          }
                          {this.state.errors2.address  && (
                            <span className="text-danger">{this.state.errors2.address}</span> 
                          )}
                          {/*<span className="floating-label">
                            <i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
                            Location
                          </span>*/}
                        </span>                 
                      </div> 
                      <div className="form-group form-group1 col-lg-5 col-md-5 hidden-xs hidden-sm  inputContent textpd1 boxMarg">
                        <span className="blocking-span noIb">   
                          <input type="date" className="form-control abacusTextbox oesSignUpForm sentanceCase"  name="dob"  ref="dob"
                            max={moment(oldDate).format("YYYY-MM-DD")}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.dob}
                          />
                            {this.state.errors2.dob  && (
                              <span className="text-danger">{this.state.errors2.dob}</span> 
                            )}
                            <span className="floating-label1 lbfloatpass">   
                              <i className="signupIconFont fa fa-calendar-o" aria-hidden="true"/> 
                                    Date Of Birth
                            </span>                 
                        </span>
                      </div>
                      <div className="form-group form-group1 hidden-lg hidden-md col-xs-12 col-sm-12 textpd  inputContent boxMarg">
                        <span className="blocking-span noIb">   
                          <input type="date" className="form-control abacusTextbox oesSignUpForm sentanceCase"  name="dob"  ref="dob"
                            max={moment(oldDate).format("YYYY-MM-DD")}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.dob}
                          />
                            {this.state.errors2.dob  && (
                              <span className="text-danger">{this.state.errors2.dob}</span> 
                            )}
                            <span className="floating-label1 lbfloatpass ml5 ">   
                              <i className="signupIconFont fa fa-calendar-o ml5" aria-hidden="true"/> 
                                    Date Of Birth
                            </span>                 
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 setZindex inputContent textpd boxMarg">
                        <span className="blocking-span noIb">
                        <span>
                            <div className="setFont">Attach Aadhar copy </div> 
                          </span>
                           <input type="file" className="customInputKF  inputBox nameParts" name="fileUpload"  ref="fileUpload" id="upload-file2"
                                onChange={this.uploadLogoImage.bind(this)} id="upload-file2"
                            />
                            {this.state.errors2.fileUpload  && (
                            <span className="text-danger">{this.state.errors2.fileUpload}</span> 
                          )}               
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 setZindex inputContent textpd boxMarg">
                        <span className="blocking-span noIb">
                        <span>
                            <div className="setFont">Attach PAN  copy </div> 
                          </span>
                           <input type="file" className="customInputKF  inputBox nameParts" name="fileUpload1"  ref="fileUpload1"
                                onChange={this.uploadLogoImage1.bind(this)} id="upload-file3"
                            />
                            {this.state.errors2.fileUpload1  && (
                            <span className="text-danger">{this.state.errors2.fileUpload1}</span> 
                          )}               
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent  textpd boxMarg">
                        <span className="blocking-span noIb">
                        <span>
                            <div className="setFont marginT">Do you have your own Office? 
                                <span className="asterix"> *</span> </div> 
                          </span>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <input type="radio" name="ownOffice" ref="ownOffice" value="yes" autoComplete="off" 
                                checked={this.state.ownOffice === "yes" ? "checked" : false}
                                onChange= {this.selectownOffice.bind(this)}/> Yes
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <input type="radio" name="ownOffice" ref="ownOffice"  value="no" autoComplete="off"                       
                                // value   = {this.state.ownOffice}
                                onChange={this.selectownOffice.bind(this)}
                                checked={this.state.ownOffice === "no" ? "checked" : false} /> No
                          </div>
                        </div>
                        </span>
                          <div className="errorMsg">{this.state.errors2.ownOffice}</div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                      <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent textpd mt40 boxMarg">
                        <span className="blocking-span noIb">
                        <span>
                            <div className="setFont">Website (If there is an existing website) 
                                 </div> 
                          </span>
                           <input type="text" className="customInputKF inputBox nameParts" name="website" ref="website"
                                  value={this.state.website}  onChange={this.handleChange.bind(this)} 
                            />
                          
                          {this.state.errors2.website  && (
                            <span className="text-danger">{this.state.errors2.website}</span> 
                          )}               
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                      <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent textpd mt40 boxMarg">
                        <span className="blocking-span noIb">
                        <span>
                            <div className="setFont">How long you have been doing Financial Product distribution, Broking, planning or 
                               insurance selling? Please Brief about your profession or business 
                                <span className="asterix"> *</span> </div> 
                          </span>
                           <input type="text" className="customInputKF inputBox nameParts" name="description" ref="description"
                                  value={this.state.description}  onChange={this.handleChange.bind(this)} 
                            />
                          
                          {this.state.errors2.description  && (
                            <span className="text-danger">{this.state.errors2.description}</span> 
                          )}               
                        </span>
                      </div>
                    </div>
                 
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                      <div className="col-lg-2 col-md-2 hidden-xs hidden-sm submitButton pull-right mgt"
                        onClick={this.SubmitReview.bind(this)}>Submit
                      </div>
                    <div className="hidden-lg hidden-md col-xs-5 col-sm-5 submitButton pull-right sm-mt30"
                            onClick={this.SubmitReview.bind(this)}>
                      Submit
                    </div>     
                  </div>
                    </div>
                </form>
              </div>
            </div>
          </div>   
    );
  }
}






/*





                      {/*<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 boxMarg">
                        <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent textpd boxMarg">
                          <span className="blocking-span noIb">
                          <span>
                            <div className="setFont marginT">Do you have your own Office? </div> 
                          </span>
                             <input type="radio" name="ownOffice" ref="ownOffice" value="yes" autoComplete="off" 
                                  checked={this.state.ownOffice === "yes" ? "checked" : false}
                                  onChange= {this.selectownOffice.bind(this)}/> Yes

                            {this.state.errors2.adressLine  && (
                              <span className="text-danger">{this.state.errors2.adressLine}</span> 
                            )}               
                          </span>
                        </div>*/
                        
                      /*</div>*/
                      /*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 hidden-xs hidden-sm">
                          <label>Attach PAN and Aadhar self attested copies <span className="asterix"> *</span></label>
                        </div>
                        <div className="hidden-lg hidden-md col-sm-12 col-xs-12 mt30">
                          <label>Attach PAN and Aadhar self attested copies <span className="asterix"> *</span></label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <input type="file" className="customInputKF inputBox nameParts" name="fileUpload"  ref="fileUpload" id="upload-file2"
                            onChange={this.uploadLogoImage.bind(this)} id="upload-file2"
                          />
                            <div className="errorMsg">{this.state.errors2.fileUpload}</div>
                         </div>
                      </div>
                    </div>*/


   {/*<div className="col-lg-2 col-md-2 hidden-xs hidden-sm submitButton pull-right mgt"
                        onClick={this.SubmitReview.bind(this)}>
                      </div>
                        { 
                        this.state.editId ? 
                        <button onClick={this.update.bind(this)} className="btn lightbluebg commentBoxbtn buttonhover">Update</button>
                        :
                        <button onClick={this.SubmitReview.bind(this)}  className="btn lightbluebg commentBoxbtn buttonhover">Submit</button>
                      }*/}
                      {/*</div>*/}
/*
 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                     {/* <div className="row"> 
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Mobile Number</label><span className="asterix">*</span>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input type="number" className="customInputKF inputBox nameParts" placeholder="Enter Mobile Number"
                              name="phone" placeholder="Your answer" ref="phone"
                              onChange={this.handleChange.bind(this)}
                              value={this.state.phone}
                            />
                            <div className="errorMsg">{this.state.errors2.phone}</div>
                          </div>
                      </div>*/
                    /*</div>/*
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      {/*<div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Email ID</label><span className="asterix">*</span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <input type="email" className="customInputKF inputBox nameParts" name="email" placeholder="Enter Email ID" ref="email"
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.email}
                              />
                              <div className="errorMsg">{this.state.errors2.email}</div>
                          </div>
                      </div>*/
                    /*</div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      {/*<div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>Date Of Birth <span className="asterix"> *</span></label>                          
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <input type="date" className="customInputKF inputBox nameParts" name="dob" ref="dob" 
                            max={moment(oldDate).format("YYYY-MM-DD")}
                            placeholder="Your Date Of Birth"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.dob}
                          />
                           <div className="errorMsg">{this.state.errors2.dob}</div> 
                        </div>
                      </div>*/
                 /*   </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      {/*<div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>GST Number <span className="asterix"> *</span></label>                          
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input type="text" maxLength="16" className="customInputKF inputBox nameParts"
                                placeholder="Your answer" name="gst"  ref="gst"
                                value={this.state.gst}
                                onChange={this.handleChange.bind(this)}
                            />
                            <div className="errorMsg">{this.state.errors2.gst}</div>
                        </div>
                      </div>*/
                 /*   </div>
                    {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Location <span className="asterix"> *</span></label>                      
                          </div>  
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {this.state.gmapsLoaded ?                        
                            <PlacesAutocomplete
                                  value         ={this.state.adressLine} 
                                  onChange      ={this.handleChangePlaces}
                                  onSelect      ={this.handleSelect}
                                  searchOptions ={searchOptions}
                            >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div>
                                  <input  className="customInputKF inputBox nameParts"
                                    {...getInputProps({
                                      className: 'location-search-input customInputKF inputBox nameParts',
                                    })}
                                    required
                                  />
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                      const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                      return (
                                        <div
                                          {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                          })}
                                        >
                                          <span>{suggestion.description}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                              </div>
                              )}
                            </PlacesAutocomplete>
                            :
                            <input type="text" className="customInputKF inputBox nameParts" name="adressLine" ref="adressLine" 
                                onChange={this.handleChange}
                                value={this.state.adressLine} 
                              />
                        }
                   /*         {/*<div className="errorMsg">{this.state.errors2.adressLine}</div>*/
                         /*}
                   
                    {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <input type="number" maxLength="6" className="customInputKF inputBox nameParts"
                                name="pincode" placeholder="Pincode" ref="pincode"
                                onChange={this.handleChange.bind(this)}
                                // onChange={this.handlePincode.bind(this)}
                                value   ={this.state.pincode}
                                onKeyDown={this.keyPressNumber.bind(this)}
                              />
                              <div className="errorMsg">{this.state.errors2.pincode}</div>
                        </div>
                      </div>
                    </div>*/
                    /*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>Education</label><span className="asterix">*</span>
                        </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input type="text" maxLength="16" className="customInputKF inputBox nameParts"
                                placeholder="Your answer" name="education"  ref="education"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.education}
                            />
                            <div className="errorMsg">{this.state.errors2.education}</div>
                         </div>
                      </div>
                    </div>*/
                 /*   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Do you have your own Office? <span className="asterix"> *</span> </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <input type="radio" name="ownOffice" ref="ownOffice" value="yes" autoComplete="off" 
                                  checked={this.state.ownOffice === "yes" ? "checked" : false}
                                  onChange= {this.selectownOffice.bind(this)}/> Yes
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <input type="radio" name="ownOffice" ref="ownOffice"  value="no" autoComplete="off"                       
                                  // value   = {this.state.ownOffice}
                                  onChange={this.selectownOffice.bind(this)}
                                  checked={this.state.ownOffice === "no" ? "checked" : false} /> No
                            </div>
                            {<div className="errorMsg">{this.state.errors2.ownOffice}</div>}
                          </div>      
                      </div>
                    </div>*/
                    /*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 hidden-xs hidden-sm">
                          <label>Attach PAN and Aadhar self attested copies <span className="asterix"> *</span></label>
                        </div>
                        <div className="hidden-lg hidden-md col-sm-12 col-xs-12 mt30">
                          <label>Attach PAN and Aadhar self attested copies <span className="asterix"> *</span></label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <input type="file" className="customInputKF inputBox nameParts" name="fileUpload"  ref="fileUpload" id="upload-file2"
                            onChange={this.uploadLogoImage.bind(this)} id="upload-file2"
                          />
                            <div className="errorMsg">{this.state.errors2.fileUpload}</div>
                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 hidden-xs hidden-sm ">
                          <label>How long you have been doing Financial Product distribution, Broking, planning or 
                                 insurance selling? Please Brief about your profession or business 
                                  <span className="asterix"> *</span>
                          </label>
                        </div>
                        <div className="hidden-lg hidden-md col-sm-12 col-xs-12 mt50 ">
                          <label>How long you have been doing Financial Product distribution, Broking, planning or 
                                 insurance selling? Please Brief about your profession or business 
                                  <span className="asterix"> *</span>
                          </label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <input type="text" className="customInputKF inputBox nameParts"
                            placeholder="Your answer" name="description"  ref="description"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.description}
                          />
                        </div>
                          <div className="errorMsg">{this.state.errors2.description}</div>

                      </div>
                    </div>*/



