import React, { Component } from 'react';

import "./ProductPageBanner.css";

export default class ProductPageBanner extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
 
  } 
  srollDiv(event)
  {
    window.scrollTo(0,630);

  }

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerFiveG">
              <div className="row">
                <div className="col-lg-12 col-md-12 hidden-sm hidden-xs backColorBlack blackDivPP">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      5GCPM-A proprietary framework developed, internalized & practiced by Wealthyvia
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
{/*                        <p>Get started and grow as an investor without paying Wealthyvia fees. Trade stocks and ETFs yourself with active investing and let us build a portfolio for your long-term goals with automated investing.</p>
*/}                      </div>
                    </div>
                
                </div>
                 <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt="" /><br/>
                          <span>Slide down to know more</span>
                      </div>
                </div>
              </div>
               <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorBlack blackDivPPSmall">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12  bannerContent">
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeadingSmall" >
                      <div className="row">
                      5GCPM-A proprietary framework developed, internalized & practiced by Wealthyvia
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
{/*                        <p>Get started and grow as an investor without paying Wealthyvia fees. Trade stocks and ETFs yourself with active investing and let us build a portfolio for your long-term goals with automated investing.</p>
*/}                      </div>
                    </div>
                
                </div>
                 <div className="col-lg-1 col-lg-offset-6 col-md-4 hidden-xs hidden-sm slideDownButton" onClick={this.srollDiv.bind(this)}>
                      <div className="row">
                          <img src="/images/down.png" alt=""/><br/>
                          <span>Slide down to know more</span>
                      </div>
                </div>
              </div>

              </div>
            </div>
    );
  }
}
