import React, { Component } from 'react';
import $         from 'jquery';

import "./CorporateGovernance.css";

export default class CorporateGovernance extends Component {

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
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  gifContainer">
                  {
                    <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/Corporate-Governance1.jpg"/>
                    ?
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/Corporate-Governance.jpg"/>
                    </div>
                    :
                    <div>
                      <img src="/images/loading.gif"/>
                    </div>
                  }
                  </div>
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs  typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">C : Corporate Governance</span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                        <ul className="customOl">
                        <li className="customstyle">We prefer -</li>
                        <li>High Promoter Holding and constant or increasing % </li>
                        <li>Nil/Low Pledged shares by promoters</li>
                        <li>Consistent & increasing Dividends payouts</li>
                        <li>Regular and industry standard Tax Paying </li>
                        <li>Generation of high Free Cash flows</li>
                        <li>No or neglible non suspcious Related party transactions</li>
                        <li>Trustworthy Management Reputation</li>
                        </ul>
                      </p>                  
                    </div>
                 
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/Corporate-Governance.jpg"/>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 typesOfGrouth learnMoreST">
                    <label><span className="iceBlueColor">C : Corporate Governance </span></label>
                      <p className="col-lg-12 col-md-10 col-sm-12 col-xs-12 specifications" id="5g">
                      <ul className="customOl">
                        <li className="customstyle">We prefer -</li>
                        <li>High Promoter Holding and constant or increasing % </li>
                        <li>Nil/Low Pledged shares by promoters</li>
                        <li>Consistent & increasing Dividends payouts</li>
                        <li>Regular and industry standard Tax Paying </li>
                        <li>Generation of high Free Cash flows</li>
                        <li>No or neglible non suspcious Related party transactions</li>
                        <li>Trustworthy Management Reputation</li>
                        </ul>
                      </p>                  
                    </div>
                
                </div>
              </div>
    );
  }
}
