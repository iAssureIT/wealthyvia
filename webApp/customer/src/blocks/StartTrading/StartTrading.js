import React, { Component } from 'react';
import $         from 'jquery';

import "./StartTrading.css";

export default class StartTrading extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"safeHeven"
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
            $(".para2").addClass("paraeff4");
        } else {
            $(".para2").removeClass("paraeff4");
        }
        
    });
  } 

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  backColorWhite mt20" id="safeHeven">
              <div className="row">

                <div className="col-lg-10 col-md-6 hidden-xs hidden-sm startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">MF and safe heaven moats +  </span>alpha</label>
                    <p>Assets can be called assets when they put money in your pocket and not just appreciate in value. Assets have earning power , be it rental income or dividend yields. Similarly we have SHM MF Enhancer which can generate extra returns on top of regular ones. 
                        What if one gets cherry on cake when expecting only cake or Bun Maska jam too when orders only Chaai. Can this happen also with your stocks or mutual funds ?
                        </p> <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>

                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad50">
                       {/* <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 "></div>*/}
                        <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 learnMoreST row"></div>
                    </div> 
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-6 col-md-6  hidden-xs hidden-sm startTrandingImgContainer para2">
                  <div>
                    <img src="/images/img4.jpg"/>
                  </div>
                </div>
                  <div className="col-sm-12 col-sm-12 hidden-md hidden-lg  startTrandingImgContainerSmall ">
                  <div>
                    <img src="/images/img4.jpg"/>
                  </div>
                </div>
               <div className="col-sm-12 col-sm-12 hidden-md hidden-lg startTrandingContent backColorGray">
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">MF and safe heaven moats +  </span>alpha</label>
                    <p>Assets can be called assets when they put money in your pocket and not just appreciate in value. Assets have earning power , be it rental income or dividend yields. Similarly we have SHM MF Enhancer which can generate extra returns on top of regular ones. 
                        What if one gets cherry on cake when expecting only cake or Bun Maska jam too when orders only Chaai. Can this happen also with your stocks or mutual funds ?
                        </p> <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>

                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad50">
                       {/* <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 "></div>*/}
                        <div className=" col-lg-3 col-md-6 col-sm-12 col-xs-12 learnMoreST row"></div>
                    </div> 
                  </div>
                </div>
             
              </div>
              </div>
    );
  }
}
