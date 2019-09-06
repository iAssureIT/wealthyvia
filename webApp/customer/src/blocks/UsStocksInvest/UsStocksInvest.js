import React, { Component } from 'react';
import $         from 'jquery';

import "./UsStocksInvest.css";

export default class UsStocksInvest extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"unlistedPre",
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
        console.log(" scroll",scroll)
        if (scroll >= 3720) {
            $(".para1").addClass("paraeff1");
        } else {
            $(".para1").removeClass("paraeff1");
        }
        
    });
  } 

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20" id="unlistedPre">
              <div className="row">

                <div className="col-lg-10 col-md-6 hidden-sm hidden-xs startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">US stocks investments </span>simplified</label>
                    <p>One can unleash global growth potential by Investing in the largest economy and 40% market of the world equities – USA. It is also a geographical diversification along with opportunity to be part of High Tech global giants’ growth and that too with zero brokerage. Wanna know more?</p>
                     <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>

                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-7 col-md-6  hidden-sm hidden-xs startTrandingImgContainer para1">
                  <div>
                    <img src="/images/img4.jpg"/>
                  </div>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
              <div className="row">
              <div className="col-sm-12 col-sm-12 hidden-md hidden-lg">
                  <div>
                    <img src="/images/img4.jpg"/>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContent  backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                    <label><span className="iceBlueColor">Unlisted space</span><br/> investment </label>
                    <p>When year after year IPO are coming at extremely high prices with very minimal chances of getting allotment due to very high subscriptions, it might be more profitable to invest in such companies even before they get listed. We handle this investment with precaution of liquidity with hassle free share crediting with utmost trust and Transparency. … Invest in such shares? </p>
                       <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>
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
