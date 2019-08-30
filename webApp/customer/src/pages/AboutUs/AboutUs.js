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
                <AboutUsCarousel />
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
