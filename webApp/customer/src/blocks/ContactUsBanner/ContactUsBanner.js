import React from 'react';
import "./ContactUsBanner.css";

export default class ContactUsBanner extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
          	<div className="container-fluid nopadding cubannerWall">
				<div class="centered">Let's Plan a Project</div>
			</div>
		);
	}
}
