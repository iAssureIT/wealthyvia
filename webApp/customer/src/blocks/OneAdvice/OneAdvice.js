import React, { Component } from 'react';
import $         from 'jquery';

import "./OneAdvice.css";

export default class OneAdvice extends Component {

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
 
  } 

  render() {

    return (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite" id="safeHevenMoats">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 oneOnOneAdvice">
                    <label><span className="iceBlueColor">Safe heaven moats</span></label><br/>

                    <span className="terms">Large Caps</span><br/>
                    <span className="terms">Leaders in the sector</span><br/>
                    <span className="terms">Quality Management</span><br/>
                    <span className="terms">Strong Balance sheet</span><br/>
                    <span className="terms">Decent growth</span><br/>
                    <span className="terms">Earnings predictability / Non Cyclical stocks</span><br/>
                    <span className="terms">Linked to Indian growth story </span>
                  </div>
                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/img3.jpg"/>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
