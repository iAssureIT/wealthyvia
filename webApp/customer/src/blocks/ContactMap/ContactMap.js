import React from 'react';
import "./ContactMap.css";

export default class ContactMap extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
          	<div className="cuMapWall">
          		<div class="mapouter">
          			<div class="gmap_canvas">
          				<iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=Arthavruddhi%20Capital%20Sugam%20Bungalow%20near%20income%20tax%20office%20and%20sahastrabuddhe%20bungalow%2C%20Prabhat%20Rd%2C%20Deccan%20Gymkhana%2C%20Pune%2C%20Maharashtra%20411004&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          				<a href="https://www.emojilib.com">emojilib.com</a>
          			</div>
          		</div>	
			</div>
		);
	}
}
