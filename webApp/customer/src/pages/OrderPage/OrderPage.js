import React, { Component } from 'react';
import $         from 'jquery';

import "./OrderPage.css";

export default class OrderPage extends Component {

  constructor(props) {
    super(props);
        this.state = {
          date:"24/09/2019",
          orderNumber: "123456",
          planName: "Gold Plan",
          amount: 35000,
          validityPeriod: "3 Months",
          endsOn: "Ends on 24/02/2020",
          offeringName:"Gold Plan",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan noPadding">
                    <label> Your Orders</label>
                </div>
                <div className="col-lg-7 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 ">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsOP">
                         {/* <div className="centreDetailContainer col-lg-3 ">
                                <input type="radio" name="price" checked/>
                                <span className="radioCheckIP"></span>
                          </div>*/}
                          <span className="centreDetaillistItemOP col-lg-6  col-md-12 col-sm-12 col-xs-12">Order Number :<span className="noBold"> {this.state.orderNumber}</span></span>
                          <span className="centreDetaillistItemOP col-lg-6  col-md-12 col-sm-12 col-xs-12"><span className="pull-right">Date : <span className="noBold">  {this.state.date}</span></span></span>
                          <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Plan Name :<span className="noBold">  {this.state.planName}</span></span>
                          <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Amount : <span className="noBold">  {this.state.amount}</span></span>
                          <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Validity Period : <span className="noBold"> {this.state.validityPeriod} &nbsp;( {this.state.endsOn} )</span></span>
                       

                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsOP">
                         {/* <div className="centreDetailContainer col-lg-3 ">
                                <input type="radio" name="price" checked/>
                                <span className="radioCheckIP"></span>
                          </div>*/}
                          <span className="centreDetaillistItemOP col-lg-6  col-md-12 col-sm-12 col-xs-12">Order Number :<span className="noBold"> {this.state.orderNumber}</span></span>
                          <span className="centreDetaillistItemOP col-lg-6  col-md-12 col-sm-12 col-xs-12"><span className="pull-right">Date : <span className="noBold">  {this.state.date}</span></span></span>
                          <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Plan Name :<span className="noBold">  {this.state.planName}</span></span>
                          <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Amount : <span className="noBold">  {this.state.amount}</span></span>
                          <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Validity Period : <span className="noBold"> {this.state.validityPeriod} &nbsp;( {this.state.endsOn} )</span></span>
                       

                      </div>
                  </div>
                
                </div>
                 <div className="col-lg-3  col-md-12 col-sm-12 col-xs-12 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsOP">
                         <label className="orderSummaryHead"> Order Summary </label>
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  orderDetailsDiv">
                          <label>{this.state.offeringName}</label><label className="pull-right">{this.state.amount}</label>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                          <label>{this.state.noData}</label><label className="pull-right">{this.state.validityPeriod}</label>
                         </div>
                         </div>
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  orderDetailsDiv">
                          <label>{this.state.offeringName}</label><label className="pull-right">{this.state.amount}</label>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                          <label>{this.state.noData}</label><label className="pull-right">{this.state.validityPeriod}</label>
                         </div>
                         </div>
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  totalDiv noPadding">
                          <label>Total</label><label className="pull-right">{this.state.amount + this.state.amount}</label>
                        
                         </div>

                      </div>
                
                </div>
               
               
          
            </div>
    );
  }
}
