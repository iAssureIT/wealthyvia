import React  				 from 'react';
import axios                 from 'axios';
import swal                  from 'sweetalert';
export default class PaymentResponse extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		/*var paymentResponse = this.props.match.params;
		console.log("paymentResponse = ",paymentResponse);*/
		 axios
        .post('/api/subscriptionorders/payment-response')
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
		return (
			<div></div>
		);
	}
}
