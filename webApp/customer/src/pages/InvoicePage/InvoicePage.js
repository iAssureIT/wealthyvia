import React, { Component }  from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import Moment                from 'moment';

import "./InvoicePage.css";
var CurrentURL="";
export default class InvoicePage extends Component {

  constructor(props) {
    super(props);
        this.state = {
          paymentDetails : "",
          CurrentURL     : "",
          user_ID        : "",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
  componentDidMount(){
    CurrentURL = window.location.href;
    this.setState({
      CurrentURL : CurrentURL,
    })
     console.log("CurrentURL",CurrentURL);
     var user_ID = localStorage.getItem('user_ID')
     this.setState({
      user_ID : user_ID
     })
     var hostname = window.location.hostname=='localhost'?'localhost:3001':window.location.hostname;
     console.log("user_ID",user_ID)
     var options = {
        amount            : (this.props.match.params.validityPeriod*100),  // amount in the smallest currency unit
        currency          : "INR",
        receipt           : "order_rcptid_11",
        payment_capture   : '0',
        "plan_ID"         : "",
        "userID"          : "5d974178b6554854576501c2",
        "planName"        : "6 Months",
        "planAmount"      : 999, 
        "validityPeriod"  : "6 months", 
        "purchaseDate"    : Moment(new Date()).format("YYYY-MM-DD"),
        "startDate"       : Moment(new Date()).format("YYYY-MM-DD"),
        "endDate"         : "27-08-2020",
        "transactionId"   : "",
        "amountPaid"      : 0,
    };  console.log("options",options);  
      axios
        .post('/api/subscriptionorders/post',options)
        .then((response)=>{ 
          console.log("response",response)
          this.setState({
            paymentDetails : response.data,
          })
          console.log("paymentDetails",this.state.paymentDetails);

          // var formValues = {            
          //   key_id        : "rzp_test_lQNmCUfCX3Wkh4",
          //   order_id      : this.state.paymentDetails.id,
          //   name          : "Acme Corp",
          //   description   : "A Wild Sheep Chase",
          //   image         : "",
          //   name          : "Gaurav Kumar",
          //   contact       : "9123456780"
          //   email         : "gaurav.kumar@example.com",
          //   shipping_address  : "L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001",
          //   callback_url      : "http://localhost:3001/successPage",
          //   cancel_url        : {CurrentURL}       
          // };

          // axios.post('https://api.razorpay.com/v1/checkout/embedded', formValues)
          // .then((res)=>{

          // })
          // .catch(function(error){
          //   console.log(error);
          //     if(error.message === "Request failed with status code 401")
          //     {
          //        swal("Your session is expired! Please login again.","", "error");
          //        this.props.history.push("/");
          //     }
          // })

        })
        .catch(function(error){
          console.log(error);
            if(error.message === "Request failed with status code 401")
            {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
            }
        })

    
  }
  makePayment(event)
  {
    event.preventDefault();
    console.log("In makepayment")
    var options = {
        amount            : (this.props.match.params.validityPeriod*100),  // amount in the smallest currency unit
        currency          : "INR",
        receipt           : "order_rcptid_11",
        payment_capture   : '0',
        "plan_ID"         : "",
        "userID"          : "5d974178b6554854576501c2",
        "planName"        : "6 Months",
        "planAmount"      : 999, 
        "validityPeriod"  : "6 months", 
        "purchaseDate"    : Moment(new Date()).format("YYYY-MM-DD"),
        "startDate"       : Moment(new Date()).format("YYYY-MM-DD"),
        "endDate"         : "27-08-2020",
        "transactionId"   : "",
        "amountPaid"      : 0,
};
      axios
        .post('/api/subscriptionorders/post',options)
        .then((response)=>{ 
          console.log("response",response)
          this.setState({
            paymentDetails : response.data,
          })
          console.log("paymentDetails",this.state.paymentDetails);

        })
        .catch(function(error){
          console.log(error);
            if(error.message === "Request failed with status code 401")
            {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
            }
        })

  }

  render() {
    console.log("this.state.paymentDetails._id",this.state.paymentDetails.id);
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
                 <div>
                {/* <form action="http://localhost:3001/payment-response" method="POST">
                  <script
                      src="https://checkout.razorpay.com/v1/checkout.js"
                      data-key="rzp_test_lQNmCUfCX3Wkh4" // Enter the Key ID generated from the Dashboard
                      data-amount="99900" // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
                      data-currency="INR"
                      data-order_id={this.state.paymentDetails.id} //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order)
                      data-buttontext="Pay with Razorpay"
                      data-name="Acme Corp"
                      data-description="A Wild Sheep Chase is the third novel by Japanese author Haruki Murakami"
                     
                  ></script>
                  <input type="hidden" custom="Hidden Element" name="hidden"/>
                  </form>*/}
                    <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                    
                      <input type="hidden" name="key_id" value="rzp_test_lQNmCUfCX3Wkh4"/>
                      <input type="hidden" name="order_id" value={this.state.paymentDetails.id}/>
                      <input type="hidden" name="name" value="Acme Corp"/>
                      <input type="hidden" name="description" value="A Wild Sheep Chase"/>
                      <input type="hidden" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.png"/>
                      <input type="hidden" name="prefill[name]" value="Gaurav Kumar"/>
                      <input type="hidden" name="prefill[contact]" value="9123456780"/>
                      <input type="hidden" name="prefill[email]" value="gaurav.kumar@example.com"/>
                      <input type="hidden" name="notes[shipping address]" value="L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001"/>
                      <input type="hidden" name="callback_url" value="http://localhost:3006/api/subscriptionorders/payment-response"/>
                      <input type="hidden" name="cancel_url" value={CurrentURL}/>
                      <button className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton ">
                         Make Payment
                      </button>
                    </form>
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
                     
                <div className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton " onClick={this.makePayment.bind(this)}>
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
                     
                <div className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton " onClick={this.makePayment.bind(this)}>
                   Make Payment
                </div>
                </div>
            </div>
          );
        }
  }
}
