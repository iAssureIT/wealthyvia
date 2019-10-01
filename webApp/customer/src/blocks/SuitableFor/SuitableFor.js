import React, { Component } from 'react';
import $         from 'jquery';

import "./SuitableFor.css";

export default class SuitableFor extends Component {

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
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sutableForHead">
                              <label>Who is it suitable for?</label>

                            </div>

                   <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/Magic-Hat.png"/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Magic Formula</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>A formula based on Free cash flows , constancy of earnings, return ratios, sales and profit growths where no parameters of MCAP size or PE or EV/EBITDA multiples taken over the period of 5-7-10 years. In 7-10 years business economics are well tested against inflation, government and their policy changes, crude extreme fluctuations, trade wars, real wars, competition, technology changes, market share changes, substitute products.</li>
                          <li>We found it results in list of companies having no drag or drawdown of more than 25% from top i.e. new high a stock makes. There are only 170 such companies in market. This MAGIC screen basically gives natural support to stock price and price anchoring in quality growth companies.</li>
                          <li>A technical chart of long term not daily or weekly but of months and years which clearly tells whether its long term uptrend is intact or not. We found this has 90% accuracy over long term trend prediction</li>
                          <li>7 parameters are combined to form one single signal as derivative of them and gives best possible indication that is most useful for True Investors.</li>
                        </ul>
                      </p>                  
                    </div>
                
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/img2.gif"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">M : Magic Formula </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                         <li>A formula based on Free cash flows , constancy of earnings, return ratios, sales and profit growths where no parameters of MCAP size or PE or EV/EBITDA multiples taken over the period of 5-7-10 years. In 7-10 years business economics are well tested against inflation, government and their policy changes, crude extreme fluctuations, trade wars, real wars, competition, technology changes, market share changes, substitute products.</li>
                          <li>We found it results in list of companies having no drag or drawdown of more than 25% from top i.e. new high a stock makes. There are only 170 such companies in market. This MAGIC screen basically gives natural support to stock price and price anchoring in quality growth companies.</li>
                          <li>A technical chart of long term not daily or weekly but of months and years which clearly tells whether its long term uptrend is intact or not. We found this has 90% accuracy over long term trend prediction</li>
                          <li>7 parameters are combined to form one single signal as derivative of them and gives best possible indication that is most useful for True Investors.</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
    );
  }
}
