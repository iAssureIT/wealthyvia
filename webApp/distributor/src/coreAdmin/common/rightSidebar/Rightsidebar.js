import React,{Component} from 'react';
import {BrowserRouter as Router,Link } from 'react-router-dom';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import './Rightsidebar.css';

export default class Rightsidebar extends Component{
	
	constructor(props) {
	 super(props);
		this.state = {

		}
	}
	 
	componentDidMount(){
								 
					}    
	
	render(){
		return(
			<Router>
				<div>
					<div className="sidebar-header">
						<h4>Admin Sidebar</h4>
					</div>
					<ul className="list-unstyled components">
						<li className="active">
							<span className="sideheader">Support Sidebar</span>
							<a href="/companysetting"> <i className="fa fa-cogs"></i><span className="sidebartext">Company Settings</span></a>
							<a href="/ViewTemplates" ><i className="fa fa-bell"></i><span className="sidebartext">Notification Management</span></a>
							<a href="/umlistofusers"><i className="fa fa-users"></i><span className="sidebartext"></span>User Management</a>
						</li>
					</ul>
				</div>
			</Router>
		);
	}
}