import React, { Component }  from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import "./PaymentSuccess.css";
var CurrentURL="";
export default class PaymentSuccess extends Component {

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
    
  }

  render() {
     return (
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                    <div className="col-lg-6 col-xs-6 companyDetails "><b> </b>invest@wealthyvia.com
                      <div className=""><b></b>  www.wealthyvia.com</div>
                      <div className=""><b></b> Link Palace, Landmark , Goregaon East, Mumbai.400063</div>
                    </div>
                    <img src="/images/WealthyVia_Logo.png" className="col-lg-3 col-xs-3 pull-right"/>
                </div>
                <div className="col-lg-10 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                      <ul className="customUlIP col-lg-4">
                        <li><b>Billed to</b></li>
                        <li>Priyanka Lewade</li>
                        <li>priyankalewade96@gmail.com</li>
                        <li>820806599</li>
                      </ul>
                       <ul className="customUlIP col-lg-4">
                        <li><b>Order Number</b></li>
                        <li>{this.state.paymentDetails.id}</li>
                        <li><b>Date of Issue</b></li>
                        <li>{this.state.date}</li>
                      </ul>
                      <ul className="customUlIP col-lg-4 ">
                        <li className=" col-lg-12"><b className="pull-right">Invoice Total</b></li>
                        <li className="fs30 pull-right col-lg-12"><b className="pull-right"><i class="fa fa-rupee">&nbsp;</i>999</b></li>
                      </ul>
                  </div>
                  <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 priceDivUP mt20">
                    <div className="col-lg-6  col-md-12 col-sm-12 col-xs-12 ">
                      <label className="Desc">Description</label><br/>
                      <label className="priceDivIP">6 Months Plan</label><br/>
                    </div>
                     <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                      <label className="Desc col-lg-12"><b className=" pull-right ">Amount</b></label><br/>
                      <label className=" priceDivIP col-lg-12"><b className=" pull-right "><i class="fa fa-rupee">&nbsp;</i> 999</b></label><br/>
                    </div>
                  </div>
                  
                </div>
                <div className="col-lg-10 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                          <input type="hidden" name="callback_url" value="http://localhost:3005/api/subscriptionorders/payment-response"/>
                          <input type="hidden" name="cancel_url" value={CurrentURL}/>
                          <button className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton ">
                             Make Payment
                          </button>
                        </form>
                     </div>    
              
                  </div>
               
            </div>
         )
        
  }
}
