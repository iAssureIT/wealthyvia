import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import Header from '../header/Header.js'

import './Leftsidebar.css';

export default class Leftsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
  componentDidMount(){
             //     $(document).ready(function () {
             //     $('#sidebarCollapse').on('click', function () {
             //         $('#sidebar').toggleClass('active');
             //     });
             // });
  }  
  
  eventclk(event){
    event.preventDefault();
    $(event.currentTarget).addClass('active');
    $(event.currentTarget).siblings('li').removeClass('active');
    // $(event.currentTarget).siblings('li').children('.treeview-menu').toggle();

  }

  eventclk1(event){
    event.preventDefault();
    $(event.currentTarget).children('.treeview-menu').toggle();
    $(event.currentTarget).addClass('active');
    $(event.currentTarget).siblings('li').removeClass('active');
    // $(event.currentTarget).siblings('li').children('.treeview-menu').toggle();

  }  

  clickLiTree(event){
    event.preventDefault();
    $(event.target).parent().addClass('activeLi');
    var checkli = $(event.target).parent().siblings('li').removeClass('activeLi');
  }

  clickTree(event){
      event.preventDefault();
      console.log('$(event.currentTarget)',$(event.currentTarget));
      $(event.currentTarget).addClass('activetree');
      $(event.currentTarget).siblings('li').removeClass('activetree');
      $(event.currentTarget).siblings('li').removeClass('menu-open');
      $(event.currentTarget).siblings('li').children('.treeview-menu').css('display','none');
      $(event.currentTarget).siblings('li').children('.treeview-menu').children().removeClass('activeLi');
  }  
  

  render(){
    return(
    <div>
            <aside className="leftsidebar">
            <div className="wrapper">
              <nav id="sidebar">
                <div className="sidebar-header">
                    <img id="imgSidebar" className="" src="/images/WealthyVia_Logo.png" alt="Logo_img" height="40%" width="90%"/>
                </div>
                <ul className="list-unstyled components">
                    <li className="add active" onClick={this.eventclk.bind(this)}>
                      <Link to="/dashboard">
                        <i className="glyphicon glyphicon-briefcase"></i>
                          Admin Dashboard
                      </Link>
                    </li>
                    {/*<li className="add " onClick={this.eventclk.bind(this)}>
                      <Link to="/addWorkspace"  aria-expanded="false">
                        <i className="fa fa-file"></i>
                          Workspace Management
                      </Link>
                    </li>*/}
                     {/* <li  className="add"  onClick={this.eventclk1.bind(this)} >
                        <Link aria-expanded="false" to="/statement">
                            <i className="fa fa-file"></i>
                            Statements
                        </Link>
                        
                    </li>*/}
                   <li  className="add " onClick={this.eventclk1.bind(this)}>
                        <Link aria-expanded="false">
                            <i className="fa fa-file"></i>
                            Statements
                        </Link>
                        <ul className="collapse list-unstyled treeview-menu" id="submenu1">
                            <li><Link to="/statement"><i className="fa fa-database"></i>List of Users</Link></li>
{/*                            <li><Link to="/uploadStatement"><i className="fa fa-database"></i>Bulk Upload</Link></li>
*/}                           
                        </ul>
                    </li>
                    <li  className="add " onClick={this.eventclk1.bind(this)}>
                        <Link aria-expanded="false" to="/ClientTable">
                            <i className="fa fa-file"></i>
                            List Of Subscribed User
                        </Link>
                      
                    </li>
                     <li  className="add " onClick={this.eventclk1.bind(this)}>
                        <Link aria-expanded="false">
                            <i className="fa fa-file"></i>
                            Blog
                        </Link>
                        <ul className="collapse list-unstyled treeview-menu" id="submenu1">
                            <li><Link to="/blogsform"><i className="fa fa-database"></i>Create Blog</Link></li>
                            <li><Link to="/allblogs"><i className="fa fa-database"></i>All Blogs</Link></li>
                            {/*<li><Link to="/cafeWiseCheckOut"><i className="fa fa-database"></i>CafeWise Check-Out Report</Link></li>
                            <li><Link to="/settlementReportSummary"><i className="fa fa-database"></i>Settlement Report</Link></li>*/}
                        </ul>
                    </li>

                    <li  className="add " onClick={this.eventclk1.bind(this)}>
                        <Link aria-expanded="false">
                            <i className="fa fa-file"></i>
                            Product Chart
                        </Link>
                        <ul className="collapse list-unstyled treeview-menu" id="submenu1">
                            <li><Link to="/productchart"><i className="fa fa-file"></i>Product Charts</Link></li>
                            <li><Link to="/filewiseproductrates"><i className="fa fa-file"></i>Filewise Product rates</Link></li>
                            {/*<li><Link to="/cafeWiseCheckOut"><i className="fa fa-database"></i>CafeWise Check-Out Report</Link></li>
                            <li><Link to="/settlementReportSummary"><i className="fa fa-database"></i>Settlement Report</Link></li>*/}
                        </ul>
                    </li>

                    {/*<li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/productchart">
                        <i className="fa fa-file"></i>
                          Product Charts
                      </Link>
                    </li>

                    <li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/filewiseproductrates">
                        <i className="fa fa-file"></i>
                          Filewise Product rates
                      </Link>
                    </li>*/}

                    <li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/free-research-reports">
                        <i className="fa fa-file"></i>
                          Free Research Report
                      </Link>
                    </li>

                    <li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/new-distributor-list">
                        <i className="fa fa-file"></i>
                          Referrer List
                      </Link>
                    </li>

                    <li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/clientlist">
                        <i className="fa fa-file"></i>
                          Client List
                      </Link>
                    </li>

                    <li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/tools">
                        <i className="fa fa-file"></i>
                          Tools Management
                      </Link>
                    </li>  

                    <li className="add" onClick={this.eventclk.bind(this)}>
                      <Link to="/product-pricing">
                        <i className="fa fa-file"></i>
                          Product Pricing
                      </Link>
                    </li>                   
                                 
                </ul>


              </nav>
        </div>
 
            </aside>
      </div>
    );
  }
}
