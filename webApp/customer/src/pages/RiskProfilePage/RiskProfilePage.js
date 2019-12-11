import React, { Component } 		from 'react';
import $ 				 			from 'jquery';

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import "./RiskProfilePage.css";


export default class RiskProfilePage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"subImgArray":[],
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
  /*	 onOptionSelect = (value) => {
    console.log('Selected value=', value)
  }*/
  Submit(event){
  	event.preventDefault();
  	$("#myModal").hide();
	$("#myModal").removeClass('in');
	$("#kycModal").show();
	$("#kycModal").addClass('in');
  }
	closeModal(event){
	$("#kycModal").removeClass('in');

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
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">

						<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 onHoverDiv" data-toggle="modal" data-target="#myModal"><i className="fa fa-search-plus"></i></div>
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
				                                		<p><b>4) What is your biggest drawdown on your entire portfolio ?</b></p>
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
			                                		<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.Submit.bind(this)}>Submit</div>
				                                		
			                                	</div>
		                                	</form>
		                              	</div>
		                              
			                          </div>
									</div>
									<div className="modal fade in " id="kycModal" role="dialog">
			                          <div className="modal-dialog customModalRP hight400" >
		                                <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal.bind(this)}> <i className="fa fa-times"></i></button>
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
								                      <input type="text" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Name" ref="unitCost" />
								                    </div>
								                </div>
								              </div>
								              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
								                <div className="row"> 
								                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
								                      <label>Mobile Number</label>
								                    </div>
								                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
								                      <input type="number" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Mobile Number" ref="unitCost" />
								                    </div>
								                </div>
								              </div>
								              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
								                <div className="row">
								                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
								                      <label>Email ID</label>
								                    </div>
								                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
								                         <input type="email" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Email ID" ref="unitCost" />

								                    </div>
								                </div>
								              </div>
								               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
								                <div className="row">
								                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
								                      <label>PAN </label>
								                    </div>
								                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
								                         <input type="file" className="customInputKF inputBox nameParts" name="unitCost"  ref="unitCost" />
								                    </div>
								                </div>
								              </div>
								              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
								                <div className="row">
								                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
								                      <label>Adress Proof</label>
								                    </div>
								                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
								                         <input type="file" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Name" ref="unitCost" />
								                    </div>
								                </div>
								              </div>
								               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
								                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 submitButton pull-right">
								                      Submit
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
