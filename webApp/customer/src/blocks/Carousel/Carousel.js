import React, { Component } from 'react';
import "./Carousel.css";

export default class Carousel extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 bannerContainerCar">
				<div className="row">
			  		<div id="customCarousel" className="carousel col-lg-12 col-md-12 hidden-xs hidden-sm noPadding" data-ride="carousel">
					    <ol className="carousel-indicators squareIndicator">
					      <li data-target="#customCarousel" data-slide-to="0" className="active"></li>
					      <li data-target="#customCarousel" data-slide-to="1"></li>
					      <li data-target="#customCarousel" data-slide-to="2"></li>
					      <li data-target="#customCarousel" data-slide-to="3"></li>
					     
					    </ol>
					    <div className="carousel-inner height350">
					      <div className="item fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
					    	 <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
					    	 	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Capital Protection.<br/> Risk Mitigation. <br/> Alpha generation</label>
					    	 	
				       		 </div>
					      </div>

					      <div className="item fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
						      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
						       	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">The Value we create : Profound.Profuse.Precise.</label>
					    	 	
				        </div>
					      </div>
					    
					      <div className="item fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
						      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
						       	<label className=" col-lg-8 col-md-12 col-sm-12 col-xs-12 row">Your right investment decision is your  long term best friend.{/* and we create that friends circle for you.*/}</label>
					    	 	 
				          </div>
					      </div>
					      
				    	<div className="item active fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
					     <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
					      	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Intelligence to identify <br/>
																Systemized process to execute <br/>
																Courage to capitalise </label>
					    	 	
				          </div>
				   		 </div>
					</div>
				 
			 		</div>
			 		<div id="customCarousel" className="carousel col-sm-12 col-xs-12 hidden-lg hidden-md noPadding" data-ride="carousel">
					    <ol className="carousel-indicators">
					      <li data-target="#customCarousel" data-slide-to="0" className="active"></li>
					      <li data-target="#customCarousel" data-slide-to="1"></li>
					      <li data-target="#customCarousel" data-slide-to="2"></li>
					      <li data-target="#customCarousel" data-slide-to="3"></li>
					     
					    </ol>
					    <div className="carousel-inner height350">
					      <div className="item fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
					    	 <div className="captionSmall col-lg-12 col-md-12 col-sm-12 col-xs-12">
					    	 	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Capital Protection. Risk Mitigation. Alpha generation</label>
					    	 	
				       		 </div>
					      </div>

					      <div className="item fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
						      <div className="captionSmall col-lg-12 col-md-12 col-sm-12 col-xs-12">
						       	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">The Value we create :<br/> Profound. <br/>Profuse. <br/>Precise.</label>
					    	 	
				        </div>
					      </div>
					    
					      <div className="item fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
						      <div className="captionSmall col-lg-12 col-md-12 col-sm-12 col-xs-12">
						       	<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Your right investment decision is your  long term best friend and we create that friends circle for you.</label>
					    	 	
				          </div>
					      </div>
					      
				    	<div className="item active fadding">
					        <img src="/images/bannerImgLogo.jpg" alt="LogoImg"/>
						     	<div className="captionSmall col-lg-12 col-md-12 col-sm-12 col-xs-12">
						      		<label className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Intelligence to identify <br/>
																	Systemized process to execute <br/>
																	Courage to capitalise </label>
					          </div>
				   		 </div>
					</div>
				 
			 		</div>
				</div>
			</div>		
		);
	}
}
