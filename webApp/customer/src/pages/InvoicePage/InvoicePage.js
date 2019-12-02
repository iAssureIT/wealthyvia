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
          companysettings : "",
          CurrentURL     : "",
          user_ID        : "",
          date           : "",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
    getDate() {
    var date = { currentTime: new Date().toLocaleString() };

    this.setState({
      date: Moment(new Date()).format("DD-MM-YYYY")
    });
  }
  componentDidMount(){
    CurrentURL = window.location.href;
     this.getDate();
    this.setState({
      CurrentURL : CurrentURL,
    })

     console.log("CurrentURL",CurrentURL);
     var user_ID = localStorage.getItem('user_ID')
     this.setState({
      user_ID : user_ID,
     })
     axios.get("/api/users/get/"+user_ID)
      .then((response)=>{ 
          this.setState({
              userinfo : response.data
          })

      })
      .catch((error)=>{
            console.log('error', error);
      })
     var hostname = window.location.hostname=='localhost'?'localhost:3001':window.location.hostname;
     console.log("user_ID",user_ID)
     var options = {
        amount            : (this.props.match.params.validityPeriod*100),  // amount in the smallest currency unit
        currency          : "INR",
        receipt           : "order_rcptid_11",
        payment_capture   : '0',
        "plan_ID"         : "",
        "userID"          : user_ID,
        "planName"        : "6 Months",
        "planAmount"      : 999, 
        "validityPeriod"  : "6 months", 
        "purchaseDate"    : Moment(new Date()).format("YYYY-MM-DD"),
        "startDate"       : Moment(new Date()).format("YYYY-MM-DD"),
        "endDate"         : "27-08-2020",
        "paymentOrderId"   : "",
        "amountPaid"      : 0,
    };  console.log("options",options);  
      axios
        .post('/api/subscriptionorders/post',options)
        .then((response)=>{ 
          console.log("response",response.data)
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
      /* get company settings value*/
      axios
        .get('/api/companysettings/list')
        .then((response)=>{ 
          console.log("response",response.data)
          this.setState({
            companysettings : response.data,
          })
          console.log("companysettings",this.state.companysettings);

          
        })
        .catch(function(error){
          console.log(error);
            if(error.message === "Request   failed with status code 401")
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
    /*var options = {
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
*/
  }

  render() {
    const loggedIn = localStorage.getItem("user_ID");
        if(this.props.match.params.validityPeriod == 999)
          {
          return (
           loggedIn ?
              
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                {this.state.companysettings && this.state.companysettings.length>0?
                <div className="col-lg-6 col-xs-6 companyDetails "><b> </b>{this.state.companysettings?this.state.companysettings[0].companyEmail:null}
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companywebsite:null}</div>
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companyaddress :null}</div>
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].state+" "+this.state.companysettings[0].country+" "+this.state.companysettings[0].pincode:null}</div>
                </div>
                :
                null
              }
                {
                this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right"/>
                  :
                  null
                }
              </div>
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                    {
                      this.state.userinfo
                      ?
                        <ul className="customUlIP col-lg-4 col-md-5 col-sm-6 col-xs-6">
                          <li><b>Billed to</b></li>
                          
                          <li>{this.state.userinfo.fullName}</li>
                          <li>{this.state.userinfo.email}</li>
                          <li>{this.state.userinfo.mobNumber}</li>
                        </ul>
                    :
                    null
                    }
                     <ul className="customUlIP col-lg-4  col-md-4 col-sm-3 col-xs-3">
                      <li><b>Order Number</b></li>
                      <li>{this.state.paymentDetails.id}</li>
                      <li><b>Date of Issue</b></li>
                      <li>{this.state.date}</li>
                    </ul>
                    <ul className="customUlIP col-lg-4  col-md-3 col-sm-3 col-xs-3">
                      <li className=" col-lg-12  col-md-12 col-sm-12 col-xs-12"><b className="pull-right">Invoice Total</b></li>
                      <li className="fs30 pull-right col-lg-12"><b className="pull-right"><i class="fa fa-rupee">&nbsp;</i>999</b></li>
                    </ul>
                </div>
                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 priceDivUP mt20">
                  <div className="col-lg-6  col-md-6 col-sm-6 col-xs-6 ">
                    <label className="Desc">Description</label><br/>
                    <label className="priceDivIP">6 Months Plan</label><br/>
                  </div>
                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                    <label className="Desc col-lg-12"><b className=" pull-right ">Amount</b></label><br/>
                    <label className=" priceDivIP col-lg-12"><b className=" pull-right "><i class="fa fa-rupee">&nbsp;</i> 999</b></label><br/>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                      <input type="hidden" name="callback_url" value="http://wealthyviaapi.com/api/subscriptionorders/payment-response"/>
                      <input type="hidden" name="cancel_url" value={CurrentURL}/>
                      <button className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                         Make Payment
                      </button>
                    </form>
                 </div>    
              </div>
            </div>
            :
            <div>
              {this.props.history.push("/login")}
            </div>
            
            );
        }else if(this.props.match.params.validityPeriod == 1499){
           return (
            loggedIn ?
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                {this.state.companysettings && this.state.companysettings.length>0?
                <div className="col-lg-6 col-xs-6 companyDetails "><b> </b>{this.state.companysettings?this.state.companysettings[0].companyEmail:null}
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companywebsite:null}</div>
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companyaddress :null}</div>
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].state+" "+this.state.companysettings[0].country+" "+this.state.companysettings[0].pincode:null}</div>
                </div>
                :
                null
              }
                {
                  this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right"/>
                  :
                  null
                }
              </div>
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                    {
                      this.state.userinfo
                      ?
                        <ul className="customUlIP col-lg-4 col-md-5 col-sm-6 col-xs-6">
                          <li><b>Billed to</b></li>
                          
                          <li>{this.state.userinfo.fullName}</li>
                          <li>{this.state.userinfo.email}</li>
                          <li>{this.state.userinfo.mobNumber}</li>
                        </ul>
                    :
                    null
                    }
                     <ul className="customUlIP col-lg-4  col-md-4 col-sm-3 col-xs-3">
                      <li><b>Order Number</b></li>
                      <li>{this.state.paymentDetails.id}</li>
                      <li><b>Date of Issue</b></li>
                      <li>{this.state.date}</li>
                    </ul>
                    <ul className="customUlIP col-lg-4  col-md-3 col-sm-3 col-xs-3">
                      <li className=" col-lg-12  col-md-12 col-sm-12 col-xs-12"><b className="pull-right">Invoice Total</b></li>
                      <li className="fs30 pull-right col-lg-12"><b className="pull-right"><i class="fa fa-rupee">&nbsp;</i>1499</b></li>
                    </ul>
                </div>
                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 priceDivUP mt20">
                  <div className="col-lg-6  col-md-6 col-sm-6 col-xs-6 ">
                    <label className="Desc">Description</label><br/>
                    <label className="priceDivIP">1 Year Plan</label><br/>
                  </div>
                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                    <label className="Desc col-lg-12"><b className=" pull-right ">Amount</b></label><br/>
                    <label className=" priceDivIP col-lg-12"><b className=" pull-right "><i class="fa fa-rupee">&nbsp;</i> 1499</b></label><br/>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                      <button className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                         Make Payment
                      </button>
                    </form>
                 </div>    
              </div>
            </div>
            :
            <div>
              {this.props.history.push("/login")}
            </div>
            
          );
        }else{
          return (
            loggedIn ?
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                {this.state.companysettings && this.state.companysettings.length>0?
                <div className="col-lg-6 col-xs-6 companyDetails "><b> </b>{this.state.companysettings?this.state.companysettings[0].companyEmail:null}
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companywebsite:null}</div>
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companyaddress :null}</div>
                  <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].state+" "+this.state.companysettings[0].country+" "+this.state.companysettings[0].pincode:null}</div>
                </div>
                :
                null
              }
                {
                  this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right"/>
                  :
                  null
                }
              </div>
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-sm-12 col-xs-12 PlanDetails">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                    {
                      this.state.userinfo
                      ?
                        <ul className="customUlIP col-lg-4 col-md-5 col-sm-6 col-xs-6">
                          <li><b>Billed to</b></li>
                          
                          <li>{this.state.userinfo.fullName}</li>
                          <li>{this.state.userinfo.email}</li>
                          <li>{this.state.userinfo.mobNumber}</li>
                        </ul>
                    :
                    null
                    }
                     <ul className="customUlIP col-lg-4  col-md-4 col-sm-3 col-xs-3">
                      <li><b>Order Number</b></li>
                      <li>{this.state.paymentDetails.id}</li>
                      <li><b>Date of Issue</b></li>
                      <li>{this.state.date}</li>
                    </ul>
                    <ul className="customUlIP col-lg-4  col-md-3 col-sm-3 col-xs-3">
                      <li className=" col-lg-12  col-md-12 col-sm-12 col-xs-12"><b className="pull-right">Invoice Total</b></li>
                      <li className="fs30 pull-right col-lg-12"><b className="pull-right"><i class="fa fa-rupee">&nbsp;</i>1999</b></li>
                    </ul>
                </div>
                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 priceDivUP mt20">
                  <div className="col-lg-6  col-md-6 col-sm-6 col-xs-6 ">
                    <label className="Desc">Description</label><br/>
                    <label className="priceDivIP">2 Year Plan</label><br/>
                  </div>
                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                    <label className="Desc col-lg-12"><b className=" pull-right ">Amount</b></label><br/>
                    <label className=" priceDivIP col-lg-12"><b className=" pull-right "><i class="fa fa-rupee">&nbsp;</i> 1999</b></label><br/>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-lg-offset-2  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                      <button className="col-lg-2 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                         Make Payment
                      </button>
                    </form>
                 </div>    
              </div>
            </div>
            :
            <div>
              {this.props.history.push("/login")}
            </div>
            
          );
        }
      
  }
}
