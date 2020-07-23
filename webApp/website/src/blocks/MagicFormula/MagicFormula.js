import React, { Component } from 'react';

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
                      <img src="/images/magic.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Management of Risk with Magic Formula </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>We designed derivatives of some parameters from technical and fundamentals along with scenarios that take place in market. As a combination of all these , we have clear entry, exit and hold strategies.</li>
                          <li>These indicators are proprietary of WealthiVia. They help us precisely about riding winners and booking profits at optimum levels. Also early deviations from thesis or on going good investment can be found in much better way.</li>
                        </ul>
                      </p>                  
                    </div>
                    
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 imageContainer">
                    <div>
                      <img src="/images/magic.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Management of Risk with Magic Formula  </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                         <ul className="customOl">
                          <li>We designed derivatives of some parameters from technical and fundamentals along with scenarios that take place in market. As a combination of all these , we have clear entry, exit and hold strategies.</li>
                          <li>These indicators are proprietary of WealthiVia. They help us precisely about riding winners and booking profits at optimum levels. Also early deviations from thesis or on going good investment can be found in much better way.</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
    );
  }
}
