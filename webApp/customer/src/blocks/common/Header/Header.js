import React, { Component } from 'react';
import $         from 'jquery';
import "./Header.css";
import axios                from 'axios';
axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default class Header extends Component {

  constructor(props) {
    super(props);
        this.state = {
                          "userinfo" : {},

        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
 logout(){
    // console.log('local', localStorage.setItem('admin_ID', ""))
    var token = localStorage.setItem('admin_ID', "")
    // console.log('token', token);
      if(token!==null){
      // console.log("Header Token = ",token);
      // browserHistory.push("/login");
      // this.props.history.push("/");
    }
  }
  getData(){
        const userid = localStorage.getItem('admin_ID');
        axios.get("/api/users/"+userid)
          .then((response)=>{ 
              this.setState({
                  userinfo : response.data
              })
          })
          .catch((error)=>{
                console.log('error', error);
          })

        axios.get("/api/carts/get/count/"+userid)
          .then((response)=>{ 
              this.setState({
                  count : response.data
              })
              // this.props.redirectToPropertyDetails(response.data)
          })
          .catch((error)=>{
                console.log('error', error);
          })
    }

  componentDidMount()
  {

  } 

  render() {
        const token = localStorage.getItem("admin_ID");
        console.log("token",this.state.userinfo);


    return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 h1zindex">
          <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <nav class="navbar marginZero customNavBarUpper backColorWhite colorP navbar-default  hidden-xs hidden-sm">
                <div class="container-fluid">
                  <div class="navbar-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <a class="navbar-brand webSiteName colorP col-lg-4 col-md-4 col-sm-4 col-xs-4" href="/">Wealthyvia</a>
                  <div className="col-lg-5 col-md-8 col-sm-8 col-xs-8"> <a className="navbar-brand colorP">The Value we create : Profound.Profuse.Precise. </a></div>
                  <div className="col-lg-3 col-md-10 col-mg-offset-1 col-sm-10 col-xs-12 iconContainerHeader">
                    <div className="row">
                    
                      <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right">
{/*                        <i class="fa fa-linkedin" aria-hidden="true"></i>
*/}
                            <img src="/images/linkedin1.png"/>
                      </div> 
                      <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook pull-right">
                       {/* <i class="fa fa-pinterest"></i>*/}
                         <img src="/images/facebook.png"/>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right ">
                       {/* <i class="fa fa-instagram" aria-hidden="true"></i>*/}
                        <img src="/images/twitter.png"/>


                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right">
                       {/* <i class="fa fa-twitter" aria-hidden="true"></i>*/}
                         <img src="/images/snapchat.png"/>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right">
                        {/*<i class="fa fa-snapchat" aria-hidden="true"></i>*/}
                        <img src="/images/instagram.png"/>


                      </div>
                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right ">
                         <img src="/images/pinterest.png"/>
                      </div>
                    </div>
                  </div>
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
                    <a class="navbar-brand webSiteNameOther colorWhite hidden-lg hidden-md col-lg-1 col-md-1 col-sm-1 col-xs-1" href="/">Wealthyvia</a>

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

                      
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Articulations <span class="caret"></span>
                          </a>                       
                          <ul class="dropdown-menu customDropdown">
                           {token ?
                          <a href="/allblogs">Arthavrudhhi Blogs</a>
                              :
                                <a href="/login">Arthavrudhhi Blogs</a>
                            }
                               <a href="">Communique</a>
                           
                        </ul>
                      </li>
                       <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Offerings <span class="caret"></span>
                          </a>
                          <ul class="dropdown-menu customDropdown" aria-labelledby="navbarDropdownMenuLink">
                            <a  className="dropdown-item" href="/#5gcpm">5GCPM Portfolio</a>
                            <a className="dropdown-item" href="/#safeHevenMoats">Safe Heavan Stocks</a>
                            <a className="dropdown-item" href="/#safeHeven">Safe Heavan Stocks + Alpha</a>
                            <a className="dropdown-item" href="#">Nifty Algo Tranding</a>
                            <a className="dropdown-item" href="/#unlistedPre">USA Stocks Portfolio</a>
                            <a className="dropdown-item" href="/#uslistedStocks">Unlisted Stocks</a>
                            <a className="dropdown-item" href="#">Multibagger</a>
                          </ul>
                        </li>
                      {/* <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Offerings <span class="caret"></span></a>
                        <ul class="dropdown-menu customDropdown">
                          <li className="listItem"><a href="/#5gcpm">5GCPM Portfolio</a></li>
                          <li className="listItem"><a href="/#safeHevenMoats">Safe Heavan Stocks</a></li>
                          <li className="listItem"><a href="/#safeHeven">Safe Heavan Stocks + Alpha</a></li>
                          <li className="listItem"><a href="#">Nifty Algo Tranding</a></li>
                          <li className="listItem"><a href="/#unlistedPre">USA Stocks Portfolio</a></li>
                          <li className="listItem"><a href="/#uslistedStocks">Unlisted Stocks</a></li>
                          <li className="listItem"><a href="/#uslistedStocks">Multibagger</a></li>
                     
                        </ul>
                      </li>
                     */}
                      <li class="dropdown">
                        <a href="/about-us" >About Us </a>
                        
                      </li>
                      <li class="dropdown">
                      {token ?
                        <a  onClick={this.logout.bind(this)}>{this.state.userinfo && this.state.userinfo.profile ? this.state.userinfo.profile.firstName:"Login/Signup"}</a>
                        :
                        <a href="/login">Login/Signup </a>
                      }
                       
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
