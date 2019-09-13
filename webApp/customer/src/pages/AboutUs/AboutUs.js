import React, { Component } from 'react';
import $         from 'jquery';
import AboutUsCarousel from "../../blocks/AboutUsCarousel/AboutUsCarousel.js";
import ClientDeliverables from "../../blocks/ClientDeliverables/ClientDeliverables.js";
import ValuesWeCreate from "../../blocks/ValuesWeCreate/ValuesWeCreate.js";
import "./AboutUs.css";

export default class AboutUs extends Component {

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
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aboutUsContainer">
                <div className="row">
                  <div className="triangle-bottomleft hidden-xs hidden-md hidden-sm col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <label className="outstandingTeam">Our Outstanding Team</label>
                  <ul className="customUlabout">
                  <li>Total  80 plus years of experience in stock market combined  founders and 7  analysts. </li>

                  <li>Well connects to Managements of Business </li>

                  <li>network of analysts and consultants </li>

                  <li>Experience of Bear Markets</li>

                  <li>Best of advanced analytical tools, self developed softwares  and algo systems for data collection, analysis and interpretations</li>
                  </ul>
                  
                </div>
                </div>
            </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                  <div className="row">
                   <label className="headLabelQF">Qualitative Framework</label>
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 hexDiv1">
                        <div className="row">
                          <img src="/images/sign.png"/>
                          <p>Corporate Governance : Accounting redflags, promoter track/reputation  records, Third party transactions , tax and dividends</p>
                    
                      </div>
                  </div>        
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 hexDiv1 customMarginHex">
                        <div className="row">
                          <img src="/images/team.png"/>
                          <p>Management Integrity, high shareholding , better reputation, Changes in shareholding patterns</p>
                    
                      </div>
                  </div>            
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 hexDiv1 marginLeft170">
                        <div className="row">
                          <img src="/images/address.png"/>
                          <p>Consistency in Revenue , EBIDTA , Profit Growth , ROE , ROCE and Margins </p>
                    
                      </div>
                  </div>            
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 hexDiv1 centerSecound">
                        <div className="row">
                          <img src="/images/sign.png"/>
                          <p>Corporate Governance : Accounting redflags, promoter track/reputation  records, Third party transactions , tax and dividends</p>
                    
                      </div>
                  </div>        
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 hexDiv1 lastDiv">
                        <div className="row">
                          <img src="/images/team.png"/>
                          <p>Management Integrity, high shareholding , better reputation, Changes in shareholding patterns</p>
                    
                      </div>
                  </div>            
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 hexDiv1 marginTop380">
                        <div className="row">
                          <img src="/images/address.png"/>
                          <p>Consistency in Revenue , EBIDTA , Profit Growth , ROE , ROCE and Margins </p>
                    
                      </div>
                  </div>            


                  </div>
              </div>            
            </div>
             <div className="row">
                <ClientDeliverables />
            </div>
             <div className="row">
                <ValuesWeCreate />
            </div>
          </div>
    );
  }
}
