import React  				       from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import Moment                from 'moment';
import "./ProductPaymentResponse.css";

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
                      Card in the next 1-2 working days*.</label>*/}
                  </div>
                  <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 PlanDetails mt20">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPadding ">
                        <ul className="customUlIP">
                          <li><b>Transaction Status</b></li>
                          <li><b>Transaction Number</b></li>
                          <li><b>Transaction Date</b></li>
                          <li><b>name</b></li>
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
         )
	}
}
