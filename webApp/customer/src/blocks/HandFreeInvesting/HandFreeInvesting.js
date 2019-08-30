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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite ht500 " id="uslistedStocks">
              <div className="row">

                <div className="col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 handFreeInvesting  backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right learnMoreST">
                    <label><span className="iceBlueColor">Unlisted space</span><br/> investment </label>
                    <p>Trust & Transparency 
                      Hassle free shares crediting 
                       only  liquid stocks 
                      Detailed research report & data
                      Pre Ipo stage </p>
                       <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>
                    </div>
                  </div>
                </div>
               <div className="col-lg-6 col-md-6  col-sm-12  col-xs-12  para0">
                  <div>
                    <img src="/images/img1.jpg"/>
                  </div>
                </div>
              </div>
            </div>
      );
  }
}
