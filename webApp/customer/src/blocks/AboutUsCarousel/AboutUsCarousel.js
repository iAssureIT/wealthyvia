import React, { Component } from 'react';
import "./AboutUsCarousel.css";
import OwlCarousel 		 from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default class AboutUsCarousel extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
				<div className="row">
			  			<OwlCarousel
						    className="owl-theme"
						    loop
						    margin={5}
						    items={1}

						    autoplay={true}
						>
						
						    <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerAU ">
									<div className="row">
										<img src="/images/banner1.png"/>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerAU ">
									<div className="row">
										<img src="/images/banner2.png"/>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerAU ">
									<div className="row">
										<img src="/images/banner3.png"/>
									</div>
								</div>
							</div>
						
						</OwlCarousel>
				</div>
			</div>		
		);
	}
}
