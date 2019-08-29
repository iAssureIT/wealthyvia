import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class NewDeals extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ecommerceProductCarousel mt20">
						
						
						  
						 <div className="tab-content ">
						    <div id="home" className="tab-pane fade in active ecommerceTabContent">
								

								<OwlCarousel
								    className="owl-theme customnNavButtonEcommerceND"
								    loop
								    margin={5}
								    items={1}
								    nav
								    autoplay={true}
								>

								
								    <div className="item ">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
												 <img src="/images/bannerImg.jpg"  />
					     <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
					      	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Intelligence to identify <br/>
																Systemized process to execute <br/>
																Courage to capitalise </label>
					    	 	  <div className="col-lg-2 col-md-4 col-sm-5 col-xs-5 readMoreButtonCar" >
				                      Read more → 
				                    </div>
				          </div>
												
										</div>
									</div>
								
								   <div className="item ">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
												 <img src="/images/bannerImg.jpg"  />
					     <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
					      	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Intelligence to identify <br/>
																Systemized process to execute <br/>
																Courage to capitalise </label>
					    	 	  <div className="col-lg-2 col-md-4 col-sm-5 col-xs-5 readMoreButtonCar" >
				                      Read more → 
				                    </div>
				          </div>
												
										</div>
									</div>
								
								</OwlCarousel>
								</div>
			</div>			
				</div>
		);
	}
}
