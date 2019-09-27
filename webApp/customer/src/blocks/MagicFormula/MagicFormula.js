import React, { Component } from 'react';
import $         from 'jquery';

import "./MagicFormula.css";

export default class MagicFormula extends Component {

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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray onHoverEffect">
                <div className="row">
                   <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  imageContainer">
                    <div>
                      <img src="/images/magic.jpg"/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Magic Formula</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>7 Techno - Fundamental parameters combined to generate best possible Buy & Sell strategies</li>
                          <li>This is inhouse & proprietary indicators of Wealthyvia which helps us to ride our winners & cut our losers early</li>
                        </ul>
                      </p>                  
                    </div>
                    
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer">
                    <div>
                      <img src="/images/magic.jpg"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Magic Formula </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                       <ul className="customOl">
                          <li>7 Techno - Fundamental parameters combined to generate best possible Buy & Sell strategies</li>
                          <li>This is inhouse & proprietary indicators of Wealthyvia which helps us to ride our winners & cut our losers early</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
    );
  }
}
