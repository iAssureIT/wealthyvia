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
                    <label><span className="iceBlueColor">Skin In. </span>The Game.</label>
                    <p>Our Financial well being is linked with yours.
                  No scope for rekless behaviour.
                  Risk Management is our utmost priority over Returns.</p>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
