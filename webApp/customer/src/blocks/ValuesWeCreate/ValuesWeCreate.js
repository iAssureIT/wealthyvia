import React, { Component } from 'react';
import $         from 'jquery';

import "./ValuesWeCreate.css";

export default class ValuesWeCreate extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  render() {

    return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 valuesWeCreateContainer">
            <div className="">
              <div className="col-lg-4 col-lg-offset-6 col-md-12 col-sm-12 col-xs-12 floatingDivContainer">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                  <div className="iconCircle col-lg-4 col-lg-offset-4">
                    <img src="/images/correct.png"/>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                  <label className="headingOfValue">Value We Create</label>
                  <p>Profound.Profuse.Precise.</p>
                  <p className="paraDesc">With our clients portfolios we intend to hold best of businesses in India for very long tenure and create a wealthy value. 
                    <br/>
                    “Value is what you remember long after its price gone”</p>
                    <label className="missonButton">Mission <i class="fa fa-chevron-right"></i></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

