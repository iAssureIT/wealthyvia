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
    
        swal("Congrats..!", "Your data is submitted sucessfully!", "success")
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
        swal("Thank You!", "Our tem will get in touch with you shortly..!", "success")
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
  SubmitFirst(event){
    event.preventDefault();
      $("#myModal").hide();
    $("#myModal").removeClass('in');
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
                                    <button type="button" className="close" data-dismiss="modal" > <i className="fa fa-times"></i></button>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                                      <form id="riskform">
                                          <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                          <p><b>1) What is the primary goal for the funds invested through WealthVia?</b></p>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ReactMultiSelectCheckboxes options={options} />
                          </div>
                                        </div> 
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>2) Any near term need for the funds invested with us ?</b></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <div className="dropdown">
                                  <button type="button" 
                                    className="btn customDrop btn-select"
                                    data-toggle="dropdown">Select..</button>
                                  <ul className="dropdown-menu dropdown-menu-select">
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="001" name="alphabet"/>
                                      <i>Yes after two years</i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="002" name="alphabet"/>
                                      <i>Yes after 6 -8 months</i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="003" name="alphabet"/>
                                      <i>It’s a separate capital to invest apart from my needs. I want to build good portfolio.</i>
                                      </label>
                                  </li>
                                  </ul>
                                </div>                                            
                              </div>
                                            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>3) Your investments % exposure of your investable capital can be best described as</b></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <div className="dropdown">
                                  <button type="button" 
                                    className="btn customDrop btn-select"
                                    data-toggle="dropdown">Select..</button>
                                  <ul className="dropdown-menu dropdown-menu-select">
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="001" name="alphabet"/>
                                      <i>FD/bonds/gold 80%, MF /direct equity 20% </i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="002" name="alphabet"/>
                                      <i>FD 60% , 30 %Gold, 10% bonds, no direct equity</i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="003" name="alphabet"/>
                                      <i>FD 10%, MF 25%, Direct equity 65%.</i>
                                      </label>
                                  </li>
                                    <li><label className="dropdown-radio">
                                      <input type="radio" value="003" name="alphabet"/>
                                      <i>Direct equity 90%, FD 10%. </i>
                                      </label>
                                  </li>
                                  </ul>
                                </div>                                            
                              </div>
                                            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>4) What is number of years you have spent in stock market investments</b></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <div className="dropdown">
                                  <button type="button" 
                                    className="btn customDrop btn-select"
                                    data-toggle="dropdown">Select..</button>
                                  <ul className="dropdown-menu dropdown-menu-select">
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="001" name="alphabet"/>
                                      <i>0-2 years </i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="002" name="alphabet"/>
                                      <i>3-5 years</i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="003" name="alphabet"/>
                                      <i>5 years plus</i>
                                      </label>
                                  </li>
                                    <li><label className="dropdown-radio">
                                      <input type="radio" value="04" name="alphabet"/>
                                      <i>12-15 plus years </i>
                                      </label>
                                  </li>
                                  </ul>
                                </div>                                            
                              </div>
                                            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>5) What is your biggest drawdown on your entire portfolio ?</b></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <div className="dropdown">
                                  <button type="button" 
                                    className="btn customDrop btn-select"
                                    data-toggle="dropdown">Select..</button>
                                  <ul className="dropdown-menu dropdown-menu-select">
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="001" name="alphabet"/>
                                      <i>0 to -25% </i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="002" name="alphabet"/>
                                      <i>-25% to -50%</i>
                                      </label>
                                  </li>
                                  <li><label className="dropdown-radio">
                                      <input type="radio" value="003" name="alphabet"/>
                                      <i>-51% to -75%</i>
                                      </label>
                                  </li>
                                    <li><label className="dropdown-radio">
                                      <input type="radio" value="04" name="alphabet"/>
                                      <i>More than -75%</i>
                                      </label>
                                  </li>
                                  </ul>
                                </div>                                            
                              </div>
                                            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textAlignCenter">
                                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.SubmitFirst.bind(this)}>Submit</div>
                                            
                                        </div>
                                      </form>
                                    </div>
                                  
                                </div>
                  </div>
                  <div className="modal fade in " id="kycModal" role="dialog">
                                <div className="modal-dialog customModalRP hight400" >
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <form>
                              <div className="col-lg-12   col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                                  <h4 className="formNameTitle "><span className="">KYC Collection Form</span></h4>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row">
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Name</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                      <input type="text" className="customInputKF inputBox nameParts" id="name" name="name" placeholder="Enter Name" ref="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                                     <div className="errorMsg">{this.state.errors.name}</div>

                                    </div>

                                </div>

                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row"> 
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Mobile Number</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                      <input type="number" className="customInputKF inputBox nameParts" name="contactNumber" placeholder="Enter Mobile Number" ref="contactNumber" value={this.state.contactNumber} onChange={this.handleChange.bind(this)}/>
                                    <div className="errorMsg">{this.state.errors.contactNumber}</div>

                                    </div>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row">
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Email ID</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                         <input type="email" className="customInputKF inputBox nameParts" name="email" placeholder="Enter Email ID" ref="email" value={this.state.email}  onChange={this.handleChange.bind(this)}/>
                                    <div className="errorMsg">{this.state.errors.email}</div>

                                    </div>
                                </div>
                              </div>
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row">
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>PAN (JPEG/PNG/PDF) </label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                         <input type="file" className="customInputKF inputBox nameParts" name="panNumber"  ref="panNumber" onChange={this.handleChange.bind(this)} />
                                       <div className="errorMsg">{this.state.errors.panNumber}</div>

                                    </div>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row">
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Adress Proof (JPEG/PNG/PDF)</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
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
                        <div className="modal-dialog customModalRP hight450" >
                            <button type="button" className="close" data-dismiss="modal" onClick={this.CloseKycModal.bind(this)}> <i className="fa fa-times"></i></button>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <form>
                              <div className="col-lg-12   col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                                  <h4 className="formNameTitle "><span className="">Enquire Now</span></h4>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row">
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Name</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                      <input type="text" className="customInputKF inputBox nameParts" id="nameModal" name="nameModal" placeholder="Enter Name" ref="nameModal" value={this.state.nameModal} onChange={this.handleChange.bind(this)}/>
                                     <div className="errorMsg">{this.state.errors1.nameModal}</div>

                                    </div>

                                </div>

                              </div>
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row"> 
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Mobile Number</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                      <input type="number" className="customInputKF inputBox nameParts" name="contactNumberModal" placeholder="Enter Mobile Number" ref="contactNumberModal" value={this.state.contactNumberModal} onChange={this.handleChange.bind(this)}/>
                                    <div className="errorMsg">{this.state.errors1.contactNumberModal}</div>

                                    </div>
                                </div>
                              </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                <div className="row">
                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                      <label>Email ID</label>
                                    </div>
                                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                                         <input type="email" className="customInputKF inputBox nameParts" name="emailModal" placeholder="Enter Email ID" ref="emailModal" value={this.state.emailModal}  onChange={this.handleChange.bind(this)}/>
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
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter backColorYellow">
                       <label>Ready to go?</label><br/>
                       <span>Start making trades the fee-free way in just two minutes</span><br/>
                       <div className="col-lg-6 col-lg-offset-4">
                        <div className="buyNowButtonPP col-lg-4"  data-toggle="modal" data-target="#myModal">Invest Now</div>
                        <div className="col-lg-offset-1 col-lg-4 enquireNow"  data-toggle="modal" data-target="#EnquireModal">Enquire Now</div>
                      
                        </div>
                        </div>
                      </div>
                </div>
    );
  }
}
