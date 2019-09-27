import React, { Component } from 'react';
import $         from 'jquery';

import "./OneAdvice.css";

export default class OneAdvice extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"safeHevenMoats"
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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite padding40Left mt20" id="safeHevenMoats">
              <div className="row">

                <div className="col-lg-10 col-lg-offset-2 col-md-6 hidden-sm hidden-xs startTrandingContent backColorGray">
                  <div className="row">
                    <div className="col-lg-7 col-md-7 col-md-offset-5 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">Safe heaven moats</span> </label>
                    <p >Quality is something that is remembered long after its price paid is gone. Aspirations and needs of young newly settling middle class or married couples are catered by few dominant companies in India for very long period. Stability and scale of these companies makes them invincible. Many other companies come and try to 
                    compete or fetch market shares from such giants but these behemoth elephants continue to march North. 
                    How to make consistent wealth with them ?</p>
                     <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>

                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-md-6  hidden-sm hidden-xs handFreeInvestingImgContainer">
                  <div>
                    <img src="/images/safeHe.jpg"/>
                  </div>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
              <div className="row">
              <div className="col-sm-12 col-sm-12 hidden-md hidden-lg small">
                  <div>
                    <img src="/images/safeHe.jpg"/>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContent  backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                    <label><span className="iceBlueColor">Safe heaven moats</span> </label>
                    <p >Quality is something that is remembered long after its price paid is gone. Aspirations and needs of young newly settling middle class or married couples are catered by few dominant companies in India for very long period. Stability and scale of these companies makes them invincible. Many other companies come and try to 
                    compete or fetch market shares from such giants but these behemoth elephants continue to march North. 
                    How to make consistent wealth with them ?</p>
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
