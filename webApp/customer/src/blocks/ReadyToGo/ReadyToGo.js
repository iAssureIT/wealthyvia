import React, { Component } from 'react';
import $         from 'jquery';
import swal               from 'sweetalert';

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


import "./ReadyToGo.css";

export default class ReadyToGo extends Component {

  constructor(props){
    super(props);
      this.state = {
        productDetailsArray:[],
            "name"             : "",
            "panNumber"      : "",
            "email"            : "",
            "nameModal"             : "",
            "panNumberModal"      : "",
            "emailModal"            : "",
            "addressProof"      : "",
            "contactNumber"    : "",
          "fields"        : {},
            "errors"        : {},  
            "fields1"        : {},
            "errors1"        : {},
      };
    }  
    componentDidMount()
    {
          console.log('Selected value=',$('.dropdown-radio').find('input').change())
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

/*  console.log(this.props.match.params.divId);
  this.setState({
    divID : this.props.match.params.divId,
  })*/
    }
     onOptionSelect = (value) => {
    console.log('Selected value=', value) 
  }
  handleChange(event){

    this.setState({
      "name"             : this.refs.name.value,
      "contactNumber"    : this.refs.contactNumber.value,
      "email"            : this.refs.email.value,
       "nameModal"             : this.refs.nameModal.value,
      "contactNumberModal"    : this.refs.contactNumberModal.value,
      "emailModal"            : this.refs.emailModal.value,
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
 $("#kycModal").hide();
    $("#kycModal").removeClass('in');
      $(".modal-backdrop").remove();
  console.log("In")
  $("body").removeClass("modal-open");
      this.setState({
        "panNumber"       : "",
        "addressProof"      : "",
        "name"             : "",
        "email"            : "",
        "contactNumber"    : "",
       
        "fields"           : fields
      });
      
    }

    }

  CloseKycModal(){
   $("#kycModal").hide();
    $("#kycModal").removeClass('in');
  $(".modal-backdrop").remove();
  console.log("In")
  $("body").removeClass("modal-open");

  }
  SubmitEnquire(event){
  event.preventDefault();
      console.log("In",this.validateFormReqModal() )
      console.log("In",this.validateFormModal() )


  if (this.validateFormModal() && this.validateFormReqModal()) {
     
      var dataArray={
     
       "nameModal"             : this.refs.nameModal.value,
      "contactNumberModal"    : this.refs.contactNumberModal.value,
      "emailModal"            : this.refs.emailModal.value,

    }
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
    const options = [
  { label: '15% is fine with me but don’t wanna lose at all . Safety first . Long term.', value: 1},
  { label: 'I am ok to take little risk but return should be 25-30%', value: 2},
  { label: 'I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years', value: 3},
  { label: 'Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.', value: 4},
  { label: 'I wanna allocate some portion to big tech giants like amazon facebook types too.', value: 5},
  { label: 'I am day trader, daily play with markets. I want continuous smart trades.', value: 6},

];

    return (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
                <div className="row">
                  <div className="modal fade in " id="myModal" role="dialog">
                      <div className="modal-dialog customModalRP" >
                        <div class="modal-header textAlignCenter modalHeaderCustom">
                          <button type="button" className="close" data-dismiss="modal" > <i className="fa fa-times"></i></button>
                          <h4 class="modal-title">Your Investment Profile</h4>
                        </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 modalBodyCustom " >
                            <form id="riskform">
                                <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                <p><b>1) What is the primary goal for the funds invested through WealthyVia?</b></p>
                                    <div className="">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="price" />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                            </div>
                                      
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="price" />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="price" />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="price" />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="checkbox" name="price" />
                                                      <span className="centreDetailCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                            </div>
                                          </div>
                                       </div> 
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>2) Any near term need for the funds invested with us ?</b></p>
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
{/*                                          <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2  submitButtonRP" onClick={this.backButton.bind(this)}>Back</div>
*/}                                            
                                        </div>
                                      </form>
                                    </div>
                                  
                                </div>
                             </div>
                             <div className="modal fade in " id="riskform2" role="dialog">
                                <div className="modal-dialog customModalRP hight400" >
                                  <div class="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseModalTwo.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 class="modal-title">Your Investment Profile</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <form>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>3) Your investments % exposure of your investable capital can be best described as</b></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">FD/bonds/gold 80%, MF /direct equity 20% </span>

                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>

                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">FD 10%, MF 25%, Direct equity 65%.</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Direct equity 90%, FD 10%.</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>4) What is number of years you have spent in stock market investments</b></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>5) What is your biggest drawdown on your entire portfolio ?</b></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">0 to -25%</span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">-25% to -50%</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 row">
                                                      <input type="radio" name="price"/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">More than -75%</span>

                                          </div> 
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                             <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.SubmitSecondModal.bind(this)}>Submit</div>
                                          <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2  submitButtonRP" onClick={this.backButton.bind(this)}>Back</div>
                                            
                                               
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                             <div className="modal fade in " id="kycModal" role="dialog">
                                <div className="modal-dialog customModalKYC " >
                                 <div class="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 class="modal-title">KYC Form</h4>
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
                                                   <input type="file" className="customInputKF inputBox nameParts" name="panNumber"  ref="panNumber" onChange={this.handleChange.bind(this)} />
                                                 <div className="errorMsg">{this.state.errors.panNumber}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Adress Proof (JPEG/PNG/PDF)</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="addressProof" placeholder="Enter Name" ref="addressProof" onChange={this.handleChange.bind(this)} />
                                                <div className="errorMsg">{this.state.errors.addressProof}</div>
           
                                             </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 submitButton pull-right" onClick={this.Submit.bind(this)}>
                                                Submit
                                              </div>
                                               
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                            <div className="modal fade in " id="EnquireModal" role="dialog">
                                <div className="modal-dialog customModalEN" >
                                 <div class="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 class="modal-title">Enquire Now</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                    <form>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-2 col-sm-2 col-xs-2">
                                              <label>Name</label>
                                            </div>
                                             <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8">
                                              <input type="text" className="customInputKF inputBox nameParts" id="nameModal" name="nameModal" placeholder="Enter here" ref="nameModal" value={this.state.nameModal} onChange={this.handleChange.bind(this)}/>
                                             <div className="errorMsg">{this.state.errors1.nameModal}</div>

                                            </div>

                                        </div>

                                      </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row"> 
                                            <div className="col-lg-12 col-md-2 col-sm-2 col-xs-2">
                                              <label>Mobile Number</label>
                                            </div>
                                             <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8">
                                              <input type="number" className="customInputKF inputBox nameParts" name="contactNumberModal" placeholder="Enter here" ref="contactNumberModal" value={this.state.contactNumberModal} onChange={this.handleChange.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.contactNumberModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-2 col-sm-2 col-xs-2">
                                              <label>Email ID</label>
                                            </div>
                                             <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8">
                                                 <input type="email" className="customInputKF inputBox nameParts" name="emailModal" placeholder="Enter here" ref="emailModal" value={this.state.emailModal}  onChange={this.handleChange.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.emailModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                       
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 submitButton pull-right" onClick={this.SubmitEnquire.bind(this)}>
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
                       <div className="col-lg-6 col-lg-offset-4 noPadding">
                        <div className="buyNowButtonPP col-lg-4"  data-toggle="modal" data-target="#myModal">Invest Now</div>
                        <div className="col-lg-offset-1 col-lg-4 enquireNow"  data-toggle="modal" data-target="#EnquireModal">Enquire Now</div>
                      
                        </div>
                        </div>
                      </div>
                </div>
    );
  }
}
