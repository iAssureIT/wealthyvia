import React, { Component } from 'react';
import $ 				 			from 'jquery';

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import "./ProductPage.css";

export default class ProductPage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	productDetailsArray:[]
	    	
	    };
  	}  
  	componentDidMount(){
		const productDetails = [
			{"stockName":"Bajaj Finance","ytd":"17.73","oneMon":"17.73","threeMon":"17.73","oneYear":"17.73","threeYear":"17.73","fiveYear":"1.61","tenYear":"0.61"},
			{"image":"/images/biscuits.jpg","nameOfProducts":"Dark Fantacy Biscuits","price":"$2.00"},
			{"image":"/images/atta.jpg","nameOfProducts":"Ashirvad Atta","price":"$5.61"},
			{"image":"/images/44-home_default.jpg","nameOfProducts":"Berries","price":"$1.1"},
			{"image":"/images/33-home_default.jpg","nameOfProducts":"Green Peas","price":"$1.61"},
	        {"image":"/images/41-home_default.jpg","nameOfProducts":"Blue Berries","price":"$5.61"},
	        {"image":"/images/bakeryCakes.jpg","nameOfProducts":"Chocolate Bread","price":"$1.21"},
	        {"image":"/images/chocolate.jpeg","nameOfProducts":"Brookside Dark Chocolate","price":"$3.0"},
		];

		this.setState({
			productDetailsArray: productDetails,
		},()=>{});

	}
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
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 productContainer">
			  	<div className="row">
			  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer">
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
			  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titleContainer">
			  			<label>Safe Heaven Moats</label>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
			  			<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently. Asked him what he has.. he didn't say much but said I saw many bull and bear markets but it’s the quality of earnings and quality of management that prevails. Market is like "alawavarach paani" ...water drop on colocasia leaf.</p>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 imageContainer">
			  				<img src="/images/boat.jpg"/>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 imageContainer">
		  				<p>primary motto is to “Capital Protection. Risk Mitigation. Alpha generation. This portfolio is created keeping in mind that – “Protect your downside. Upside will take care of itself”.
							Portfolio consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</p>
			  		</div>
			  		{/*<div className="col-lg-10 col-lg-offset-1 col-md-5 col-sm-5 col-xs-5 specifications">
			  	
			  			<label>CAGR Table</label>

			  		<table className="customTablePP">
						  <tr>
						    <th>Stock Name</th>
						    <th>YTD</th>
						    <th>1-Month</th>
						    <th>3-Month</th>
						    <th>1-Year</th>
						    <th>3-Year</th>
						    <th>5-Year</th>
						    <th>10-Year</th>
						  </tr>	 
						  {this.state.productDetailsArray.map((data,index) =>

						  <tr>
						    <td>Bajaj Finance</td>
						    <td>17.73</td>
						    <td>15.55</td>
						    <td>20.89</td>
						    <td>62.57</td>
						    <td>65.87</td>
						    <td>77.57</td>
						    <td>82.72</td>
						
						  </tr>
						
						    )}
					</table>
					                          

			  		</div>*/}
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 imageContainer">
			  				<p>our Safe heaven portfolio is designed only with such similar stocks where investors can sleep well and enjoy natural growth for next 5-7-10 years. </p>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-12 col-xs-12 specifications">
			  			<label>Product Description</label>
			  			<ol className="customOl">
			  				<li>
			  				Wealthyvia primary motto is to “Capital Protection. Risk Mitigation. Alpha generation”</li>
							<li>This portfolio is created keeping in mind that – “Protect your downside. Upside will take care of itself”.</li>
							<li>Portfolio consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</li>
							<li>Preferred companies:-
								<ul>
									<li>Large Caps</li>
								     <li>Leaders in the sector</li>
								     <li>Quality Management</li>
								     <li> Strong Balance sheet</li>
								     <li> Decent growth</li>
								     <li>Earnings predictability / Non Cyclical stocks</li>
								     <li> Linked to Indian growth story </li>
								</ul>
							</li>
							<li>Companies we don’t invest in:-
								<ul>
									<li>Micro & Small caps</li>
								     <li>Cyclical stocks</li>
								     <li>No earnings predictability</li>
								     <li> Questionable management</li>
								     <li> One Trick Pony companies</li>
								     <li>High debt / Leverage.</li>
								</ul>
							</li>
							<li>Total number of stocks held in this portfolio at any given point of time will be less than 15.</li>
							<li>Read a detailed blog post about this <span className="colored">here </span></li>
							
			  			</ol>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 specifications lineSpace">
			  			<label>Who is it suitable for?</label>
			  			<ol>
			  				
							<li>  Risk can be crash like 2008 or recession economy</li>
							<li> This is a low risk portfolio created for investors who are having low risk appetite but at the same time want to generate alpha over a period of time vis-à-vis Debt fund returns.</li>
							<li>Suitable for investors who are in their Middle age or closer to retirement who are looking forward to invest a portion portfolio of their savings in Equities.</li>
			  			</ol>
			  		</div>

					
						<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
			  			<div className="buyNowButtonPP col-lg-2 col-lg-offset-8"  data-toggle="modal" data-target="#myModal">Buy Now</div>
			  			<div className="pull-right col-lg-2 enquireNow">Enquire Now</div>
			  		
			  		</div>


				</div>		
			</div>
		);
	}
}
