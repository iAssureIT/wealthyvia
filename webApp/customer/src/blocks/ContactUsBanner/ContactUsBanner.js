import React from 'react';
import "./ContactUsBanner.css";

export default class ContactUsBanner extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
          	<div className="container-fluid nopadding cubannerWall" >
				
				<div className="col-lg-12 cucentered">
					<div className="col-lg-12 cutextcentered">
						<h1 className="fs72">Let's Plan a Project</h1>
					</div>
				</div>
			</div>
			
		);
	}
}
