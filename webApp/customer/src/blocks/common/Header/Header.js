import React, { Component } from 'react';
import $         from 'jquery';

import "./Header.css";

export default class Header extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
 
  } 

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorPurple">
                <div className="row">
                  <nav class="navbar marginZero customNavBar navbar-default">
                    <div class="container-fluid">
                      <div class="navbar-header">
                        <a class="navbar-brand webSiteName" href="/">Wealthyvia</a>
                      </div>
                      <ul class="nav navbar-nav customUl">
                        <li><a href="/">Home </a></li>
                         <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Services&nbsp;<i className="fa fa-angle-down"></i></a>
                            <ul className="dropdown-menu customDropdown col-lg-12">
                              <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Service 1</a>
                                 {/* <ul className="dropdown-submenu noStyle">
                                  <li><a href="#">Potato, Onion & Tomato</a></li>
                                  <li><a href="#">Cucumber & Capsicum</a></li>
                                  <li><a href="#">Root Vegetables</a></li>
                                  <li><a href="#">Cabbage & Cauliflower</a></li>
                                  <li><a href="#">Leafy Vegetables</a></li>
                                  <li><a href="#">Beans, Brinjals & Okra</a></li>
                                  <li><a href="#">Gourd, Pumpkin, Drumstick</a></li>
                                  <li><a href="#">Lemon, Ginger & Garlic</a></li>
                                </ul>*/}
                              </li>
                               <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Service 2</a>
                               
                              </li>
                              <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Service 3</a> 
                               
                              </li>
                            </ul>
                          </li>  
                          <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Offerings&nbsp;<i className="fa fa-angle-down"></i></a>
                            <ul className="dropdown-menu customDropdown col-lg-12">
                              <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">5GCPM Portfolio</a>
                                
                              </li>
                               <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Safe Heavan Stocks</a>
                               
                              </li>
                              <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Safe Heavan Stocks + Alpha</a> 
                               
                              </li>
                               <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Nifty Algo Tranding</a> 
                               
                              </li>
                              <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">USA Stocks Portfolio</a> 
                               
                              </li>
                               <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Unlisted Stocks</a> 
                               
                              </li>
                               <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 listItem"><a href="#" className="headLi">Multibagger</a> 
                               
                              </li>
                            </ul>
                          </li>
                     {/*   <li><a href="#">Offerings</a></li>
                        <li><a href="#">Services</a></li>*/}
                        <li><a href="#">Blogs</a></li>
                        <li><a href="/contact-us">Contact Us</a></li>
                        <li><a href="/about-us">About Us</a></li>
                      </ul>
                      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2  loginButton pull-right">
                        Login/Signup
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
              </div>
            </div>          
    );
  }
}
