import React, { Component } from 'react';
import $         from 'jquery';

import "./Invest.css";

export default class Invest extends Component {

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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorPurple investContainer">
              <div className="row">
                <label className="investLabel">Invest like a pro without being one.</label>
                <p className="investPara col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">Unlike some other ways to invest, SoFi gives you more than one option of how to do it. Plus,
                we’re built to grow with you and your goals—no matter your skill level at the start.</p>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="/images/zero.png"/></div>
                    <label className="payZero">Pay zero SoFi fees.</label>
                    <p className="payZeroDesc">That’s right—$0 in transaction fees and $0 in management fees.</p>

                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="/images/transfer.png"/></div>
                    <label className="payZero">Choose how.</label>
                    <p className="payZeroDesc">Do-it-yourself with active investing or take it easy with automated investing.</p>

                </div>
                 <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 subDiv1 ">
                      <div className="iconContainer"><img src="/images/star.png"/></div>
                    <label className="payZero">Invest with skill.</label>
                    <p className="payZeroDesc">SoFi is built for those who learn by doing—because the fastest way to become an investor is to start investing.</p>

                  </div>
                

              </div>
            </div>
    );
  }
}

