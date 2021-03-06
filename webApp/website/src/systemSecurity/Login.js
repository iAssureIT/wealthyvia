import React, { Component } from 'react';
import { Link}              from 'react-router-dom';
import swal                 from 'sweetalert';
import $                    from "jquery";
import queryString          from "query-string";

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

import axios from 'axios';

class Login extends Component {

  constructor(){
      super();
        this.state = {
          destination: "",           
          userStatus: "",           
          loggedIn : false,
          auth: {
                email           : '',
                pwd             : '',
            }
        }
  }

  componentDidMount(){
    const parsed = queryString.parse(this.props.location.search);
    this.setState({destination : parsed.destination});
     
  }

  userlogin(event){
    event.preventDefault();    
    var auth= {
      email       : this.refs.loginusername.value,
      password    : this.refs.loginpassword.value,
    }


    axios
      .post('/api/users/post/login',auth)
      .then((response)=> {
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("user_ID",response.data.ID);   
          // console.log("destination,st",this.state.destination);
          var userid = response.data.ID;
          if(this.state.destination){
            var blgdestination = this.state.destination;
            var blogurlarr = blgdestination.split("/");
            var id = blogurlarr[2];
            if(id){
              axios
              .get('/api/blogs/get/'+id)
              .then((response)=>{
                var blogtype = response.data.typeOfBlog;
                var blogtype = response.data.typeOfBlog;
                if(blogtype == "Premium"){
                    axios
                    .get('/api/subscriptionorders/paymentOrderDetailsUser/'+userid)
                    .then((userStatus)=>{
                      // console.log("userStatus.data",userStatus.data)
                      if(userStatus.data.length>0)
                      {
                        if(userStatus.data[0].paymentStatus === "Paid" )
                        {
                            this.props.history.push(this.state.destination);            
                            window.location.reload();                 
                         }else{
                            this.props.history.push("/planPage");
                       }
                      }else{
                          // this.props.history.push(this.state.destination);
                          this.props.history.push("/planPage");
                          window.location.reload();                 
                      }
                      })
                    .catch(function(error){
                      console.log(error);
                        if(error.message === "Request failed with status code 401")
                            {
                                 swal("Your session is expired! Please login again.","", "error");
                                 this.props.history.push("/");
                            }
                    })
                }
                else{
                    this.props.history.push(this.state.destination); 
                    window.location.reload();  
                }
                
              })
              .catch(function(error){
                  if(error.message === "Request failed with status code 401")
                      {
                        swal("Your session is expired! Please login again.","", "error");
                      }
              })
              
            }
              
          }else{ 
            if( localStorage.getItem("lastUrl")){
               // this.props.history.push(localStorage.getItem("lastUrl"));
               this.props.history.push("clientDashboard");
                window.location.reload();
            }else{
              this.props.history.push("/login");
              window.location.reload();
            }            
          } 
      })
      .catch(function (error) {
          console.log(error);
        if(localStorage!==null){
          swal("Invalid Email or Password","Please Enter valid email and password");
        }
      });
  }
  showSignPass(){
      $('.showPwd').toggleClass('showPwd1');
      $('.hidePwd').toggleClass('hidePwd1');
      return $('.inputTextPass').attr('type', 'text');
  }
  hideSignPass(){
      $('.showPwd').toggleClass('showPwd1');
      $('.hidePwd').toggleClass('hidePwd1');
      return $('.inputTextPass').attr('type', 'password');
  }
  render(){

    return(  
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper loginbg">
          <div className="hidden-lg hidden-md col-sm-12 col-xs-12 addDivSignUP"></div>
        <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-7 col-sm-8 col-xs-8 col-xs-offset-2 signupPadding loginFormWrap ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divLoginInWrap">
              
            <form id="login" onSubmit={this.userlogin.bind(this)}>
              <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-4 col-xs-offset-2 ">
             {/* <h3> hhhh</h3>*/}
              {<h4 className="signInNameTitle "><span className="">Login</span></h4>
              }</div>
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                <div className="inputContent">
                  <span className="blocking-span noIb">
                    <input type="email" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 oesSignUpForm tmsLoginTextBox" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="" required/>
                    <span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email ID</span>   
                  </span> 
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 marBtm30">
                <div className="form-group form-group1 fltlft input-group col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContent ">     
                  <span className="blocking-span noIb">
                    <input type="password" className="form-control border3 pass oesSignUpForm confirmbtm inputTextPass tmsLoginTextBox" ref="loginpassword" name="loginpassword" required/>
                    <span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>                 
                  </span>
               
                <div className="showHideSignDiv">
                  <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                  <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                </div> 
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 UMloginbutton hvr-sweep-to-right" value="Login"/>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                  {
                    this.state.destination ?
                  <Link to={"/signup?destination="+this.state.destination} className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12"> Sign Up</Link>
                    :
                  <Link to="/signup" className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12"> Sign Up</Link>

                  }
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 offset-lg-1 col-xs-12 customFl">
                  <Link to='/forgot-pwd' className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    Forgot Password?
                  </Link>
                </div>
              </div>
{/*              <div className="col-lg-12 col-md-12 col-sm-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 ">
                  <Link to='/verify-account' className="UMGreyy UMGreyy_l forgotpass emailverify col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    OTP Verification
                  </Link>
                </div>
              </div>
*/}            </form>

          </div>
        </div>
      </div>
    );
  }
}
export default Login;