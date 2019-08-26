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
                {/*<div className="col-lg-3 col-md-2 col-sm-3 col-xs-3 ">
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 logoImageContainer ">
                    <img src="/images/logo.jpg" />
                  </div>
                </div>*/}
                <div className="col-lg-7 col-md-10 col-sm-12 col-xs-12 ">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                      <div className="row">
                        <nav className="navbar customClass  navText mt10 ">
                            <ul className="nav navbar-nav ">
                              <li className="active showActive"><a href="/">Products</a></li>
                              <li className="dropdown">
                               <label htmlFor="drop-4" className="toggle">Member Benefits</label>
                                    <a href="/blogview">Member Benefits</a>
                                    <input type="checkbox" id="drop-4"/>
                              </li>
                              <li>  
                                  <label htmlFor="drop-2" className="toggle">Resources</label>
                                  <a href="/services">Resources</a>
                                  <input type="checkbox" id="drop-2"/>
                                  <ul className="hello menu">
                                    <li> 
                                      <label htmlFor="drop-3" className="toggle">Fruits & Vegetables</label>
                                      {/*<a href="/">Fruits & Vegetables<i className="fa fa-angle-down" aria-hidden="true"></i></a><input type="checkbox" id="drop-3"/>*/}
                                    </li>
                                  </ul>
                                </li>
                              <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">ABOUT US</a>
                              </li>
                            
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorPurple ht50">
              </div>
              </div>
            </div>          
    );
  }
}
