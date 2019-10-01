import React, { Component }       from 'react';
import $                          from 'jquery';
import swal                       from 'sweetalert';
import axios                      from 'axios';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


import "./ReadyToGo.css";

export default class ReadyToGo extends Component {

  constructor(props){
    super(props);
      this.state = {
        productDetailsArray:[],
            "ENname"             : "",
            "ENcontactNumber"    : "",
            "ENemail"            : "",
            "PRname"             : "",
            "PRcontactNumber"    : "",
            "PRemail"            : "",
            "message"            : "",
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
      var thisvalue = dropdown.find( checked ).val();

    });
    }
    checkSize(event)
      {
         var file = event.target.files[0];
        console.log("file",file);
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

      }
       checkSizePAN(event)
      {
         var file = event.target.files[0];
        console.log("file",file);
        if(file){
         if(file.size>=2097152)
         {
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

      }
      checkSizeFU(event)
      {
         var file = event.target.files[0];
        console.log("file",file);
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

      }
     
     onOptionSelect = (value) => {
    console.log('Selected value=', value) 
      }


  handleChange(event){

    this.setState({
      "ENname"             : this.refs.ENname.value,
      "ENcontactNumber"             : this.refs.ENcontactNumber.value,
      "ENemail"             : this.refs.ENemail.value,
      "contactNumber"    : this.refs.contactNumber.value,
      "email"            : this.refs.email.value,
       "PRname"             : this.refs.PRname.value,
       "PRcontactNumber"             : this.refs.PRcontactNumber.value,
      "PRemail"            : this.refs.PRemail.value,
       "fileUpload"             : this.refs.fileUpload.value,
      "panNumber"      : this.refs.panNumber.value,
      "addressProof"      : this.refs.addressProof.value,
    });
    console.log("panNumber",this.state.contactNumberModal);

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
  CloseModalTwo(event){
      $("#riskform2").hide();
    $("#riskform2").removeClass('in');
  $(".modal-backdrop").remove();
  console.log("In")
  $("body").removeClass("modal-open");
  }
Submit(event){
    event.preventDefault();

  if (this.validateForm() && this.validateFormReq()) {
     
      var dataArray={
       "name"            : this.refs.name.value,
      "addressProof"      : this.refs.addressProof.value,
      "panNumber"      : this.refs.panNumber.value,
      "email"            : this.refs.email.value,
      "contactNumber"    : this.refs.contactNumber.value,

    }

      let fields = {};
      fields["panNumber"]     = "";
      fields["addressProof"]     = "";
      fields["name"]            = "";
      fields["email"]           = "";
      fields["contactNumber"]   = "";
    
        swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
         this.setState({
        "panNumber"       : "",
        "addressProof"      : "",
        "name"             : "",
        "email"            : "",
        "contactNumber"    : "",
       
        "fields"           : fields
      });
       $("#kycModal").hide();
      $("#kycModal").removeClass('in');
      $(".modal-backdrop").remove();
      console.log("In")
      $("body").removeClass("modal-open");
         
          console.log("addressProof",this.state.addressProof)
        }

    }
  SubmitReview(event){
    event.preventDefault();
    if (this.validateFormReview() && this.validateFormReqReview()) {
     
      var dataArray={
       "PRname"            : this.refs.PRname.value,
      "fileUpload"      : this.refs.fileUpload.value,
      "PRemail"            : this.refs.email1.value,
      "PRcontactNumber"    : this.refs.PRcontactNumber.value,

      }
      let fields = {};
      fields["fileUpload"]     = "";
      fields["name1"]            = "";
      fields["email1"]           = "";
      fields["contactNumber1"]   = "";
    
        swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
           $("#portfolioReview").hide();
              $("#portfolioReview").removeClass('in');
                $(".modal-backdrop").remove();
            console.log("In")
            $("body").removeClass("modal-open");
                this.setState({
                  "fileUpload"      : "",
                  "PRname"             : "",
                  "PRemail"            : "",
                  "PRcontactNumber"    : "",
                  "fields2"           : fields
                });
                
              }

    }


  CloseKycModal(){
      this.setState({
        "panNumber"       : "",
        "addressProof"      : "",
        "name"             : "",
        "email"            : "",
        "contactNumber"    : "",
       
      });
   $("#kycModal").hide();
    $("#kycModal").removeClass('in');
  $(".modal-backdrop").remove();
  console.log("In")
  $("body").removeClass("modal-open");

  }
  SubmitEnquire(event){
  event.preventDefault();
    

  if (this.validateFormModal() && this.validateFormReqModal()) {
     
     this.setState({
     
      "ENname"             : this.refs.ENname.value,
      "ENcontactNumber"    : this.refs.ENcontactNumber.value,
      "ENemail"            : this.refs.ENemail.value,

    },()=>{console.log("this.state.ENname",this.state.ENname)});
    
    var adminEmail = "kycwealthyvia@gmail.com";

    const dataArray = {
        "email"         : this.state.ENemail ,
        "subject"       : "Your Query/Feedback is sent successfully to www.wealthyvia.com!",
        "message"          : "", 
        "mail"          : 'Dear' + this.state.ENname + ', <br/><br/>'+
                          
                          "<b>Your Email: </b>"  + this.state.ENemail + '<br/><br/>'+
                          "Your following message has been successfully delivered to the admin! We will get back to you shortly. <br/> <br/> " + 
                          "===============================  <br/> <br/> " + 
                          "<pre> " + this.state.message+ "</pre>" + 
                          " <br/> <br/> =============================== " + 
                          "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,

      };
      
  /*      axios
        .post('/send-email',dataArray)
        .then((res)=>{
                   if(res.status === 200){
                    swal("Thank you for contacting us. We will get back to you shortly.")
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });*/
       console.log("dataArray",dataArray); 
       const formValues2 = {
        "email"         : adminEmail ,
        "subject"       : "New query/feedback arrived from Website!",
        "message"          : "",
        "mail"          : 'Dear Admin, <br/>'+
                          "Following new query/feedback came from website! <br/> <br/> " + 
                          "============================  <br/> <br/> " + 
                          "<b>Client Name: </b>"   + this.state.ENname + '<br/>'+
                          
                          "<b>Client Email: </b>"  + this.state.ENemail + '<br/><br/>'+

                          "<pre> " + this.state.message + "</pre>" + 
                          "<br/><br/> ============================ " + 
                          "<br/><br/> This is a system generated email! " ,

      };
      console.log("notification",formValues2); 
      
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
           
        

      let fields1 = {};
       fields1["nameModal"]            = "";
       fields1["emailModal"]           = "";
       fields1["contactNumberModal"]   = "";
        swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
        $("#EnquireModal").hide();
        $("#EnquireModal").removeClass('in');
        $(".modal-backdrop").remove();
        console.log("In")
        $("body").removeClass("modal-open");
              
            this.setState({
             
               "nameModal"             : "",
              "emailModal"            : "",
              "contactNumberModal"    : "",
              "fields1"           : fields1
            });
      }
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
      $("#riskform2").hide();
    $("#riskform2").removeClass('in');
    $("#kycModal").show();
    $("#kycModal").addClass('in');
    }

  /*get checkbox value*/  
  getCheckValue(event){
    var id = event.target.id;
    var checked = event.target.checked;
    var name = event.target.name;
        
    if(checked){
      console.log(checked, id, name);
      var value = event.target.value;
      this.setState({
        [event.target.name] : value,
      },()=>{
        console.log('question1', this.state.question1,  this.state.question2,this.state.question3);
      })
    }else{
      this.setState({
        [event.target.name] : "",
      })
    }
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
  isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)  && (charCode < 96 || charCode > 105))
    {
    evt.preventDefault();
      return false;
    }
    else{
      return true;
    }
  }
  isTextKey(evt)  {
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode!=189 && charCode > 32 && (charCode < 65 || charCode > 90) )
   {
    evt.preventDefault();
      return false;
    }
    else{
      return true;
    }
  }

  render() {
  
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
                                <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                    <p><b>1) What is the primary goal for the funds invested through WealthyVia?</b><span className="asterix">*</span></p>
                                    <div className="">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="question1" value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} required />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="question2" value="I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years" onChange={this.getCheckValue.bind(this)} />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="question3" value="Just strong core portfolio with blue chips or mutual fund but ok to earn something extra." onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="question4" value="I wanna allocate some portion to big tech giants like amazon facebook types too." onChange={this.getCheckValue.bind(this)} />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="question5" value="I am day trader, daily play with markets. I want continuous smart trades." onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                            </div>
                                          </div>
                                       </div> 
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>2) Any near term need for the funds invested with us ?</b><span className="asterix">*</span></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                     
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Yes after two years</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Yes after 6 -8 months</span>
                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
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
                                      <p><b>1) What is the primary goal for the funds invested through WealthyVia?</b><span className="asterix">*</span></p>
                                      <div className="">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                 <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="checkbox"  name="question1" value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} />
                                                        <span className="centreDetailCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                                  <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="checkbox" name="question2" value="hgjggk" onChange={this.getCheckValue.bind(this)}/>
                                                        <span className="centreDetailCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                                  <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="checkbox" name="question3" value="hgjggkjjnk" onChange={this.getCheckValue.bind(this)} />
                                                        <span className="centreDetailCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                                  <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="checkbox" name="question4" value="hgjggkn,n" onChange={this.getCheckValue.bind(this)} />
                                                        <span className="centreDetailCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                                  <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="checkbox" name="question5" value="hjhghjhgjhggjggk" onChange={this.getCheckValue.bind(this)} />
                                                        <span className="centreDetailCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                              </div>
                                            </div>
                                         </div> 
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                              <p><b>2) Any near term need for the funds invested with us ?</b></p>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20">
                                       
                                                <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="radio" name="price" value="hjhghjhgjhggjggk" onChange={this.getCheckValue.bind(this)}/>
                                                        <span className="radioCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">Yes after two years</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                                <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="radio" name="price"/>
                                                        <span className="radioCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem col-xs-9">Yes after 6 -8 months</span>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                                <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                        <input type="radio" name="price"/>
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
                             <div className="modal fade in " id="riskform2" role="dialog">
                                <div className="modal-dialog modal-lg customModalRP hight400" >
                                  <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseModalTwo.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Your Investment Profile</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 hidden-xs hidden-sm ">
                                      <form id="riskform">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                            <p><b>3) Your investments % exposure of your investable capital can be best described as</b><span className="asterix">*</span></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row ">
                                                      <input type="radio" name="price" value="FD/bonds/gold 80%, MF /direct equity 20%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">FD/bonds/gold 80%, MF /direct equity 20% </span>

                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>

                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 10%, MF 25%, Direct equity 65%.</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">Direct equity 90%, FD 10%.</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>4) What is number of years you have spent in stock market investments</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>5) What is your biggest drawdown on your entire portfolio ?</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">0 to -25%</span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem  col-xs-9">-25% to -50%</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
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
                                      <div className="hidden-md hidden-lg col-sm-12 col-xs-12 modalBodyCustomSmall">
                                      <form id="riskform">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                            <p><b>3) Your investments % exposure of your investable capital can be best described as</b><span className="asterix">*</span></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">FD/bonds/gold 80%, MF /direct equity 20% </span>

                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>

                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 10%, MF 25%, Direct equity 65%.</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">Direct equity 90%, FD 10%.</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>4) What is number of years you have spent in stock market investments</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="two"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>5) What is your biggest drawdown on your entire portfolio ?</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">0 to -25%</span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem  col-xs-9">-25% to -50%</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name="three"/>
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
                                               <div className="hidden-lg hidden-md col-sm-4 col-xs-4 submitButton  mt60 pull-right" onClick={this.Submit.bind(this)}>
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
                                                   <input type="file" className="customInputKF inputBox nameParts" name="fileUpload"  ref="fileUpload" onChange={this.checkSizeFU.bind(this)} />
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
                                              <label>Name</label>
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
                                              <label>Mobile Number</label>
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
                                              <label>Email ID</label>
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
                       <label>Ready to go?</label><br/>
                       <span>Start your wealth creation today with us</span><br/>
                       <div className="col-lg-11 col-lg-offset-1 noPadding">
                        <div className="buyNowButtonPP col-lg-3"  data-toggle="modal" data-target="#myModal">Invest Now</div>
                        <div className="col-lg-offset-1 col-lg-3 enquireNow"  data-toggle="modal" data-target="#EnquireModal">Enquire Now</div>
                        <div className="col-lg-offset-1 col-lg-3 buyNowButtonPP"  data-toggle="modal" data-target="#portfolioReview">Portfolio Review</div>
                      
                        </div>
                        </div>
                      </div>
                </div>
    );
  }
}
