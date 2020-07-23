import React from 'react';
import "./ContactAddress.css";

export default class ContactAddress extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
          	<div className="container-fluid cuAddWall">
          		<div className="col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cuaBox1">
								<img className="caimg img-responsive" src="./images/picon.png" alt="Bannerpng"/>

								<h2>Production</h2>
								<p>Business standards services compliant.Users without extensible costs.</p>
								<b><p>Arthavruddhi@gmail.com</p></b>
							</div>

						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cuaBox1">
								<img className="caimg img-responsive" src="./images/user.png" alt="Bannerpng"/>

								<h2>Commercial</h2>
								<p>Business standards services compliant.Users without extensible costs.</p>
								<b><p>Arthavruddhi@gmail.com</p></b>
							</div>

						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cuaBox1">
								<img className="caimg img-responsive" src="./images/lpin.png" alt="Bannerpng"/>

								<h2>Our Office</h2>
								<p>Business standards services compliant.Users without extensible costs.</p>
								<b><p>Arthavruddhi@gmail.com</p></b>
							</div>

						</div>
					</div>

          		</div>
			</div>
		);
	}
}
