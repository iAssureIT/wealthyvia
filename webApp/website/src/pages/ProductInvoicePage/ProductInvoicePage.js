import React, { Component }  from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import Moment                from 'moment';
import Converter from 'number-to-words';

import "./ProductInvoicePage.css";
var CurrentURL="";
export default class ProductInvoicePage extends Component {

  constructor(props) {
    super(props);
        this.state = {
          paymentDetails : "", 
          orderDetails : "",
          companysettings : "",
          CurrentURL     : "",
          user_ID        : "",
          date           : "",
          panNumber      : "",
          gstNumber      : "",
          key_id         : ""
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
    getDate() {

    this.setState({
      date: Moment(new Date()).format("DD-MM-YYYY")
    });
  }
  componentDidMount(){
    var order_id = this.props.match.params.order_id;
    CurrentURL = window.location.href;
    this.getDate();
    this.getPGData();

    this.setState({
      CurrentURL : CurrentURL,
    })

    var user_ID = localStorage.getItem("user_ID");
    axios.get("/api/users/get/kycrisk/user/"+user_ID)
      .then((response)=>{ 
        var userinfo = response.data;
              
          if(userinfo){           
            this.setState({
              panNumber: userinfo.panNumber,
              gstNumber : userinfo.gstNumber,
              city      : userinfo.city,
              states    : userinfo.states,
              dob       : userinfo.dob,
            })
          }        
      })
      .catch((error)=>{
            console.log('error', error);
      })

    axios
      .get('/api/companysettings/list')
      .then((response)=>{ 
        this.setState({
          companysettings : response.data,
        },()=>{
        })
      })
      .catch(function(error){
          if(error.message === "Request failed with status code 401"){
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
          }
      })

       /* get orderDetails */
      axios
      .get('/api/offeringorders/paymentOrderDetails/'+order_id)
      .then((orderDetails)=>{ 
        this.setState({
          orderDetails : orderDetails.data,
        }) 
        //console.log("orderDetails",orderDetails.data);
      })
      .catch(function(error){
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
   
  }

  getPGData(){
    var type = 'PG';
    axios.get('/api/projectsettings/get/'+type)
            .then((response) => {
              
              if(response.data.message === "DATA_NOT_FOUND"){

              }              
              else if(response.data){
                if(response.data.environment == 'sandbox'){
                  var key_id = response.data.sandboxKey;
                }
                else{
                  var key_id = response.data.prodKey;
                }
                this.setState({
                  key_id : key_id
                });
              }             
                
            })
            .catch((error) => {});
  }

  render() {
    const loggedIn = localStorage.getItem("user_ID");
        
          return (
           loggedIn ?
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite  ">
              {
              this.state.orderDetails.paymentOrderId ?
                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan">
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
                        PAN: {this.state.panNumber}<br />
                        GSTIN: {this.state.gstNumber}<br />
                        State Name: {this.state.states}</p>
                      </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 paymentDetails">
                      
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding mt20">
                    <table className="customTableIP col-lg-12">
                      <tr>
                        <th><p style={{textAlign: 'left' }}>Description</p></th>
                        <th>Amount</th>
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
                            <li className="dateContain"><b>Grand Total</b></li>
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
                            <li className="dateContain"><b>Grand Total</b></li>
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
                  {/*<div className="bottomDiv col-lg-12  noPadding">https://clockify.me/tracker
                      <div className=" thankYouDiv col-lg-3 pull-right">
                        <label className="">THANK YOU !</label>
                      </div>
                  </div>  */}
                  <div className="margintopad col-lg-12  noPadding">
                      <div className="col-lg-8 col-lg-offset-4  col-md-12 col-sm-12 col-xs-12 btnContainer">
                         <div>
                            <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                            
                              <input type="hidden" name="key_id" value={this.state.key_id} />
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
                                 Make Payment
                              </button>
                            </form>
                         </div>    
                      </div>
                  </div> 
                  {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 receiptFooter ">
                          {this.state.companysettings && this.state.companysettings.length>0?
                  
                             <label className="noBold">{this.state.companysettings?this.state.companysettings[0].companywebsite:null} - {this.state.companysettings?this.state.companysettings[0].companyaddress :null} </label>
                            :
                            null
                          }
                      </div>*/}
                </div>
              :
              <div className="loadingImageContainer col-lg-4 col-lg-offset-4"><img src="/images/Loadingsome.gif"/></div>
              }
            </div>
            :
            <div>
              {this.props.history.push("/login")}
            </div>
            
            );
        
      
  }
}
