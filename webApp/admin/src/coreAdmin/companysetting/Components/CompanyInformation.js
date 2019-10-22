import React, { Component } from 'react';
import { render }           from 'react-dom';
import S3FileUpload         from 'react-s3';
import { deleteFile }       from 'react-s3';
import SimpleReactValidator from 'simple-react-validator';
import InputMask            from 'react-input-mask';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";

const formValid = formerrors=>{
  /*console.log("formerrors",formerrors);*/
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const companymobileRegex  = RegExp(/^[0-9][0-9]{9}$|^$/);
const companyAddressRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);
const companywebsiteRegex = RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
const companypincodeRegex = RegExp(/^[1-9][0-9]{5}$/);
const companynameRegex    = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const emailRegex          = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^$/);

class CompanyInformation extends Component{
   constructor(props) {
    super(props);
    this.state = {
      companyId               : "",
      companyName             : "",
      companyContactNumber    : "",
      companyMobileNumber     : "",
      companyEmail            : "",
      companyAddress          : "",
      country                 : "",
      state                   : "",
      district                : "",
      city                    : "",
      taluka                  : "",
      pincode                 : "",
      companyLogo             : "",
      logoFilename            : "",
      companywebsite          : "",
      config                  : "",
      logo                    : "",
      data                    : [],
      submitVal               : true,
      formerrors              :{
                                firstcompanyname : " ",
                                companyMobile : " ",
                                companyEmailID  : " ",
                                companyAddressLine1 : " ",
                                companywebsitename : " ",
                                companyCountry : " ",
                                companyDistrict : " ",
                                companyState : " ",
                                companyTaluka : " ",
                                companyCity : " ",
                                companyPincode : " ",
                               },
    };
   
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    axios
      .get('/api/projectsettings/get/S3')
      .then((response)=>{
        // console.log("s3_response.............",response);
        const config = {
                            bucketName      : response.data.bucket,
                            dirName         : "wealthyvia",
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
      })

    axios
      .get('/api/companysettings/list')
      .then((response)=>{
        console.log("get list companysettings.............",response.data);
        var respData = response.data[0];
        this.setState({
                      companyId               : respData.companyId,
                      companyName             : respData.companyName,
                      companyContactNumber    : respData.companyContactNumber,
                      companyMobileNumber     : respData.companyMobileNumber,
                      companyEmail            : respData.companyEmail,
                      companywebsite          : respData.companywebsite,
                      companyAddress          : respData.companyaddress,
                      country                 : respData.country,
                      state                   : respData.state,
                      district                : respData.district,
                      city                    : respData.city,
                      pincode                 : respData.pincode,
                      taluka                  : respData.taluka,
                      // logo                    : respData.companyLogo,
                      logo                    : respData.logoFilename,
                      submitVal               : false,
                      formerrors              :{
                                                firstcompanyname : "",
                                                companyMobile : "",
                                                companyEmailID  : "",
                                                companyAddressLine1 : "",
                                                companywebsitename : "",
                                                companyCountry : "",
                                                companyDistrict : "",
                                                companyState : "",
                                                companyTaluka : "",
                                                companyCity : "",
                                                companyPincode : "",
                                               },

                    })
      })
      .catch(function(error){
        console.log(error);
          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
      })
  
  }

  componentWillMount() {
    // this.validator = new SimpleReactValidator();
  }

  removeCompanyImage(event){
    event.preventDefault();
    // var link = $(event.target).attr('data-link');

  }

  CompanyImage(){
    // var TempIamge = this.props.tempLogoData;
    // if(TempIamge){
    //   // this.setState({
    //   //   commonLogo : TempIamge.logo
    //   // })
    //   return TempIamge.logo;
    // }else{
    //   var companyData = CompanySettings.findOne({});
    //   if(companyData){
    //     if(companyData.companyLogo){
    //       // this.setState({
    //       //   commonLogo : companyData.companyLogo
    //       // })
    //       return companyData.companyLogo;
    //     }else{
    //       return '/images/CSLogo.png';
    //     }
    //   } else{
    //     return '/images/CSLogo.png';
    //   }
    // }
  }

  imgBrowse(e){
   
    e.preventDefault();
    // let self=this;      
    //   if(e.currentTarget.files){
    //   var file=e.currentTarget.files[0];
    //   if(file){
    //     var fileExt=e.currentTarget.files[0].name.split('.').pop();
    //     if (fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'svg' || fileExt == 'png' ) {
    //        attachLogoToS3Function(file,self);
    //     }else{
    //     swal({
    //       title:"abc",
    //       text:'Please upload only .jpg/.jpeg/.svg/.png files'});
    //     }
    //   }
    // }           
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.get && nextProps.get.length != 0){
console.log("innnuuu");
     this.setState({
                      companyName             : this.state.companyName,
                      companyContactNumber    : this.state.companyContactNumber,
                      companyMobileNumber     : this.state.companyMobileNumber,
                      companyEmail            : this.state.companyEmail,
                      companywebsite          : this.state.companywebsite,
                      companyAddress          : this.state.companyAddress,
                      country                 : this.state.country,
                      state                   : this.state.state,
                      district                : this.state.district,
                      city                    : this.state.city,
                      pincode                 : this.state.pincode,
                      taluka                  : this.state.taluka,
                      logo                    : this.state.logo,
                      logoFilename            : this.state.logo,
                      // logoFilename            : this.state.logoFilename,
     });
    }

    this.handleChange = this.handleChange.bind(this);
  }

  submitCompanyInformation=(event)=>{
    event.preventDefault();
    var companyInfoFormValue = {
                                companyName             : this.state.companyName,
                                companyContactNumber    : this.state.companyContactNumber,
                                companyMobileNumber     : this.state.companyMobileNumber,
                                companyEmail            : this.state.companyEmail,
                                companywebsite          : this.state.companywebsite,
                                companyaddress          : this.state.companyAddress,
                                country                 : this.state.country,
                                state                   : this.state.state,
                                district                : this.state.district,
                                city                    : this.state.city,
                                pincode                 : this.state.pincode,
                                taluka                  : this.state.taluka,
                                CompanyLogo             : this.state.logo,
                                // logoFilename            : this.state.logoFilename,
                                logoFilename            : this.state.logo,
                               }
    var companyInfoFormValueUpdate = {
                                companyName             : this.state.companyName,
                                companyContactNumber    : this.state.companyContactNumber,
                                companyMobileNumber     : this.state.companyMobileNumber,
                                companyEmail            : this.state.companyEmail,
                                companywebsite          : this.state.companywebsite,
                                companyaddress          : this.state.companyAddress,
                                country                 : this.state.country,
                                state                   : this.state.state,
                                district                : this.state.district,
                                city                    : this.state.city,
                                pincode                 : this.state.pincode,
                                taluka                  : this.state.taluka,
                                CompanyLogo             : this.state.logo,
                                logoFilename            : this.state.logo,
                                companyId               : 1,
                               }
    console.log('companyInfoFormValue =:', companyInfoFormValueUpdate);
      if(this.state.companyId == "1"){
       if(formValid(this.state.formerrors)){
        axios.patch('/api/companysettings/information',companyInfoFormValueUpdate)
        .then(function (response) {
          // handle success
          console.log("this is response===>>>",response);
          swal("Good job!", "Company Information Updated!", "success")
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          swal("", "Company Information submition failed!", "error")
          if(error.message === "Request failed with status code 401")
            {
                 swal("Your session is expired! Please login again.","", "error");
                 this.props.history.push("/");
            }

        })
        .finally(function () {
          // always executed
        });

      }else{
        swal("Please enter mandatory fields", "", "warning");
        console.error("FORM INVALID 1- DISPLAY ERROR MESSAGE");
      }
    }else{
      if(formValid(this.state.formerrors)){
        axios.post('/api/companysettings',companyInfoFormValue)
        .then(function (response) {
          // handle success
          console.log("this is response===>>>",response);
          swal("Good job!", "Company Information Submited!", "success")
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          swal("", "Company Information submition failed!", "error")
            if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }

        })
        .finally(function () {
          // always executed
        });

      }else{
        swal("Please enter mandatory fields", "", "warning");
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
    }
  
  }
  handleChange(event){
    // const target = event.target;
    // const {name , value}   = event.target;
    const datatype = event.target.getAttribute('data-text');
    const {name,value} = event.target;
    let formerrors = this.state.formerrors;
    
    console.log("datatype",datatype);
    switch (datatype){
     
      case 'firstcompanyname' : 
      formerrors.firstcompanyname = companynameRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
      break;

      case 'companyMobile' : 
      formerrors.companyMobile = companymobileRegex.test(value) && value.length>0 ? '' : "Please Enter Numbers only";
      break;

      case 'companyEmailID' : 
      formerrors.companyEmailID = emailRegex.test(value)  && value.length>0? "":"Invalid EmailID";
      break;
       
      case 'companywebsitename' : 
         formerrors.companywebsitename = companywebsiteRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;

       case 'companyAddressLine1' : 
       formerrors.companyAddressLine1 = companyAddressRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;
    
      case 'companyCountry' : 
        formerrors.companyCountry = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;
    
      case 'companyState' : 
        formerrors.companyState = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;
    
      case 'companyDistrict' : 
        formerrors.companyDistrict = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;

      case 'companyTaluka' : 
        formerrors.companyTaluka = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;

      case 'companyCity' : 
        formerrors.companyCity = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;

      case 'companyPincode' : 
        formerrors.companyPincode = companypincodeRegex.test(value)   && value.length>0? '' : "Invalid Field";
      break;
       
       default :
       break;

      //  case 'companyName' : 
      //  formerrors.companyName = value.length < 1 && value.lenght > 0 ? 'Minimum 1 Character required' : "";
      //  break;

    }
    // this.setState({formerrors,})
    this.setState({ formerrors,
      [name]:value
    } );
  }


  companyLogoUpload(event){
    event.preventDefault();
    var index = event.target.getAttribute('id');
    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      // console.log("file",file);
      if (file) {
      var fileName = file.name; 
        var ext = fileName.split('.').pop(); 
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
          if (file) {
            if(this.state.logo==""){
              S3FileUpload
                .uploadFile(file,this.state.config)
                .then((Data)=>{
                  console.log("Data = ",Data);
                  this.setState({
                    logo : Data.location
                  })
                  this.companyLogoDelete(index)
                })
                .catch((error)=>{
                  console.log("formErrors");
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
                        .uploadFile(file,this.state.config)
                        .then((Data)=>{
                          console.log("Data = ",Data);
                          this.setState({
                            logo : Data.location
                          })
                          this.companyLogoDelete(index)
                        })
                        .catch((error)=>{
                          console.log("formErrors");
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
          swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
        }
      }
    }
  }

  companyLogoDelete(index){
    var data = index.split("/");
    var imageName = data[4];
    console.log("index1--------------->",imageName);
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
  companyLogoDeleteDirect(event){
    event.preventDefault();
    swal({
          title: "Are you sure you want to delete this image?",
          text: "Once deleted, you will not be able to recover this image!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
              swal("Your image is deleted!");
              this.setState({
                logo : ""
              })
            } else {
            swal("Your image is safe!");
          }
        });  
  }

  render(){
    const {formerrors} = this.state;
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
         {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 Box-Bottom-Header compyHeader">
          <h4 className="lettersp MasterBudgetTitle">Company Information</h4>
          </div>*/}
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border_box1">
               <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Company Information</h5>
          </div>
               <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="companyInformationForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  






                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  {this.state.logo==""?
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 row pull-right padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Company Logo</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.companyLogoUpload.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add company Logo</h5>
                      </div> 
                    </div>
                    :null}
                  {this.state.logo==""?
                    null
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right padTopC">
                      <div className="containerC">
                        <label id="" className="pull-right custFaTimesComp" title="Delete image" onClick={this.companyLogoDeleteDirect.bind(this)}>X</label>
                        <img src={this.state.logo} alt="Avatar" className="imageC"/>
                        <div className="middleC">
                          <div className="textC">
                            <input type="file" title="Click to change the photo" multiple name="userPic" id={this.state.logo} onChange={this.companyLogoUpload.bind(this)} ref="workspaceImg" className="form-control click_input" />
                            <i className="fa fa-camera fa-2x"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Company Logo</h5>
                      </div>
                    </div>       
                  }                  
                </div>












                </div>
                 <div className="col-lg-12 margdiv">
                     <div className="col-lg-1 row">
                      <i className="fa fa-info-circle"></i>
                      </div>
                       <div className="col-lg-11 row">
                        <h4 className="basicinfotxt">Basic Info</h4>
                      </div> 
                 </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">      
                  <div className="formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >
                          Company Name
                        </label>
                        <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>   
                        <input
                          onChange={this.handleChange} 
                          type="text" name="companyName" 
                          value={this.state.companyName} 
                          data-text="firstcompanyname"
                          className="form-control areaStaes newinputbox"
                          placeholder="Company Name"
                          title="Please enter alphanumeric only" />

                        </div>
                        {this.state.formerrors.firstcompanyname &&(
                          <span className="text-danger">{formerrors.firstcompanyname}</span> 
                        )}
 
                    </div>  
                  </div>

                  <div className=" formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Company ID</label><span className="astrick"></span>
                        <input id="companyId" value={this.state.companyId} onChange={this.handleChange.bind(this)} type="text" name="companyId" ref="companyId" className="form-control areaStaes" title="Company ID" autoComplete="off" disabled />
                    </div>  
                  </div>
               
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className=" formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Phone</label><span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-mobile"></i>
                         </div>  
                        {/* <input className="form-control areaStaes" data-text="companyMobile" title="Please enter valid mobile number only" id="companyContactNumber" type="text" name="companyContactNumber" ref="companyContactNumber" value={this.state.companyContactNumber} aria-required="true" onChange={this.handleChange.bind(this)} required /> */}
                         <InputMask  mask="9999999999"  data-text="companyMobile" name="companyContactNumber" 
                         id="companyContactNumber" value={this.state.companyContactNumber}  ref="companyContactNumber" 
                         onChange={this.handleChange}  className="form-control areaStaes newinputbox" placeholder="Phone" required />
                        </div>
                        {this.state.formerrors.companyMobile &&(
                          <span className="text-danger">{formerrors.companyMobile}</span> 
                        )}
                    </div> 
                  </div>
                  <div className="formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Alternate Contact Number</label>
                         <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-mobile"></i>
                          </div>  
                         <InputMask  mask="9999999999" className="form-control areaStaes newinputbox" 
                         title="Please enter valid mobile number only" id="companyAltContactNumber" type="text"
                          name="companyMobileNumber" ref="companyMobileNumber" placeholder="Alternate Phone No."
                          value={this.state.companyMobileNumber} aria-required="true" onChange={this.handleChange.bind(this)} />
                        </div>
                    </div> 
                  </div>
                  <div className=" formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Company EmailID</label>
                        <span className="astrick">*</span>
                         <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-envelope-square"></i>
                         </div>  
                        <input className="form-control areaStaes newinputbox" 
                          title="Please enter valid email address" 
                          id="companyEmail" type="text"
                          data-text="companyEmailID" placeholder="Email"
                          name="companyEmail" ref="companyEmail" 
                          value={this.state.companyEmail} aria-required="true"
                          onChange={this.handleChange.bind(this)} required/>
                         </div>
                        {this.state.formerrors.companyEmailID &&  (
                          <span className="text-danger">{formerrors.companyEmailID}</span> 
                        )}
                   </div> 
                  </div>

                  <div className="formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Company Website</label><span className="astrick">*</span>
                         <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-mobile"></i>
                         </div> 
                         <input className="form-control areaStaes newinputbox" title="Please enter valid webside address"  
                         data-text="companywebsitename"  id="companywebsite" type="text" name="companywebsite"
                          ref="companywebsite" value={this.state.companywebsite} aria-required="true" placeholder="Company Website"
                           onChange={this.handleChange.bind(this)} required/>
                         </div>  
                        {this.state.formerrors.companywebsitename &&(
                            <span className="text-danger">{formerrors.companywebsitename}</span> 
                        )}
                    </div> 
                  </div>
                </div>
              </div>

              <div className=""> 
                <div className="col-lg-12 margdiv">
                  <div className="col-lg-1 row">
                   <i className="fa fa-map addressicon"></i>
                  </div>
                   <div className="col-lg-11 row">
                    <h4 className="basicinfotxt">Address</h4>
                  </div> 
                </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  {/* <div className="form-group formht col-lg-12 col-md-4 col-sm-12 col-xs-12">
                      <label className="control-label statelabel locationlabel" >Company Address</label><span className="astrick">*</span>
                      <input className="form-control areaStaes" title="Please enter valid address" id="companyAddressLine1" type="text" name="companyAddressLine1" ref="companyAddressLine1" value={this.state.companyAddressLine1} aria-required="true" onChange={this.handleChange.bind(this)} required/>
                      {this.state.formerrors.country &&(
                            <span className="text-danger">{formerrors.country}</span> 
                          )}
                  </div>  */}

                    <div className=" formht col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="">
                            <label className="control-label statelabel locationlabel" >
                                Company Address
                            </label>
                            <span className="astrick">*</span>
                            <div className="input-group inputBox-main  new_inputbx col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                <div className="input-group-addon inputIcon">
                                    <i className="fa fa-map-marker"></i>
                                </div> 
                                <input
                                    onChange={this.handleChange}
                                    type="text" name="companyAddress" 
                                    value={this.state.companyAddress} 
                                    data-text="companyAddressLine1" placeholder="Company Address"
                                    className="col-lg-12 form-control areaStaes newinputbox"
                                    title="Please enter alphanumeric only" />
                            </div> 
                            {this.state.formerrors.companyAddressLine1 &&(
                                <span className="text-danger">{formerrors.companyAddressLine1}</span> 
                            )}
                        </div>  
                    </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  {/* <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                  <div className="form-group">
                      <label className="control-label statelabel locationlabel" >Country<span className="astrick">*</span></label>
                      <select className="stateselection countrySelect form-control" title="Please select country" id="companyCountry" value={this.state.companyCountry}  ref="companyCountry" name="companyCountry" onChange={this.handleChange} required>
                      <option value="">-Select-</option>
                  
                      </select>
                  </div>
                  </div>
                  <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <div className="form-group">
                      <label className="control-label statelabel locationlabel" >State<span className="astrick">*</span></label>
                      <select className="stateselection stateSelect form-control" title="Please select state" id="companyState" value={this.state.companyState}  ref="companyState" name="companyState" onChange={this.handleChange} required>
                        <option value="">-Select-</option>
                      
                        </select> 
                    </div> 
                  </div>
                  <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <div className="form-group">
                          <label className="control-label statelabel locationlabel" >District<span className="astrick">*</span></label>
                         <select className="stateselection districtSelect form-control" title="Please select district" id="companyDist" value={this.state.companyDist}  ref="companyDist" name="companyDist" onChange={this.handleChange} required>
                         <option value="">-Select-</option>
                      
                        </select> 
                    </div>
                  </div> */}

                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            Country
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-flag"></i>
                         </div>  
                          <input
                            onChange={this.handleChange} 
                            type="text" name="country" 
                            data-text="companyCountry" placeholder="Country"
                            className="form-control areaStaes newinputbox"
                            value={this.state.country}
                            title="Please enter alphanumeric only" />
                          </div>
                          
                          {this.state.formerrors.companyCountry &&(
                            <span className="text-danger">{formerrors.companyCountry}</span> 
                          )}

                      </div>  
                    </div>

                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            State
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                           <i className="fa fa-crosshairs"></i>
                         </div>    
                          <input
                            onChange={this.handleChange} 
                            type="text" name="state" 
                            data-text="companyState" placeholder="State"
                            className="form-control areaStaes newinputbox"
                            value={this.state.state}

                            title="Please enter alphanumeric only" />
                           </div> 
                          
                          {this.state.formerrors.companyState &&(
                            <span className="text-danger">{formerrors.companyState}</span> 
                          )}

                      </div>  
                    </div>

                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            District
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                           <i className="fa fa-crosshairs"></i>
                         </div> 
                          
                          <input
                            onChange={this.handleChange} 
                            type="text" name="district" 
                            data-text="companyDistrict" placeholder="District"
                            className="form-control areaStaes newinputbox"
                            value={this.state.district}

                            title="Please enter alphanumeric only" />
                          </div>  
                          
                          {this.state.formerrors.companyDistrict &&(
                            <span className="text-danger">{formerrors.companyDistrict}</span> 
                          )}

                      </div>  
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-4 col-sm-12 col-xs-12 compForm">
                    {/* <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >Taluka<span className="astrick">*</span></label>
                           <select className="stateselection talukaSelect form-control" title="Please select taluka" id="taluka" value={this.state.taluka}  ref="taluka" name="taluka" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                      
                          </select>  
                      </div>
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >City<span className="astrick">*</span></label>
                           <select className="stateselection villageSelect form-control" title="Please select city" id="companyCity" value={this.state.companyCity}  ref="companyCity" name="companyCity" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                         
                          </select> 
                      </div>
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                          <label className="control-label statelabel locationlabel" >Pin Code<span className="astrick">*</span></label>
                          <select className="stateselection  form-control" title="Please select pincode" id="companyPincode" value={this.state.companyPincode} ref="companyPincode" name="companyPincode" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                        
                          </select>
                      </div>
                    </div> */}

                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            Taluka
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-crosshairs InputAddOn fa"></i>
                         </div> 
                          
                          <input
                            onChange={this.handleChange} 
                            type="text" name="taluka" 
                            data-text="companyTaluka" placeholder="Taluka"
                            value={this.state.taluka}
                            className="form-control areaStaes newinputbox"
                            title="Please enter alphanumeric only" />
                          </div>
                          {this.state.formerrors.companyTaluka &&(
                            <span className="text-danger">{formerrors.companyTaluka}</span> 
                          )}

                      </div>  
                    </div>


                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            City
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                           <i className="fa fa-crosshairs"></i>
                         </div>  
                          <input
                            onChange={this.handleChange} 
                            type="text" name="city" 
                            data-text="companyCity" placeholder="City"
                            value={this.state.city}

                            className="form-control areaStaes newinputbox"
                            title="Please enter alphanumeric only" />
                            </div>
                          
                          {this.state.formerrors.companyCity &&(
                            <span className="text-danger">{formerrors.companyCity}</span> 
                          )}

                      </div>  
                    </div>


                    <div className="formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            Pincode
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon inputIcon">
                            <i className="fa fa-map-marker"></i>
                         </div> 
                          
                          <input
                            onChange={this.handleChange} 
                            type="text" name="pincode" 
                            data-text="companyPincode" placeholder="Pincode"
                            value={this.state.pincode}
                            className="form-control areaStaes newinputbox"
                            title="Please enter alphanumeric only" />
                         </div>   
                          
                          {this.state.formerrors.companyPincode &&(
                            <span className="text-danger">{formerrors.companyPincode}</span> 
                          )}

                      </div>  
                    </div>
                  
                  </div>
                  
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginBtmDiv">
                <button className="btn buttontAddEdit pull-right" id="btnCheck"  onClick={this.submitCompanyInformation.bind(this)}>
                  {this.state.submitVal?"Submit":"Update"}  
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>

      );
  }

 }

 export default CompanyInformation;













             // <div className="form-group formht col-lg-3 col-md-6 col-sm-12 col-xs-12 pull-right">   
             //        <div className="">
             //          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerPhotoWrapper">
             //              {this.CompanyImage() === '../images/3.png'? <i className="fa fa-camera fonticons" aria-hidden="true" title="First Add Photo."/>
             //              :
             //              <i className="fa fa-times fonticons removeprofPhoto" aria-hidden="true" title="Remove Photo." onClick={this.companyLogoDeleteDirect.bind(this)} data-link={this.state.companyLogo} id={this.state.companyLogo} data-id={this.state.companyId}></i>
             //              }
             //              <div className="col-lg-12 col-md-12 col-sm-12ClientImgWrap1 displayBlockOne">
             //                {
             //                this.CompanyImage() ==='../images/CSLogo.png' ?  <i className="fa fa-camera fonticons paddingNoImageUpload col-lg-2 col-md-2 col-sm-2   styleUpload" title="Add Photo.">
             //                <input type="file" className="col-lg-1 col-md-1 col-sm-1 col-xs-12 browseDoc" accept="image/*" onChange={this.companyLogoUpload.bind(this)}/> </i>
             //                  :
             //                  <i className="fa fa-camera fonticons paddingNoImageUpload col-lg-2  styleUpload" title="Change Photo.">
             //                    <input type="file" className="col-lg-1 col-md-1 col-sm-1 col-xs-1 browseDoc" accept="image/*" onChange={this.companyLogoUpload.bind(this)}/>
             //                  </i>
             //                }
             //              </div>

             //                {<img className="col-lg-12 col-md-12 col-sm-12 ClientImgWrap1 displayLogoOne" src={this.CompanyImage()?this.CompanyImage() :""}/>}
             //                {/* {this.getUploadServicesPercentage()} */}
                        
             //          </div>
             //        </div>
             //      </div>