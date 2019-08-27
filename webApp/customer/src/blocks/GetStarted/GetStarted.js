import React, { Component } from 'react';
import $         from 'jquery';

import "./GetStarted.css";

export default class GetStarted extends Component {

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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray mt20 getStartedContainer">
                <div className="row">
                  <label className="col-lg-6  col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">You’ve made it this far. Let’s get started.</label>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 doItYourself">
                          <label className="">Ready to do-it-yourself?</label>
                          <div className="col-lg-5 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 startInvestingButton "> Start active investing</div>
                          <div  className="col-lg-5  col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 learnMore"><a href=""> Learn more → </a></div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 handsOff doItYourself">
                           <label className="">Want to take a hands-off role?</label>
                          <div className="col-lg-5 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 startInvestingButton "> Start auto investing</div>
                          <div  className="col-lg-5  col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 learnMore"><a href=""> Learn more → </a></div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
    );
  }
}
