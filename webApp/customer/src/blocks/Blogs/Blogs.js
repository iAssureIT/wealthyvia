import React, { Component } from 'react';
import "./Blogs.css";

export default class Blogs extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12  blogContainer">
			  	<div className="row">
			  		<div className="blogHeading hidden-lg col-md-12 col-sm-12 col-xs-12"> Blogs </div>
			  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 miniDiv1Filter">
						<div className="row">
			  			<img src="/images/ab3.jpg"/>
						 <div className="miniFilterTextDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">From the CEO's Desk</label><br/>
				          <p>Meet our CEO.</p>
				          <span className="shopNowButtonFilters">Read More</span><br/>
				        </div>
				          <div className="miniFilterTextDiv1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">From the CEO's Desk</label><br/>
				      	</div>

			  		</div>
				</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 miniDiv1Filter">
						<div className="row">
			  			<img src="/images/ab1.jpg"/>
						 <div className="miniFilterTextDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">Our Board Members</label><br/>
				          <p>Spearheaded by renowned financial specialists.</p>
				          <span className="shopNowButtonFilters">Read More</span><br/>
				        </div>
				        <div className="miniFilterTextDiv1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">Our Board Members</label><br/>
				      	</div>

			  		</div>
				</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 miniDiv1Filter">
						<div className="row">
			  			<img src="/images/ab2.jpg"/>
						 <div className="miniFilterTextDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">Media Centre</label><br/>
				          <p>Get the latest news and updates on ASK Group and its companies.</p>
				          <span className="shopNowButtonFilters">Read More</span><br/>
				        </div>
				        <div className="miniFilterTextDiv1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">Media Centre</label><br/>
				      	</div>

			  		</div>
				</div>
				
			</div>		
		</div>
		);
	}
}
