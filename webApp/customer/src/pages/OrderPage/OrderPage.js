import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import Moment               from 'react-moment';

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
          orderResponse : "",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
  componentDidMount()
  {
         var user_ID = localStorage.getItem('user_ID')

      // String myDate = "2014/10/29 18:10:45";
      // SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
      // Date date = sdf.parse(myDate);
      // long millis = date.getTime();

    axios
        .get('/api/subscriptionorders/paymentOrderDetailsUser/'+user_ID)
        .then((orderResponse)=>{ 

          this.setState({
            orderResponse : orderResponse.data,
          })
        })
        .catch(function(error){
            if(error.message === "Request failed with status code 401")
            {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
            }
        })

  }


  render() {
    const loggedIn = localStorage.getItem("user_ID");
    return (
            loggedIn ?

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              {
                this.state.orderResponse.length>0 ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding  ">
                      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlanOP noPadding">
                          <label> My Orders</label>
                      </div>
                      <div className="col-lg-7 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 ">
                          <div className="row">
                          {
                            this.state.orderResponse && this.state.orderResponse.length>0 ?
                            this.state.orderResponse.map((data, index)=>{
                              return(
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsOP" key={index} >
                                <a href={"/invoicePageView/"+data.paymentOrderId}>
                                  <span className="centreDetaillistItemOP  col-lg-8  col-md-12 col-sm-12 col-xs-12">Order Number :<span className="noBold hoverEffect"> {data.paymentOrderId}</span></span>
                                  <span className="centreDetaillistItemOP col-lg-4  col-md-12 col-sm-12 col-xs-12"><span className="pull-right">Date : <span className="noBold">   <Moment format="DD/MM/YYYY">{data.createdAt}</Moment></span></span></span>
                                  <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Plan Name :<span className="noBold">  {data.planName}</span></span>
                                  <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Amount : <span className="noBold"> <i class="fa fa-rupee">&nbsp;</i> {(data.amountPaid)/100}</span></span>
                                  <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Validity Period : <span className="noBold">{data.planName} &nbsp;( {this.state.endsOn} )</span></span>
                                </a>
                                </div>
                            )
                            })
                            :
                            null
                          }
                           {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsOP">
                               
                                <span className="centreDetaillistItemOP col-lg-6  col-md-12 col-sm-12 col-xs-12">Order Number :<span className="noBold"> {this.state.orderNumber}</span></span>
                                <span className="centreDetaillistItemOP col-lg-6  col-md-12 col-sm-12 col-xs-12"><span className="pull-right">Date : <span className="noBold">  {this.state.date}</span></span></span>
                                <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Plan Name :<span className="noBold">  {this.state.planName}</span></span>
                                <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Amount : <span className="noBold">  {this.state.amount}</span></span>
                                <span className="centreDetaillistItemOP col-lg-12  col-md-12 col-sm-12 col-xs-12">Validity Period : <span className="noBold"> {this.state.validityPeriod} &nbsp;( {this.state.endsOn} )</span></span>
                             

                            </div>*/}
                      </div>
                      
                      </div>
                       {/*<div className="col-lg-3  col-md-12 col-sm-12 col-xs-12 ">
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
                      
                      </div>*/}
                    </div>
                    :
                    <div className="selectedPlanNoOrders"><label>No orders yet!</label></div>
                  }
            </div>
             :
            <div>
              {this.props.history.push("/login")}
            </div>
            
    );
  }
}
