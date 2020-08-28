import React, {Component} from 'react';
import "./distributorEditForm.css";

import InputMask from 'react-input-mask';
import swal  from 'sweetalert';
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';
import moment from 'moment';
import axios  from 'axios';
import $ from 'jquery';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";


export default class distributeEditForm extends Component{
  constructor(props){
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    super(props);
     this.state  ={
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
          "config"       : "",
          "education"    :"",
          "fileUpload"   : "",
          "portfolioImage1" : "",
          "fileUpload1"     : "",
          "portfolioImage2" : "",
          "education"    :"",
          "description"  :"",
          "errors"       :{},
          "fields2"      :{},
          "errors2"      :{},

          gmapsLoaded    : false,
      }
      this.handleChange = this.handleChange.bind(this);
  }


  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

  componentDidMount(){

      axios
          .get('/api/projectsettings/get/S3')
          .then((response)=>{
            // console.log("response",response);
            const config = {
                              bucketName      : response.data.bucket,
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




    //================= Google Maps ======================//

      window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE&libraries=places&callback=initMap`    
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)


    //=================Update Data============================//


  var disid = this.props.match.params.ID;
    console.log("disid-----------------------------------------",disid);
     axios.get("/api/distributormaster/get/one/"+disid)
        .then((res)=>{
          var DistributorData = res.data
            console.log("Distribiter.state = " , DistributorData);
            var fields2 = {
              "firstname"     : DistributorData.firstname,
              "lastname"      : DistributorData.lastname,
              "phone"         : DistributorData.phone,
              "email"         : DistributorData.email.address,
              "dob"           : DistributorData.dob,
              "adressLine"    : DistributorData.address ? DistributorData.address.adressLine : '',
              "city"          : DistributorData.address ? DistributorData.address.city : '',
              "state"         : DistributorData.address ? DistributorData.address.state : '',
              "country"       : DistributorData.address ? DistributorData.address.country : '',
              "status"        : DistributorData.status,
              "gst"           : DistributorData.gst,
              "website"           : DistributorData.website,
              "education"     : DistributorData.education,
              "description"   : DistributorData.description,
              "ownOffice"     : DistributorData.ownOffice,
              "fileUpload"    : DistributorData.fileUpload,
              "fileUpload1"    : DistributorData.fileUpload1,
            };
            console.log("Distribiter.fiels2 = " , DistributorData);

            this.setState({
              "firstname"     : DistributorData.firstname,
              "lastname"      : DistributorData.lastname,
              "phone"         : DistributorData.phone,
              "email"         : DistributorData.email.address,
              "dob"           : DistributorData.dob,
              "adressLine"    : DistributorData.address ? DistributorData.address.adressLine : '',
              "city"          : DistributorData.address ? DistributorData.address.city : '',
              "state"         : DistributorData.address ? DistributorData.address.state : '',
              "country"       : DistributorData.address ? DistributorData.address.country : '',
              "status"        : DistributorData.status,
              "gst"           : DistributorData.gst,
              "website"       : DistributorData.website,
              "education"     : DistributorData.education,
              "description"   : DistributorData.description,
              "ownOffice"     : DistributorData.ownOffice,
              "fileUpload"    : DistributorData.fileUpload,
              "fileUpload1"    : DistributorData.fileUpload1,
              "portfolioImage1"    : DistributorData.fileUpload,
              "portfolioImage2"    : DistributorData.fileUpload1,
               fields2        :  fields2
            });            
            console.log("Distribiter.setstate = " , res.data.fileUpload);
            console.log("Distribiter.setstate = " , res.data.fileUpload1);

        })
         .catch((error)=>{
            console.log("Error while getting jobData = ", error);
            swal("Oops...","Something went wrong <br/>"+error,"error");
          });
  }

  handleChange(event){
    var name = event.currentTarget.name;
    this.setState({ [name] : event.currentTarget.value })

    let fields2 = this.state.fields2;  
    fields2[event.target.name] = event.target.value;
    this.setState({
      fields2
    });
  
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
    // if (this.validateForm() && this.validateFormReq()) {
      let errors2 = {};
      errors2[event.target.name] = "";
      this.setState({
        errors2: errors2
      });
    // }
    var index = event.target.getAttribute('id');

    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
        fileUploadName : newFile.name,
      })
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf" ||  ext==="xlsx"||  ext==="xls"||  ext==="csv"){ 
          if (newFile) {
            if(this.state.fileUpload===""){
              console.log("newFile",newFile);
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
          console.log("index",index);
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
      console.log("fileUpload1",this.state.fileUpload1);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf"){ 
          if (newFile) {
            if(this.state.fileUpload1 && this.state.fileUpload1.length === 0){
            console.log("this.state.confiq",this.state.config);
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{
                 console.log("fileUpload1 data",Data)
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
        if (!fields["ownOffice"]) {
          formIsValid = false;
          errors["ownOffice"] = "This field is required.";
        }     
        if (!fields["education"]) {
          formIsValid = false;
          errors["education"] = "This field is required.";
        }
        if (!fields["dob"]) {
          formIsValid = false;
          errors["dob"] = "This field is required.";
        }          
        if (!fields["fileUpload"]) {
          formIsValid = false;
          errors["fileUpload"] = "This field is required.";
        }          
        if (!fields["phone"]) {
          formIsValid = false;
          errors["phone"] = "This field is required.";
        }
        if (!fields["gst"]) {
          formIsValid = false;
          errors["gst"] = "This field is required.";
        }
        if (!fields["description"]) {
          formIsValid = false;
          errors["description"] = "This field is required.";
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
        // console.log("phone",errors["phone"]);
      }     
      this.setState({
        errors2: errors
      });
      return formIsValid;
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
      if (!fields["[phone]"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["contactNumber"] = "Please enter valid mobile no.";
      }
    }        
    this.setState({
      errors: errors
    });
    return formIsValid;
  }


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
        console.log("countrt=>",this.state.area)
        console.log("countryCode=>",this.state.district)
      })

       
        })
     
      .catch(error => console.error('Error', error));

      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'latLng': latLng}))
      .catch(error => console.error('Error', error));
     
      this.setState({ adressLine : address});
  };
    handleChangePlaces = address => {
        this.setState({ adressLine : address});
  };


  handleSubmit(event) {
   event.preventDefault();
    var disid = this.props.match.params.ID;
    // console.log("userid-----------------------------------------",userid);
    if (this.validateFormReview() && this.validateFormReqReview()) {
      var formvalues = {
            "firstname"    :this.state.firstname,
            "lastname"     :this.state.lastname,
            "phone"        :this.state.phone,
            "dob"          :this.state.dob,
            "email"        :this.state.email,
            "adressLine"   :this.state.adressLine,
            "gst"          :this.state.gst,
            "state"        :this.state.state,
            "ownOffice"    :this.state.ownOffice,
            "education"    :this.state.education,
            "fileUpload"   :this.state.portfolioImage1, 
            "fileUpload1"   :this.state.portfolioImage2,          
            "country"         : this.state.country,
            "countryCode"     : this.state.countryCode,
            "state"           : this.state.state,
            "stateCode"       : this.state.stateCode,
            "website"         : this.state.website,
            "city"            : this.state.city,
            "latitude"        : this.state.latLng, 
            "longitude"           : this.state.latLng,   
            "latitude"            : this.state.latLng ? this.state.latLng.lat : "",
            "longitude"           : this.state.latLng ? this.state.latLng.lng : "",        
            "education"    :this.state.education,
            "description"  :this.state.description,
      }
      console.log("formvalues",formvalues);

        axios.patch('/api/distributormaster/patch/'+disid,formvalues)
        .then((response)=> {    
          swal("Distributor information updated Succesfully","", "success");    
           this.props.history.push('/new-distributor-list'); 
           console.log('response --====================',response);

        })
      }
  }

  deleteBlogimage(event){
    // event.preventDefault();
    swal({
        title: "Are you sure you want to delete this image?",
        text: "Once deleted, you will not be able to recover this image!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((success) => {
          console.log("inside success",success);
            if (success) {
              swal("Your image is deleted!");
              this.setState({
                portfolioImage1 : ""
              })

          console.log("inside fileUpload",this.state.portfolioImage1);
            } else {
            swal("Your image is safe!");
          }
        });
  }
  deleteBlogimage1(event){
    event.preventDefault();
    console.log("inside deleteBlogimage1")
      swal({
            title: "Are you sure you want to delete this image?",
            text: "Once deleted, you will not be able to recover this image!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        .then((success) => {
          console.log("success",success);
            if (success) {
              swal("Your image is deleted!");

              this.setState({
                portfolioImage2 : ""
              })
              console.log("portfolioImage2",this.state.portfolioImage2)
            } else {
            swal("Your image is safe!");
          }
        });
  }



  render(){
        var oldDate = new Date();
        oldDate.setFullYear(oldDate.getFullYear() - 18);

        const searchOptions = {componentRestrictions: {country: "in"}}

    return(
      <div>
          <div>                 
            <section className=" viewContent">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mheight">                
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12   marginT ">
                      <h4 className="HeadDistributer">Edit Distributor Form</h4>
                   <hr/>
                   </div>        
                  <div className=" with-border boxMinHeight">                    
                    <div className="box-body">                        
                      <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12  EditUserProfileWrap">
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 ">
                           <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent btmmargin">
                              <label className="formLable">First Name <label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                               <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                 <i className="fa fa-user-circle fa "></i>
                                </div>  
                                  <input type="text" style={{textTransform:'capitalize'}} className="form-control UMname inputText form-control  has-content" id="firstname" ref="firstname" name="firstname" placeholder="First Name" 
                                      value={this.state.firstname} 
                                      onChange={this.handleChange}  />
                                    <div className="errorMsg">{this.state.errors2.firstname}</div>
                               </div>   
                              </span>
                           </div>
                            <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent">
                                <label className="formLable">Last Name <label className="requiredsign">*</label></label>
                                <span className="blocking-span ">
                                <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                    <i className="fa fa-user-circle fa "></i>
                                  </div>  
                                   <input type="text"className="form-control UMname inputText form-control  has-content indexcls" id="lastname" ref="lastname" name="lastname"   placeholder="Last Name"
                                      value={this.state.lastname} 
                                      onChange={this.handleChange}
                                    />
                                    <div className="errorMsg">{this.state.errors2.lastname}</div>
                                </div>   
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                           <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 group btmmargin inputContent">
                            <label className="formLable">Mobile Number <label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                    <div className="input-group-addon remove_brdr inputIcon">
                                       <i className="fa fa-mobile"></i>
                                    </div>  
                                    <InputMask  mask="9999999999"  type="text" 
                                        className="form-control UMname inputText form-control  has-content" placeholder="mobile number" id="phone" ref="phone" name="phone" 
                                          value={this.state.phone} 
                                          onChange={this.handleChange}/>
                                        <div className="errorMsg">{this.state.errors2.phone}</div>

                                 </div>   
                              </span>
                            </div>
                            <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent">
                            <label className="formLable">Username/Email <label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                               <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                 <i className="fa fa-user-circle fa "></i>
                                </div>  
                                <input type="email"  className="disableInput inputMaterial form-control inputText" id="email" ref="email"  name="email" required
                                    value={this.state.email || ''}
                                    onChange={this.handleChange}
                                />
                                    <div className="errorMsg">{this.state.errors2.email}</div>
                               </div>   
                              </span>
                           </div>
                        </div>
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                           <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 group btmmargin inputContent">
                            <label className="formLable">GST Number <label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                    <div className="input-group-addon remove_brdr inputIcon">
                                       <i className="fa fa-id-card"></i>
                                    </div>  
                                    <input type="number"  className="disableInput inputMaterial form-control inputText" ref="gst"  name="gst" required
                                        value={this.state.gst}
                                        onChange={this.handleChange}
                                    />
                                    <div className="errorMsg">{this.state.errors2.gst}</div>
                                 </div>   
                              </span>
                            </div>
                            <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                              <label className="formLable">Date Of Birth <label className="requiredsign">*</label></label>
                                <span className="blocking-span">
                                   <div className="input-group inputBox-main  new_inputbx " >
                                      <div className="input-group-addon remove_brdr inputIcon">
                                         <i className="fa fa-birthday-cake fa"></i>
                                      </div>  
                                      <input type="date" className="disableInput inputMaterial form-control inputText" name="dob" ref="dob" 
                                          onChange={this.handleChange}
                                          value={this.state.dob}  required
                                          max={moment(oldDate).format("YYYY-MM-DD")}
                                      />
                                    <div className="errorMsg">{this.state.errors2.dob}</div>
                                   </div>   
                                </span>
                            </div>
                        </div>
                          <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                            <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 group btmmargin inputContent">
                              <label className="formLable">Education <label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                               <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                 <i className="fa fa-graduation-cap"></i>
                                </div>  
                                <input type="text"  className="disableInput inputMaterial form-control inputText" ref="education"  name="education" required
                                  value={this.state.education}
                                  onChange={this.handleChange}
                                />
                                  <div className="errorMsg">{this.state.errors2.education}</div>
                               </div>   
                              </span>
                            </div>
                            <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                              <label className="formLable">Website (If there is an existing website)<label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                    <div className="input-group-addon remove_brdr inputIcon">
                                       <i className="fa fa-user-circle"></i>
                                    </div>  
                                    <input type="text" className="disableInput inputMaterial form-control inputText" ref="website"  name="website" required
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.website}
                                    />
                                    <div className="errorMsg">{this.state.errors2.website}</div>
                                 </div>   
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                            <div className="col-lg-4 col-sm-12 col-xs-12 col-md-6 group btmmargin inputContent">
                              <label htmlFor='fileUpload' className="formLable">Attach PAN <label className="requiredsign">*</label></label>
                                <span className="blocking-span">
                                   <div className="input-group inputBox-main  new_inputbx " >
                                      <div className="input-group-addon remove_brdr inputIcon">
                                         <i className="fa fa-user-circle"></i>
                                      </div>  
                                      <input type="file"  className="disableInput inputMaterial form-control inputText"id="upload-file2" name="fileUpload" ref="fileUpload"
                                           onChange={this.uploadLogoImage.bind(this)} 
                                      />
                                      <div className="errorMsg">{this.state.errors2.fileUpload}</div>
                                   </div>   
                                </span>
                            </div>  
                            <div className="col-lg-2 col-md-6 col-xs-12  col-sm-2 nopadding ">
                              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 row nopadding">
                              { this.state.portfolioImage1!=="" ? 
                                <div>
                                  <label className="pull-right custFaTimes zeromargin" title="Delete image"  onClick={this.deleteBlogimage.bind(this)}>X</label>
                                 {
                                  (this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "") === "pdf" || (this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "") === "PDF" ?
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setpdf" id="LogoImageUpOne">
                                      <img src="/images/pdf.png"/>
                                      <span className="setp">{(this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "")}</span>
                                    </div>
                                    :
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosPersonmaster" id="licenseProof">
                                      <img src={this.state.portfolioImage1} height="50" width="50"/>
                                    </div> 
                                }

                                </div>
                                : 
                                <div> </div>
                              }
                              </div>
                            </div>  
                            <div className="col-lg-4 col-sm-12 col-xs-12 col-md-6 group btmmargin inputContent">
                              <label htmlFor='filrUpload' className="formLable">Attach Aadhar <label className="requiredsign">*</label></label>
                                <span className="blocking-span">
                                   <div className="input-group inputBox-main  new_inputbx " >
                                      <div className="input-group-addon remove_brdr inputIcon">
                                         <i className="fa fa-user-circle"></i>
                                      </div>  
                                      <input type="file"  className="disableInput inputMaterial form-control inputText"id="upload-file2" name="fileUpload1" ref="fileUpload1"
                                           onChange={this.uploadLogoImage1.bind(this)} 
                                      />
                                      <div className="errorMsg">{this.state.errors2.fileUpload1}</div>
                                   </div>   
                                </span>
                            </div>  
                            <div className="col-lg-2 col-md-6 col-xs-12  col-sm-2 nopadding ">
                              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 row nopadding">
                              { this.state.portfolioImage2!=="" ? 
                                <div>
                                  <label className="pull-right custFaTimes zeromargin labelColor" title="Delete image"  onClick={this.deleteBlogimage1.bind(this)}>X</label>
                                 {
                                  (this.state.portfolioImage2 ? this.state.portfolioImage2.split('.').pop() : "") === "pdf" || (this.state.portfolioImage2 ? this.state.portfolioImage2.split('.').pop() : "") === "PDF" ?
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setpdf" id="LogoImageUpOne">
                                      <img src="/images/pdf.png"/>
                                      <span className="setp">{(this.state.portfolioImage2 ? this.state.portfolioImage2.split('.').pop() : "")}</span>
                                    </div>
                                    :
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosPersonmaster" id="licenseProof">
                                      <img src={this.state.portfolioImage2} height="50" width="50"/>
                                    </div>
                                }

                                </div>
                                : 
                                <div> </div>
                              }
                              </div>
                            </div>
                          </div>
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                           <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin setplusZindex inputContent">
                            <label className="formLable">Location <label className="requiredsign">*</label></label>
                              <span className="blocking-span setplusZindex">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                    <div className="input-group-addon remove_brdr inputIcon">
                                       <i className="fa fa-map-marker"></i>
                                    </div> 
                                      {this.state.gmapsLoaded ?                        
                                        <PlacesAutocomplete
                                              value         ={this.state.adressLine} 
                                              onChange      ={this.handleChangePlaces}
                                              onSelect      ={this.handleSelect}
                                              searchOptions ={searchOptions}
                                        >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                          <div>
                                              <input 
                                                {...getInputProps({
                                                  className: 'form-control  abacusTextbox oesSignUpForm sentanceCase'
                                                  ,
                                                })} 
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
                                    <input type="text"  className="disableInput inputMaterial setplusZindex form-control inputText" name="adressLine" ref="adressLine" required 
                                      onChange={this.handleChange}
                                      value={this.state.adressLine}  
                                      />
                                    }
                                 </div>   
                              </span>
                            </div> 
                        </div>  
                                                                                                   
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 setZindex">
                           <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin inputContent setZindex">
                            <label className="formLable">How long you have been doing Financial Product distribution, Broking, planning or 
                               insurance selling? Please Brief about your profession or business<label className="requiredsign">*</label></label>
                              <span className="blocking-span">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                    <div className="input-group-addon remove_brdr inputIcon">
                                       <i className="fa fa-user-circle"></i>
                                    </div>  
                                    <input type="text" className="disableInput inputMaterial form-control inputText" ref="description"  name="description" required
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.description}
                                    />
                                    <div className="errorMsg">{this.state.errors2.description}</div>
                                 </div>   
                              </span>
                            </div>                          
                        </div>
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 mb30">
                           <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin inputContent">
                             <label className="formLable">Do you have your own Office? <label className="requiredsign">*</label></label>
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
                            </div>
                        </div>
{/*
                         <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                           <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin setplusZindex inputContent">
                            <label className="formLable">Location <label className="requiredsign">*</label></label>
                              <span className="blocking-span setplusZindex">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                    <div className="input-group-addon remove_brdr inputIcon">
                                       <i className="fa fa-map-marker"></i>
                                    </div> 
                                      {this.state.gmapsLoaded ?                        
                                        <PlacesAutocomplete
                                              value         ={this.state.adressLine} 
                                              onChange      ={this.handleChangePlaces}
                                              onSelect      ={this.handleSelect}
                                              searchOptions ={searchOptions}
                                        >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                          <div>
                                              <input 
                                                {...getInputProps({
                                                  className: 'form-control  abacusTextbox oesSignUpForm sentanceCase'
                                                  ,
                                                })} 
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
                                    <input type="text"  className="disableInput inputMaterial setplusZindex form-control inputText" name="adressLine" ref="adressLine" required 
                                      onChange={this.handleChange}
                                      value={this.state.adressLine}  
                                      />
                                    }
                                 </div>   
                              </span>
                            </div> 
                        </div>*/} 

                      </div>
                       
                      
                        
                          <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 pull-right marginT userProfileEditBtn">
                              <button className="btn btn-primary pull-right marginT" onClick={this.handleSubmit.bind(this)}>&nbsp; &nbsp;Update Profile&nbsp; &nbsp;</button>
                          </div>
                        </div>
                      </div>  
                </div>
              </div>
            </section>
        </div>
    </div>
                  
      )
  }

}   