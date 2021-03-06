import React, { Component } from 'react';
import $         from 'jquery';
import "./HandFreeInvesting.css";

export default class HandFreeInvesting extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"unlistedStocks",
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
        if (scroll >= 3020) {
            $(".para0").addClass("paraeff");
        } else {
            $(".para0").removeClass("paraeff");
        }
        
    });
  } 

  render() {

    return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20" id="unlistedStocks">
              <div className="row">

                <div className="col-lg-10 col-lg-offset-2 col-md-6 hidden-sm hidden-xs startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-7 col-md-7 col-md-offset-5 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">Unlisted space investment</span> </label>
                    <p> Year after year IPOs are coming at extremely high prices with very minimal chances of getting allotment due to very high number of subscriptions. Hence it might be more profitable to invest in such companies even before they get listed. We handle this investment with precaution of liquidity with hassle free shares crediting to your DMAT with utmost Trust and Transparency. … Invest in such shares?</p>
                     <a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a>

                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-md-6  hidden-sm hidden-xs padding40Left handFreeInvestingImgContainer">
                  <div>
                    <img src="/images/unlisted.jpg" alt=""/>
                  </div>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
              <div className="row">
              <div className="col-sm-12 col-sm-12 hidden-md hidden-lg small">
                  <div>
                    <img src="/images/unlisted.jpg" alt=""/>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContentSmall  backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                    <label><span className="iceBlueColor">Unlisted space</span> investment</label>
                    <p> Year after year IPOs are coming at extremely high prices with very minimal chances of getting allotment due to very high number of subscriptions. Hence it might be more profitable to invest in such companies even before they get listed. We handle this investment with precaution of liquidity with hassle free shares crediting to your DMAT with utmost Trust and Transparency. … Invest in such shares?</p>
                     <a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a>

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
