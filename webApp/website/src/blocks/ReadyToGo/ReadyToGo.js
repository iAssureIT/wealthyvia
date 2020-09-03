import React, { Component }       from 'react';
import $                          from 'jquery';
import swal                       from 'sweetalert';
import axios                      from 'axios';
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import "./ReadyToGo.css";

var array =[];
var answersarray =[];
export default class ReadyToGo extends Component {

  constructor(props){
    super(props);
      this.state = {
            "productDetailsArray": [],
            "compalsaroy"        : true,
            "ENname"             : "",
            "ENcontactNumber"    : "",
            "ENemail"            : "",
            "PRname"             : "",
            "PRcontactNumber"    : "",
            "panNumberLocationRTG"       : "",
            "addressProofLocationRTG"    : "",
            "PRemail"            : "",
            "message"            : "",
            "portfolioImage1"     : "",
            "panNumber"          : "",
            "email"              : "",
            "nameModal"          : "",
            "name1"              : "",
            "panNumber1"         : "",
            "email1"             : "",
            "fileUpload"         : "",
            "panNumberModal"     : "",
            "emailModal"         : "",
            "addressProof"       : "",
            "contactNumber"      : "",
            "question1"          : "",
            "fields"             : {},
            "errors"             : {},  
            "fields1"            : {},
            "errors1"            : {},
            "fields2"            : {},
            "errors2"            : {},
            "questionsArray"     : [],
            "answersArray"       : [],
            "answersofQ1"        : [],
            "Question1"          : "1) What is the primary goal for the funds invested through WealthyVia?",
            "Question2"          : "2) Any near term need for the funds invested with us ?",
            "Question3"          : "3) Your investments % exposure of your investable capital can be best described as",
            "Question4"          : "4) What is number of years you have spent in stock market investments",
            "Question5"          : "5) What is your biggest drawdown on your entire portfolio ?",
      };
    } 

  componentDidMount()
  {
    $('.dropdown-radio').find('input').change(function() {
    var dropdown = $(this).closest('.dropdown');
    var radioname = $(this).attr('name');
    var checked = 'input[name=' + radioname + ']:checked';
    
    //update the text
    var checkedtext = $(checked).closest('.dropdown-radio').text();
    dropdown.find('button').text( checkedtext );

    //retrieve the checked value, if needed in page 
    // var thisvalue = dropdown.find( checked ).val();

    });
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
        console.log(error);
          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
      })
  
  }
  checkSize(event)
  {
    var file = event.target.files[0];
    if(file){
     if(file.size>=2097152)
     {
        swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
        event.target.value ="";
     }else{
        this.setState({
            "addressProof"      :event.target.value,
          });
        }
    }
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
     var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
          addressProofName : newFile.name,
      })
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf" ){ 
          if (newFile) {
            if(this.state.addressProof==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    addressProofLocationRTG : Data.location,
                  })
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
                              addressProofLocationRTG : Data.location,
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
  checkSizePAN(event)
  {
    var file = event.target.files[0];
    if(file){
     if(file.size>=2097152)
     {
        swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
        event.target.value ="";
     }else{
        this.setState({
            "panNumber" : event.target.value,
          });
        }
      }
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
    
    var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
          panNumberName : newFile.name,
      })
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf" ){ 
          if (newFile) {
            if(this.state.panNumber==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    panNumberLocationRTG : Data.location,
                  })
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
                              panNumberLocationRTG : Data.location,
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

  handleChange(event){

    this.setState({
      "ENname"                    : this.refs.ENname.value,
      "ENcontactNumber"           : this.refs.ENcontactNumber.value,
      "ENemail"                   : this.refs.ENemail.value,
      "name"                      : this.refs.name.value,
      "contactNumber"             : this.refs.contactNumber.value,
      "email"                     : this.refs.email.value,
      "PRname"                    : this.refs.PRname.value,
      "PRcontactNumber"           : this.refs.PRcontactNumber.value,
      "PRemail"                   : this.refs.PRemail.value,
      "fileUpload"                : this.refs.fileUpload.value,
      "panNumber"                 : this.refs.panNumber.value,
      "addressProof"              : this.refs.addressProof.value,
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
    let fields2 = this.state.fields2;
    fields2[event.target.name] = event.target.value;
    this.setState({
      fields2
    });
    if (this.validateFormReview() && this.validateFormReqReview()) {
      let errors2 = {};
      errors2[event.target.name] = "";
      this.setState({
        errors2: errors2
      });
    }
  }
  handleChange1(event){
    this.setState({
      "nameModal"             : this.refs.nameModal.value,
      "contactNumberModal"    : this.refs.contactNumberModal.value,
      "emailModal"            : this.refs.emailModal.value,
      });
     
      let fields1 = this.state.fields1;
    fields1[event.target.name] = event.target.value;
    this.setState({
      fields1
    });
    if (this.validateFormModal() && this.validateFormReqModal()) {
      let errors1 = {};
      errors1[event.target.name] = "";
      this.setState({
        errors1: errors1
      });
    }
  }

  Submit(event){
    event.preventDefault();

    if (this.validateForm() && this.validateFormReq()) {
       
        var dataArray1={
          "name"             : this.refs.name.value,
          "addressProof"     : this.state.addressProofLocation,
          "panNumber"        : this.state.panNumberLocation,
          "email"            : this.refs.email.value,
          "contactNumber"    : this.refs.contactNumber.value,

        }

        console.log("dataArray1",dataArray1);
        const dataArray = {
            "email"         : this.state.email ,
            "subject"       : "Your KYC details is sent successfully.",
            "message"          : "", 
            "mail"          : 'Dear  ' + this.state.name + ', <br/><br/>'+
                              "Congratulations!<br/><br/>Your KYC details has been successfully delivered to the admin! <br/> We will get back to you shortly. <br/> <br/> " + 
                              "<b>Details Submitted - </b><br/> Name: "  + this.state.name + '<br/>'+
                              "Contact Number :" + this.state.contactNumber + '<br/>'+
                              "Email :" + this.state.email + '<br/>'+
                              "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,

        };
        
         axios
          .post('/send-email',dataArray)
          .then((res)=>{
                     if(res.status === 200){
                        swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                           var adminEmail = "kycwealthyvia@gmail.com";
                           const formValues2 = {
                            "email"         : adminEmail ,
                            "subject"       : "New KYC/Investment Profile details arrived from client!",
                            "mail"          : 'Dear Admin, <br/>'+
                                              "New KYC details came from client. <br/> <br/>Details are as follows -<br/> <br/>" + 
                                              "<b> Name: </b>"   + dataArray1.name + '<br/>'+
                                              "<b> Email: </b>"  + dataArray1.email + '<br/>'+
                                              "<b> Contact Number: </b>"  + dataArray1.contactNumber + '<br/><br/>'+
                                              "<b> Investment Profile details </b> <br/><br/>"+
                                              ""+this.state.questionsArray[0]+"<br/>"+
                                              "Ans : "+this.state.answersofQ1+"<br/><br/>"+ 
                                              ""+this.state.questionsArray[1]+"<br/>"+
                                              "Ans : "+this.state.answersofQ2+"<br/><br/>"+ 
                                              ""+this.state.questionsArray[2]+"<br/>"+
                                              "Ans : "+this.state.answersofQ3+"<br/><br/>"+
                                               ""+this.state.questionsArray[3]+"<br/>"+
                                              "Ans : "+this.state.answersofQ4+"<br/><br/>"+
                                              ""+this.state.questionsArray[4]+"<br/>"+
                                              "Ans : "+this.state.answersofQ5+"<br/><br/>"+
                                              "" ,
                            "attachments" : [{
                                        "name" : this.state.panNumberName,
                                        "path" : this.state.panNumberLocationRTG
                                          },
                                          {
                                        "name" : this.state.addressProofName,
                                        "path" : this.state.addressProofLocationRTG
                                          },
                                        ]

                          };
                          console.log("formValues2",formValues2);
        axios
        .post('/send-email',formValues2)
        .then((res)=>{
                  if(res.status === 200){
                    console.log("Mail sent to admin successfully!")
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
      
        let fields = {};
        fields["panNumber"]     = "";
        fields["addressProof"]     = "";
        fields["name"]            = "";
        fields["email"]           = "";
        fields["contactNumber"]   = "";
      
           this.setState({
          "panNumber"       : "",
          "addressProof"     : "",
          "name"             : "",
          "email"            : "",
          "contactNumber"    : "",
         
          "fields"           : fields
        });
         $("#kycModal").hide();
        $("#kycModal").removeClass('in');
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
/*        window.location.reload(true);
*/           
        }
  }

  SubmitReview(event){
    event.preventDefault();
    if (this.validateFormReview() && this.validateFormReqReview()) {
     
      var dataArray1={
       "PRname"            : this.refs.PRname.value,
      "fileUpload"         : this.state.portfolioImage1,
      "PRemail"            : this.refs.PRemail.value,
      "PRcontactNumber"    : this.refs.PRcontactNumber.value,

      }
      var adminEmail = "review.wealthyvia@gmail.com";
      const dataArray = {
          "email"         : this.state.PRemail ,
          "subject"       : "Your Portfolio Review is sent successfully.",
          "message"          : "", 
          "mail"          : 'Dear  ' + this.state.PRname + ', <br/><br/>'+
                            "Congratulations!<br/><br/>Your Portfolio Review has been successfully delivered to the admin! <br/> We will get back to you shortly. <br/> <br/> " + 
                            "<b>Details Submitted - </b><br/> Name: "  + this.state.PRname + '<br/>'+
                            "Contact Number :" + this.state.PRcontactNumber + '<br/>'+
                            "Email :" + this.state.PRemail + '<br/>'+
                            "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,

      };
       axios
        .post('/send-email',dataArray)
        .then((res)=>{
                   if(res.status === 200){
                    swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
       const formValues2 = {
        "email"         : adminEmail ,
        "subject"       : "New Portfolio Review arrived from client!",
        "mail"          : 'Dear Admin, <br/>'+
                          "New Portfolio Review came from client. <br/> <br/>Details are as follows -<br/> <br/>" + 
                          "<b> Name: </b>"   + this.state.PRname + '<br/>'+
                          "<b> Email: </b>"  + this.state.PRemail + '<br/>'+
                          "<b> Contact Number: </b>"  + this.state.PRcontactNumber + '<br/><br/>'+
                          "" ,
        "attachments" : [{
                      "name" : this.state.fileUploadName,
                      "path" : this.state.portfolioImage1
                        },
                      ]
      };
      axios
      .post('/send-email',formValues2)
      .then((res)=>{
                if(res.status === 200){
                  console.log("Mail sent to admin successfully!")
                }
              })
              .catch((error)=>{
                console.log("error = ", error);
                
              });
      let fields = {};
      fields["fileUpload"]       = "";
      fields["name1"]            = "";
      fields["email1"]           = "";
      fields["contactNumber1"]   = "";
      $("#portfolioReview").hide();
          $("#portfolioReview").removeClass('in');
            $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
            this.setState({
              "fileUpload"         : "",
              "PRname"             : "",
              "PRemail"            : "",
              "PRcontactNumber"    : "",
              "fields2"            : fields
            });
      }
  }
 
  SubmitEnquire(event){
    event.preventDefault();
    if (this.validateFormModal() && this.validateFormReqModal()) {
       this.setState({
       
        "ENname"             : this.refs.ENname.value,
        "ENcontactNumber"    : this.refs.ENcontactNumber.value,
        "ENemail"            : this.refs.ENemail.value,

      });
       /* ======================= Send Email to user ==================================*/
      var adminEmail = "kycwealthyvia@gmail.com";
      const dataArray = {
          "email"         : this.state.emailModal ,
          "subject"       : "Your query is sent successfully!",
          "message"       : "", 
          "mail"          : 'Dear  ' + this.state.nameModal + ', <br/><br/>'+
                            "Your query has been successfully delivered to the admin! We will get back to you shortly. <br/> <br/> " + 
                            "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,
        };
      
       axios
        .post('/send-email',dataArray)
        .then((res)=>{
                   if(res.status === 200){
                      swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
       const formValues2 = {
        "email"         : adminEmail ,
        "subject"       : "New query/feedback arrived from Website!",
        "message"       : "",
        "mail"          : 'Dear Admin, <br/>'+
                          "Following new query/feedback came from website! <br/> <br/> " + 
                          "<br/>User Details <br/> " + 
                          "<b>Name: </b>"   + this.state.nameModal + '<br/>'+
                          "<b>Email: </b>"  + this.state.emailModal + '<br/>'+
                          "<b>Contact Number: </b>"  + this.state.contactNumberModal + '<br/><br/>'+
                          "<pre> " + this.state.message + "</pre>" + 
                          "<br/><br/> " ,

        };
        axios
        .post('/send-email',formValues2)
        .then((res)=>{
                  if(res.status === 200){
                   swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                  }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
       /* ======================= Send Email to user ==================================*/
       let fields1 = {};
       fields1["nameModal"]            = "";
       fields1["emailModal"]           = "";
       fields1["contactNumberModal"]   = "";
        $("#EnquireModal").hide();
        $("#EnquireModal").removeClass('in');
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
          this.setState({
            "nameModal"            : "",
            "emailModal"            : "",
            "contactNumberModal"    : "",
            "fields1"               : fields1
          });
      }
  }
  CloseModalTwo(event){
    $("#riskform2").hide();
    $("#riskform2").removeClass('in');
    $(".modal-backdrop").remove();
    console.log("In")
    $("body").removeClass("modal-open");
  }
  backButton(event){
    event.preventDefault();
    $("#riskform2").hide();
    $("#riskform2").removeClass('in');
    $("#myModal").show();
    $("#myModal").addClass('in'); 
  }
  SubmitFirst(event){
    event.preventDefault();

    $("#myModal").hide();
    $("#myModal").removeClass('in');
    $("#riskform2").show();
    $("#riskform2").addClass('in');
  }
  SubmitSecondModal(event){

    event.preventDefault();
    if(this.state.questionsArray.length<5)
    {
      this.setState({
        compalsaroy : false,
      })
    }else{
    $("#riskform2").hide();
    $("#riskform2").removeClass('in');


    $("#kycModal").show();
    $("#kycModal").addClass('in');
    }
    
  }
  CloseKycModal(){
    this.setState({
      "panNumber"        : "",
      "addressProof"     : "",
      "name"             : "",
      "email"            : "",
      "contactNumber"    : "",
    });
    $("#kycModal").hide();
    $("#kycModal").removeClass('in');
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
  }

   validateFormReq() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
      if (!fields["name"]) {
        formIsValid = false;
        errors["name"] = "This field is required.";
      }   
      if (!fields["panNumber"]) {
        formIsValid = false;
        errors["panNumber"] = "This field is required.";
      }
      if (!fields["addressProof"]) {
        formIsValid = false;
        errors["addressProof"] = "This field is required.";
      }
      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "This field is required.";
      }          
      if (!fields["contactNumber"]) {
        formIsValid = false;
        errors["contactNumber"] = "This field is required.";
      }
       
      this.setState({
        errors: errors
      });
      return formIsValid;
  }
  validateFormReqModal() {
    let fields = this.state.fields1;
    let errors = {};
    let formIsValid = true;
      
        if (!fields["nameModal"]) {
        formIsValid = false;
        errors["nameModal"] = "This field is required.";
      }     
     
        if (!fields["emailModal"]) {
        formIsValid = false;
        errors["emailModal"] = "This field is required.";
      }          
   
       if (!fields["contactNumberModal"]) {
        formIsValid = false;
        errors["contactNumberModal"] = "This field is required.";
      }
       
      this.setState({
        errors1: errors
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
    if (typeof fields["contactNumber"] !== "undefined") {
      if (!fields["contactNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["contactNumber"] = "Please enter valid mobile no.";
      }
    }        
    this.setState({
      errors: errors
    });
  return formIsValid;
}
validateFormReqReview() {
  let fields = this.state.fields2;
  let errors = {};
  let formIsValid = true;
    
      if (!fields["name1"]) {
      formIsValid = false;
      errors["name1"] = "This field is required.";
    }     
   
      if (!fields["email1"]) {
      formIsValid = false;
      errors["email1"] = "This field is required.";
    }          
    if (!fields["fileUpload"]) {
      formIsValid = false;
      errors["fileUpload"] = "This field is required.";
    }          
 
     if (!fields["contactNumber1"]) {
      formIsValid = false;
      errors["contactNumber1"] = "This field is required.";
    }
     
    this.setState({
      errors2: errors
    });
    return formIsValid;
  }
  validateFormReview() {
    let fields = this.state.fields2;
    let errors = {};
    let formIsValid = true;
      if (typeof fields["email1"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email1"])) {
          formIsValid = false;
          errors["email1"] = "Please enter valid email-ID.";
        }
      }
      if (typeof fields["contactNumber1"] !== "undefined") {
        if (!fields["contactNumber1"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["contactNumber1"] = "Please enter valid mobile no.";
        }
      }     
      this.setState({
        errors2: errors
      });
      return formIsValid;
  }
  validateFormModal() {
    let fields = this.state.fields1;
    let errors = {};
    let formIsValid = true;
      if (typeof fields["emailModal"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailModal"])) {
          formIsValid = false;
          errors["emailModal"] = "Please enter valid email-ID.";
        }
      }
      if (typeof fields["contactNumberModal"] !== "undefined") {
        if (!fields["contactNumberModal"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["contactNumberModal"] = "Please enter valid mobile no.";
        }
      }
     
      this.setState({
        errors1: errors
      });
      return formIsValid;
  } 
   /*get checkbox value*/  
  getCheckValue(event){
    var id = event.target.id;
    var checked = event.target.checked;
    var name = event.target.name;
    var value = event.target.value;
    if(checked){
      var value = event.target.value;
       /* this.setState({
          [event.target.name] : value,
        })*/
         array = this.state.questionsArray;
        if(array){

          
          if(this.state.questionsArray.indexOf(event.target.name)=== -1)
          {
            array.push(event.target.name);

            this.setState({
              questionsArray  :array,
            },()=>{
            })
          }
            answersarray.push(event.target.value);
          if(event.target.name === "1) What is the primary goal for the funds invested through WealthyVia?")
          {
            this.setState({
              answersofQ1    : answersarray,
            },()=>{
            })
          }else  if(event.target.name === "2) Any near term need for the funds invested with us ?"){
            this.setState({
              answersofQ2    : event.target.value,
            },()=>{
          
          })
          }
          else  if(event.target.name === "3) Your investments % exposure of your investable capital can be best described as"){
            this.setState({
              answersofQ3    : event.target.value,
            },()=>{
          })
          }
           else  if(event.target.name === "4) What is number of years you have spent in stock market investments"){
            this.setState({
              answersofQ4    : event.target.value,
            },()=>{
        })
          }
          else {
            this.setState({
              answersofQ5    : event.target.value,
            },()=>{
          })
          }
       
      }
    }else{
      this.setState({
        [event.target.name] : "",
      })
    }
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
              "fileUpload"      :event.target.value,
            });
        }
      }
      let fields2 = this.state.fields2;
    fields2[event.target.name] = event.target.value;
    this.setState({
      fields2
    });
    if (this.validateForm() && this.validateFormReq()) {
      let errors2 = {};
      errors2[event.target.name] = "";
      this.setState({
        errors2: errors2
      });
    }
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
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    portfolioImage1 : Data.location,
                  },()=>{console.log(this.state.portfolioImage1)})
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
 
  render() {
    const token = localStorage.getItem("user_ID");
    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
              <div className="row">
                  <div className="modal fade in " id="myModal" role="dialog">
                      <div className="modal-dialog modal-lg customModalRP" >
                          <div className="modal-header textAlignCenter modalHeaderCustom">
                            <button type="button" className="close" data-dismiss="modal" > <i className="fa fa-times"></i></button>
                            <h4 className="modal-title">Your Investment Profile</h4>
                          </div>
                          <div className="col-lg-12 col-md-12 hidden-xs hidden-sm modalBodyCustom " >
                            <form id="riskform">
                                <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>{this.state.compalsaroy === false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                    <p id="Q1">{this.state.Question1} <span className="asterix">*</span></p>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                             <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox"  name={this.state.Question1} value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} required />
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox" name={this.state.Question1} value="I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years" onChange={this.getCheckValue.bind(this)} />
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox"  name={this.state.Question1} value="Just strong core portfolio with blue chips or mutual fund but ok to earn something extra." onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox"  name={this.state.Question1} value="I wanna allocate some portion to big tech giants like amazon facebook types too." onChange={this.getCheckValue.bind(this)} />
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox" name={this.state.Question1} value="I am day trader, daily play with markets. I want continuous smart trades." onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                          </div>
                                        </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                          <p><b>{this.state.Question2}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name={this.state.Question2} value="Yes after two years" onChange={this.getCheckValue.bind(this)} required/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Yes after two years</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                        <input type="radio" name={this.state.Question2} value="Yes after  6 -8 months" onChange={this.getCheckValue.bind(this)}/>
                                                        <span className="radioCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem">Yes after 6 -8 months</span>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                        <input type="radio" name={this.state.Question2} value="It’s a separate capital to invest apart from my needs. I want to build good portfolio." onChange={this.getCheckValue.bind(this)}/>
                                                        <span className="radioCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem">It’s a separate capital to invest apart from my needs. I want to build good portfolio.</span>
                                            </div>                                            
                                        </div>
                                       
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textAlignCenter">
                                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.SubmitFirst.bind(this)}>Next</div>
                                        </div>
                                    </form>
                                 </div>
                                  {/*duplicate*/}
                                 <div className="hidden-lg hidden-md col-sm-12 col-xs-12 modalBodyCustomSmall " >
                                    <form id="riskform">
                                    <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                      <p><b>{this.state.Question1}</b><span className="asterix">*</span></p>
                                      <div className="">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                            <input type="checkbox"  name={this.state.Question1} value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} required />
                                            <span className="centreDetailCheck"></span>
                                          </div>
                                          <span className="centreDetaillistItem col-xs-9">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                              <input type="checkbox" name={this.state.Question1} value="I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years" onChange={this.getCheckValue.bind(this)} />
                                                  <span className="centreDetailCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem col-xs-9">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                              <input type="checkbox"  name={this.state.Question1} value="Just strong core portfolio with blue chips or mutual fund but ok to earn something extra." onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="centreDetailCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem col-xs-9">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                <input type="checkbox"  name={this.state.Question1} value="I wanna allocate some portion to big tech giants like amazon facebook types too." onChange={this.getCheckValue.bind(this)} />
                                                <span className="centreDetailCheck"></span> 
                                             </div>
                                              <span className="centreDetaillistItem col-xs-9">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                              <input type="checkbox" name={this.state.Question1} value="I am day trader, daily play with markets. I want continuous smart trades." onChange={this.getCheckValue.bind(this)}/>
                                              <span className="centreDetailCheck"></span>
                                            </div>
                                            <span className="centreDetaillistItem col-xs-9">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                        </div>
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                      <p><b>{this.state.Question2} </b><span className="asterix">*</span></p>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20">
                                       <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                          <input type="radio" name={this.state.Question2} value="Yes after two years" onChange={this.getCheckValue.bind(this)} required/>
                                          <span className="radioCheck"></span>
                                       </div>
                                      <span className="centreDetaillistItem col-xs-9">Yes after two years</span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                        <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                          <input type="radio" name={this.state.Question2} value="Yes after  6 -8 months" onChange={this.getCheckValue.bind(this)}/>
                                          <span className="radioCheck"></span>
                                        </div>
                                        <span className="centreDetaillistItem col-xs-9">Yes after 6 -8 months</span>
                                      </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                        <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                          <input type="radio" name={this.state.Question2} value="It’s a separate capital to invest apart from my needs. I want to build good portfolio." onChange={this.getCheckValue.bind(this)}/>
                                          <span className="radioCheck"></span>
                                        </div>
                                        <span className="centreDetaillistItem col-xs-9">It’s a separate capital to invest apart from my needs. I want to build good portfolio.</span>
                                      </div>                                            
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  textAlignCenter">
                                      <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 pull-right submitButtonRP" onClick={this.SubmitFirst.bind(this)}>Next</div>
                                    </div>
                                      </form>
                                    </div>  
                                </div>
                             </div>
                             <div className="modal fade in " id="riskform2" role="dialog">
                                <div className="modal-dialog modal-lg customModalRP hight400" >
                                  <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseModalTwo.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Your Investment Profile</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 hidden-xs hidden-sm ">
                                      <form id="riskform">
                                      {this.state.compalsaroy === false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                            <p><b>{this.state.Question3}</b><span className="asterix">*</span></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row ">
                                                      <input type="radio" name={this.state.Question3} value="FD/bonds/gold 80%, MF /direct equity 20%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">FD/bonds/gold 80%, MF /direct equity 20% </span>

                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question3} value="FD 60% , 30 %Gold, 10% bonds, no direct equity" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>

                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="FD 10%, MF 25%, Direct equity 65%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 10%, MF 25%, Direct equity 65%</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="Direct equity 90%, FD 10%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">Direct equity 90%, FD 10%</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>{this.state.Question4}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="0-2 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="3-5 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="5 years plus" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="2-15 plus years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>{this.state.Question5}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="0 to -25%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">0 to -25%</span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-25% to -50%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem  col-xs-9">-25% to -50%</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-51% to -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="More than -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">More than -75%</span>

                                          </div> 
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                             <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.SubmitSecondModal.bind(this)}>Submit</div>
                                          <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2  submitButtonRP" onClick={this.backButton.bind(this)}>Back</div>
                                            
                                               
                                        </div>
                                      </form>
                                    </div>
                                  {/*Duplicate*/}
                                    <div className="hidden-md hidden-lg col-sm-12 col-xs-12 modalBodyCustomSmall">
                                      <form id="riskform">
                                      {this.state.compalsaroy === false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                            <p><b>{this.state.Question3}</b><span className="asterix">*</span></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question3} value="FD/bonds/gold 80%, MF /direct equity 20%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">FD/bonds/gold 80%, MF /direct equity 20% </span>

                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question3} value="FD 60% , 30 %Gold, 10% bonds, no direct equity" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>

                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="FD 10%, MF 25%, Direct equity 65%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 10%, MF 25%, Direct equity 65%.</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="Direct equity 90%, FD 10%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">Direct equity 90%, FD 10%.</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>   {this.state.Question4}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="0-2 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="-3-5 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="5 years plus" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="2-15 plus years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b> {this.state.Question5}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="0 to -25%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">0 to -25%</span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-25% to -50%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem  col-xs-9">-25% to -50%</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-51% to -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="More than -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">More than -75%</span>

                                          </div> 
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                             <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 pull-right submitButtonRP" onClick={this.SubmitSecondModal.bind(this)}>Submit</div>
                                          <div className="col-lg-2  col-md-2 col-sm-4 col-xs-4  submitButtonRP" onClick={this.backButton.bind(this)}>Back</div>
                                            
                                               
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                             <div className="modal fade in " id="kycModal" role="dialog">
                                <div className="modal-dialog modal-lg customModalKYC " >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">KYC Form</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                      <form>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Name</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="text" className="customInputKF inputBox nameParts" id="name" name="name" placeholder="Enter Name" ref="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                                               <div className="errorMsg">{this.state.errors.name}</div>

                                              </div>

                                          </div>

                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row"> 
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Mobile Number</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="number" className="customInputKF inputBox nameParts" name="contactNumber" placeholder="Enter Mobile Number" ref="contactNumber" value={this.state.contactNumber} onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors.contactNumber}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Email ID</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="email" className="customInputKF inputBox nameParts" name="email" placeholder="Enter Email ID" ref="email" value={this.state.email}  onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors.email}</div>

                                              </div>
                                          </div>
                                        </div>
                                        
                                        
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>PAN <span className="fs10"> (JPEG/PNG/PDF) </span></label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="panNumber"  ref="panNumber" onChange={this.checkSizePAN.bind(this)} />
                                                 <div className="errorMsg">{this.state.errors.panNumber}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP ht150">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Adress Proof <span className="fs10">(Driving Licence/Passport/Aadhaar card)(JPEG/PNG/PDF)</span></label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="addressProof" placeholder="Enter Name" ref="addressProof" onChange={this.checkSize.bind(this)} />
                                                <div className="errorMsg">{this.state.errors.addressProof}</div>
           
                                             </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                                              <div className="col-lg-2 col-md-2 hidden-sm hidden-xs submitButton pull-right" onClick={this.Submit.bind(this)}>
                                                Submit
                                              </div>
                                               <div className="hidden-lg hidden-md col-sm-4 col-xs-4 submitButton  pull-right" onClick={this.Submit.bind(this)}>
                                                Submit
                                              </div>
                                               
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                              <div className="modal fade in " id="portfolioReview" role="dialog">
                                <div className="modal-dialog modal-lg customModalKYC " >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Portfolio Review</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                      <form>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Name</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="text" className="customInputKF inputBox nameParts" id="name" name="name1" placeholder="Enter Name" ref="PRname" value={this.state.PRname} onChange={this.handleChange.bind(this)}/>
                                               <div className="errorMsg">{this.state.errors2.name1}</div>

                                              </div>

                                          </div>

                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row"> 
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Mobile Number</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="number" className="customInputKF inputBox nameParts" name="contactNumber1" placeholder="Enter Mobile Number" ref="PRcontactNumber" value={this.state.PRcontactNumber} onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors2.contactNumber1}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Email ID</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="email" className="customInputKF inputBox nameParts" name="email1" placeholder="Enter Email ID" ref="PRemail" value={this.state.PRemail}  onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors2.email1}</div>

                                              </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Upload File </label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="fileUpload"  ref="fileUpload" onChange={this.uploadLogoImage.bind(this)} id="upload-file2" />
{/*                                               <div className="errorMsg">{this.state.errors2.fileUpload}</div>
*/}
                                              </div>
                                          </div>
                                        </div>
                                      
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 submitButton pull-right" onClick={this.SubmitReview.bind(this)}>
                                                Submit
                                              </div>
                                               
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                            <div className="modal fade in " id="EnquireModal" role="dialog">
                                <div className="modal-dialog modal-lg  customModalEN" >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Enquire Now</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                    <form>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Name <span className="asterix">*</span></label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <input type="text" className="customInputKF inputBox nameParts" id="nameModal" name="nameModal" placeholder="Enter here" ref="nameModal" value={this.state.nameModal} onChange={this.handleChange1.bind(this)}/>
                                             <div className="errorMsg">{this.state.errors1.nameModal}</div>

                                            </div>

                                        </div>

                                      </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row"> 
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Mobile Number <span className="asterix">*</span></label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <input type="number" className="customInputKF inputBox nameParts" name="contactNumberModal" placeholder="Enter here" ref="contactNumberModal" value={this.state.contactNumberModal} onChange={this.handleChange1.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.contactNumberModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Email ID <span className="asterix">*</span></label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                 <input type="email" className="customInputKF inputBox nameParts" name="emailModal" placeholder="Enter here" ref="emailModal" value={this.state.emailModal}  onChange={this.handleChange1.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.emailModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                       
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 submitButton pull-right" onClick={this.SubmitEnquire.bind(this)}>
                                              Submit
                                            </div>
                                             
                                      </div>
                                    </form>
                                  </div>
                        
                                </div>
                             </div>
                             {/*  <div className="modal fade in " id="portfolioReview" role="dialog">
                                <div className="modal-dialog modal-lg customModalKYC " >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Portfolio Review</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                      <form>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Name</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <input type="text" className="customInputKF inputBox nameParts" id="name" name="name1" placeholder="Enter Name" ref="name1" value={this.state.name1} onChange={this.handleChange.bind(this)}/>
                                                  <div className="errorMsg">{this.state.errors2.name1}</div>
                                              </div>
                                          </div>

                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row"> 
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Mobile Number</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="number" className="customInputKF inputBox nameParts" name="contactNumber1" placeholder="Enter Mobile Number" ref="contactNumber1" value={this.state.contactNumber1} onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors2.contactNumber1}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Email ID</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="email" className="customInputKF inputBox nameParts" name="email1" placeholder="Enter Email ID" ref="email1" value={this.state.email1}  onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors2.email1}</div>

                                              </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Upload File </label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="fileUpload"  ref="fileUpload" onChange={this.handleChange.bind(this)} />
                                                 <div className="errorMsg">{this.state.errors2.fileUpload}</div>

                                              </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 submitButton pull-right" onClick={this.SubmitReview.bind(this)}>
                                                Submit
                                              </div>
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>*/}
                            <div className="modal fade in " id="EnquireModal" role="dialog">
                                <div className="modal-dialog modal-lg  customModalEN" >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Enquire Now</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                    <form>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Name</label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <input type="text" className="customInputKF inputBox nameParts" id="nameModal" name="nameModal" placeholder="Enter here" ref="ENname" value={this.state.ENname} onChange={this.handleChange.bind(this)}/>
                                             <div className="errorMsg">{this.state.errors1.nameModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row"> 
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Mobile Number</label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <input type="number" className="customInputKF inputBox nameParts" name="contactNumberModal" placeholder="Enter here" ref="ENcontactNumber" value={this.state.ENcontactNumber} onChange={this.handleChange.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.contactNumberModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Email ID</label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                 <input type="email" className="customInputKF inputBox nameParts" name="emailModal" placeholder="Enter here" ref="ENemail" value={this.state.ENemail}  onChange={this.handleChange.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.emailModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                       
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 submitButton pull-right" onClick={this.SubmitEnquire.bind(this)}>
                                              Submit
                                            </div>
                                      </div>
                                    </form>
                                  </div>
                       </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter backColorYellow mt20">
                     <label className="readyTo">Ready to go?</label><br/>
                     <span className="logoText"><b><i>Start your Wealth Creation with us, Today!!</i> </b></span><br/>
                     <div className="col-lg-8 col-lg-offset-2 noPadding">
                     
                      {token ==="" ?
                      <a  href="/login" ><div className="col-lg-3 col-lg-offset-3 enquireNow">Enquire Now</div></a>
                        :
                      <div className="col-lg-offset-3 col-lg-3 enquireNow"  data-toggle="modal" data-target="#EnquireModal">Enquire Now</div>
                      }
                      
                      <div className="col-lg-offset-1 col-lg-3 buyNowButtonPP"  data-toggle="modal" data-target="#portfolioReview">Portfolio Review</div>
                      </div>
                  </div>
              </div>
      </div>
    );
  }
}
