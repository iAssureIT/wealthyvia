import React from 'react';

export default class PaymentResponse extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		var paymentResponse = this.props.match.params;
		console.log("paymentResponse = ",paymentResponse);
	}

	render() {
		return (
			<div></div>
		);
	}
}
