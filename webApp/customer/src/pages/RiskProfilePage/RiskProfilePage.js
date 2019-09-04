import React, { Component } 		from 'react';
import $ 				 			from 'jquery';

import "./RiskProfilePage.css";


export default class RiskProfilePage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"subImgArray":[],
	    };
    this.changeImage = this.changeImage.bind(this); 
  	}  

  	componentDidMount()
  	{
  		var imageArray=[
			{"image":"/images/45-home_default.jpg"},
			{"image":"/images/41-home_default.jpg"},
			{"image":"/images/32-home_default.jpg"},
			{"image":"/images/45-home_default.jpg"},
  		]
  		$(".multiple_select").mousedown(function(e) {
    if (e.target.tagName == "OPTION") 
    {
      return; //don't close dropdown if i select option
    }
    $(this).toggleClass('multiple_select_active'); //close dropdown if click inside <select> box
});
$(".multiple_select").on('blur', function(e) {
    $(this).removeClass('multiple_select_active'); //close dropdown if click outside <select>
});
	
$('.multiple_select option').mousedown(function(e) { //no ctrl to select multiple
    e.preventDefault(); 
    $(this).prop('selected', $(this).prop('selected') ? false : true); //set selected options on click
    $(this).parent().change(); //trigger change event
});

	
	$("#myFilter").on('change', function() {
      var selected = $("#myFilter").val().toString(); //here I get all options and convert to string
      var document_style = document.documentElement.style;
      if(selected !== "")
        document_style.setProperty('--text', "' "+selected+"'");
      else
        document_style.setProperty('--text', "'Select values'");
	});
  	}
  	 changeImage = ()=>{
        document.getElementById('change-image').src='/images/65-home_default.jpg';
        document.getElementById('change-image1').src='/images/65-home_default.jpg';
  }
  render() {
 
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">

						<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 onHoverDiv" data-toggle="modal" data-target="#myModal"><i className="fa fa-search-plus"></i></div>
								 	<div className="modal fade in " id="myModal" role="dialog">
			                          <div className="modal-dialog customModalRP" >
		                                <button type="button" className="close" data-dismiss="modal"> <i className="fa fa-times"></i></button>
		                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
		                                	<form id="riskform">
		                                			<label>Please spend just 1 min to answer below . It helps us to serve you better!!</label>
		                                		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                			<p>1) What is the primary goal for the funds invested through WealthVia?</p>
			                                		{/*<div className="row">
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
				                                         	<span className="centreDetaillistItem">I am ok to take little risk but return should be 25-30% </span>



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
			                                		</div>*/}
			                                		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                			  <select id="myFilter" className="multiple_select col-lg-12 col-md-12 col-sm-12 col-xs-12 " multiple style={{overflow:"hidden"}}>
																  <option className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">15% is fine with me but don’t wanna lose at all . Safety first . Long term.</option>
																  <option className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">I am ok to take little risk but return should be 25-30% </option>
																  <option className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</option>
																  <option className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</option>
																  <option className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">I wanna allocate some portion to big tech giants like amazon facebook types too.</option>
																  <option className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">I am day trader, daily play with markets. I want continuous smart trades.</option>
															</select>
														</div>
				                                	
			                                	</div>
			                                	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			                                		<div className="row">
				                                		<p>2) Any near term need for the funds invested with us ?</p>
				                                		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                			  <div className="centreDetailContainer col-lg-1 row">
						                                            <input type="radio" name="price"/>
						                                            <span className="radioCheck"></span>
					                                         	 </div>
					                                         	<span className="centreDetaillistItem">Yes after two years</span>
		
				                                		</div>
				                                			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                			  <div className="centreDetailContainer col-lg-1 row">
						                                            <input type="radio" name="price"/>
						                                            <span className="radioCheck"></span>
					                                         	 </div>
					                                         	<span className="centreDetaillistItem">Yes after 6 -8 months</span>
		
				                                		</div>
				                                		
			                                		</div>
			                                	</div>
		                                	</form>
		                              	</div>
		                              
			                          </div>
								</div>
								</div>
							</div>
						
						
					</div>
                </div>
		);
	}
}
