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
                        <li><a href="#">Offerings</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="/contact-us">Contact Us</a></li>
                        <li><a href="/about-us">About Us</a></li>
                      </ul>
                      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2  loginButton pull-right">
                        Log In
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
