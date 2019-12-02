import React  				       from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import Moment                from 'moment';
import "./PaymentResponse.css";

var CurrentURL="";

export default class PaymentResponse extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      paymentDetails  : "",
      date            : "",
    }
	}

	componentDidMount(){
		var order_id = this.props.match.params.order_id;
		console.log("order_id = ",order_id);
    CurrentURL = window.location.href;
    this.setState({
      date: Moment(new Date()).format("DD-MM-YYYY")
    }) 
		 axios
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
  printContent(event){
    window.print();

  }

	render() {
		  return (
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite ">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt100 outerBorder noPadding">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 selectedPlanPR">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 companyDetails "><b> </b>{this.state.companysettings?this.state.companysettings[0].companyEmail:null}
                      <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companywebsite:null}</div>
                      <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].companyaddress :null}</div>
                      <div className=""><b></b>{this.state.companysettings?this.state.companysettings[0].state+" "+this.state.companysettings[0].country+" "+this.state.companysettings[0].pincode:null}</div>
                    </div>
                    {
                      this.state.companysettings?
                        <img src={this.state.companysettings[0].logoFilename} className="col-lg-5 col-md-5 col-sm-4 col-xs-4 pull-right"/>
                      :
                      null
                    }
                
                </div>
                  <div className="col-lg-12">
                    <label className="note mt20"> Thank you for your payment.</label>
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
                          <li><b>Amount</b></li>
                          <li><b>Paid From</b></li>
                         
                        </ul>                     
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPadding">
                       <ul className="customUlIP">
                          <li className="successPay"><b>Success</b></li>
                          <li>AVS10930BB</li>
                          <li>{this.state.date}</li>
                          <li>Priyanka Lewade</li>
                          <li>8208066599</li>
                          <li>priyankalewade96@gmail.com</li>
                          <li>999</li>
                          <li>SBI</li>
                         
                        </ul>        
                    </div>

                   </div>
                </div>
                 <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 btnContainer noPadding NoPrint">                
                    <div className="col-lg-2  col-md-12 col-sm-12 col-xs-12 makePaymentButton " >
                       Back
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
