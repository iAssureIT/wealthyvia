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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 oneOnOneAdvice">
                    <label><span className="iceBlueColor">Track Record</span></label>
                    <p className="yearP">4 YEAR CAGR OF</p>
                    <span className="percentage">43.03%*</span><br/>
                    <span className="terms">*CAGR% calculated on Model Portfolio basis.</span>
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
