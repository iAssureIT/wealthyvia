import React, { Component } from 'react';
import $         from 'jquery';

import "./Banner.css";

export default class Banner extends Component {

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

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainer">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  bannerContent">
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-5  investButton" >
                      <div className="row">
                      Wealthyvia Invest
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divHeading" >
                      <div className="row">
                      Become an investor—for free.
                      </div>
                    </div>  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerPara">
                      <div className="row">
                        <p>Get started and grow as an investor without paying Wealthyvia fees. Trade stocks and ETFs yourself with active investing and let us build a portfolio for your long-term goals with automated investing.</p>
                      </div>
                    </div>
                      <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5 backColorPurple investNowButton" >
                      <div className="row">
                      Invest now
                      </div>
                    </div>
                </div>
              </div>
            </div>
    );
  }
}
