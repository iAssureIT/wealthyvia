import React, { Component } from 'react';
import $         from 'jquery';

import "./HandFreeInvesting.css";

export default class HandFreeInvesting extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"uslistedStocks",
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
        if (scroll >= 3020) {
            $(".para0").addClass("paraeff");
        } else {
            $(".para0").removeClass("paraeff");
        }
        
    });
  } 

  render() {

    return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20" id="uslistedStocks">
              <div className="row">

                <div className="col-lg-10 col-lg-offset-2 col-md-6 hidden-sm hidden-xs startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-7 col-md-7 col-md-offset-5 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">Unlisted space</span> investment</label>
                    <p>When year after year IPO are coming at extremely high prices with very minimal chances of getting allotment due to very high subscriptions, it might be more profitable to invest in such companies even before they get listed. We handle this investment with precaution of liquidity with hassle free share crediting with utmost trust and Transparency. … Invest in such shares? </p>
                     <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>

                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-md-6  hidden-sm hidden-xs padding40Left handFreeInvestingImgContainer">
                  <div>
                    <img src="/images/unlisted.jpg"/>
                  </div>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
              <div className="row">
              <div className="col-sm-12 col-sm-12 hidden-md hidden-lg small">
                  <div>
                    <img src="/images/unlisted.jpg"/>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContent  backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                    <label><span className="iceBlueColor">Unlisted space</span> investment</label>
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
