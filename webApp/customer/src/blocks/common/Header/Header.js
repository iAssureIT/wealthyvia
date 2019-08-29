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
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <nav class="navbar marginZero customNavBar backColorWhite colorP navbar-default  hidden-xs hidden-sm">
                <div class="container-fluid">
                  <div class="navbar-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <a class="navbar-brand webSiteName colorP col-lg-1 col-md-1 col-sm-1 col-xs-1" href="/">Wealthyvia</a>
                  <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11"> <a className="navbar-brand colorP pull-right">The Value we create : Profound.Profuse.Precise. </a></div>
                  </div>

                 
                </div>
              </nav>
          </div>
          
      </div>    
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <nav class="navbar marginZero customNavBar navbar-default">
                <div class="container-fluid">
                  <div class="navbar-header">
                                      <a class="navbar-brand webSiteName colorWhite hidden-lg hidden-md col-lg-1 col-md-1 col-sm-1 col-xs-1" href="/">Wealthyvia</a>

                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navBar" aria-expanded="false" >
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
{/*                    <a class="navbar-brand webSiteName" href="/">Wealthyvia</a>
*/}                  </div>

                  <div class="collapse navbar-collapse" id="navBar">
                    <ul class="nav navbar-nav navbar-right customUl">

                      <li class="dropdown">
                        <a href="#">Blogs </a>
                        
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
                        <a href="/about-us" >About Us </a>
                        
                      </li>
                      <li class="dropdown">
                        <a href="/login">Login/Signup </a>
                       
                      </li>
                    </ul>
                
                   
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
