import React, { Component } from 'react';
import "./AboutUsCarousel.css";
import OwlCarousel 		 from 'react-owl-carousel';
import Banner 		 from '../Banner/Banner.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default class AboutUsCarousel extends Component {
	constructor(props){
    super();
	    this.state = {
	    	value : "",
	    	
	    };
  	}  
  	getValue(event){
  		this.setState({
  			"value" :  event.target.value
  		})
  	}


  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt100 ">
				<button onClick={this.getValue.bind(this)} value="Click me">
					Click Me
				</button>
				<Banner value={this.state.value}/>
			{/*	<div className="row">
			  			<OwlCarousel
						    className="owl-theme"
						    loop
						    margin={5}
						    items={1}
						    autoplay={false}
						>
						
						    <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerAU ">
									<div className="row">
										<img src="/images/banner1.png" alt=""/>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerAU ">
									<div className="row">
										<img src="/images/banner2.png" alt=""/>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerAU ">
									<div className="row">
										<img src="/images/banner3.png" alt=""/>
									</div>
								</div>
							</div>
						
						</OwlCarousel>
				</div>*/}
			</div>		
		);
	}
}
