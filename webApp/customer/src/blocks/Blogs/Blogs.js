import React, { Component } from 'react';
import "./Blogs.css";
import OwlCarousel 		 from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class Blogs extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    		 responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12  blogContainer ">
			  		<div className="blogHeading  col-md-12 col-lg-12 col-sm-12 col-xs-12"> Blogs </div>
			  		<OwlCarousel
						    className="owl-theme  col-md-12 col-lg-12 col-sm-12 col-xs-12 boxShadow"
						     loop
							    margin={20}
							    items={1}
							    nav={0}
							    dots={0}
							    responsiveClass={true}
							    autoplay={true}
								>
						
						 	<div className="item">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog  ">
									<div className="row">
										<img src="/images/blog1back.jpeg"/>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>“Knock Knock” Who is it ? - Perception !</label>
										<p>Perceptions are good and helps us to avoid big accidents. They are in our genetics & investing is not above it...<br/><a href="/allblogs"> read more</a></p>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="/images/monthly.png"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Monthly Communique : Effect of tax reforms and opportunity one can’t afford to miss!</label>
										<p>This is one of major reforms in Indian business ecosystem after 1991...<br/><a href="/allblogs"> read more</a></p>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="/images/stockb.jpeg"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Safe Heaven Stocks</label>
										<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently...<a href="/allblogs"> read more</a></p>
									</div>
								</div>
							</div>
							
						</OwlCarousel>
				
			</div>		
		);
	}
}
