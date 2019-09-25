import React, { Component } from 'react';
import $         from 'jquery';

import "./InvoicePage.css";

export default class InvoicePage extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan noPadding">
                    <label> You've selected to Premium Plan</label>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="centreDetailContainer col-lg-3 ">
                                <input type="radio" name="price" checked/>
                                <span className="radioCheckIP"></span>
                          </div>
                          <span className="centreDetaillistItemIP">Premium Plan</span>
                          <ul className="customUlIP">
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                          </ul>

                      </div>
                 <div className="col-lg-6  col-md-12 col-sm-12 col-xs-12 ">
                    <label className="pull-right priceDivIP">Rs 3,519.00/yr</label>
                </div>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 btnContainer">
                     
                <div className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton ">
                   Make Payment
                </div>
                </div>
            </div>
    );
  }
}
