import React, { Component }  from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import "./InvoicePage.css";
var CurrentURL="";
export default class InvoicePage extends Component {

  constructor(props) {
    super(props);
        this.state = {
          paymentDetails : "",
          CurrentURL     : "",
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
    
  }
  makePayment(event)
  {
    event.preventDefault();
    console.log("In makepayment")
    var options = {
        amount: 99900,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: '0'
      };
      axios
        .post('/api/offerings/post/payment',options)
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
                      <input type="hidden" name="callback_url" value="https://example.com/payment-callback"/>
                    <input type="hidden" name="cancel_url" value={CurrentURL}/>
                      <button>Submit</button>
                    </form>
                 </div>    
                <div className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton " onClick={this.makePayment.bind(this)}>
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
