import React, { Component }               from 'react';
import $                                  from 'jquery';
import swal                               from 'sweetalert';
import ReactMultiSelectCheckboxes         from 'react-multiselect-checkboxes';
import axios                              from 'axios';
import S3FileUpload                       from 'react-s3';
import { deleteFile }                     from 'react-s3';
import "./Header.css";
var array =[];
var answersarray =[];

export default class Header extends Component {

  constructor(props) {
    super(props);
        this.state = {
            "userinfo"            : {},
            "productDetailsArray" : [],
            "name"                : "",
            "panNumber"           : "",
            "panNumberName"       : "",
            "panNumberLocation"       : "",
            "email"               : "",
            "addressProof"        : "",
            "addressProofName"    : "",
            "contactNumber"       : "",
            "addressProofLocation"       : "",

            "fields"              : {},
            "errors"              : {},  
            "fields1"             : {},
            "errors1"             : {},
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
  ScrollTop(event){
    window.scrollTo(0,0);
  }
  logout(){
    var user_ID = localStorage.setItem("user_ID", "")
    
     window.location.reload();  

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
      var thisvalue = dropdown.find( checked ).val();

    });
      const userid = localStorage.getItem('user_ID');
     axios.get("/api/users/get/"+userid)
      .then((response)=>{ 
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
        console.log(error);
          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
      })
  }

  // Submit(event){
  //   event.preventDefault();

  //   if (this.validateForm() && this.validateFormReq()) {
     
  //     var dataArray={
  //      "name"            : this.refs.name.value,
  //     "addressProof"      : this.refs.addressProof.value,
  //     "panNumber"      : this.refs.panNumber.value,
  //     "email"            : this.refs.email.value,
  //     "contactNumber"    : this.refs.contactNumber.value,

  //     }

  //     let fields = {};
  //     fields["panNumber"]       = "";
  //     fields["addressProof"]     = "";
  //     fields["name"]            = "";
  //     fields["email"]           = "";
  //     fields["contactNumber"]   = "";
    
  //   swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
  //   $("#myModalHeader").hide();
  //   $("#myModalHeader").removeClass('in');
  //   $(".modal-backdrop").remove();
  //   $("body").removeClass("modal-open");
  //     this.setState({
  //       "panNumber"       : "",
  //       "addressProof"      : "",
  //       "name"             : "",
  //       "email"            : "",
  //       "contactNumber"    : "",
  //       "fields"           : fields
  //     });
  //   }
  //   window.location.reload();
  // }
  getData(){
    var one =1;
    const userid = localStorage.getItem('user_ID');
    axios.get("/api/users/get/"+userid)
      .then((response)=>{ 
          this.setState({
              userinfo : response.data
          })
      })
      .catch((error)=>{
            console.log('error', error);
      })

    axios.get("/api/carts/get/count/"+userid)
      .then((response)=>{ 
          this.setState({
              count : response.data
          })
          // this.props.redirectToPropertyDetails(response.data)
      })
      .catch((error)=>{
            console.log('error', error);
      })
  }
  backButton(event){
    event.preventDefault();
    $("#riskformHeader").hide();
    $("#riskformHeader").removeClass('in');
    $("#myModalHeader").show();
    $("#myModalHeader").addClass('in'); 
  }
  SubmitFirst(event){
    event.preventDefault();
    $("#myModalHeader").hide();
    $("#myModalHeader").removeClass('in');
    $("#riskformHeader").show();
    $("#riskformHeader").addClass('in');
  }
  SubmitSecondModal(event){
    event.preventDefault();
    event.preventDefault();
    if(this.state.questionsArray.length<5)
    {
      this.setState({
        compalsaroy : false,
      })
    }else{
    $("#riskformHeader").hide();
    $("#riskformHeader").removeClass('in');

    $("#kycModalHeader").show();
    $("#kycModalHeader").addClass('in');
    }
  }

  handleChange(event){
    this.setState({
      "name"             : this.refs.name.value,
      "contactNumber"    : this.refs.contactNumber.value,
      "email"            : this.refs.email.value,
      "panNumber"      : this.refs.panNumber.value,
      "addressProof"      : this.refs.addressProof.value,
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
  checkSizePAN(event){
    var file = event.target.files[0];
    if(file){
       if(file.size>2097152){
          swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
          event.target.value ="";
       }else{
          this.setState({
              "panNumber"      :event.target.value,
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
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG" ||  ext=="PDF" ||  ext=="pdf" ){ 
          if (newFile) {
            if(this.state.panNumber==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    panNumberLocation : Data.location,
                  },()=>{console.log(this.state.panNumber)})
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
                              panNumberLocation : Data.location,
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
  CloseModalTwo(event){
    $("#riskformHeader").hide();
    $("#riskformHeader").removeClass('in');
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
  }
  checkSize(event){
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
    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
          addressProofName : newFile.name,
      })
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG" ||  ext=="PDF" ||  ext=="pdf" ){ 
          if (newFile) {
            if(this.state.addressProof==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    addressProofLocation : Data.location,
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
                              addressProofLocation : Data.location,
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

  Submit(event){
    event.preventDefault();
      if (this.validateForm() && this.validateFormReq()) {
       
        var dataArray1={
          "name"             : this.refs.name.value,
          "addressProof"     : this.refs.addressProof.value,
          "panNumber"        : this.refs.panNumber.value,
          "email"            : this.refs.email.value,
          "contactNumber"    : this.refs.contactNumber.value,

        }
        console.log("dataArray1",dataArray1);

        if(dataArray1){
          var adminEmail = "kycwealthyvia@gmail.com";
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
        console.log("dataArray1",dataArray1);

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
                            "path" : this.state.panNumberLocation
                              },
                              {
                            "name" : this.state.addressProofName,
                            "path" : this.state.addressProofLocation
                              },
                            ]

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
            "addressProof"      : "",
            "name"             : "",
            "email"            : "",
            "contactNumber"    : "",
           
            "fields"           : fields
          });
          $("#kycModalHeader").hide();
        $("#kycModalHeader").removeClass('in');
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
  /*        window.location.reload(true);
  */           
          }
        }
   
  }
  
  /*get checkbox value*/  
  getCheckValue(event){
    var id = event.target.id;
    var checked = event.target.checked;
    var name = event.target.name;
    var value = event.target.value;
    if(checked){
      var value = event.target.value;
      
         array = this.state.questionsArray;
        if(array){

          
          if(this.state.questionsArray.indexOf(event.target.name)== -1)
          {
            array.push(event.target.name);

            this.setState({
              questionsArray  :array,
            },()=>{
            })
          }
            answersarray.push(event.target.value);
          if(event.target.name == "1) What is the primary goal for the funds invested through WealthyVia?")
          {
            this.setState({
              answersofQ1    : answersarray,
            },()=>{
            })
          }else  if(event.target.name == "2) Any near term need for the funds invested with us ?"){
            this.setState({
              answersofQ2    : event.target.value,
            },()=>{
          
          })
          }
          else  if(event.target.name == "3) Your investments % exposure of your investable capital can be best described as"){
            this.setState({
              answersofQ3    : event.target.value,
            },()=>{
          })
          }
           else  if(event.target.name == "4) What is number of years you have spent in stock market investments"){
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
  ClosemyModalHeader(){
    $("#myModalHeader").hide();
    $("#myModalHeader").removeClass('in');
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
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
/*  var intials = $('#firstName').text().charAt(0) + $('#lastName').text().charAt(0);
*/  console.log("userinfo",this.state.userinfo);
  if( this.state.userinfo.fullName){
    const var1 =  this.state.userinfo.fullName.split(' ');
    console.log("var1",var1)
    var firstLetterF = var1[0].charAt(0);
    var firstLetterL = var1[1].charAt(0);
    console.log("firstLetterL"+firstLetterL+"firstLetterF"+firstLetterF);
  }
      return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 h1zindex">
              <div className="row">
                  <div className="modal fade in " id="myModalHeader" role="dialog">
                      <div className="modal-dialog modal-lg customModalRP" >
                          <div className="modal-header textAlignCenter modalHeaderCustom">
                            <button type="button" className="close" data-dismiss="modal" > <i className="fa fa-times"></i></button>
                            <h4 className="modal-title">Your Investment Profile</h4>
                          </div>
                           <div className="col-lg-12 col-md-12 hidden-xs hidden-sm modalBodyCustom " >
                            <form id="riskform">
                                <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>{this.state.compalsaroy == false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
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
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textAlignCenter">
                                      <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 pull-right submitButtonRP" onClick={this.SubmitFirst.bind(this)}>Next</div>
                                    </div>
                                      </form>
                                    </div>  
                                </div>
                             </div>
                             <div className="modal fade in " id="riskformHeader" role="dialog">
                                <div className="modal-dialog modal-lg customModalRP hight400" >
                                  <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseModalTwo.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Your Investment Profile</h4>
                                  </div>
                                  <div className="col-lg-12 col-md-12 hidden-xs hidden-sm ">
                                      <form id="riskform">
                                      {this.state.compalsaroy == false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
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
                                      {this.state.compalsaroy == false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
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
                                            <p><b>4) {this.state.Question4}</b><span className="asterix">*</span></p>
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
                                            <p><b>5) {this.state.Question5}</b><span className="asterix">*</span></p>
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
                             <div className="modal fade in " id="kycModalHeader" role="dialog">
                                <div className="modal-dialog modal-lg customModalKYC " >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.ClosemyModalHeader.bind(this)}> <i className="fa fa-times"></i></button>
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
                                                <label>PAN (JPEG/PNG/PDF) </label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="panNumber"  ref="panNumber" onChange={this.checkSizePAN.bind(this)} />
                                                 <div className="errorMsg">{this.state.errors.panNumber}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Adress Proof ( Driving Licence/Passport/Aadhaar card )(JPEG/PNG/PDF)</label><span className="asterix">*</span>
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
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="row">
                                <nav className="navbar marginZero customNavBarUpper backColorWhite colorP navbar-default  hidden-xs hidden-sm">
                                    <div className="container-fluid">
                                      <div className="navbar-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <a className="navbar-brand webSiteName colorP col-lg-4 col-md-4 col-sm-4 col-xs-4" href="/">Wealthyvia</a>
                                      <div className="col-lg-4 col-lg-offset-1 col-md-8 col-sm-8 col-xs-8"> <a className="navbar-brand colorP"><b>SEBI Registration No. INH000005397</b></a></div>
                                      <div className="col-lg-3 col-md-10 col-mg-offset-1 col-sm-10 col-xs-12 iconContainerHeader">
                                        <div className="row">
                                        
                                          <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right">
                  
                                          <a href="https://www.linkedin.com/in/wealthy-via-882512194/" target="_blank"><img src="/images/linkedin1.png"/></a>
                                          </div> 
                                          <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook pull-right">
                                            <a href="https://www.facebook.com/wealthy.via" target="_blank">  <img src="/images/facebook.png"/></a>
                                          </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right ">
                                            <a href=" https://twitter.com/ViaWealthy" target="_blank"><img src="/images/twitter.png"/></a>
                                          </div> 
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                                  </nav>
                              </div>
                          </div>    
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="row">
                            <nav className="navbar marginZero customNavBar navbar-default">
                                <div className="container-fluid">
                                  <div className="navbar-header">
                                    <a className="navbar-brand webSiteNameOther colorWhite hidden-lg hidden-md col-lg-1 col-md-1 col-sm-1 col-xs-1" href="/">Wealthyvia</a>

                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navBar" aria-expanded="false" >
                                      <span className="sr-only">Toggle navigation</span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                    </button>

                                  </div>

                                  <div className="collapse navbar-collapse" id="navBar">
                                    <ul className="nav navbar-nav navbar-right customUl width50">

                                      
                                      <li className="nav-item dropdown">
                                          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Articulations <span className="caret"></span>
                                          </a>                       
                                          <ul className="dropdown-menu customDropdown">
                                            <a href="/AllBlogs">Arthavrudhhi Blogs</a>
                                            <a href="">Communique</a>
                                              {/* <a href="https://www.arthavruddhi.com/blog" target="_blank">Arthavrudhhi Blogs</a>
                                               <a href="">Communique</a>*/}
                                           
                                        </ul>
                                      </li>
                                       <li className="nav-item dropdown">
                                          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Offerings <span className="caret"></span>
                                          </a>
                                          <ul className="dropdown-menu customDropdown " aria-labelledby="navbarDropdownMenuLink">
                                            <a  className="dropdown-item" href="/#5gcpm">5GCPM Portfolio</a>
                                            <a className="dropdown-item" href="/#safeHeavenMoats">Safe Heavan Moats</a>
                                            <a className="dropdown-item" href="/#safeHeavenAlpha">Safe Heavan Stocks + Alpha</a>
                                           <a className="dropdown-item" href="#">Nifty Algo Trading</a>
                                            <a className="dropdown-item" href="/#USAStocks">USA Stocks Portfolio</a>
                                            <a className="dropdown-item" href="/#unlistedStocks">Unlisted Stocks</a>
                                            <a className="dropdown-item" href="#">Multibagger</a>
                                          </ul>
                                        </li>
                                     
                                      <li className="dropdown">
                                        <a href="/about-us" >About Us </a>
                                        
                                      </li>
                                      {token ?
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.userinfo && this.state.userinfo.fullName ? <span><i class="fa fa-user-circle-o"></i>&nbsp;{this.state.userinfo.fullName}</span>:"Login/Signup"}
                                          </a>
                                          <ul className="dropdown-menu customDropdownLogOut " aria-labelledby="navbarDropdownMenuLink">
                                            <a  className="dropdown-item" href=""><div className="ImgDiv col-lg-2">{firstLetterF}{firstLetterL}</div>&nbsp; &nbsp; {this.state.userinfo && this.state.userinfo.fullName ? <span className="mt20">{this.state.userinfo.fullName}</span>:null}</a>
                                            <hr/>
                                             <a className="dropdown-item  col-lg-7 " href="/clientDashboard"><span className="myprofileButton">My Dashboard</span></a><a className="dropdown-item col-lg-6 row cursorPointer"  onClick={this.logout.bind(this)}><span className="logOutButton pull-right">Logout</span></a>
                                            
                                          </ul>
                                        </li>
/*                                        <a  className="cursorPointer" data-toggle="tooltip" title="Logout" onClick={this.logout.bind(this)}>{this.state.userinfo && this.state.userinfo.fullName ? <span><i class="fa fa-user-circle-o"></i>&nbsp;{this.state.userinfo.fullName}</span>:"Login/Signup"}</a>
*/                                        :
                                      <li className="dropdown">
                                        <a href="/login">Login/Signup </a>
                                      </li>
                                      }
                                      {
                                          token ?
                                            <li className="dropdown investNowHead" data-toggle="modal" data-target="#myModalHeader">
                                                    <span >Invest Now</span>
                                            </li>                     
                                          :
                                            <a  href="/login" ><li className="dropdown investNowHeadBefore">
                                              <span >Invest Now</span>
                                            </li>   
                                            </a>                    
                                      }
                                  
                                    </ul>
                                
                                   
                                  </div>
                                </div>
                              </nav>
                          </div>
              </div>
          </div>
      </div>    
    );
  }
}
