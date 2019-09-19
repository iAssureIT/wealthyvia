import React, { Component } from 'react';
import $         from 'jquery';

import "./Practicability.css";

export default class Practicability extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"5gcpm"
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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect">
                <div className="row">
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">P : Practicability </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>What is probability of entire investment turning profitable?</li>
                          <li>Feasibility : constraints of net blocks-fixed assets, cash in hand, team capability, demand for sales.</li>
                          <li>Natural tailwinds</li>
                          <li>Hurdles in achievement ?</li>
                          <li>What can go wrong in plan</li>
                        </ul>
                      </p>                  
                    </div>
                   <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="/images/prac.jpg"/>
                    </div>
                  </div>
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/prac.jpg"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">P : Practicability </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                         <li>What is probability of entire investment turning profitable?</li>
                        <li>Feasibility : constraints of net blocks-fixed assets, cash in hand, team capability, demand for sales.</li>
                        <li>Natural tailwinds</li>
                        <li>Hurdles in achievement ?</li>
                        <li>What can go wrong in plan</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
    );
  }
}
