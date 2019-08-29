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
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <nav class="navbar marginZero customNavBar navbar-default">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navBar" aria-expanded="false" >
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand webSiteName" href="/">Wealthyvia</a>
                  </div>

                  <div class="collapse navbar-collapse" id="navBar">
                    <ul class="nav navbar-nav customUl">
                      <li class=""><a href="/">Home <span class="sr-only">(current)</span></a></li>
                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Services <span class="caret"></span></a>
                    
                      </li>
                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Offerings <span class="caret"></span></a>
                        <ul class="dropdown-menu customDropdown">
                          <li className="listItem"><a href="#">5GCPM Portfolio</a></li>
                          <li className="listItem"><a href="#">Safe Heavan Stocks</a></li>
                          <li className="listItem"><a href="#">Safe Heavan Stocks + Alpha</a></li>
                          <li className="listItem"><a href="#">Nifty Algo Tranding</a></li>
                          <li className="listItem"><a href="#">USA Stocks Portfolio</a></li>
                          <li className="listItem"><a href="#">Unlisted Stocks</a></li>
                          <li className="listItem"><a href="#">Multibagger</a></li>
                     
                        </ul>
                      </li>
                      <li class="dropdown">
                        <a href="#">Blogs </a>
                        
                      </li>
                       <li class="dropdown">
                        <a href="/contact-us" >Contact Us </a>
                        
                      </li>
                      <li class="dropdown">
                        <a href="/about-us" >About Us </a>
                        
                      </li>
                    </ul>
                
                    <ul class="nav navbar-nav navbar-right customUl">
                      <li class="dropdown">
                        <a href="/login">Login/Signup </a>
                       
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
          </div>
          
      </div>    
    );
  }
}
