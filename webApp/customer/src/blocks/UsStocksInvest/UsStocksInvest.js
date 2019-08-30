import React, { Component } from 'react';
import $         from 'jquery';

import "./UsStocksInvest.css";

export default class UsStocksInvest extends Component {

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

                <div className="col-lg-10 col-md-6 col-sm-12 col-xs-12 startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <label><span className="iceBlueColor">US stocks investments </span>simplified</label>
                    <p>Unleash global growth potential 
                        Invest in largest economy and 
                        40% market of the world equities
                        Geographical diversification
                        High Tech global giants 
                        zero brokerage</p>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad50">
                       {/* <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 "></div>*/}
                        <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 learnMoreST row"> <a href="">Read More</a></div>
                    </div> 
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-7 col-md-6  col-sm-12  col-xs-12  startTrandingImgContainer para1">
                  <div>
                    <img src="/images/img4.jpg"/>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
