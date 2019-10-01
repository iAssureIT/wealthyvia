import React, { Component } from 'react';
import $         from 'jquery';

import "./FiveGCPMDiv.css";

export default class FiveGCPMDiv extends Component {

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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  investContainer">
              <div className="row">
                <label className="investLabel">Introducting you to 5GCPM</label>
                <p className="investPara col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">Our proprietory self designed framework puts you ahead in the game of wealth creation. It makes you invest in the best performing companies & provides protection with risk management.</p>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/memorize.png"/></div>
                    <label className="payZero">5 Growth Factors</label>
                  {/*  <p className="payZeroDesc">Sales.<br/>
                                            Profits.<br/>
                                            Volumes.<br/>
                                            Margins.<br/>
                                            Market Share</p>
*/}
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/suitcase.png"/></div>
                    <label className="payZero">Corporate Governance</label>
                  {/*  <p className="payZeroDesc">Tax evasions, Dividends.<br/>
                                              High Promoter Holdings.<br/>
                                              Related Party Transactions.<br/>
                                              Too many subsidiaries.<br/>
                                              Management Reputation.<br/>
                                              Free Cash Flows.</p>
*/}
                </div>
                 <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/dollar.png"/></div>
                    <label className="payZero">Practicability</label>
                  {/*  <p className="payZeroDesc">Probabilistic Approach.<br/>
                                              Feasibility<br/>

                                              Hurdles in achievement?<br/>
                                              What can go wrong in plan?</p>*/}

                  </div>
                   <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/molecule.png"/></div>
                    <label className="payZero">Magic Formula</label>
                                            {/*<p className="payZeroDesc">7 parameters are
                        combined to form one
                        single signal as
                        derivative of them and
                        gives best possible
                        indication for Entry &
                        Exit Strategies.</p>*/}

                  </div>
                

              </div>
            </div>
    );
  }
}

