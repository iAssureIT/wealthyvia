import React, { Component } from 'react';
import $ 				 			from 'jquery';
import Invest        				         from "../../blocks/Invest/Invest.js";
import ProductPageBanner                        from "../../blocks/ProductPageBanner/ProductPageBanner.js";
import FiveGCPMDiv                        from "../../blocks/FiveGCPMDiv/FiveGCPMDiv.js";
import GrowthFactor                        from "../../blocks/GrowthFactor/GrowthFactor.js";
import CorporateGovernance                        from "../../blocks/CorporateGovernance/CorporateGovernance.js";
import Practicability                        from "../../blocks/Practicability/Practicability.js";
import MagicFormula                        from "../../blocks/MagicFormula/MagicFormula.js";
import swal               from 'sweetalert';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import ReadyToGo                        from "../../blocks/ReadyToGo/ReadyToGo.js";

import "./ProductPage.css";

export default class ProductPage extends Component {
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

	console.log(this.props.match.params.divId);
	this.setState({
		divID : this.props.match.params.divId,
	})
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
        "panNumber"     	: "",
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
	if(this.state.divID == "safeHevenMoats")
	{
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="row">
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
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
							</div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerSH">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Safe Heaven Moats
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>Wealthyvia primary motto is to “Capital Protection. Risk Mitigation. Alpha generation. This portfolio is created keeping in mind that – “Protect your downside.Upside will take care of itself”. </p>
                      </div>
                    </div>

                      <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5  investNowButton" >
                      <div className="row">
                      Invest now
                      </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          
     
			  	{/*	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgInfo imageContainer">
                <label className="investLabel">Introducting you to SHM</label>

			  			<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently. Asked him what he has.. he didn't say much but said I saw many bull and bear markets but it’s the quality of earnings and quality of management that prevails. Market is like "alawavarach paani" ...water drop on colocasia leaf.</p>
              <p> Portfolio consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</p>
                 <img src="/images/boat.jpg"/>
			  		</div>   */}
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer mt20">
                        <img src="/images/over.jpg"/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Overview </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                        <li>This portfolio consists of Robust, high quality large cap bluechip companies that have consistently high return on capital, very strong business moats, leadership in their segments  and that are part of natural consumption behaviour of Indian  middle class.</li>
                        <li>This portfolio is created keeping in mind that – “Protect your downside. Upside will take care of itself”.</li>
                        <li>Portfolio consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</li>
                        <li class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default customPanelPP"><div class="panel-heading noPadding customHead" role="tab" id="headingOne"><a role="button" className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Preferred companies</a></div><div id="collapseOne" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne"><div class="panel-body"><p> <ul className="customOl listStyle"><li>Large Caps</li><li>Leaders in the sector</li><li>Quality Management</li><li>Strong Balance sheet</li><li>Decent growth</li><li>Earnings predictability / Non Cyclical stocks</li><li>Linked to Indian growth story</li></ul> </p> </div></div></div></li><li class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default customPanelPP"><div class="panel-heading noPadding customHead" role="tab" id="headingTwo"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">Companies we don’t invest in</a></div><div id="collapseTwo" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingTwo"><div class="panel-body"><p><ul className="customOl listStyle"><li>Large Caps</li><li>Leaders in the sector</li><li>Quality Management</li><li>Strong Balance sheet</li><li>Decent growth</li><li>Earnings predictability / Non Cyclical stocks</li><li>Linked to Indian growth story</li></ul> </p> </div></div></div></li><li>Total number of stocks held in this portfolio at any given point of time will be less than 15.</li>
                        <li>Read a detailed blog post about this here</li>
                        </ul>
                      </p>                 
                    </div>
                  
               
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">5G : Five types of Growths </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>
                          Sales</li>
                        <li>Profits</li>
                        <li>Clients/product volume/value addition/branches/territories (micros of business economics)</li>
                        <li>Margins :  one should be sure that margin will not decline. Headwinds, sectorial downturns, raw material prices, fierce competition, import duties, tax laws, substitute products , advanced tech makes margin decline.</li>
                        <li>Market share/demand/ size of opportunity : this defines leadership position. Always no1 or no2 company having considerable and increasing size of opportunity .</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 riskDivPP">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDiv textAlignCenter"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 addDiv"></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12"><blockquote className="blogQuate">"Vessels large may venture more, but little boats should keep near the shore. "</blockquote></p>
                    <span className="col-lg-10 col-md-12 col-sm-12 col-xs-12 nameOfAuther"><label className="pull-right"> - Benjamin Franklin</label></span>
                    </div>  
                </div>  
            </div>

               
     
			
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            </div>
           
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                              <label>For whom this product is suitable</label>

                            </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Risk can be crash like 2008 or recession economy
                            <ul>
                              <li>Disruptions from challenger companies.</li>
                              <li>Change of consumption patterns and behaviours.</li>
                            </ul>
                          </li>
                          <li><span className="numberDiv">2</span> This is a low risk portfolio created for investors who are having low risk appetite but at the same time want to generate alpha over a period of time vis-à-vis Debt fund returns.</li>
                          <li><span className="numberDiv">3</span>Suitable for investors who are in their Middle age or closer to retirement who are looking forward to invest a portion portfolio of their savings in Equities.</li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="/images/suitableFor.jpg"/>
                    </div>
                  </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/suitableFor.jpg"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Magic Formula </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Risk can be crash like 2008 or recession economy</li>
                          <li><span className="numberDiv">2</span> This is a low risk portfolio created for investors who are having low risk appetite but at the same time want to generate alpha over a period of time vis-à-vis Debt fund returns.</li>
                          <li><span className="numberDiv">3</span>Suitable for investors who are in their Middle age or closer to retirement who are looking forward to invest a portion portfolio of their savings in Equities.</li>
                        </ul>
                      </p>                      
                    </div>
                
                </div>
              </div>

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
	else if(this.state.divID == "5gcpm"){
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="row">
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
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
						</div>
            <ProductPageBanner/>
            <FiveGCPMDiv/>
            <GrowthFactor/>
            <CorporateGovernance />
            <Practicability />
            <MagicFormula/>
			  	{/*	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titleContainer">
			  			<label>5GCPM</label>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
         		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 ">
			  			<label className="investBlock">5GCPM  – A method based model Portfolio by Wealthyvia</label>
			  			<Invest/>
			  		</div>
			  		
			  		<div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
			  			<label>5G : Five types of Growths </label>
			  			<ul className="customOl">
			  				<li>
			  				Sales</li>
							<li>Profits</li>
							<li>Clients/product volume/value addition/branches/territories (micros of business economics)</li>
							<li>Margins :  one should be sure that margin will not decline. Headwinds, sectorial downturns, raw material prices, fierce competition, import duties, tax laws, substitute products , advanced tech makes margin decline.</li>
							<li>Market share/demand/ size of opportunity : this defines leadership position. Always no1 or no2 company having considerable and increasing size of opportunity .</li>
							
							
			  			</ul>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 specifications lineSpace" id="cg">
			  			<label> C : Corporate Governance</label>
			  			<ul>
			  				
							<li> ROE /ROCE /ROIC </li>
							<li> High promoter holding  </li>
							<li> Tax evasions  </li>
							<li> Dividends  </li>
							<li> Free Cash flows  </li>
							<li> Related party transactions   </li>
							<li> Too many subsidiaries  </li>
							<li> Reputation  </li>
						</ul>
			  		</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 specifications lineSpace" id="practicability">
			  			<label> P : Practicability</label>
			  			<ul>
			  				
							<li> What is probability of entire investment turning profitable? </li>
							<li> Feasibility : constraints of net blocks-fixed assets, cash in hand, team capability, demand for sales. </li>
							<li> Natural tailwinds  </li>
							<li> Hurdles in achievement ?   </li>
							<li> What can go wrong in plan  </li>
							
						</ul>
			  		</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 specifications lineSpace" id="magic">
			  			<label> M : Magic </label>
			  			<ul>
			  				
							<li> A formula based on Free cash flows , constancy of earnings, return ratios, sales and profit growths where no parameters of MCAP size or PE  or EV/EBITDA multiples taken over the period of 5-7-10 years. In 7-10 years business economics are well tested against inflation, government and their policy changes, crude extreme fluctuations, trade wars, real wars, competition, technology changes, market share changes, substitute products. </li>
							<li> We found it results in list of companies having no drag or drawdown of more than 25% from top i.e. new high a stock makes. There are only 170 such companies in market. This MAGIC screen basically gives natural support to stock price and price anchoring in quality growth companies. </li>
							<li> A technical chart of long term not daily or weekly but of months and years which clearly tells whether its long term uptrend is intact or not. We found this has 90% accuracy over long term trend prediction  </li>
							<li> 7 parameters are combined to form one single signal as derivative of them and gives best possible indication that is most useful for True Investors.   </li>
							
						</ul>
			  		</div>

					
					
*/}
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
	}else if(this.state.divID == "safeHeven"){
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="row">
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
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
							</div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerUS">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Safe Heaven Stocks + Alpha
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>This product is designed to generated Regular income for clients with a limited risk exposure to F&O segment.</p>
                      </div>
                    </div>

                      <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5  investNowButton" >
                      <div className="row">
                      Invest now
                      </div>
                    </div>
                </div>
              </div>
              </div>
            </div>
          
			  	  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer mt20">
                        <img src="/images/over.jpg"/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Overview</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>As your existing Mutual Funds or Artha – Safe Heaven Stocks portfolio is doing its job of compounding over a long period of time, Investors have an opportunity to generate alpha by collateralizing the underlying portfolio or Mutual Funds.</li>
                        <li>The margin the client receives after collateralizing his portfolio / mutual funds is used to take low risk, limited exposure to Nifty F&O segment.</li>
                        <li>Predefined strategies for Entry & Exit signals, Profit booking & Strict stop loss.</li>
                        <li class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default customPanelPP"><div class="panel-heading noPadding customHead" role="tab" id="headingOne"><a role="button" className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Strategy will only be implement  on</a></div><div id="collapseOne" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne"><div class="panel-body"><p> <ul className="customOl listStyle"><li>Nifty Future & Options (monthly).</li></ul> </p> </div></div></div></li><li class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default customPanelPP"><div class="panel-heading noPadding customHead" role="tab" id="headingOne"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">We don’t indulge in</a></div><div id="collapseTwo" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingTwo"><div class="panel-body"><p><ul className="customOl listStyle"><li>Bank Nifty or Any other indices</li><li>F&O segment of Individual companies.</li></ul> </p> </div></div></div></li><li>Total number of stocks held in this portfolio at any given point of time will be less than 15.</li>
                        <li>Read a detailed blog post about this here</li>
                        </ul>
                      </p>                 
                    </div> 

                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Risks Involved </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>No matter how much we strategize & risk averse we are, they are always risks associated with dealing in F&O markets.</li>
                        <li class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default customPanelPP"><div class="panel-heading noPadding customHead" role="tab" id="headingThree"><a role="button" className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">As an advisory, it is our responsibility to bring to your notice & inform you about them</a></div><div id="collapseThree" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingThree"><div class="panel-body"><p> <ul className="customOl listStyle"><li>Additional Margin (Margin Call) – During some black swan days, where our trades got into losses – you may receive margin calls from your broker for additional capital infusion.<ul><li>Additional Margin (Margin Call) – During some black swan days, where our trades got into losses – you may receive margin calls from your broker for additional capital infusion.</li></ul></li><li>Capital Risk: - By the nature of F&O, there is a risk of capital loss for the investor.<ul><li>How we can mitigate this? – We understand the risks associated with F&O and hence we never take any aggressive positions. We never deal with other indices except Nifty F&O. We also never deal with individual companies F&O, which always have high risk of violent moves / high volatility involved.</li></ul></li></ul> </p> </div></div></div></li>
                        </ul>
                      </p>                 
                    </div>
                       <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer mt20">
                        <img src="/images/risk.jpg"/>
                    </div>
			 
			  	
				
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                              <label>Who is it suitable for?</label>

                            </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="/images/suitableFor.png"/>
                    </div>
                  </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/suitableFor.gif"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                     
                    </div>
                
                </div>
              </div>
					
					
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
	}else if(this.state.divID == "unlistedPre"){
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="row">
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
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
                															        <input type="radio" value="004" name="alphabet"/>
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
              															        <input type="radio" value="004" name="alphabet"/>
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
                															        <input type="radio" value="004" name="alphabet"/>
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
							</div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerStocks">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      US Stocks investing
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>Total US stock Market makes 40% plus of global equity markets. The U.S. stock market is currently $34 trillion plus.</p>
                      </div>
                    </div>

                      <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5  investNowButton" >
                      <div className="row">
                      Invest now
                      </div>
                    </div>
                </div>
              </div>
              </div>
            </div>
			  	     
            <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer mt20">
                        <img src="/images/productDesc.jpg"/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Few Facts on USA market  </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>AThe mighty NYSE, representing $18.5 trillion in market capitalization, or about 27% of the total market for global equities.</li>
                        <li>Elite group, with familiar names such as the NYSE, Nasdaq, LSE, Deutsche Borse, TMX Group, and Japan Exchange Group, comprise 87% of the world’s total value of equities.</li>
                        <li>The value-weighted average capitalization of U.S. companies is $176 billion, whereas the average capitalization of foreign companies is less than a fourth of that at $37 billion. This disparity is most prominent in technology stocks, where relative size has changed over time. U.S. technology stocks were 2.5 times as big as foreign stocks in 2007; U.S. tech stocks had an average capitalization of $138 billion, versus $50 billion for foreign tech.</li>
                        <li>All of the world's 10 largest companies as measured by market capitalization are American. Most of these companies are mega-cap companies, or those with market capitalizations above $300 billion</li>
                        </ul>
                      </p>                 
                    </div> 
			  	
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  chartContainer" id="cg">
			  			<label> Since 2010 , US market outperformed Indian Market</label>
			  			<img src="/images/chart1.jpg" className=""/>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  chartContainer " id="cg">
			  			<label> Natural Benefit of USD INR increase over longer time</label>
			  			<img src="/images/usinr.jpg" className=""/>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  chartContainer " id="cg">
			  			<label> Natural Benefit of USD INR increase over longer time</label>
			  			<img src="/images/chart3.jpg" className=""/>
			  		</div>
				
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                              <label>How we can help you invest in US market</label>

                            </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Choosing right kind of stocks with research reports</li>
                          <li><span className="numberDiv">2</span> Zero brokerage charges and very low maintenance charges unlike few international brokerages offering high charges</li>
                          <li><span className="numberDiv">3</span>Ease of buy sell and amount transfers to your own accounts.</li>
                          <li><span className="numberDiv">4</span>Assistance in Liberalized Remittance Scheme</li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="/images/help.jpg"/>
                    </div>
                  </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/help.jpg"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                     
                    </div>
                
                </div>
              </div>
					
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
	}else{
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="row">
			  			 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerUS">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent pull-right">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading " >
                      <div className="row">
                      Unlisted shares
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara ">
                      <div className="row">
                        <p>We not just sell unlisted shares at Wealthyvia.com, but also first analyse the company and it’s shares liquidity and then only we will put on website to purchase for the investors. </p>
                      </div>
                    </div>

                </div>
              </div>
              </div>
            </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgInfo imageContainer">
                <label className="investLabel">What is Unlisted Shares?</label>

              <p>We are a Mumbai based dealer of Unlisted, Pre IPO shares. Our superiority stems robust systems and processes which provide smooth and hassle-free flow of agreement backed transactions by ensuring timely delivery of shares and money to the clients.
              Many young companies grow much faster than mature companies due to their lower base hence they tend to significantly outperform the benchmark returns.</p>
              <p>However, a lot of this growth happens before the company goes public with an IPO. Hence participating in such companies in the Growth / Pre IPO stage can provide superior returns to the investor. Buyers need a safe mechanism that gives them access to high quality shares at the best price, provides matching of trade and enables even retail purchases.
              While investments in Unlisted/Pre IPO shares have the potential of giving high returns, they are also accompanied by higher risk due to a variety of reasons. Investors need to exercise caution while investing in Unlisted/Pre IPO companies. Generally, they should have a minimum time horizon of 4 years and should not allocate more than 30% of their portfolio in Unlisted/Pre IPO shares.
              </p>
            </div>   
			  		<div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer mt20">
                      <img src="/images/buyProcess.png"/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">The process to buy unlisted shares </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                         <li>As soon as investor will drop details with the name of the unlisted shares name and quantity which you would like to buy from us; we will get in touch with you.</li>
                          <li> We will share our account number and we will need your CMR copy which you will get from your broker.</li>
                          <li> Investor needs to then transfer the trade amount to our bank account and within T + 3-4 working days, you will get those shares in your CDSL or NSDL account (depending upon your broker).</li>
                        
                        </ul>
                      </p>                 
                    </div>
			  	
			 
			  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray buyShares">
			  		
									<label>How can you buy these unlisted shares online?</label>
								<ul className="listStyleNone textAlignCenter">
								     <li className="col-lg-6 mt20"><i class="fa fa-envelope customIcon" aria-hidden="true"></i>
                     <p>You need to drop the mail on <br/><span className="blueColor">unlistedshares@xyz.com</span></p></li>
								     <li className="col-lg-6 mt20"><i class="fa fa-phone customIcon" aria-hidden="true"></i><p>Contact on <br/> <span className="blueColor">8369508540</span></p></li>
								</ul>
							
			  		</div>
			  	
			
			  	
			  		 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                              <label>Beware of following</label>

                            </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>we never try to change the details over a phone call or any direct mail.</li>
                          <li><span className="numberDiv">2</span>Ask you to send us investor’s bank details by email from any other id.</li>
                          <li><span className="numberDiv">3</span>If you receive any such communication it can be a fraudulent activity. Please notify us in that case.</li>
                          <li><span className="numberDiv">4</span>We never change our account details during transactions</li>
                          <li><span className="numberDiv">5</span>If we will ever change the details same will be reflected on our website.</li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  imageContainer">
                    <div>
                      <img src="/images/security.png"/>
                    </div>
                  </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer">
                    <div>
                      <img src="/images/security.png"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                     
                    </div>
                
                </div>
              </div>
          

				</div>	
			
			</div>

		);
	}
	}
}
