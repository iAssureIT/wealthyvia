import React, { Component } from 'react';
import $         from 'jquery';

import "./StartTrading.css";

export default class StartTrading extends Component {

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
        if (scroll >= 2150) {
            $(".para1").addClass("paraeff1");
        } else {
            $(".para1").removeClass("paraeff1");
        }
        
    });
  } 

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20">
              <div className="row">

                <div className="col-lg-10 col-md-6 col-sm-12 col-xs-12 startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <label><span className="iceBlueColor">Stock </span>Selection Process</label>
                    <p>Look out for Future Earnings Arbitrage.<br/>
                        Management pedigree. High promoter<br/>
                        holding & Zero pledging.<br/>
                        Growth at reasonable price.<br/>
                        Low Leverage and consistently Dividend &<br/>
                        Tax paying companies.</p>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad50">
                       {/* <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 "></div>*/}
                        <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 learnMoreST row"> <a href="">Learn More &nbsp; <i class="fa fa-arrow-right"></i></a></div>
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
