import React, { Component } from 'react';
import $         from 'jquery';

import "./AboutUs.css";

export default class AboutUs extends Component {

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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
            
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backGradient">
                        <label>ABOUT THE COMPANY</label>
                        <p className="col-lg-8 col-lg-offset-2">We provide our research analysis advisory to our HNI(High Net worth Individuals) , Institutional and retail clients.</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 ">
                      <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 ourStoryDiv">
                        <label>Our Story</label>
                      </div>
                   </div>
                    <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 storyContainer">
                      <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourStoryUl">
                      <li>Arthavruddhi Capital is a SEBI registered (INH000005397) advisory services firm.</li>
                      <li>Over two decades of combined experience in the markets.</li>
                      <li>Proprietary framework - 5GCPM.</li>
                      <li>Specialists in identifying companies who are positioned to capture the next big opportunity.</li>
                      </ul>
                  </div>
                  <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 storyContainer whyUs mt20">
                   <label className="">Why Us</label>
                  <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <li>Profound process of Stock Selection.</li>
                  <li>Risk Management & Loss Aversion.</li>
                  <li>Generating Alpha across market cycles.</li>
                  <li>Extensive Research & data crunching.</li>
                  <li>Predefined Entry & Exit strategies.</li>
                  </ul>
                  </div>
            </div>
    );
  }
}
