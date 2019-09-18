import React, { Component } from 'react';
import $         from 'jquery';

import "./GrowthFactor.css";

export default class GrowthFactor extends Component {

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
                    <label><span className="iceBlueColor">5G : Five types of Growths </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>
                          Sales</li>
                        <li>Profits</li>
                        <li>Clients/product volume/value addition/branches/territories (micros of business economics)</li>
                        <li>Margins :  one should be sure that margin will not decline. Headwinds, sectorial downturns, raw material prices, fierce competition, import duties, tax laws, substitute products , advanced tech makes margin decline.</li>
                        <li>Market share/demand/ size of opportunity : this defines leadership position. Always no1 or no2 company having considerable and increasing size of opportunity .</li>
                        </ul>
                      </p>                  
                    </div>
                   <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                    <div>
                      <img src="/images/five.jpg"/>
                    </div>
                  </div>
                     <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/five.jpg"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">5G : Five types of Growths </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                          <li>
                          Sales</li>
                        <li>Profits</li>
                        <li>Clients/product volume/value addition/branches/territories (micros of business economics)</li>
                        <li>Margins :  one should be sure that margin will not decline. Headwinds, sectorial downturns, raw material prices, fierce competition, import duties, tax laws, substitute products , advanced tech makes margin decline.</li>
                        <li>Market share/demand/ size of opportunity : this defines leadership position. Always no1 or no2 company having considerable and increasing size of opportunity .</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
    );
  }
}
