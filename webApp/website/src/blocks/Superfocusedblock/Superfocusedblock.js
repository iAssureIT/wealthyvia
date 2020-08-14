import React, { Component } from 'react';

import "./Superfocusedblock.css";

export default class Superfocusedblock extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"superFocused"
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
           
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20 " id="5gcpm">
              <div className="row">

                <div className="col-lg-10 col-md-6 hidden-sm hidden-xs startTrandingContent  padding40 backColorGray">
                  <div className="row">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">Super Focused </span></label>
                    <p> A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate consistent High CAGR. 
                      Higher the Conviction and higher the strength and continuation , Higher should be the  allocation ! Returns are most dependent variable on Risk Reward and position sizing! 
                      If you cut your losers & let your winners ride. At the end,  you will be left out with a portfolio is winners!  
                    </p><a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a> &nbsp;&nbsp;
                        <a href={"/offerings/"+this.state.nameOfDiv+"#productchart"} className="">Check Performance </a>
                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-6 col-md-6  hidden-sm hidden-xs padding40 fiveG para1 ">
                    <img className="row" src="/images/superfocused.png" alt=""/>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
                    <div className="row">
                      <div className="col-sm-12 col-sm-12 hidden-md hidden-lg small">
                            <img src="/images/superfocused.png" alt=""/>
                        </div>
                        <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContentSmall  backColorGray">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                            <label><span className="iceBlueColor">Super Focused </span></label>
                            <p>A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate consistent High CAGR. 
                              Higher the Conviction and higher the strength and continuation , Higher should be the  allocation ! Returns are most dependent variable on Risk Reward and position sizing! 
                              If you cut your losers & let your winners ride. At the end,  you will be left out with a portfolio is winners!  </p>
                              <a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a>
                              &nbsp;&nbsp;
                        <a href={"/offerings/"+this.state.nameOfDiv+"#productchart"} className="">Check Performance </a>
                            </div>
                          </div>
                        </div>
                     
                    </div>
              </div>
              </div>
            </div>
    );
  }
}
