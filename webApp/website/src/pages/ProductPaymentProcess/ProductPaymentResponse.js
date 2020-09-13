import React  				       from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import Moment                from 'moment';
import "./ProductPaymentResponse.css";
import Converter from 'number-to-words';

var CurrentURL="";

export default class ProdutctPaymentResponse extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      paymentDetails  : "",
      date            : "",
      orderDetails    : "",
      
    }
	}

	componentDidMount(){
		var order_id = this.props.match.params.orderId;
    CurrentURL = window.location.href;
    this.setState({
      date: Moment(new Date()).format("DD-MM-YYYY HH:MM:SS")
    }) 
		/* axios
        .get('/api/subscriptionorders/payment-response/'+order_id)
        .then((orderDetails)=>{ 
          console.log("orderDetails = ",orderDetails)
          this.setState({
            orderDetails : orderDetails.data,
          }) 
          // console.log("paymentDetails",this.state.paymentDetails);

        })
        .catch(function(error){
          console.log(error);
            if(error.message === "Request failed with status code 401")
            {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
            }
        })*/
        /* get orderDetails */
        axios
        .get('/api/offeringorders/paymentOrderDetails/'+order_id)
        .then((orderDetails)=>{ 
          console.log("orderDetails", orderDetails);
          this.setState({
            orderDetails : orderDetails.data,
          }) 

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
          this.setState({
            companysettings : response.data,
          })
          
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
  printContent(event){
    window.print();

  }

	render() {
    const loggedIn = localStorage.getItem("user_ID");
        
          return (
           loggedIn ?
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite suceesssection">
            {
                    this.state.orderDetails && 
                    this.state.orderDetails.paymentStatus == "Paid" ?
                    <label className="note mt20 col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 succesmsg"> Thank you for investing in Wealthyvia. Your payment is successful.</label>
                    :
                    null

                  }
              {
                this.state.orderDetails && 
                this.state.orderDetails.paymentStatus == "Failed" ?
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan failedsection">
                <label className="noteRed mt20"> Something went wrong!<br/> We are sorry, Your payment is unsuccessful.</label>
                  <div className="margintopad col-lg-12  noPadding">
                      <div className="col-lg-8 col-lg-offset-4  col-md-12 col-sm-12 col-xs-12 btnContainer">
                         <div>
                            <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                            
                              <input type="hidden" name="key_id" value="rzp_test_lQNmCUfCX3Wkh4"/>
                              <input type="hidden" name="order_id" value={this.state.orderDetails.paymentOrderId}/>
                              <input type="hidden" name="name" value="Wealthyvia"/>
                              <input type="hidden" name="description" value=""/>
                              <input type="hidden" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.png"/>
                              <input type="hidden" name="prefill[name]" value="Gaurav Kumar"/>
                              <input type="hidden" name="prefill[contact]" value="9123456780"/>
                              <input type="hidden" name="prefill[email]" value="gaurav.kumar@example.com"/>
                              <input type="hidden" name="notes[shipping address]" value="L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001"/>
                              <input type="hidden" name="callback_url" value={axios.defaults.baseURL+"/api/offeringorders/payment-response/"+this.state.orderDetails._id}/>
                              <input type="hidden" name="cancel_url" value={CurrentURL}/>
                              <button className="col-lg-4 pull-right col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint">
                                 Retry
                              </button>
                            </form>
                         </div>    
                      </div>
                  </div> 
                </div>
                :
              <div> 
              {
              this.state.orderDetails.paymentOrderId ?
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan successpaid">
                  <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
                  {
                  this.state.companysettings && this.state.companysettings.length>0?
                    <img src={this.state.companysettings[0].logoFilename} className=""/>
                    :
                    null
                  }
                  </div>
                  
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding ">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 iconContainerIP">
                       <h4 className="invoiceHead">Invoice From:</h4> 
                       <p className="paracontent">
                        PRITAM PRABODH DEUSKAR <br/>
                        D1 706, MAYUR KILBIL, DHANORI, <br/>
                        NEAR VITTHAL MANDIR, PUNE CITY, Pune, Maharashtra, 411015 </p>

                       <h5> GSTIN: 27ALFPD0936Q1ZU </h5>

                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 iconContainerIP mt20">                        
                        <h4></h4><label className="col-lg-12 dateContain "><span className="pull-right">Invoice No. : <span className="noBold">{this.state.orderDetails.invoiceNum}</span></span></label>
                        <label className="col-lg-12 dateContain "><span className="pull-right">Date : <span className="noBold">{this.state.date}</span></span></label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 userDetails noPadding">
                      <ul className="customUlIP col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                      <h4 className="invoiceHead">Invoice To: </h4>

                        <li className="userName">{this.state.orderDetails.userName}</li>
                        <p className="paracontent">{this.state.orderDetails.email}<br />
                        {this.state.orderDetails.mobileNumber}<br />
                        PAN: {this.state.orderDetails.panNumber}<br />
                        GSTIN: {this.state.orderDetails.gstNumber}<br />
                        State Name: {this.state.orderDetails.states}</p>
                      </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 paymentDetails">
                      
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                    <table className="customTableIP col-lg-12">
                      <tr>
                        <th><p style={{textAlign: 'left' }}>Description</p></th>
                        <th><p >Amount</p></th>
                      </tr>
                      <tr >
                        <td className="customTableIPTD">
                        <p style={{textAlign: 'left' }}>12 Months Subscription for Wealthyvia-{this.state.orderDetails.offeringTitle} <br/> 
                        {Moment().format("Do MMM, YYYY")} to {Moment().add(1, 'years').format("Do MMM, YYYY")}</p></td>
                        
                        <td className="customTableIPTD"><i class="fa fa-rupee">&nbsp;</i>{parseInt(((this.state.orderDetails.amountPaid)/100)/1.18).toLocaleString("en-IN")}</td>
                      </tr>
                     
                    </table>
                  </div> 
                  <div className=" col-lg-12 mt20 noPadding">
                    <ul className="customUlIPFeatures col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        
                      </ul>

                    {
                      this.state.states === 'Maharashtra' ?
                        <div> 
                         <ul className="customUlIP col-lg-2 col-lg-offset-3 col-md-12 col-sm-6 col-xs-6">
                            <li className="dateContain">Subtotal</li>
                            <li className="dateContain">CGST @ 9% </li>
                            <li className="dateContain">SGST @ 9% </li>
                            <li className="dateContain"><b>Amount Paid</b></li>
                          </ul>
                          <ul className="customUlIP textAlignRight col-lg-2 col-md-12 col-sm-6 col-xs-6">
                        
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{parseInt(((this.state.orderDetails.amountPaid)/100)/1.18).toLocaleString("en-IN")}</li>
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{(parseInt(((this.state.orderDetails.amountPaid)/100)/1.18)*0.09).toLocaleString("en-IN")}</li>
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{(parseInt(((this.state.orderDetails.amountPaid)/100)/1.18)*0.09).toLocaleString("en-IN")}</li>
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{parseInt((this.state.orderDetails.amountPaid/100)).toLocaleString("en-IN")}</li>
                          
                          </ul>
                        </div>
                      :
 
                       <div> 
                         <ul className="customUlIP col-lg-2 col-lg-offset-3 col-md-12 col-sm-6 col-xs-6">
                            <li className="dateContain">Subtotal</li>
                            <li className="dateContain">IGST @18%  </li>
                            <li className="dateContain"><b>Amount Paid</b></li>
                          </ul>
                          <ul className="customUlIP textAlignRight col-lg-2 col-md-12 col-sm-6 col-xs-6">
                        
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{parseInt(((this.state.orderDetails.amountPaid)/100)/1.18).toLocaleString("en-IN")}</li>
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{parseInt(parseInt((this.state.orderDetails.amountPaid/100)) - parseInt(((this.state.orderDetails.amountPaid)/100)/1.18)).toLocaleString("en-IN")}</li>
                            <li className="dateContain"><i class="fa fa-rupee"></i>&nbsp;{parseInt((this.state.orderDetails.amountPaid/100)).toLocaleString("en-IN")}</li>
                          
                          </ul>
                        </div>
                    }
                    <div className="margintopad col-lg-12  noPadding sentanceCase pull-right amountwords"> Total in words: {Converter.toWords(parseInt((this.state.orderDetails.amountPaid/100)))} only</div>
                  </div>
                  <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 btnContainer noPadding NoPrint mt20">                
                   <a href="/clientDashboard" style={{'color': '#fff'}}> <div className="col-lg-2  col-md-12 col-sm-12 col-xs-12 makePaymentButton mt20 " >
                       Back 
                    </div></a>
                     <div className="col-lg-2 pull-right  col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint mt20" onClick={this.printContent.bind(this)}>
                       Print
                    </div>
                  </div>    
                </div>
                :
                null 
              }
              </div>
            }
            </div>
          
            :
            <div>
              {this.props.history.push("/login")}
            </div> 
                     
          
          );
   {/*     
		  return (
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite ">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt100 outerBorder noPadding">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 selectedPlanPR">
                  {  
                    this.state.companysettings && this.state.companysettings.length >0?
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 companyDetails "><b> </b>{this.state.companysettings?this.state.companysettings[0].companyEmail:null}
                      <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companywebsite:null}</div>
                      <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companyaddress :null}</div>
                      <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].state+" "+this.state.companysettings[0].country+" "+this.state.companysettings[0].pincode:null}</div>
                    </div>
                    :
                    null
                  }
                    {
                      this.state.companysettings&& this.state.companysettings.length >0?
                        //<img src={this.state.companysettings[0].logoFilename} className="col-lg-5 col-md-5 col-sm-4 col-xs-4 pull-right"/>
                      <img src="/images/WealthyVia_Logo.png" className="col-lg-5 pull-right"/>

                      :
                      null
                    }
                
                </div>
                  <div className="col-lg-12">

                  {
                    this.state.orderDetails && 
                    this.state.orderDetails.paymentStatus == "Paid" ?
                    <label className="note mt20"> Thank you for investing in Wealthyvia. Your payment is successful.</label>
                    :
                    <label className="noteRed mt20"> Something went wrong</label>

                  }
                    {/*<label className="warning"> IMPORTANT: Please be aware that while you may receive a notification from your bank that your payment
                      amount has been debited from your bank account, the amount would be credited to your American Express
                      Card in the next 1-2 working days*.</label>
                  </div>
                  <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 PlanDetails mt20">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPadding ">
                        <ul className="customUlIP">
                          <li><b>Transaction Status</b></li>
                          <li><b>Transaction Number</b></li>
                          <li><b>Transaction Date</b></li>
                          <li><b>Name</b></li>
                          <li><b>Mobile Number</b></li>
                          <li><b>Email Id</b></li>
                          <li><b>Product Name</b></li>
                          <li><b>Amount Paid</b></li>
                          <li><b>Subscription Start Date</b></li>
                          <li><b>Subscription End Date</b></li>
                        </ul>                     
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPadding">
                      {this.state.orderDetails ?
                       <ul className="customUlIP">
                          {
                            this.state.orderDetails.paymentStatus == "Paid" ? 
                            <li className="successPay"><b>Success </b></li>
                            :
                            <li className="failPay"><b>Failed </b></li>
                          }

                          <li>{this.state.orderDetails.invoiceNum?this.state.orderDetails.invoiceNum :"-"}</li>
                          <li>{this.state.date}</li>
                          <li>{this.state.orderDetails.userName}</li>
                          <li>{this.state.orderDetails.mobileNumber}</li>
                          <li>{this.state.orderDetails.email}</li>
                          <li>{this.state.orderDetails.offeringTitle}</li>
                          <li><i className="fa fa-rupee">&nbsp;</i>{((this.state.orderDetails.amountPaid)/100).toLocaleString("en-IN")}</li>
                          <li>{this.state.orderDetails.createdAt ? Moment(this.state.orderDetails.createdAt).format("DD-MM-YYYY") : ''}</li>
                          <li>{this.state.orderDetails.createdAt ? Moment(this.state.orderDetails.createdAt).add(this.state.orderDetails.validityPeriod, 'months').format("DD-MM-YYYY") : ''}</li>
                        </ul>
                        :
                        null
                        }

                    </div>

                   </div>
                </div>
                 <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 btnContainer noPadding NoPrint">                
                    <div className="col-lg-2  col-md-12 col-sm-12 col-xs-12 makePaymentButton " >
                      <a href="/clientDashboard"> Back </a>
                    </div>
                     <div className="col-lg-2 pull-right  col-md-12 col-sm-12 col-xs-12 makePaymentButton NoPrint" onClick={this.printContent.bind(this)}>
                       Print
                    </div>
                  </div>  
              </div>
            </div>
         ) */}
	}
}
