import React, { Component }               from 'react';
import $                                  from 'jquery';
import swal                               from 'sweetalert';
import axios                              from 'axios';
import S3FileUpload                       from 'react-s3';
import "./Addkycdetails.css";
import { withRouter } from 'react-router-dom';


class Addkycdetails extends Component {

  constructor(props) {
    super(props);
        this.state = {
          "panDocument"           : "",
          "panDocumentName"       : "",
          "panDocumentLocation"   : "",
          "aadharDocument"        : "",
          "aadharDocumentName"    : "",
          "aadharDocumentLocation": "",
          "cancelledCheck"           : "",
          "cancelledCheckName"       : "",
          "cancelledCheckLocation"   : "",
          "bankStatement"           : "",
          "bankStatementName"       : "",
          "bankStatementLocation"   : "",
          "uploadPhoto"           : "",
          "uploadPhotoName"       : "",
          "uploadPhotoLocation"   : "",
          "amountInvesting"           : "",
          "panNumber"           : "",
          "gstNumber"           : "",
          "fields"                : {},
          "errors"                : {}, 
          "userinfo"              : {}, 
          buttonHeading        : "Submit",
        }
        this.baseState = this.state;
  }

  componentDidMount()
    {
     
      const userid = localStorage.getItem('user_ID');
       axios.get("/api/users/get/"+userid)
        .then((response)=>{ 
          // console.log("userinfo data=>", response.data);
            this.setState({
                userinfo : response.data
            })

        })
        .catch((error)=>{
              console.log('error', error);
        })
       
          axios
        .get('/api/projectsettings/get/S3')
        .then((response)=>{
          const config = 
                         {
                            
                            bucketName      : response.data.bucket,
                            dirName         : response.data.bucket,
                            region          : response.data.region,
                            accessKeyId     : response.data.key,
                            secretAccessKey : response.data.secret,
                        }
          this.setState({
            config : config
          })
        })
        .catch(function(error){
          // console.log(error);
            if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/");
                }
        })
  }

  ScrollTop(event){
    window.scrollTo(0,0);
  }

  handleChange(event){
    var targetname = event.target.name;
    var targetvalue = event.target.value;
    this.setState({
      [targetname] : targetvalue
    });
   let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
    if (this.validateForm() && this.validateFormReq()) {
      let errors = {};
      errors[event.target.name] = "";
      this.setState({
        errors: errors
      });
    }
  }

  validateFormReq() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
       
    if (!fields["panDocument"]) {
      formIsValid = false;
      errors["panDocument"] = "This field is required.";
    }
    if (!fields["aadharDocument"]) {
      formIsValid = false;
      errors["aadharDocument"] = "This field is required.";
    }
    if (!fields["cancelledCheck"]) {
      formIsValid = false;
      errors["cancelledCheck"] = "This field is required.";
    }
    if (!fields["bankStatement"]) {
      formIsValid = false;
      errors["bankStatement"] = "This field is required.";
    }
    if (!fields["uploadPhoto"]) {
      formIsValid = false;
      errors["uploadPhoto"] = "This field is required.";
    }
    if (!fields["amountInvesting"]) {
      formIsValid = false;
      errors["amountInvesting"] = "This field is required.";
    } 
    if (!fields["panNumber"]) {
      formIsValid = false;
      errors["panNumber"] = "This field is required.";
    } 
      
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;


    if (typeof fields["amountInvesting"] !== "undefined") {
      if (!fields["amountInvesting"].match(/^[0-9]/)) {
        formIsValid = false;
        errors["amountInvesting"] = "Please enter valid amount.";
      }

    } 
    
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  checkSizeuploadDocument(event){
    var file = event.target.files[0];
    var targetname = event.target.name;
    var targetvalue = event.target.value;
    var uploadfilelocation = targetname + "Location";
    var uploadfilename = targetname + "Name";
    if(file){
       if(file.size>2097152){
          swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
          event.target.value ="";
       }
       else{
            var index = event.target.getAttribute('id');
          let self = this;
          if (event.currentTarget.files && event.currentTarget.files[0]) {
            var file = event.currentTarget.files[0];
            var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
            var newFile = new File([file],newFileName);
            this.setState({
                [uploadfilename] : newFile.name,
            })
            if (newFile) {
              var ext = newFile.name.split('.').pop();
              if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf" ){ 
                if (newFile) {
                  if(this.state[targetname]===""){
                    S3FileUpload
                      .uploadFile(newFile,this.state.config)
                      .then((Data)=>{ 
                        this.setState({
                          [uploadfilelocation] : Data.location,
                          [targetname]         : targetvalue
                        },()=>{
                              this.deleteimageLogo(this.state[uploadfilelocation])
                          })
                        
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
                                    uploadfilelocation : Data.location,
                                  },()=>{
                                    this.deleteimageLogo(this.state[uploadfilelocation])
                                  })
                                  
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
    }
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
    if (this.validateForm() ) {
      let errors = {};
      errors[event.target.name] = "";
      this.setState({
        errors: errors
      });
    }
     
  }

  Submit(event){
    event.preventDefault();
    
    // console.log("this.state", this.state);
      if (this.validateForm() && this.validateFormReq()) {
        this.setState({
          buttonHeading : 'We are processing. Please Wait...',
        });

        var userid = localStorage.getItem('user_ID');
        var formvalues = {
          panNumber : this.state.panNumber,
          gstNumber : this.state.gstNumber
        }
        axios.patch("/api/users/patch/updatekyc/user/"+userid, formvalues)
        .then((response)=>{ 
           //console.log("userinfo data=>", response.data);           

        })
        .catch((error)=>{
              console.log('error', error);
        })

       // console.log("userinfo", this.state.userinfo);
        var dataArray1={
          "name"             : this.state.userinfo.fullName,
          "email"            : this.state.userinfo.email,
          "contactNumber"    : this.state.userinfo.mobNumber,
          "amountInvesting"  : this.state.amountInvesting,
          "panNumber"        : this.state.panNumber,
          "gstNumber"        : this.state.gstNumber
        }
        if(dataArray1){
          var adminEmail = "monikapawashe25@gmail.com";

              const dataArray = {
              "email"         : dataArray1.email ,
              "subject"       : "Your KYC details is sent successfully.",
              "message"          : "", 
              "mail"          : 'Dear  ' + dataArray1.name + ', <br/><br/>'+
                                "Congratulations!<br/><br/>Your KYC details has been successfully delivered to the admin! <br/> We will get back to you shortly. <br/> <br/> " + 
                                "<b>Details Submitted - </b><br/> Name: "  + dataArray1.name + '<br/>'+
                                "Contact Number :" + dataArray1.contactNumber + '<br/>'+
                                "Email :" + dataArray1.email + '<br/>'+
                                "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,

          };
          axios
          .post('/send-email',dataArray)
          .then((res)=>{
             if(res.status === 200){
          
              const formValues2 = {
                "email"         : adminEmail ,
                "subject"       : "New KYC details arrived from client!",
                "mail"          : 'Dear Admin, <br/>'+
                                  "New KYC details came from client. <br/> <br/>Details are as follows -<br/> <br/>" + 
                                  "<b> Name: </b>"   + dataArray1.name + '<br/>'+
                                  "<b> Email: </b>"  + dataArray1.email + '<br/>'+
                                  "<b> Contact Number: </b>"  + dataArray1.contactNumber + '<br/><br/>'+
                              
                                  "<b> Amount Investment: </b>"+ dataArray1.amountInvesting + " <br/>"+
                                  "<b> Pan Number:  </b>"+ dataArray1.panNumber + " <br/>"+
                                  "<b> GST Number </b>"+ dataArray1.gstNumber + " <br/>"+
                                  "" ,
                 "attachments" : [{
                        "name" : this.state.panDocumentName,
                        "path" : this.state.panDocumentLocation
                      },
                      {
                        "name" : this.state.aadharDocumentName,
                        "path" : this.state.aadharDocumentLocation
                      },
                      {
                        "name" : this.state.cancelledCheckName,
                        "path" : this.state.cancelledCheckLocation
                      },
                      {
                        "name" : this.state.bankStatementName,
                        "path" : this.state.bankStatementLocation
                      },
                      {
                        "name" : this.state.uploadPhotoName,
                        "path" : this.state.uploadPhotoLocation
                      },
                  ]
              };
              

              axios
              .post('/send-email',formValues2)
              .then((res)=>{
                        if(res.status === 200){
                              $("html,body").scrollTop(0);
                              swal({
                                  title: "Thank You!",
                                  text: "Your KYC details submitted successfully.",
                                  type: "success"
                                  }).then(function() {                                  
                                    // this.setState(this.baseState);
                                     
                                     // this.props.history.push("#riskprofileform");
                                     window.location = "#riskprofileform";
                                     window.location.reload();
                                  });
                             //swal("Thank You!", "Your KYC details submitted successfully.", "success")
                             
                             //window.location.reload();
                        }
                      })
                      .catch((error)=>{
                        console.log("error = ", error);
                        
                      });
               }
            })
            .catch((error)=>{
              console.log("error = ", error);
            });    
          }
          
      }
    }
  

  deleteimageLogo(index){
    // console.log("index", index);

    var data = index.split("/");
    // console.log("data", data);
    var imageName = data[4];
    // console.log("imagename", imageName);
      if(index){
        S3FileUpload
          .deleteFile(imageName,this.state.config)
          .then((response) =>{
            swal("Image deleted successfully");
          })
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
          })
      }
  }
  render() {
    const token = localStorage.getItem("user_ID");
    if(token){
             return (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                  <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 kycformbox">
                    <h4 className="formNameTitle"><span className="">Add KYC Details</span></h4>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Upload PAN Document <span className="fs10">(JPEG/PNG/PDF) </span></label><span className="asterix">*</span>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="file" className="customInputKF inputBox nameParts" name="panDocument"  ref="panDocument" onChange={this.checkSizeuploadDocument.bind(this)} />
                             <div className="errorMsg">{this.state.errors.panDocument}</div>

                          </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Upload Aadhar Document <span className="fs10">(JPEG/PNG/PDF)</span> <span className="asterix">*</span></label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="file" className="customInputKF inputBox nameParts" name="aadharDocument" placeholder="Enter Name" ref="aadharDocument" onChange={this.checkSizeuploadDocument.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.aadharDocument}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Upload Cancelled Check <span className="fs10">(JPEG/PNG/PDF)</span> <span className="asterix">*</span></label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="file" className="customInputKF inputBox nameParts" name="cancelledCheck" placeholder="Enter Name" ref="cancelledCheck" onChange={this.checkSizeuploadDocument.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.cancelledCheck}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Upload 6 Months Bank Statement <span className="fs10">(JPEG/PNG/PDF)</span> <span className="asterix">*</span></label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="file" className="customInputKF inputBox nameParts" name="bankStatement" placeholder="Enter Name" ref="bankStatement" onChange={this.checkSizeuploadDocument.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.bankStatement}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Upload Photo <span className="fs10">(JPEG/PNG/PDF)</span> <span className="asterix">*</span></label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="file" className="customInputKF inputBox nameParts" name="uploadPhoto" placeholder="Enter Name" ref="uploadPhoto" onChange={this.checkSizeuploadDocument.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.uploadPhoto}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Amount Investing <span className="asterix">*</span></label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="number" className="customInputKF inputBox nameParts" name="amountInvesting" placeholder="Enter Amount Investing" min="0" ref="amountInvesting" onChange={this.handleChange.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.amountInvesting}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Pan Number <span className="asterix">*</span></label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="text" className="customInputKF inputBox nameParts" name="panNumber" placeholder="Enter Pan Number" min="0" ref="panNumber" onChange={this.handleChange.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.panNumber}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                      <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>GST Number </label>
                          </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <input type="text" className="customInputKF inputBox nameParts" name="gstNumber" placeholder="Enter GST Number" min="0" ref="gstNumber" onChange={this.handleChange.bind(this)}  />
                            <div className="errorMsg">{this.state.errors.gstNumber}</div>

                         </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                        <input id="signUpBtn" className="col-lg-6 col-md-6 hidden-sm hidden-xs risksubmitButton pull-right " onClick={this.Submit.bind(this)}  value={this.state.buttonHeading} readOnly disabled={this.state.buttonHeading === 'We are processing. Please Wait...'}/>
                        <input id="signUpBtn" className="hidden-lg hidden-md col-sm-12 col-xs-12 mt50 risksubmitButton pull-right " onClick={this.Submit.bind(this)}  value={this.state.buttonHeading} readOnly disabled={this.state.buttonHeading === 'We are processing. Please Wait...'}/>
                        
                    </div>
                  </form>
                </div>
          );
        }
        else{
        this.props.history.push("/login");
        window.location.reload();
      }
    }  
}        

export default withRouter(Addkycdetails);