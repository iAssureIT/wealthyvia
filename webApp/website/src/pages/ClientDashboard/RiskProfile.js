import React, { Component }               from 'react';
import $                                  from 'jquery';
import swal                               from 'sweetalert';
import axios                              from 'axios';
import S3FileUpload                       from 'react-s3';
import "./RiskProfile.css";
import { withRouter } from 'react-router-dom';



class RiskProfile extends Component {

  constructor(props) {
    super(props);
        this.state = {
          "userinfo"              : {}, 
          "fields"             : {},
          "errors"             : {},  
          "fields1"            : {},
          "errors1"            : {},
          "questionsArray"     : [],
          "answersArray"       : [],
          "answersofQ1"        : [],
          "Question1"          : "1) What is the primary goal for the funds invested through WealthyVia?",
          "Question2"          : "2) Any near term need for the funds invested with us ?",
          "Question3"          : "3) Is there any emergency need associated with the funds you are investing with the help of this advisory?",
          "Question4"          : "4) What is number of years you have spent in stock market investments",
          "Question5"          : "5) What is your biggest drawdown on your entire portfolio ?",
          buttonHeading        : "Submit",
        }
        this.baseState = this.state;
  }

  componentDidMount()
    {
     
      const userid = localStorage.getItem('user_ID');
       axios.get("/api/users/get/"+userid)
        .then((response)=>{ 
          // console.log("userinfo data=>", response.data);
            this.setState({
                userinfo : response.data
            })

        })
        .catch((error)=>{
              console.log('error', error);
        })
       
          axios
        .get('/api/projectsettings/get/S3')
        .then((response)=>{
          const config = 
                         {
                            
                            bucketName      : response.data.bucket,
                            dirName         : response.data.bucket,
                            region          : response.data.region,
                            accessKeyId     : response.data.key,
                            secretAccessKey : response.data.secret,
                        }
          this.setState({
            config : config
          })
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

  ScrollTop(event){
    window.scrollTo(0,0);
  }

  getCheckValue(event){
    var checked = event.target.checked;
    if(checked){
      var value = event.target.value;
      
        var array = this.state.questionsArray;
        var answersarray = [];
        if(array){

          
          if(this.state.questionsArray.indexOf(event.target.name)=== -1)
          {
            array.push(event.target.name);

            this.setState({
              questionsArray  :array,
            },()=>{
            })
          }
            answersarray.push(event.target.value);
          if(event.target.name === "1) What is the primary goal for the funds invested through WealthyVia?")
          {
            this.setState({
              answersofQ1    : answersarray,
            },()=>{
            })
          }else  if(event.target.name === "2) Any near term need for the funds invested with us ?"){
            this.setState({
              answersofQ2    : event.target.value,
            },()=>{
          
          })
          }
          else  if(event.target.name === "3) Is there any emergency need associated with the funds you are investing with the help of this advisory?"){
            this.setState({
              answersofQ3    : event.target.value,
            },()=>{
          })
          }
           else  if(event.target.name === "4) What is number of years you have spent in stock market investments"){
            this.setState({
              answersofQ4    : event.target.value,
            },()=>{
        })
          }
          else {
            this.setState({
              answersofQ5    : event.target.value,
            },()=>{
          })
        }
      }
    }else{
      this.setState({
        [event.target.name] : "",
      })
    }
  }

  

  Submit(event){
    event.preventDefault();
    // console.log("ok");
      // if (this.validateForm() && this.validateFormReq()) {
        this.setState({
            buttonHeading : 'We are processing. Please Wait...',
        })
        var dataArray1={
          "name"             : this.state.userinfo.fullName,
          "email"            : this.state.userinfo.email,
          "contactNumber"    : this.state.userinfo.mobNumber,
          
        }
        if(dataArray1){
          var adminEmail = "anuja.kate@iassureit.com";
          const dataArray = {
              "email"         : dataArray1.email ,
              "subject"       : "Your investment risk profile is sent successfully.",
              "message"          : "", 
              "mail"          : 'Dear  ' + dataArray1.name + ', <br/><br/>'+
                                "Congratulations!<br/><br/>Your investment risk profile has been successfully delivered to the admin! <br/> We will get back to you shortly. <br/> <br/> " + 
                                "<b>Details Submitted - </b><br/> Name: "  + this.state.name + '<br/>'+
                                "Contact Number :" + dataArray1.contactNumber + '<br/>'+
                                "<b> Investment Profile details </b> <br/><br/>"+
                                ""+this.state.questionsArray[0]+"<br/>"+
                                "Ans : "+this.state.answersofQ1+"<br/><br/>"+ 
                                ""+this.state.questionsArray[1]+"<br/>"+
                                "Ans : "+this.state.answersofQ2+"<br/><br/>"+ 
                                ""+this.state.questionsArray[2]+"<br/>"+
                                "Ans : "+this.state.answersofQ3+"<br/><br/>"+
                                 ""+this.state.questionsArray[3]+"<br/>"+
                                "Ans : "+this.state.answersofQ4+"<br/><br/>"+
                                ""+this.state.questionsArray[4]+"<br/>"+
                                "Ans : "+this.state.answersofQ5+"<br/><br/>"+
                                "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,

          };
          axios
          .post('/send-email',dataArray)
          .then((res)=>{
             if(res.status === 200){
              const formValues2 = {
                "email"         : adminEmail ,
                "subject"       : "New Investment Risk Profile details arrived from client!",
                "mail"          : 'Dear Admin, <br/>'+
                                  "New Investment Risk Profile details came from client. <br/> <br/>Details are as follows -<br/> <br/>" + 
                                  "<b> Name: </b>"   + dataArray1.name + '<br/>'+
                                  "<b> Email: </b>"  + dataArray1.email + '<br/>'+
                                  "<b> Contact Number: </b>"  + dataArray1.contactNumber + '<br/><br/>'+
                              
                                  "<b> Investment Profile details </b> <br/><br/>"+
                                  ""+this.state.questionsArray[0]+"<br/>"+
                                  "Ans : "+this.state.answersofQ1+"<br/><br/>"+ 
                                  ""+this.state.questionsArray[1]+"<br/>"+
                                  "Ans : "+this.state.answersofQ2+"<br/><br/>"+ 
                                  ""+this.state.questionsArray[2]+"<br/>"+
                                  "Ans : "+this.state.answersofQ3+"<br/><br/>"+
                                   ""+this.state.questionsArray[3]+"<br/>"+
                                  "Ans : "+this.state.answersofQ4+"<br/><br/>"+
                                  ""+this.state.questionsArray[4]+"<br/>"+
                                  "Ans : "+this.state.answersofQ5+"<br/><br/>"+
                                  "" ,
                 };
              axios
              .post('/send-email',formValues2)
              .then((res)=>{
                        if(res.status === 200){
                             swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                        }
                        this.setState({
                          buttonHeading : 'Sign Up',
                        });
                        this.setState(this.baseState);
                        $("html,body").scrollTop(0);
                        this.props.history.push("/product-pricing");
                      })
                      .catch((error)=>{
                        console.log("error = ", error);
                        this.setState({
                          buttonHeading : 'Sign Up',
                        });
                        
                      });
              }
          })
          .catch((error)=>{
            console.log("error = ", error);
            this.setState({
                        buttonHeading : 'Sign Up',
            });
          });
          
      }
    // }
  }

  render() {
    const token = localStorage.getItem("user_ID");
    if(token){
             return (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 riskprofileformbox" >
                      <h4 className="formNameTitle"><span className="">Add Risk Profile</span></h4>
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                        <form id="riskform">
                            <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>{this.state.compalsaroy ===false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                <p id="Q1">{this.state.Question1} <span className="asterix">*</span></p>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                         <div className="centreDetailContainer col-lg-1 row">
                                                <input type="checkbox"  name={this.state.Question1} value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} required />
                                                <span className="centreDetailCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions">Pending15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <div className="centreDetailContainer col-lg-1 row">
                                                <input type="checkbox" name={this.state.Question1} value="I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years" onChange={this.getCheckValue.bind(this)} />
                                                <span className="centreDetailCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <div className="centreDetailContainer col-lg-1 row">
                                                <input type="checkbox"  name={this.state.Question1} value="Just strong core portfolio with blue chips or mutual fund but ok to earn something extra." onChange={this.getCheckValue.bind(this)}/>
                                                <span className="centreDetailCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <div className="centreDetailContainer col-lg-1 row">
                                                <input type="checkbox"  name={this.state.Question1} value="I wanna allocate some portion to big tech giants like amazon facebook types too." onChange={this.getCheckValue.bind(this)} />
                                                <span className="centreDetailCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <div className="centreDetailContainer col-lg-1 row">
                                                <input type="checkbox" name={this.state.Question1} value="I am day trader, daily play with markets. I want continuous smart trades." onChange={this.getCheckValue.bind(this)}/>
                                                <span className="centreDetailCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                      </div>
                                    </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                      <p><b>{this.state.Question2}</b><span className="asterix">*</span></p>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                          <div className="centreDetailContainer col-lg-1 row">
                                                  <input type="radio" name={this.state.Question2} value="Yes after two years" onChange={this.getCheckValue.bind(this)} required/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions">Yes after two years</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="radio" name={this.state.Question2} value="Yes after  6 -8 months" onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="radioCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem ansoptions">Yes after 6 -8 months</span>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="radio" name={this.state.Question2} value="It’s a separate capital to invest apart from my needs. I want to build good portfolio." onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="radioCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem ansoptions">It’s a separate capital to invest apart from my needs. I want to build good portfolio.</span>
                                        </div>                                            
                                    </div>

                                    {this.state.compalsaroy === false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                        <p><b>{this.state.Question3}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                 
                                          <div className="centreDetailContainer col-lg-1 col-xs-3 row ">
                                                  <input type="radio" name={this.state.Question3} value="Yes" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9 ">Yes</span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                        <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                <input type="radio" name={this.state.Question3} value="No" onChange={this.getCheckValue.bind(this)}/>
                                                <span className="radioCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions col-xs-9">No</span>
                                      </div>                                                 
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                        <p><b>{this.state.Question4}</b><span className="asterix">*</span></p>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                 
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                  <input type="radio" name={this.state.Question4} value="0-2 years" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9">0-2 years  </span>

                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                  <input type="radio" name={this.state.Question4} value="3-5 years" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9">3-5 years</span>

                                      </div>
                                       <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                  <input type="radio" name={this.state.Question4} value="5 years plus" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9">5 years plus</span>

                                      </div>   
                                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                  <input type="radio" name={this.state.Question4} value="2-15 plus years" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9">2-15 plus years</span>

                                      </div>            
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                        <p><b>{this.state.Question5}</b><span className="asterix">*</span></p>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                <input type="radio" name={this.state.Question5} value="0 to -25%" onChange={this.getCheckValue.bind(this)}/>
                                                <span className="radioCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions col-xs-9 ">0 to -25%</span>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                <input type="radio" name={this.state.Question5} value="-25% to -50%" onChange={this.getCheckValue.bind(this)}/>
                                                <span className="radioCheck"></span>
                                             </div>
                                            <span className="centreDetaillistItem ansoptions col-xs-9">-25% to -50%</span>
                                      </div>
                                       <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                  <input type="radio" name={this.state.Question5} value="-51% to -75%" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9">-51% to -75%</span>

                                      </div>   
                                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                          <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                  <input type="radio" name={this.state.Question5} value="More than -75%" onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="radioCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem ansoptions col-xs-9">More than -75%</span>

                                      </div> 
                                    </div>
                                   
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textAlignCenter">
                                      <input id="signUpBtn" className="col-lg-6 col-md-6 hidden-sm hidden-xs risksubmitButton pull-right " onClick={this.Submit.bind(this)}  value={this.state.buttonHeading} readOnly disabled={this.state.buttonHeading === 'We are processing. Please Wait...'}/>
                                      <input id="signUpBtn" className="hidden-lg hidden-md col-sm-13 col-xs-12 risksubmitButton pull-right " onClick={this.Submit.bind(this)}  value={this.state.buttonHeading} readOnly disabled={this.state.buttonHeading === 'We are processing. Please Wait...'}/>
                                    </div>
                                </form>
                            </div>
                          </div>
                  </div>
          );
        }
        else{
        this.props.history.push("/login");
        window.location.reload();
      }
    }  
}        

export default withRouter(RiskProfile);
