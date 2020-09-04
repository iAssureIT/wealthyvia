import React, { Component } from 'react';
// import { Link } 			from 'react-router-dom';
//import {browserHistory} 	from 'react-router';
import swal 				from 'sweetalert';
import $ 					from "jquery";
import axios 				from 'axios';
import queryString          from "query-string";
import moment from 'moment';

import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class SignUp extends Component {

 	constructor(){
      super();
        this.state = {           
            loggedIn            : false,
            fields              : {},
      	   	errors              : {},
      	   	firstNameV 			: '',
      	   	lastNameV			: "",
	     	mobileV 			: "",
	    	emailIDV			: "",
	    	signupPassword  	: "",
	    	buttonHeading   	: "Sign Up",
          	auth:{
                firstname       : '',
                lastname        : '',
                mobNumber       : '',
                email           : '',
                pwd       		: '',
                signupPassword  : '',
                role 			: ''
               
            },
            city                : '',
            states               : '',
            location            : '',
            dob                 : '',
            dobV                : '',
            distributorCode     : '',
            distributorName     : ''
        }
         this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {

    	//================placeautocomplete==============//

		    window.initMap = this.initMap
		    const gmapScriptEl = document.createElement(`script`)
		    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE&libraries=places&callback=initMap`    
		    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
		  
		//==================edit=================// 

    	const parsed = queryString.parse(this.props.location.search);
  		this.setState({destination : parsed.destination});
  		
   		localStorage.setItem("destination",parsed.destination);
   		if(parsed){
   			const decryptcode = parsed.x;
   			if(decryptcode){
   				var distributorcode = decryptcode / 298564 ;
   				if(distributorcode < 1000){
   					distributorcode =distributorcode.toString().padStart(4, "0")
   				}
   				distributorcode = "WVP"+distributorcode;
	   		    console.log("distributorcode", distributorcode);
	   		    this.setState({distributorCode : distributorcode});
	   		    this.getDistributorData(distributorcode);
   			}   		    
   		}
   		

    }

    initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

    getDistributorData(distributorcode){
    
    axios.get("api/distributormaster/get/one/bydistributorcode/"+distributorcode)
    .then(res=>{
      console.log("response from api=>",res.data);

      if(res && res.data){
        
        this.setState({
          distributorName: res.data.firstname + " " + res.data.lastname
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

 	usersignup(event){
	 	event.preventDefault();
     if (this.validateForm() && this.validateFormReq() ) {

			var auth={
	            firstName       : this.refs.firstname.value,
	            lastName        : this.refs.lastname.value,
	            email        	: this.refs.signupEmail.value,
	            mobNumber    	: this.refs.mobNumber.value,
	            pwd        		: this.refs.signupPassword.value,
	            role 			: 'user',
	            status 			: 'Active',
	            fullName        : this.refs.firstname.value + " "+ this.refs.lastname.value,
	            distributorCode : this.state.distributorCode,
	            city            : this.state.city,
	            states          : this.state.states,
	            dob             : this.state.dob
	        }
		            
		    
	        var firstname                = this.refs.firstname.value;
	        var mobile                   = this.refs.mobNumber.value;
	        var email                    = this.refs.signupEmail.value;
	        var passwordVar              = this.refs.signupPassword.value;
	        var signupConfirmPasswordVar = this.refs.signupConfirmPassword.value;
	 		
	            if (passwordVar === signupConfirmPasswordVar) {
	                return (passwordVar.length >= 6) ? 
	                	(true, 
			            this.setState({
			            	buttonHeading : 'We are processing. Please Wait...',
			            }),
	      				//browserHistory.push("/"),
	                	axios.post('/api/users/post/signup/user/emailotp',auth)
				            .then((response)=> {
				            	if(response)
				            	{
			            			swal("Great","Information submitted successfully and OTP is sent to your registered Email ID.");
				                	$("html,body").scrollTop(0);
				                	this.props.history.push("/confirm-otp/"+response.data.ID);
				                }else{
			            			swal("Warning","Something went wrong...","warning");

				                }
				            })
				            .catch(error=> {
				            	
				                console.log(error, error.response.status, error.response);
						        this.setState({
					            	buttonHeading : 'Sign Up',
					            });
				                if(error.response.status === 409)
				                {
	        						swal("Warning","Email id already exists.","warning");
	        					

				                }else{
	        						swal("Something went wrong..","Unable to submit data.","warning");
				            	}
				            })	
	                	)
	                :
		                (
			                swal("Please enter valid password","Please enter password with atleast 6 character long.")       
		                )
	                
	            } else {
			        return swal("Passwords does not match","Please Try Again")
	            }
            
				let fields = {};
          	   fields["firstNameV"]         = ""; 
	           fields["lastNameV"]          = "";         
	           fields["mobileV"]            = "";         
	           fields["emailIDV"]           = "";         
	           // fields["signupPassword"]     = "";         
        
             this.setState({
	            "firstNameV"     : "",
	            "lastNameV"      : "",
	            "mobileV"        : "",
	            "emailIDV"       : "",
	            // "signupPassword" : "",
	            "fields"         : fields
            });
		}
	
 	}

 	handleChangedate(event){
    var name = event.currentTarget.name;
    this.setState({ [name] : event.currentTarget.value });
    let fields = this.state.fields;  
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });

    if(name === 'dob'){
      if (this.validatedob() ) {
      
      }
    }
    
  }

 	validatedob() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
      
      if (typeof fields["dob"] !== "undefined") {
      var oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 18);
      if (fields["dob"] > moment(oldDate).format("YYYY-MM-DD") ) {
        formIsValid = false;
        errors["dob"] = "Age of partner should be greater than 18";
      }
    }

      this.setState({
        errors: errors
      });
      return formIsValid; 
  }

 	handleChange(event){
	    // const target = event.target;
	    // const {name , value}   = event.target;
	    const datatype = event.target.getAttribute('data-text');
	    const {name,value} = event.target;

	    
	   
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
 	acceptcondition(event){
	    var conditionaccept = event.target.value;
	    if(conditionaccept==="acceptedconditions"){
	        $(".acceptinput").removeAttr('disabled');
	        // if(this.state.roletype=="Student"){
	        //     document.getElementById("lastname").removeAttribute("");
	        // }else{
	        //     null;
	        // }
	    } else{
	        $(".acceptinput").addAttr('disabled');
	    }
    }

    showModal(){
        // if(this.state.roletype){
        //     $(".modalbg").css("display","block");
        // }else{
        //      swal("Please select student or franchise","","warning");
        // }
        $(".modalbg").css("display","block");
    }
    hideModal(){
        $(".modalbg").css("display","none");
    }
    componentDidMount(){

    }

	showSignPass(){
        $('.showPwd').toggleClass('showPwd1');
        $('.hidePwd').toggleClass('hidePwd1');
        return $('.inputTextPass').attr('type', 'text');
    }
    hideSignPass(){
        $('.showPwd').toggleClass('showPwd1');
        $('.hidePwd').toggleClass('hidePwd1');
        return $('.inputTextPass').attr('type', 'password');
    }
    validateFormReq() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["firstNameV"]) {
      formIsValid = false;
      errors["firstNameV"] = "This field is required.";
    }  
     if (!fields["lastNameV"]) {
      formIsValid = false;
      errors["lastNameV"] = "This field is required.";
    }    
    if (!fields["mobileV"]) {
      formIsValid = false;
      errors["mobileV"] = "This field is required.";
    }   
    if (!fields["emailIDV"]) {
      formIsValid = false;
      errors["emailIDV"] = "This field is required.";
    }
    if (!fields["locationV"]) {
      formIsValid = false;
      errors["locationV"] = "This field is required.";
    }
    if (!fields["dob"]) {
      formIsValid = false;
      errors["dob"] = "This field is required.";
    }
   /* if (!fields["signupPassword"]) {
      formIsValid = false;
      errors["signupPassword"] = "This field is required.";
    }*/
 
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
 
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (typeof fields["firstNameV"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^[a-zA-Z]+$/);
      if (!pattern.test(fields["firstNameV"])) {
        formIsValid = false;
        errors["firstNameV"] = "Please enter valid first name.";
      }
    }
     if (typeof fields["lastNameV"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^[a-zA-Z]+$/);
      if (!pattern.test(fields["lastNameV"])) {
        formIsValid = false;
        errors["lastNameV"] = "Please enter valid last name.";
      }
    }
    if (typeof fields["emailIDV"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailIDV"])) {
          formIsValid = false;
          errors["emailIDV"] = "Please enter valid email-ID.";
        }
      }
       if (typeof fields["mobileV"] !== "undefined") {
        if (!fields["mobileV"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["mobileV"] = "Please enter valid mobile no.";
        }
      }

      if (typeof fields["locationV"] !== "undefined") {
      	if(this.state.location){
      		var location = this.state.location;
      		console.log("location",location.length);      		
      		if(location.length <= 1){
      			console.log("ture");
      			formIsValid = false;
          		errors["locationV"] = "Please select full location from suggestion list.";
      		}
      	}
	    else if (this.state.city === '' || this.state.states === '') {
	        formIsValid = false;
	          errors["locationV"] = "Please select full location from suggestion list.";
	        
	    }
  	}
       console.log("city states", this.state.city, this.state.states);

      if (typeof fields["dob"] !== "undefined") {
      var oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 18);
      if (fields["dob"] > moment(oldDate).format("YYYY-MM-DD") ) {
        formIsValid = false;
        errors["dob"] = "Age of partner should be greater than 18";
      }
    }

   /* if (typeof fields["signupPassword"] !== "undefined") {
      if (!fields["signupPassword"].match(/^[a-zA-Z0-9]$/)) {
        formIsValid = false;
        errors["signupPassword"] = "Please .";
      }
    }*/
   
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  handleChangePlaces = address => {
	this.setState({ location : address });
	let fields = this.state.fields;
	      fields['locationV'] = address;
	      this.setState({
	        fields
	      });
	      
};

handleSelectLocation = address => {
    
geocodeByAddress(address)
 .then((results) =>{ 

  for (var i = 0; i < results[0].address_components.length; i++) {
      for (var b = 0; b < results[0].address_components[i].types.length; b++) {
          switch (results[0].address_components[i].types[b]) {
              case 'sublocality_level_1':
                  var area = results[0].address_components[i].long_name;
                  break;
              case 'sublocality_level_2':
                  var area = results[0].address_components[i].long_name;
                  break;
              case 'locality':
                  var city = results[0].address_components[i].long_name;
                  console.log("city",city);
                  this.setState({city: city});
                  break;
              case 'administrative_area_level_1':
                  var state = results[0].address_components[i].long_name;
                  console.log("state",state);
                  this.setState({states: state});
                  break;
              case 'country':
                 var country = results[0].address_components[i].long_name;
                  break;
              case 'postal_code':
                 var pincode = results[0].address_components[i].long_name;
                  break;
          }
      }
    }
})
.catch(error => console.error('Error', error));
geocodeByAddress(address)
  .then(results => getLatLng(results[0]))
  .then(latLng => this.setState({'fromLatLng': latLng}))
  .catch(error => console.error('Error', error));
  
  this.setState({ location : address ? address.split(",") :"" });
  if (this.validateForm() ) {

  }

};

	render(){
		// var winHeight = window.innerHeight;
  //       var divHeight = winHeight/4.5+'px';
  		var oldDate = new Date();
  		oldDate.setFullYear(oldDate.getFullYear() - 18);

  		 const searchOptions = {
          types: ['(cities)'],
          componentRestrictions: {country: "in"}
        }
		
		return(

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper loginbg">
        		<div className={this.state.distributorName ? "col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-7 col-sm-8 col-xs-10 col-xs-offset-1 signupPadding signUpFormWrap" : "col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-7 col-sm-8 col-xs-10 col-xs-offset-1 signUpFormWrapold" } >
				<div className="row">
					<div className="divLoginInWrap">
						
						<form id="signUpUser" onSubmit={this.usersignup.bind(this)}>
	                    	<h3 className="signUpNameTitle2 "><span className="bordbt">SIGN UP</span></h3>
							<div className="col-lg-12 col-md-12  signUpInnerWrapperOES signupfrm">
								<div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd boxMarg">
							   		<span className="blocking-span noIb">
									   <input type="text" className="form-control abacusTextbox oesSignUpForm sentanceCase" id="firstname" ref="firstname" name="firstNameV"  onChange={this.handleChange} data-text="firstNameV" required/>
									   {this.state.errors.firstNameV  && (
				                        <span className="text-danger">{this.state.errors.firstNameV}</span> 
				                      )}
							    		<span className="floating-label">
								    		<i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
								    		First Name
							    		</span>					   			
									</span>
								</div>
							    <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd1 boxMarg">
									<span className="blocking-span noIb">   
										<input type="text" className="form-control abacusTextbox oesSignUpForm sentanceCase" id="lastname" ref="lastname" name="lastNameV"  onChange={this.handleChange} data-text="lastNameV" required/>
										{this.state.errors.lastNameV  && (
				                        <span className="text-danger">{this.state.errors.lastNameV}</span> 
				                      )}
								    	<span className="floating-label1 lbfloatpass">
								    		<i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
								    		Last Name
								    	</span>					   			
									</span>
							    </div>
							    <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent boxMarg">
									<span className="blocking-span noIb">   
									   <input className="form-control  abacusTextbox oesSignUpForm" ref="mobNumber" name="mobileV" id="mobNumber" onChange={this.handleChange} data-text="mobileV" required/>
									   {this.state.errors.mobileV  && (
				                        <span className="text-danger">{this.state.errors.mobileV}</span> 
				                      )}
									   <span className="floating-label">
									   <i className="fa fa-mobile signupIconFont" aria-hidden="true"></i>Mobile Number</span>					   			
								    </span>
							    </div>
						   		<div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent boxMarg">
									<span className="blocking-span noIb">   
									  <input type="email" className="form-control signupsetting toLowerCase abacusTextbox oesSignUpForm" ref="signupEmail" name="emailIDV" onChange={this.handleChange} data-text="emailIDV" required/>
									  {this.state.errors.emailIDV  && (
				                        <span className="text-danger">{this.state.errors.emailIDV}</span> 
				                      )}
							    		<span className="floating-label"><i className="fa fa-envelope-o signupIconFont" aria-hidden="true"></i>Email ID</span>					   			
									</span>
							    </div>
							    <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent boxMargadd">
							    	<span className="blocking-span noIb">  
									    {this.state.gmapsLoaded ?       
									    <PlacesAutocomplete
								            value={this.state.location}
								            name="location"
								            ref="location"
								            onChange={this.handleChangePlaces}
								            onSelect={this.handleSelectLocation}
								            searchOptions={searchOptions}

								          >
								            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
								              <div>
								                <input
								                  {...getInputProps({
								                    className: 'form-control abacusTextbox oesSignUpForm  sentanceCase',
								                    id:"location"
								                  })}
								                />

								                <span className="floating-label">
				                                  <i className="fa fa-map-marker signupIconFont" aria-hidden="true"/> 
				                                    Location 
				                                </span>
								                <div className="autocomplete-dropdown-container placecontainercss">
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
								                        
								                    <span className="placepadding">{(suggestion.description )}</span>

								                      </div>
								                    );
								                  })}
								                </div>
								              </div>
								            )}
								        </PlacesAutocomplete>
								        :
		                          null
		                          }
			                          {this.state.errors.locationV  && (
				                        <span className="text-danger">{this.state.errors.locationV}</span> 
				                      )}
		                        </span>  
                          </div>
                          <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent boxMargadd">
                          	<span className="blocking-span noIb">     
	                          <input type="date" className="form-control abacusTextbox  oesSignUpForm sentanceCase"  name="dob"  ref="dob" data-text="dobV"
	                             max={moment(oldDate).format("YYYY-MM-DD")}
	                            onChange={this.handleChangedate.bind(this)}
	                            value={this.state.dob}
	                          />
	                        	 {this.state.errors.dob  && (
				                        <span className="text-danger">{this.state.errors.dob}</span> 
				                      )}
	                            <span className="floating-label1 lbfloatpass col-lg-12">   
	                              <i className="signupIconFont fa fa-calendar-o" aria-hidden="true"/> 
	                                    Date Of Birth <span className="fontSize"> *</span>
	                            </span>                 
                        	</span>
                          </div>
                          
						        
							    {
							    	this.state.distributorName ?
							    		<div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent boxMargreferedby">
											<span className="blocking-span noIb">  
											<span className="referredbytext">Referred By</span> 
												<input type="text" className="form-control abacusTextbox oesSignUpForm sentanceCase" id="referredby" ref="referredby" name="referredby" 
												value={this.state.distributorName+" (ID: "+this.state.distributorCode+")"} disabled/>
																   			
											</span>
									    </div>
							    	:
							    	null
							    }
							    
						   		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent marBtm">
								    <div className="form-group form-group1 fltlft input-group col-lg-6 col-md-6 col-xs-12 col-sm-6 inputContent">
							   			{/*<span className="blocking-span noIb">
											<input type="password" className="form-control pass oesSignUpForm confirmbtm inputTextPass" ref="signupPassword" name="signupPassword" required/>
											<span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>					   			
										</span>
										<span className="input-group-addon eyeicon  glyphi-custommm">
											<i className="fa fa-eye Pass showPwd" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
											<i className="fa fa-eye-slash Pass hidePwd" aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
										</span>
					                    <span className="focus-border">
					                    	<i></i>
					                    </span>*/}

					                    <span className="blocking-span noIb">
						                    <input type="password" className="form-control pass border3 oesSignUpForm confirmbtm inputTextPass tmsLoginTextBox" ref="signupPassword" name="signupPassword" required/>
						                    <span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>  
						                    {this.state.errors.signupPassword  && (
				                        <span className="text-danger">{this.state.errors.signupPassword}</span> 
				                      )}               
						                  </span>
						                <div className="showHideSignDiv">
						                  <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
						                  <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
						                </div> 
						                  <span className="focus-border">
						                    <i></i>
						                  </span>
									</div>
							   		<div className="input-group textpdEye fltlft col-lg-6 col-md-6 col-xs-12 col-sm-6 inputContent">
							   			
					                     <span className="blocking-span noIb">
						                    <input type="password" className="form-control pass border3 oesSignUpForm confirmbtm inputTextPass tmsLoginTextBox" ref="signupConfirmPassword" name="signupConfirmPassword" required/>
						                    <span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Confirm Password</span>                 
						                  </span>
						                <div className="showHideSignDiv">
						                  <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
						                  <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
						                </div> 
						                  <span className="focus-border">
						                    <i></i>
						                  </span>
									</div>
								</div>
							   {/* <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent termspad">
					                <input  id="idacceptcondition" type="checkbox"  value="acceptedconditions" onClick={this.acceptcondition.bind(this)}/><Link data-toggle="modal" data-target="#myModal" className="form-checkbox UMGrey1 modalbutton fontbold terms1" onClick={this.showModal.bind(this)}>&nbsp;I agree to the <span className="under"> terms & conditions</span><label className="sign">*</label></Link>
					                <span className="checkmark1"></span>
					            </div>*/}
	{/*						    <div class="modal fade" id="myModal" role="dialog">
							      <div class="modal-dialog">
							        <div class="modal-content">
							          <div class="modal-header">
							            <button type="button" class="close" data-dismiss="modal">&times;</button>
							            <h2 className="modaltext">Terms & Conditions</h2>
							          </div>
							          <div class="modal-body">
							            <p className="modaltext modalpara modalparascroll">{this.state.termsCondition?this.state.termsCondition.instruction:null}</p>
							          </div>
							          <div class="modal-footer">
							            <button type="button" class="btn btn-default" data-dismiss="modal">Proceed</button>
							          </div>
							        </div>
							      </div>
							    </div>*/}

								<div className="col-lg-12 col-md-12 col-xs-6 col-sm-6 form-group1 rrnRegisterBtn" onClick={this.usersignup.bind(this)}>
							    	<input id="signUpBtn" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 acceptinput UMloginbutton UMloginbutton1 hvr-sweep-to-right" onClick={this.usersignup.bind(this)}  value={this.state.buttonHeading} disabled/>
							    </div>		   

						    	<div className="col-lg-4 col-lg-offset-4 col-md-4 col-sm-4 col-xs-4 pdcls">
							    	<a href='/login' className="UMGrey signInbtn1 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Sign In</a> 	
						    	</div>
						    </div> 
					  	</form>
				  	</div>
				  </div>
				</div>
			</div>
		);
	}


}
export default SignUp;
