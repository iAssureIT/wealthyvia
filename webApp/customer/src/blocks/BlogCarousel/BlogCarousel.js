import React, { Component } from 'react';
import "./BlogCarousel.css";
import OwlCarousel 		 from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class BlogCarousel extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  blogContainer otherCss ">
				<div className="row">
			  		<OwlCarousel
					    className="owl-theme  col-md-12 col-lg-12 col-sm-12 col-xs-12 "
					    loop
					    margin={20}
					    items={4}
					    nav={0}
					    dots={0}
					    autoplay={false}
						>
						
						    <div className="item">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog  ">
									<div className="row">
										<img src="/images/blog1.jpeg"/>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Earnings Analysis with Wealthyvia</label>
										<p>The Company has Operationalized 2 New CNG station, Totaling to 84 CNG Stations.

											Volume increase of 10% in PNG and 9% in CNG in Q1 FY20 on YoY basis.

											Adani Gas along with its JV partner IOC....<a href="/login"> read more</a></p>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="/images/blog1.jpg"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Earnings Analysis with Wealthyvia</label>
										<p>Consumer demand slowdown is now an economy wide issue - this is not an NBFC issue any more." 

										These are the words coming from the management of Edelweiss.

										...<a href="/login"> read more</a></p>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="/images/blog1.jpeg"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Earnings Analysis with Wealthyvia</label>
										<p>Consumer demand slowdown is now an economy wide issue - this is not an NBFC issue any more." 

										These are the words coming from the management of Edelweiss.

										...<a href="/login"> read more</a></p>
									</div>
								</div>
							</div>
							
						</OwlCarousel>
				
					</div>		
			</div>		
		);
	}
}
