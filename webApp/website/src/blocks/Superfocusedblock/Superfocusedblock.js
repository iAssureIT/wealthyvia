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
                    <p> Abnormal returns can only come from abnormal portfolios. If you need some form of concentration to deliver significant alpha, it all boils down to the intrinsic quality of the individual investments you put in the portfolio. The higher the quality of the individual bets, the more concentrated you can be. 
                    </p>
                    <p>A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate above average CAGR. Typically, portfolio managers would sell the shares of companies that are considered overvalued to raise cash to buy shares of companies that are considered undervalued. And this is exactly the reason for mediocre returns of the Fund Managers.</p>
                    <a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a> &nbsp;&nbsp;
                        <a href={"/offerings/"+this.state.nameOfDiv+"#productchart"} className="">Check Performance </a>
                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-6 col-md-6  hidden-sm hidden-xs padding40 sfocusedG para1 ">
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
                            <p>Abnormal returns can only come from abnormal portfolios. If you need some form of concentration to deliver significant alpha, it all boils down to the intrinsic quality of the individual investments you put in the portfolio. The higher the quality of the individual bets, the more concentrated you can be. </p>
                            <p>A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to generate above average CAGR. Typically, portfolio managers would sell the shares of companies that are considered overvalued to raise cash to buy shares of companies that are considered undervalued. And this is exactly the reason for mediocre returns of the Fund Managers.</p>
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
