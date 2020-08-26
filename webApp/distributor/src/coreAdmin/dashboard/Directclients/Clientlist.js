import React,{Component}        from 'react';

import moment                   from "moment";
import swal                     from 'sweetalert';

import Axios                    from "axios";
import $                        from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Clientlist.css';


class Clientlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      distributorCode : '',
      fullName        : '',
      email           : '',
      errors          : {},
      fields          : {},
      clientsignupurl : '',
      clientList      : []
    }   
  }
  handleChange(event){
    var checkValue  = event.target.checked;
    const target    = event.target.value;
  }

  componentDidMount(){
    this.getDistributorFormData();    
     
  }

  getDistributorFormData(){
    var ID = localStorage.getItem('user_id');
      console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/byuserid/"+ID)
    .then(res=>{
      console.log("response from api=>",res.data);

      if(res && res.data){
        var distributorCode = res.data.distributorCode;
        this.getmyclients(distributorCode); 
        var encryptcode = distributorCode * 298564;
        this.setState({
          distributorCode  : distributorCode,
          clientsignupurl  : "https://wealthyvia.com/signup?x="+ encryptcode
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getmyclients(distributorCode){
    
    Axios.get("api/users/get/list/bydistributorcode/user/"+distributorCode)
    .then(res=>{
      console.log("response from api=>client",res.data);

      if(res && res.data){
        
        this.setState({
          clientList : res.data 
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  handleChange(event){
      
      const datatype = event.target.getAttribute('data-text');
      const {name,value} = event.currentTarget;
      this.setState({ [event.currentTarget.name] : event.currentTarget.value })
      
     
      let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
          fields
        });
        if (this.validateForm()) {
          let errors = {};
          errors[event.target.name] = "";
          this.setState({
            errors: errors
        });
      }
    
  }

  validateFormReq() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["fullName"]) {
      formIsValid = false;
      errors["fullName"] = "This field is required.";
    }  
     
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "This field is required.";
    }
   
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (typeof fields["fullName"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^[a-zA-Z]+$/);
      if (!pattern.test(fields["fullName"])) {
        formIsValid = false;
        errors["firstNameV"] = "Please enter valid full name.";
      }
    }     
    if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "Please enter valid email-ID.";
        }
      }
         
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  shareurl(event){
    event.preventDefault();
    console.log("values", this.state.fullName, this.state.email);
    if (this.validateForm() && this.validateFormReq()) {
      console.log("not error");
      const formValues = {
        "email"         : this.state.email ,
        "subject"       : "wealthyvia - client register",
        "text"          : "", 
        "mail"          : 'Dear ' + this.state.fullName + ', <br/><br/>'+                          
                          "<b>Welcome to wealthvia <br/><br/>"+
                          "Distributor has shared the Referral link with you to Sign Up on Wealthyvia. By Singing Up, the doors for incredible investments will open for you!<br/>"+
                          "Please click the following link to Sign Up: <br/>" + 
                          "<pre> " + this.state.clientsignupurl+ "</pre>" + 
                          " <br/> <br/> =============================== " + 
                          "<br/><br/> Thank You, <br/> Wealthyvia Team, <br/> www.wealthyvia.com " ,

      };
      console.log("notification",formValues); 
      
        Axios
        .post('/send-email',formValues)
        .then((res)=>{
                   if(res.status === 200){
                    swal("Signup url email sent to this "+this.state.email)
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
    }
  }

 
  render(){
    
     return(
      <div className="">
        <section className="">
          
          { this.state.distributorCode ?
            <div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader ">
                <h4 className="h5lettersp MasterBudgetTitle">My direct clients</h4>
              </div> 
              <hr class="compySettingHr" />
              <form id="signUpUser" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" onSubmit={this.shareurl.bind(this)} >
                <h4 style={{paddingBottom: '14px' }}>My client url:  <a href={this.state.clientsignupurl} style={{color: '#337ab7' }} target="_blank"> {this.state.clientsignupurl} </a></h4>
                <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 ">
                            <div className=" col-lg-5 col-md-5 col-xs-12 col-sm-12 inputContent btmmargin">                              
                              
                                 <input type="text" style={{textTransform:'capitalize'}} className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12 shareinputbox" id="fullName" ref="fullName" name="fullName" placeholder="Full Name*" 
                                      value={this.state.fullName} 
                                      onChange={this.handleChange.bind(this)}  />
                                    <div className="errorMsg">{this.state.errors.fullName}</div>
                                
                              
                            </div>
                            <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 inputContent">                            
                               <input type="email"  className="disableInput inputMaterial form-control inputText shareinputbox" id="email" ref="email"  name="email" placeholder="Email address*"  required
                                    value={this.state.email || ''}
                                    onChange={this.handleChange.bind(this)}
                                />
                                    <div className="errorMsg">{this.state.errors.email}</div>
                               
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 ">
                              <button className="btn btn-primary " onClick={this.shareurl.bind(this)}>&nbsp; &nbsp;Share&nbsp; &nbsp;</button>
                            </div>
                        </div>
                    </div>  
              </form>    
            </div>
            :
            null
          }
          
          <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Client code</th>
                              <th className="text-left">Client Name</th>
                              <th className="text-left">Mobile</th>
                              <th className="text-left">Mail</th>
                              
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.clientList?
                            this.state.clientList.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.clientId} </td> 
                                      <td className="">{a.fullName} </td>
                                      <td>{a.mobNumber}</td>
                                      <td>{a.email}</td>
                                        
                               </tr>
                                )
                              }):
                            null
                            }
                            </tbody>
                          
                        </table>
              </div>    
            </div>
          </div>
        </section>
      </div>
     );
  }
}


export default Clientlist;