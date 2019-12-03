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
  /*   var myDate=new Date(2019,12,24,0,0,0).getTime();
      var day_milli= 1000*60*60*24;
      var newDate=new Date(myDate + day_milli * (6 -1));
      alert(newDate);*/
    this.setState({
      CurrentURL : CurrentURL,
    })
    // var calculate = parseInt(this.props.match.params.validityPeriod);
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
   
  }

  render() {
    const loggedIn = localStorage.getItem("user_ID");
        if(this.props.match.params.validityPeriod == 999)
          {
          return (
           loggedIn ?
              
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 logoContainerIP">
                {
                this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className=""/>
                  :
                  null
                }
                </div>
                <div className="col-lg-6 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 iconContainerIP">
                    <label className="col-lg-12 invoiceHead "><span className="pull-right">INVOICE</span></label>
                    <label className="col-lg-12 dateContain "><span className="pull-right">Date : <span className="noBold">{this.state.date}</span></span></label>
                    <label className="col-lg-12 dateContain "><span className="pull-right">Invoice No. : <span className="noBold">{this.state.paymentDetails.id}</span></span></label>

                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 userDetails noPadding">
                      {
                      this.state.userinfo
                      ?
                        <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <li className="userName">&nbsp;{this.state.userinfo.fullName}</li>
                          <li className="dateContain">&nbsp;{this.state.userinfo.email}</li>
                          <li className="dateContain">&nbsp;{this.state.userinfo.mobNumber}</li>
                        </ul>
                    :
                    null
                    }
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 paymentDetails">
                    <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <li className="PaymentContainer pull-right">Payment Method</li><br/>
                        <li className="dateContain "><span className="pull-right"><span className="noBold">Online Payment</span></span></li><br/>
                      </ul>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                  <table className="customTableIP col-lg-12">
                    <tr>
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th>PRICE</th>
                      <th>TOTAL</th>
                    </tr>
                    <tr >
                      <td className="customTableIPTD">6 Months Plan </td>
                      <td className="customTableIPTD">1</td>
                      <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{this.props.match.params.validityPeriod }</td>
                      <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{this.props.match.params.validityPeriod }</td>
                    </tr>
                   
                  </table>
                </div> 
                <div className=" col-lg-12 mt20 noPadding">
                  <ul className="customUlIPFeatures col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <li className="listStyleNone"><b>Features</b></li>
                      <li className="dateContain">Unlimited blogs for 6 months</li>
                      <li className="dateContain">Lastest blogs to read</li> 
                    </ul>
                    
                   <ul className="customUlIP col-lg-2 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
                      <li className="dateContain">Subtotal</li>
                      <li className="dateContain">Tax (18%)</li>
                      <li className="dateContain"><b>Grand Total</b></li>
                    </ul>
                    <ul className="customUlIP textAlignRight col-lg-2 col-md-12 col-sm-12 col-xs-12">
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;847</li>
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;152</li>
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;999</li>
                    </ul>
                </div>  
                {/*<div className="bottomDiv col-lg-12  noPadding">
                    <div className=" thankYouDiv col-lg-3 pull-right">
                      <label className="">THANK YOU !</label>
                    </div>
                </div>  */}
                <div className="bottomDiv col-lg-12  noPadding">
                    <div className="col-lg-8 col-lg-offset-4  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                            <input type="hidden" name="callback_url" value="http://api.wealthyvia.com/api/subscriptionorders/payment-response"/>
                            <input type="hidden" name="cancel_url" value={CurrentURL}/>
                            <button className="col-lg-4 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                               Make Payment
                            </button>
                          </form>
                       </div>    
                    </div>
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 receiptFooter ">
                        {this.state.companysettings && this.state.companysettings.length>0?
                
                           <label className="noBold">{this.state.companysettings?this.state.companysettings[0].companywebsite:null} - {this.state.companysettings?this.state.companysettings[0].companyaddress :null} </label>
                          :
                          null
                        }
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
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 logoContainerIP">
                {
                this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className=""/>
                  :
                  null
                }
                </div>
                <div className="col-lg-6 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 iconContainerIP">
                    <label className="col-lg-12 invoiceHead "><span className="pull-right">INVOICE</span></label>
                    <label className="col-lg-12 dateContain "><span className="pull-right">Date : <span className="noBold">{this.state.date}</span></span></label>
                    <label className="col-lg-12 dateContain "><span className="pull-right">Invoice No. : <span className="noBold">{this.state.paymentDetails.id}</span></span></label>

                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 userDetails noPadding">
                      {
                      this.state.userinfo
                      ?
                        <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <li className="userName">&nbsp;{this.state.userinfo.fullName}</li>
                          <li className="dateContain">&nbsp;{this.state.userinfo.email}</li>
                          <li className="dateContain">&nbsp;{this.state.userinfo.mobNumber}</li>
                        </ul>
                    :
                    null
                    }
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 paymentDetails">
                    <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <li className="PaymentContainer pull-right">Payment Method</li><br/>
                        <li className="dateContain "><span className="pull-right"><span className="noBold">Online Payment</span></span></li><br/>
                      </ul>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                  <table className="customTableIP col-lg-12">
                    <tr>
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th>PRICE</th>
                      <th>TOTAL</th>
                    </tr>
                    <tr >
                      <td className="customTableIPTD">1 Year Plan </td>
                      <td className="customTableIPTD">1</td>
                      <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{this.props.match.params.validityPeriod }</td>
                      <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{this.props.match.params.validityPeriod }</td>
                    </tr>
                   
                  </table>
                </div> 
                <div className=" col-lg-12 mt20 noPadding">
                  <ul className="customUlIPFeatures col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <li className="listStyleNone"><b>Features</b></li>
                      <li className="dateContain">Unlimited blogs for 1 year</li>
                      <li className="dateContain">Lastest blogs to read</li> 
                    </ul>
                    
                   <ul className="customUlIP col-lg-2 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
                      <li className="dateContain">Subtotal</li>
                      <li className="dateContain">Tax (18%)</li>
                      <li className="dateContain"><b>Grand Total</b></li>
                    </ul>
                    <ul className="customUlIP textAlignRight col-lg-2 col-md-12 col-sm-12 col-xs-12">
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;1270</li>
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;229</li>
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;1499</li>
                    </ul>
                </div>  
                {/*<div className="bottomDiv col-lg-12  noPadding">
                    <div className=" thankYouDiv col-lg-3 pull-right">
                      <label className="">THANK YOU !</label>
                    </div>
                </div>  */}
                <div className="bottomDiv col-lg-12  noPadding">
                    <div className="col-lg-8 col-lg-offset-4  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                            <input type="hidden" name="callback_url" value="http://api.wealthyvia.com/api/subscriptionorders/payment-response"/>
                            <input type="hidden" name="cancel_url" value={CurrentURL}/>
                            <button className="col-lg-4 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                               Make Payment
                            </button>
                          </form>
                       </div>    
                    </div>
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 receiptFooter ">
                        {this.state.companysettings && this.state.companysettings.length>0?
                
                           <label className="noBold">{this.state.companysettings?this.state.companysettings[0].companywebsite:null} - {this.state.companysettings?this.state.companysettings[0].companyaddress :null} </label>
                          :
                          null
                        }
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
             <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan">
                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 logoContainerIP">
                {
                this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className=""/>
                  :
                  null
                }
                </div>
                <div className="col-lg-6 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 iconContainerIP">
                    <label className="col-lg-12 invoiceHead "><span className="pull-right">INVOICE</span></label>
                    <label className="col-lg-12 dateContain "><span className="pull-right">Date : <span className="noBold">{this.state.date}</span></span></label>
                    <label className="col-lg-12 dateContain "><span className="pull-right">Invoice No. : <span className="noBold">{this.state.paymentDetails.id}</span></span></label>

                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 userDetails noPadding">
                      {
                      this.state.userinfo
                      ?
                        <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <li className="userName">&nbsp;{this.state.userinfo.fullName}</li>
                          <li className="dateContain">&nbsp;{this.state.userinfo.email}</li>
                          <li className="dateContain">&nbsp;{this.state.userinfo.mobNumber}</li>
                        </ul>
                    :
                    null
                    }
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 paymentDetails">
                    <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <li className="PaymentContainer pull-right">Payment Method</li><br/>
                        <li className="dateContain "><span className="pull-right"><span className="noBold">Online Payment</span></span></li><br/>
                      </ul>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                  <table className="customTableIP col-lg-12">
                    <tr>
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th>PRICE</th>
                      <th>TOTAL</th>
                    </tr>
                    <tr >
                      <td className="customTableIPTD">2 Year Plan </td>
                      <td className="customTableIPTD">1</td>
                      <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{this.props.match.params.validityPeriod }</td>
                      <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{this.props.match.params.validityPeriod }</td>
                    </tr>
                   
                  </table>
                </div> 
                <div className=" col-lg-12 mt20 noPadding">
                   <ul className="customUlIPFeatures col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <li className="listStyleNone"><b>Features</b></li>
                      <li className="dateContain">Unlimited blogs for two year</li>
                      <li className="dateContain">Lastest blogs to read</li> 
                    </ul>
                    
                   <ul className="customUlIP col-lg-2 col-lg-offset-3 col-md-12 col-sm-6 col-xs-6">
                      <li className="dateContain">Subtotal</li>
                      <li className="dateContain">Tax (18%)</li>
                      <li className="dateContain"><b>Grand Total</b></li>
                    </ul>
                    <ul className="customUlIP textAlignRight col-lg-2 col-md-12 col-sm-6 col-xs-6">
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;1694</li>
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;305</li>
                      <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;1999</li>
                    </ul>
                </div>  
                  
                {/*<div className="bottomDiv col-lg-12  noPadding">
                    <div className=" thankYouDiv col-lg-3 pull-right">
                      <label className="">THANK YOU !</label>
                    </div>
                </div>  */}
                <div className="bottomDiv col-lg-12  noPadding">
                    <div className="col-lg-8 col-lg-offset-4  col-md-12 col-sm-12 col-xs-12 btnContainer">
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
                            <input type="hidden" name="callback_url" value="http://api.wealthyvia.com/api/subscriptionorders/payment-response"/>
                            <input type="hidden" name="cancel_url" value={CurrentURL}/>
                            <button className="col-lg-4 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                               Make Payment
                            </button>
                          </form>
                       </div>    
                    </div>
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 receiptFooter ">
                        {this.state.companysettings && this.state.companysettings.length>0?
                
                           <label className="noBold">{this.state.companysettings?this.state.companysettings[0].companywebsite:null} - {this.state.companysettings?this.state.companysettings[0].companyaddress :null} </label>
                          :
                          null
                        }
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
