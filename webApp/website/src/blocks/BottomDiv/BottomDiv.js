 import React, { Component } from 'react';
import "./BottomDiv.css";

export default class BottomDiv extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
			  	<div className="row">
			  		<div className="blogHeading hidden-lg col-md-12 col-sm-12 col-xs-12"> Products </div>

			  		<a href="/offerings/5gcpm#productchart" className="scroll"><div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 miniDiv1Filter ht162">
						<div className="row">
			  			<img src="/images/ab2.jpg" alt=""/>
						 <div className="miniFilterTextDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">5GCPM</label><br/><br/>
				          <span className="shopNowButtonFilters">Check Performance</span><br/>
				        </div>
				          <div className="miniFilterTextDiv1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">5GCPM</label><br/>
				      	</div>

			  		</div>
				</div></a>

					<a href="/offerings/safeHeavenMoats#productchart"><div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 miniDiv1Filterother height170 ">
						<div className="row">
			  			<img src="/images/ab3.jpg" alt=""/>
						 <div className="miniFilterTextDivother col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">Safe Heaven Moats</label><br/><br/>
				          <span className="shopNowButtonFilters">Check Performance</span><br/>
				        </div>
				        <div className="miniFilterTextDiv2 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">Safe Heaven Moats</label><br/>
				      	</div>

			  		</div>
				</div></a>
				<a href="/offerings/superFocused#productchart"><div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 miniDiv1Filterother height170 ">
						<div className="row">
			  			<img src="/images/ab1.jpg" alt=""/>
						 <div className="miniFilterTextDivother col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">Super Focused</label><br/><br/>
				          <span className="shopNowButtonFilters">Check Performance</span><br/>
				        </div>
				        <div className="miniFilterTextDiv2 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">Super Focused</label><br/>
				      	</div>

			  		</div>
				</div></a>
				<a href="#unlistedStocks"><div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 miniDiv1Filterother height170 ">
						<div className="row">
			  			<img src="/images/ab2.jpg" alt=""/>
						 <div className="miniFilterTextDivother col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">Unlisted Stocks</label><br/><br/>
				          <span className="shopNowButtonFilters">Read More</span><br/>
				        </div>
				        <div className="miniFilterTextDiv2 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">Unlisted Stocks</label><br/>
				      	</div>

			  		</div>
				</div></a>
					
				<a href="/offerings/USAStocks#productchart"><div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 miniDiv1Filter ht162">
						<div className="row">
			  			<img src="/images/ab4.jpg" alt=""/>
						 <div className="miniFilterTextDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="pad20">USA Stocks</label><br/><br/>
				          <span className="shopNowButtonFilters">Check Performance</span><br/>
				        </div>
				        <div className="miniFilterTextDiv1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				          <label className="margins">USA Stocks</label><br/>
				      	</div>

			  		</div>
				</div></a>
			
				
			</div>		
		</div>
		);
	}
}
