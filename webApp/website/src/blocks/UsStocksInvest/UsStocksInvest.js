import React, { Component } from 'react';
import $         from 'jquery';

import "./UsStocksInvest.css";

export default class UsStocksInvest extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"USAStocks",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
  $(window).scroll(function() 
    {    
        var scroll = $(window).scrollTop();
        if (scroll >= 3720) {
            $(".para1").addClass("paraeff1");
        } else {
            $(".para1").removeClass("paraeff1");
        }
        
    });
  } 

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20" id="USAStocks">
              <div className="row">

                <div className="col-lg-10 col-md-6 hidden-sm hidden-xs startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">US stocks investments simplified </span></label>
                    <p>One can unleash global growth potential by Investing in the largest economy and 40% market of the world equities – USA. It is also a geographical diversification along with opportunity to be part of High Tech global giants’ growth and that too with zero brokerage. Wanna know more?</p>
                     <a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a> 
                     &nbsp;&nbsp;
                        <a href={"/offerings/"+this.state.nameOfDiv+"#productchart"} className="">Check Performance </a>
                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-6 col-md-6  hidden-sm hidden-xs padding40 usStocksContainer para1">
                  <div className="row">
                    <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/usMarket.jpg" alt=""/>
                  </div>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
              <div className="row">
              <div className="col-sm-12 col-sm-12 hidden-md hidden-lg small">
                  <div>
                    <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/usMarket.jpg" alt=""/>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContentSmall  backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                   <label><span className="iceBlueColor">US stocks investments simplified  </span></label>
                    <p>One can unleash global growth potential by Investing in the largest economy and 40% market of the world equities – USA. It is also a geographical diversification along with opportunity to be part of High Tech global giants’ growth and that too with zero brokerage. Wanna know more?</p>
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
