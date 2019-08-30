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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" id="5gcpm">
                <div className="row">

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/img2.gif"/>
                    </div>

                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifTextContainer learnMoreST">
                    <label><span className="iceBlueColor">5GCPM </span></label>
                    <p>Profound Research 
                    Growth cycle and factors identification, sound framework, and..</p><a href=""> Read more</a>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
