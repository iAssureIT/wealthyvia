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
  componentDidMount(){
  }

  render() {

          if(this.props.match.params.validityPeriod == 999)
          {
          return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan noPadding">
                    <label> You've selected to 6 Months plan</label>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="centreDetailContainer col-lg-3 ">
                                <input type="radio" name="price" checked/>
                                <span className="radioCheckIP"></span>
                          </div>
                          <span className="centreDetaillistItemIP"> 6 Months Plan</span>
                       {/*   <ul className="customUlIP">
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                          </ul>*/}

                      </div>
                 <div className="col-lg-6  col-md-12 col-sm-12 col-xs-12 ">
                    <label className="pull-right priceDivIP"><i class="fa fa-rupee">&nbsp;</i> 999</label><br/>
                </div>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 btnContainer">
                     
                <div className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton ">
                   Make Payment
                </div>
                </div>
            </div>
          );
        }else if(this.props.match.params.validityPeriod == 1499){
             return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan noPadding">
                    <label> You've selected to 1 Year plan</label>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="centreDetailContainer col-lg-3 ">
                                <input type="radio" name="price" checked/>
                                <span className="radioCheckIP"></span>
                          </div>
                          <span className="centreDetaillistItemIP">1 Year Plan</span>
                       {/*   <ul className="customUlIP">
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                          </ul>*/}

                      </div>
                 <div className="col-lg-6  col-md-12 col-sm-12 col-xs-12 ">
                    <label className="pull-right priceDivIP"><i class="fa fa-rupee">&nbsp;</i> 1499</label><br/>
                </div>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 btnContainer">
                     
                <div className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton ">
                   Make Payment
                </div>
                </div>
            </div>
          );
        }else{
          return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan noPadding">
                    <label> You've selected to 2 Year plan</label>
                </div>
                <div className="col-lg-8 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="centreDetailContainer col-lg-3 ">
                                <input type="radio" name="price" checked/>
                                <span className="radioCheckIP"></span>
                          </div>
                          <span className="centreDetaillistItemIP">2 Year Plan</span>
                       {/*   <ul className="customUlIP">
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                            <li>Affordable domain-name validation.</li>
                          </ul>*/}

                      </div>
                 <div className="col-lg-6  col-md-12 col-sm-12 col-xs-12 ">
                    <label className="pull-right priceDivIP"><i class="fa fa-rupee">&nbsp;</i> 1999</label><br/>
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
}
