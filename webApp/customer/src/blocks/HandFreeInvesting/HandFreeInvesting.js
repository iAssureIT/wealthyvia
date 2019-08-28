import React, { Component } from 'react';
import $         from 'jquery';

import "./HandFreeInvesting.css";

export default class HandFreeInvesting extends Component {

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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite ">
              <div className="row">

                <div className="col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 handFreeInvesting backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right">
                    <label><span className="iceBlueColor">Investment Philosophy</span><br/> What We Look For </label>
                    <p>Our strategy is to invest in high promoter
                      quality, constantly growing Businesses that
                      are easy to understand & are prominent
                      players in respective markets with higher
                      or improving return ratios & margins,
                      having proper debt coverage and
                      assurance for future sales and earnings.</p>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad50 col-lg-offset-6">
                        <div className="startInterestingButton col-lg-3 col-md-6 col-sm-12 col-xs-12 "> Start auto investing</div>
                        <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 learnMore"> <a href="">Learn More &nbsp; <i class="fa fa-arrow-right"></i></a></div>
                    </div> 
                  </div>
                </div>
               <div className="col-lg-6 col-md-6  col-sm-12  col-xs-12 startTrandingImgContainer">
                  <div>
                    <img src="/images/img1.jpg"/>
                  </div>
                </div>
              </div>
            </div>
      );
  }
}
