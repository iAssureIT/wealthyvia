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
                    <label><span className="iceBlueColor">One-on-one advice</span> and more—on the house.</label>
                    <p>Thinking about buying a home? Just graduated and curious about how to invest while paying off student loan debt? We can help with that. Wealthyvia members get one-on-one access to financial advisors so you can make a plan to tackle your goals.</p>
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
