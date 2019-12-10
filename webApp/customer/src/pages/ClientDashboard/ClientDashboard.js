import React, { Component } 		     from 'react';
import DashboardHeader               from "../../blocks/DashboardHeader/DashboardHeader.js";
import SubscribedServices               from "../../blocks/SubscribedServices/SubscribedServices.js";


export default class ClientDashboard extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    };
  	}  
  	componentDidMount() {
  	
  	}  
	
  render() {
  	 const token = localStorage.getItem("user_ID");
    if(token){
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb50">
					<div className="row">
				    <DashboardHeader />
            <SubscribedServices />
					</div>
      </div>
		);
		  }else{
     this.props.history.push("/login");
      window.location.reload();
    }
	}
}
