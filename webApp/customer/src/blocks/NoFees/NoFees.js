import React, { Component } from 'react';
import $         from 'jquery';

import "./NoFees.css";

export default class NoFees extends Component {

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

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/img2.gif"/>
                    </div>

                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifTextContainer">
                    <label><span className="iceBlueColor">No fees. </span>No excuses.</label>
                    <p>Not-so-newsflash: fees are frustrating and they can keep people from investing. It’s why we charge $0 in Wealthyvia transaction and management fees. So there’s no reason not to <a href="" className="iceBlueColor">start investing.</a></p>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
