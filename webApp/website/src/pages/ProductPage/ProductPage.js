import React, { Component }          from 'react';
import $ 				 			               from 'jquery';
import ProductPageBanner             from "../../blocks/ProductPageBanner/ProductPageBanner.js";
import ProductChart                  from "../../blocks/ProductChart/ProductChart.js";
import FiveGCPMDiv                   from "../../blocks/FiveGCPMDiv/FiveGCPMDiv.js";
import GrowthFactor                  from "../../blocks/GrowthFactor/GrowthFactor.js";
import CorporateGovernance           from "../../blocks/CorporateGovernance/CorporateGovernance.js";
import Practicability                from "../../blocks/Practicability/Practicability.js";
import MagicFormula                  from "../../blocks/MagicFormula/MagicFormula.js";
import swal                          from 'sweetalert';
import ReadyToGo                     from "../../blocks/ReadyToGo/ReadyToGo.js";

import "./ProductPage.css";

export default class ProductPage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	productDetailsArray    :[],
	    	"name"             : "",
        "panNumber"        : "",
        "email"            : "",
        "nameModal"        : "",
        "panNumberModal"   : "",
        "emailModal"       : "",
        "addressProof"     : "",
        "contactNumber"    : "",
	    	"fields"           : {},
      	"errors"           : {},  
        "fields1"          : {},
        "errors1"          : {},
	    };
  	}  
    srollDiv(event)
    {
      window.scrollTo(0,630);
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

		});

  	this.setState({
  		divID : this.props.match.params.divId,
  	})
  	}
  	onOptionSelect = (value) => {
  	}
    handleChange(event){

      this.setState({
        "name"                  : this.refs.name.value,
        "contactNumber"         : this.refs.contactNumber.value,
        "email"                 : this.refs.email.value,
        "nameModal"             : this.refs.nameModal.value,
        "contactNumberModal"    : this.refs.contactNumberModal.value,
        "emailModal"            : this.refs.emailModal.value,
        "panNumber"             : this.refs.panNumber.value,
        "addressProof"          : this.refs.addressProof.value,
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
       
      
        let fields                = {};
        fields["panNumber"]       = "";
        fields["addressProof"]    = "";
        fields["name"]            = "";
        fields["email"]           = "";
        fields["contactNumber"]   = "";
      
        swal("Congrats..!", "Your data is submitted sucessfully!", "success")
        $("#kycModal").hide();
        $("#kycModal").removeClass('in');
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
            this.setState({
              "panNumber"     	 : "",
              "addressProof"     : "",
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
  	$("body").removeClass("modal-open");

	}
	SubmitEnquire(event){
	  event.preventDefault();
  	if (this.validateFormModal() && this.validateFormReqModal()) {
        let fields1 = {};
        fields1["nameModal"]            = "";
        fields1["emailModal"]           = "";
        fields1["contactNumberModal"]   = "";
        swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
        $("#EnquireModal").hide();
        $("#EnquireModal").removeClass('in');
        $(".modal-backdrop").remove();
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
   if (charCode!==189 && charCode > 32 && (charCode < 65 || charCode > 90) )
   {
    evt.preventDefault();
      return false;
    }
    else{
      return true;
    }
  }


  render() {
  		
	if(this.state.divID === "safeHeavenMoats")
	{
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="row">
			  			
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerSH img-responsive">
              <div className="row">
                <div className="col-lg-12 col-md-12 hidden-xs hidden-sm backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Safe Heaven Moats
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>Wealthyvia primary motto is to “Capital Protection. Risk Mitigation. Alpha generation. It is created keeping in mind that – “Protect your downside.Upside will take care of itself”. </p>
                      </div>
                    </div>

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt=""/><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
                </div>
                   <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorBlack blackDivPPSmall">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Safe Heaven Moats
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>Wealthyvia primary motto is to “Capital Protection. Risk Mitigation. Alpha generation. It is created keeping in mind that – “Protect your downside.Upside will take care of itself”. </p>
                      </div>
                    </div>

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer  ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/over.jpg" className="img-responsive" alt=""/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Overview </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                        <li>Safe Heaven Moats consists of Robust, high quality large cap bluechip companies that have consistently high return on capital, very strong business moats, leadership in their segments  and that are part of natural consumption behaviour of Indian  middle class.</li>
                        <li>It is created by keeping in mind that – “Protect your downside. Upside will take care of itself”.</li>
                        <li>It consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</li>

                        </ul>
                      </p>                 
                    </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/over.jpg" className="img-responsive" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Overview </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                           <li>Safe Heaven Moats consists of Robust, high quality large cap bluechip companies that have consistently high return on capital, very strong business moats, leadership in their segments  and that are part of natural consumption behaviour of Indian  middle class.</li>
                        <li>It is created by keeping in mind that – “Protect your downside. Upside will take care of itself”.</li>
                        <li>It consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</li>

                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
              <ProductChart offeringName="Safe Heaven" />
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray onHoverEffect" >
                <div className="row">
               
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Preferred companies </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                        <li>Large Caps</li>
                        <li>Leaders in the sector</li>
                        <li>Quality Management</li>
                        <li>Strong Balance sheet</li>
                        <li>Decent growth</li>
                        <li>Earnings predictability / Non Cyclical stocks</li>
                        <li>Linked to Indian growth story</li>
                        </ul>
                      </p>                 
                    </div>
                       <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                        <img src="/images/workWith.jpg"  alt=""/>
                    </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="/images/workWith.jpg" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Preferred companies </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                          <ul className="customOl listStyle">
                        <li>Large Caps</li>
                        <li>Leaders in the sector</li>
                        <li>Quality Management</li>
                        <li>Strong Balance sheet</li>
                        <li>Decent growth</li>
                        <li>Earnings predictability / Non Cyclical stocks</li>
                        <li>Linked to Indian growth story</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/companiesWeAvoid.png" alt=""/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Companies we don’t Prefer</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                        <li>Micro & Small caps</li>
                        <li>Cyclical stocks</li>
                        <li>No earnings predictability</li>
                        <li>Questionable management</li>
                        <li>One Trick Pony companies</li>
                        <li>High debt / Leverage.</li>
                        </ul>
                      </p>                 
                    </div>
                     
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/companiesWeAvoid.png" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Companies we don’t Prefer</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>Micro & Small caps</li>
                        <li>Cyclical stocks</li>
                        <li>No earnings predictability</li>
                        <li>Questionable management</li>
                        <li>One Trick Pony companies</li>
                        <li>High debt / Leverage.</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
               <div className="col-lg-12 col-md-12 hidden-xs hidden-sm riskDivPP">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDiv textAlignCenter"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 addDiv"></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12"><blockquote className="blogQuate">"Vessels large may venture more, but little boats should keep near the shore. "</blockquote></p>
                    <span className="col-lg-10 col-md-12 col-sm-12 col-xs-12 nameOfAuther"><label className="pull-right"> - Benjamin Franklin</label></span>
                    </div>  
                </div>  
            </div>
            <div className="hidden-md hidden-lg col-sm-12 col-xs-12 riskDivPP">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivOther textAlignCenter"> 
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12"><blockquote className="blogQuateSmall">"Vessels large may venture more, but little boats should keep near the shore. "</blockquote></p>
                    <span className="col-lg-10 col-md-12 col-sm-12 col-xs-12 nameOfAuther"><label className="pull-right"> - Benjamin Franklin</label></span>
                    </div>  
                </div>  
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                      <label>For whom this product is suitable and <br/> risks associated</label>

                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  suitableForDiv learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>Risk can be crash like 2008 or recession economy
                            <ul className="marginLeft10">
                              <li>Disruptions from challenger companies.</li>
                              <li>Change of consumption patterns and behaviours.</li>
                            </ul>
                          </li>
                          <li><span className="numberDiv">2</span> This is a low risk briefcase created for investors who are having low risk appetite but at the same time want to generate alpha over a period of time vis-à-vis Debt fund returns.</li>
                          <li><span className="numberDiv">3</span>Suitable for investors who are in their Middle age or closer to retirement who are looking forward to invest a portion of their savings in Equities.</li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/suitableFor.png" alt=""/>
                    </div>
                  </div>
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/suitableFor.png" alt=""/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 suitableForDiv learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOl">
                          <li><span className="numberDiv">1</span>Risk can be crash like 2008 or recession economy
                            <ul>
                              <li>Disruptions from challenger companies.</li>
                              <li>Change of consumption patterns and behaviours.</li>
                            </ul>
                          </li>
                          <li><span className="numberDiv">2</span> This is a low risk case created for investors who are having low risk appetite but at the same time want to generate alpha over a period of time vis-à-vis Debt fund returns.</li>
                          <li><span className="numberDiv">3</span>Suitable for investors who are in their Middle age or closer to retirement who are looking forward to invest a portion of their savings in Equities.</li>
                        </ul>
                      </p>                      
                    </div>
                
                </div>
              </div>
              <ReadyToGo />
				</div>	
			</div>
		);
	}
  else if(this.state.divID === "superFocused")
  {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerSF img-responsive">
              <div className="row">
                <div className="col-lg-12 col-md-12 hidden-xs hidden-sm backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Wealthyvia Super Focused
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>UNLEASH THE POWER OF FOCUS </p>
                      </div>
                    </div>

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt=""/><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
                </div>
                   <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorBlack blackDivPPSmall">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Wealthyvia Super Focused
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>UNLEASH THE POWER OF FOCUS </p>
                      </div>
                    </div>

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgInfo backColorYellow imageContainer">
                <label className="investLabel">The philosophy of Super Focused</label>
                <p className="col-lg-10 col-lg-offset-1">A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate consistent High CAGR. </p>
                <p className="col-lg-10 col-lg-offset-1" >Higher the Conviction and higher the strength and continuation, Higher should be the  allocation! Returns are most dependent variable on Risk Reward and position sizing! <br/>
                If you cut your losers & let your winners ride. At the end,  you will be left out with a portfolio is winners! </p>
            </div> 
            <div className="hidden-lg hidden-md hidden-sm hidden-xs backColorWhite onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer  ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/over.jpg" className="img-responsive" alt=""/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">The philosophy of Super Focused </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                        <li>A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate consistent High CAGR. </li>
                        <li>Higher the Conviction and higher the strength and continuation, Higher should be the  allocation! Returns are most dependent variable on Risk Reward and position sizing! </li>
                        <li>If you cut your losers & let your winners ride. At the end,  you will be left out with a portfolio is winners!  </li>

                        </ul>
                      </p>                 
                    </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/over.jpg" className="img-responsive" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">The philosophy of Super Focused </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate consistent High CAGR. </li>
                          <li>Higher the Conviction and higher the strength and continuation, Higher should be the  allocation! Returns are most dependent variable on Risk Reward and position sizing! </li>
                          <li>If you cut your losers & let your winners ride. At the end,  you will be left out with a portfolio is winners! </li>

                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
              <ProductChart offeringName="Super Focused" />
              <div className="col-lg-12 col-md-12 hidden-xs hidden-sm SftestimonialDivPP">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDiv textAlignCenter"> 
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 "></div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 centeredDiv">
                        <blockquote className="sfblogQuate text-left">“As time goes on, I get more and more convinced that the right method of investment is to put large sums into enterprises which one thinks one knows something about and in the management of which one thoroughly believes. It is a mistake to think one limit’s one’s risk by spreading too much between enterprises about which one knows little and has no reason for special confidence.” 
                        </blockquote>
                        <label className="text-left"> - John Maynard Keynes</label>
                      </div>
                    </div>    
                </div>  
            </div>
            <div className="hidden-md hidden-lg col-sm-12 col-xs-12 SftestimonialDivPP">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivOther textAlignCenter"> 
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 "></div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 centeredDiv">
                        <blockquote className=".blogQuateSmall text-left">“As time goes on, I get more and more convinced that the right method of investment is to put large sums into enterprises which one thinks one knows something about and in the management of which one thoroughly believes. It is a mistake to think one limit’s one’s risk by spreading too much between enterprises about which one knows little and has no reason for special confidence.” 
                        </blockquote>
                        <label className="text-left"> - John Maynard Keynes</label>
                      </div>
                    </div>  
                </div>  
            </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray onHoverEffect" >
                <div className="row">
               
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Our Strategy & Process </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                        <li>High return Mind-set and target to start with Stock selection based on in-built proprietary Outperformance Ranking System.</li>
                        <li>Pre-defined Sell strategies & Drawdown avoidance system for risk management & high CAGR maintenance.</li>
                        <li>Upsizing or Downsizing of existing positions as per the fundamental developments & trend conditions and risk /reward stage.</li>
                        </ul>
                      </p>                 
                    </div>
                       <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                        <img src="/images/superfocusedstrategy.jpg"  alt=""/>
                    </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="/images/superfocusedstrategy.jpg" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Our Strategy & Process  </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>High return Mind-set and target to start with Stock selection based on in-built proprietary Outperformance Ranking System.</li>
                          <li>Pre-defined Sell strategies & Drawdown avoidance system for risk management & high CAGR maintenance.</li>
                          <li>Upsizing or Downsizing of existing positions as per the fundamental developments & trend conditions and risk /reward stage.</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                        <img src="/images/whysuperfocus.jpg" alt=""/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Why Super Focused ?</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>Abnormal returns can only come from abnormal portfolios. </li>
                          <li>The higher the quality of the individual bets, the more concentrated you can be.</li>
                          <li>Buying a stock way too early and waiting for it to turnaround, is as equal as buying a trending stock at its peak.</li>
                          <li>Choosing the BEST from the GOOD.</li>
                          <li>Powered by 5GCPM approach but with a concentration !</li>
                        </ul>
                      </p>                 
                    </div>
                     
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="/images/whysuperfocus.jpg" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Why Super Focused ?</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>Abnormal returns can only come from abnormal portfolios. </li>
                          <li>The higher the quality of the individual bets, the more concentrated you can be.</li>
                          <li>Buying a stock way too early and waiting for it to turnaround, is as equal as buying a trending stock at its peak.</li>
                          <li>Choosing the BEST from the GOOD.</li>
                          <li>Powered by 5GCPM approach but with a concentration !</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
               
            <ReadyToGo />
        </div>  
      </div>
    );
  }
	else if(this.state.divID === "5gcpm"){
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="row">
          <ProductPageBanner/>          
          <FiveGCPMDiv/>
          <ProductChart offeringName="5GCPM" />
          <GrowthFactor/>
          <CorporateGovernance />
          <Practicability />
          <MagicFormula/>
          <ReadyToGo />
				</div>	
			
			</div>

		);
	}else if(this.state.divID === "safeHeavenAlpha"){
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="row">
			  		
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerSHM">
              <div className="row">
                <div className="col-lg-12 col-md-12 hidden-xs hidden-sm backColorBlack blackDivPP">
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

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt=""/><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
              </div>
              <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorBlack blackDivPPSmall">
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

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
              </div>
              </div>
            </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" >
                <div className="row">
               
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Overview </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                          <li>As your existing Mutual Funds or Wealthyvia – Safe Heaven Moats is doing its job of compounding over a long period of time, Investors have an opportunity to generate alpha by collateralizing the underlying Mutual Funds.</li>
                        <li>The margin the client receives after collateralizing his mutual funds is used to take low risk, limited exposure to Nifty F&O segment.</li>
                        <li>Predefined strategies for Entry & Exit signals, Profit booking & Strict stop loss.</li>
                        <li>Strategy will only be implement on
                          <ul className="customOl listStyle">
                            <li>Nifty Future & Options (monthly)</li>
                          </ul>
                        </li>
                        <li>We don’t indulge in
                          <ul className="customOl listStyle">
                            <li>Bank Nifty or Any other indices</li>
                            <li>F&O segment of Individual companies.</li>
                          </ul>
                        </li>
                        </ul>
                      </p>                 
                    </div>
                       <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/over.jpg"  alt=""/>
                    </div>
                    <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/over.jpg" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Overview </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                      <ul className="customOl listStyle">
                           <li>As your existing Mutual Funds or Wealthyvia – Safe Heaven Moats is doing its job of compounding over a long period of time, Investors have an opportunity to generate alpha by collateralizing the underlying Mutual Funds.</li>
                        <li>The margin the client receives after collateralizing his mutual funds is used to take low risk, limited exposure to Nifty F&O segment.</li>
                        <li>Predefined strategies for Entry & Exit signals, Profit booking & Strict stop loss.</li>
                        <li>Strategy will only be implement on
                         
                          <ul className="customOl listStyle">
                            <li>Nifty Future & Options (monthly)</li>
                          </ul>
                        </li>
                        <li>We don’t indulge in
                          <ul className="customOl listStyle">
                            <li>Bank Nifty or Any other indices</li>
                            <li>F&O segment of Individual companies.</li>
                          </ul>
                        </li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
           </div>

            
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/risk.jpg" alt=""/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Risks Involved </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                       <ul className="customOl listStyle">
                      <li>No matter how much we strategize & risk averse we are, they are always risks associated with dealing in F&O markets.</li>
                    <li>As an advisory, it is our responsibility to bring to your notice & inform you about them<ul className="customOl listStyle"><li>Additional Margin – During some black swan days, where our trades got into losses </li><li>Capital Risk: - By the nature of F&O, there is a risk of capital loss for the investor.<ul><li>How we can mitigate this? – We understand the risks associated with F&O and hence we never take any aggressive positions. We never deal with other indices except Nifty F&O. </li></ul></li></ul></li>
                    </ul>
                      </p>                 
                    </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/risk.jpg" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Risks Involved </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl listStyle">
                      <li>No matter how much we strategize & risk averse we are, they are always risks associated with dealing in F&O markets.</li>
                    <li>As an advisory, it is our responsibility to bring to your notice & inform you about them<ul className="customOl listStyle"><li>Additional Margin – During some black swan days, where our trades got into losses </li><li>Capital Risk: - By the nature of F&O, there is a risk of capital loss for the investor.<ul><li>How we can mitigate this? – We understand the risks associated with F&O and hence we never take any aggressive positions. We never deal with other indices except Nifty F&O. </li></ul></li></ul></li>
                    </ul>
                      </p>                  
                    </div>
                
                </div>
           </div>
			  	 
           
            
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                      <label>For whom this product is suitable</label>

                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  suitableForDiv learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/suitableFor.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/suitableFor.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 suitableForDiv learnMoreST">
                    <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                     
                  </div>
                </div>
              </div>
					    <ReadyToGo />
			   	</div>	
			</div>

		);
	}else if(this.state.divID === "USAStocks"){
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="row">
			  		
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerStocks">
              <div className="row">
                <div className="col-lg-12 col-md-12 hidden-sm hidden-xs backColorBlack blackDivPP">
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

                  
                </div>
                  <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt=""/><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
              </div>
              <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorBlack blackDivPPSmall">
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

                  
                </div>
                  <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
              </div>
              </div>
            </div>
			  	   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer ">
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/US-stocks.jpg" alt=""/>
                    </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs   typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Few Facts on USA market </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                      <ul className="customOl listStyle">
                    <li>The mighty NYSE, representing $18.5 trillion in market capitalization, or about 27% of the total market for global equities.</li>
                 <li>The value-weighted average capitalization of U.S. companies is $176 billion, whereas the average capitalization of foreign companies is less than a fourth of that at $37 billion. This disparity is most prominent in technology stocks, where relative size has changed over time. U.S. technology stocks were 2.5 times as big as foreign stocks in 2007; U.S. tech stocks had an average capitalization of $138 billion, versus $50 billion for foreign tech.</li>
                  <li>World's  Top 10 companies by market capitalization are from American. Most of these companies are mega-cap companies with market capitalizations above $300 billion</li>
                  </ul>
                      </p>                 
                    </div>
                    <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer ">
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/US-stocks.jpg" alt=""/>
                    </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">Few Facts on USA market </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                     <ul className="customOl listStyle">
                    <li>The mighty NYSE, representing $18.5 trillion in market capitalization, or about 27% of the total market for global equities.</li>
                  <li>The value-weighted average capitalization of U.S. companies is $176 billion, whereas the average capitalization of foreign companies is less than a fourth of that at $37 billion. This disparity is most prominent in technology stocks, where relative size has changed over time. U.S. technology stocks were 2.5 times as big as foreign stocks in 2007; U.S. tech stocks had an average capitalization of $138 billion, versus $50 billion for foreign tech.</li>
                  <li>World's  Top 10 companies by market capitalization are from American. Most of these companies are mega-cap companies with market capitalizations above $300 billion</li>
                  </ul>
                      </p>                  
                    </div>
                
                </div>
           </div>
           
          
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  chartContainer" id="cg">
			  			<label> Since 2010 , US market outperformed Indian Market</label>
			  			<img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/chart1.jpg"  alt=""className=""/>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  chartContainer " id="cg">
			  			<label> Natural Benefit of USD INR increase over longer time</label>
			  			<img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/usinr.jpg" alt="" className=""/>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  chartContainer " id="cg">
			  			<label> Over the period, all currencies have declined against doller</label>
			  			<img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/chart3.jpg"  alt=""className=""/>
			  		</div>
				
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                    <label>How we can help you invest in US market</label>

                  </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  suitableForDiv learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>Choosing right kind of stocks with research reports</li>
                          <li><span className="numberDiv">2</span> Zero brokerage charges and very low maintenance charges unlike few international brokerages offering high charges</li>
                          <li><span className="numberDiv">3</span>Ease of buy sell and amount transfers to your own accounts.</li>
                          <li><span className="numberDiv">4</span>Assistance in Liberalized Remittance Scheme</li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/help.jpg" alt=""/>
                    </div>
                  </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/help.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 suitableForDiv learnMoreST">
                    <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>Investors who are willing at take additional risk for generating risk adjusted Alpha.</li>
                          <li><span className="numberDiv">2</span> Investors who have parked their money in Mutual Funds & wanted to generate regular income without additional capital.</li>
                          <li><span className="numberDiv">3</span>Investors who understand & accept the risks involved in F&O. </li>
                        </ul>
                      </p>                     
                    </div>
                
                </div>
              </div>
              <ReadyToGo />

				  </div>	
			</div>

		);
	}else{
		return( 
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				<div className="row">
			  			 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerUS">
              <div className="row">
                <div className="col-lg-12 col-md-12 hidden-sm hidden-xs backColorBlack blackDivPP">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent pull-right">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading " >
                      <div className="row">
                      Unlisted shares
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara ">
                      <div className="row">
                        <p>Invest before listing to take advantage of being early entrant. We check for detailed financials and enough liquidity before recommending it to you.</p>
                      </div>
                    </div>

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
              </div>
              <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorBlack blackDivPPSmall">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent pull-right">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading " >
                      <div className="row">
                      Unlisted shares
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara ">
                      <div className="row">
                        <p>Invest before listing to take advantage of being early entrant. We check for detailed financials and enough liquidity before recommending it to you.</p>
                      </div>
                    </div>

                </div>
                   <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Scroll down to know how</span>
                      </div>
                </div>
              </div>
              </div>
            </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgInfo backColorYellow imageContainer">
                <label className="investLabel">What is Unlisted Shares?</label>

              <p className="col-lg-10 col-lg-offset-1">We are a Mumbai based dealer of Unlisted, Pre IPO shares. Our superiority stems robust systems and processes which provide smooth and hassle-free flow of agreement backed transactions by ensuring timely delivery of shares and money to the clients.
              Many young companies grow much faster than mature companies due to their lower base hence they tend to significantly outperform the benchmark returns.</p>
              <p className="col-lg-10 col-lg-offset-1" >However, a lot of this growth happens before the company goes public with an IPO. Hence participating in such companies in the Growth / Pre IPO stage can provide superior returns to the investor. Buyers need a safe mechanism that gives them access to high quality shares at the best price, provides matching of trade and enables even retail purchases.
              While investments in Unlisted/Pre IPO shares have the potential of giving high returns, they are also accompanied by higher risk due to a variety of reasons. Investors need to exercise caution while investing in Unlisted/Pre IPO companies. Generally, they should have a minimum time horizon of 4 years and should not allocate more than 30% of their assets in Unlisted/Pre IPO shares.
              </p>
            </div>   
			  		<div className="col-lg-6 col-md-6 hidden-sm hidden-xs imageContainer mt20">
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/buyProcess.png" alt=""/>
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
								     <li className="col-lg-12 mt20"><i class="fa fa-envelope customIcon" aria-hidden="true"></i>
                     <p>You need to drop the mail on <br/><span className="blueColor">invest@wealthyvia.com</span></p></li>
{/*								     <li className="col-lg-6 mt20"><i class="fa fa-phone customIcon" aria-hidden="true"></i><p>Contact on <br/> <span className="blueColor">8369508540</span></p></li>
*/}								</ul>
							
			  		</div>
			  	
			
			  	
			  		 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect mt20">
                <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                              <label>Beware of following</label>

                            </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  suitableForDiv learnMoreST">
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                        <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>we never try to change the details over a phone call or any direct mail.</li>
                          <li><span className="numberDiv">2</span>We never ask you to send us investor’s bank details from any other email ID.</li>
                          <li><span className="numberDiv">3</span>If you receive any such communication it can be a fraudulent activity. Please notify us in that case.</li>
                          <li><span className="numberDiv">4</span>We never change our account details during transactions</li>
                          <li><span className="numberDiv">5</span>If we will ever change the details same will be reflected on our website.</li>
                        </ul>
                      </p>                  
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/security.png" alt=""/>
                    </div>
                  </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/security.png" alt=""/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" >
                          <ul className="customOlOther">
                          <li><span className="numberDiv">1</span>we never try to change the details over a phone call or any direct mail.</li>
                          <li><span className="numberDiv">2</span>We never ask you to send us investor’s bank details from any other id.</li>
                          <li><span className="numberDiv">3</span>If you receive any such communication it can be a fraudulent activity. Please notify us in that case.</li>
                          <li><span className="numberDiv">4</span>We never change our account details during transactions</li>
                          <li><span className="numberDiv">5</span>If we will ever change the details same will be reflected on our website.</li>
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
