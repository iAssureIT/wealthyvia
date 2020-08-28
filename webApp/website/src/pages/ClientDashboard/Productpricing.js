import React, { Component }  from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
import Moment                from 'moment';

import "./Productpricing.css";

export default class Productpricing extends Component {

  constructor(props) {
    super(props);
        this.state = {
            offeringList   : [],
            paymentDetails : "",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
     this.getofferings();
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
  }
  placeOrder(event){
    event.preventDefault();
    var planName         = event.currentTarget.getAttribute("data-planname");
    var price            = event.currentTarget.getAttribute("data-price");
    var pricewithgst     = parseInt(price) + parseInt(price * 0.18);
    console.log("pricewithgst", pricewithgst);
    var validityinmonths = event.currentTarget.getAttribute("data-validityinmonths");
     var options = {
        amount            : (pricewithgst * 100),  // amount in the smallest currency unit
        currency          : "INR",
        receipt           : "order_rcptid_11",
        payment_capture   : '0',
        "plan_ID"         : "",
        "userID"          : this.state.user_ID,
        "planName"        : planName,
        "planAmount"      : price, 
        "validityPeriod"  : validityinmonths, 
        "purchaseDate"    : Moment(new Date()).format("YYYY-MM-DD"),
        "startDate"       : Moment(new Date()).format("YYYY-MM-DD"),
        "endDate"         : "27-08-2020",
        "paymentOrderId"   : "",
        "amountPaid"      : 0,
    };   
      axios
        .post('/api/offeringorders/post',options)
        .then((response)=>{ 
          this.setState({
            paymentDetails : response.data,
          })
          this.props.history.push("/ProductinvoicePage/"+this.state.paymentDetails.id);
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

  getofferings(){
    axios.get('/api/offerings/get/all/list/1')
        .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
                offeringList : offerings.data,
            },()=>{
              console.log("of titlt", this.state.offeringList);
            })
        })
        .catch((error)=>{
            if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
        }
    });
  }


  render() {

    return (
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite PlanContainer ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 selectedPlanPP noPadding">
                    <label className="col-lg-12"> Select Product</label>
                </div>

                  {
                    this.state.offeringList.length > 0 ?
                    this.state.offeringList.map((a, i)=>{
                          return(
                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                              {
                                a.price ?
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsPlan">
                                     <label className="productName"> {a.offeringTitle}</label><br/>
                                     <label className="productPrice"> <i className="fa fa-rupee">&nbsp;</i>{a.price.toLocaleString("en-IN")}</label><br/>
                                     <button className="btn btn-primary buyNowPlan" data-planname={a.offeringTitle} data-price={a.price} data-validityinmonths="6" onClick={this.placeOrder.bind(this)}> Invest Now </button>
                                  </div> 
                                :
                                null
                              }                              
                            </div>                            
                          )
                        })
                    :
                    null
                  }
           
            </div>
    );
  }
}
