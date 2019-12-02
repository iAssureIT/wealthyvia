import React, { Component }  from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
var CurrentURL="";
export default class OrderPayment extends Component {

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
              <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 selectedPlan noPadding">
                  <label> Payment Unsuccessful</label>
              </div>
          </div>
          )
         
        
  }
}
