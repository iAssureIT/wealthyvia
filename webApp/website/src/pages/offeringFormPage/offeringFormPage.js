import React from 'react';
import OfferingForm      from "../../blocks/OfferingForm/OfferingForm.js";


export default class offeringFormPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container-fluid" style={{padding:"0px"}}>
        		<OfferingForm/>
			</div>
		);
	}
}
