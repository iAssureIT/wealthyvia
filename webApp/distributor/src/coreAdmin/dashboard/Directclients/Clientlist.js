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
      clientList      : [],
      clientRevenue   : [],
      clientSubscription : []
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
      //console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/byuserid/"+ID)
    .then(res=>{
      //console.log("response from api=>",res.data);

      if(res && res.data){
        var distributorCode = res.data.distributorCode;
        this.getmyclients(distributorCode); 
        var discode = parseInt(distributorCode.substring(3));
        var encryptcode = discode * 298564;
        this.setState({
          distributorCode  : distributorCode,
          clientsignupurl  : "http://wealthyvia.iassureit.com/signup?x="+ encryptcode
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
      //console.log("response from api=>client",res.data);

      if(res && res.data){
        
        this.setState({
          clientList : res.data 
        },()=>{
          this.getclientrevenue();
          this.getclientofferingsubscription();
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getclientrevenue(){
    console.log("clientList", this.state.clientList);
    var query = {
      params: {
          clientList : JSON.stringify(this.state.clientList)
        }
    }
    Axios.get("api/offeringorders/get/allpaymentorder/byclientist", query)
    .then(res=>{
      console.log("response from api=>client",res.data);

      if(res && res.data){
        
        this.setState({
          clientRevenue : res.data.clientRevenue 
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getclientofferingsubscription(){
    console.log("clientList", this.state.clientList);
    var query = {
      params: {
          clientList : JSON.stringify(this.state.clientList)
        }
    }
    Axios.get("api/offeringsubscriptions/get/allofferingsub/byclientist", query)
    .then(res=>{
      console.log("response from api=>client subscription",res.data);

      if(res && res.data){
        
        this.setState({
          clientSubscription : res.data.clientRevenue 
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
      var pattern = new RegExp(/^[a-zA-Z ]+$/);
      if (!pattern.test(fields["fullName"])) {
        formIsValid = false;
        errors["fullName"] = "Please enter valid full name.";
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
        "subject"       : "Register on Wealthyvia",
        "mail"          : 'Dear ' + this.state.fullName + ', <br/><br/>'+                          
                          "<b>Welcome to wealthvia <br/><br/>"+
                          "Partner has shared the reference link with you to Sign Up on Wealthyvia. Wish you happy investing journey!<br/>"+
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
                    this.setState({
                      fullName : '',
                      email    : ''
                    })
                    }
                    else{
                      swal("Something went wrong");
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
                <h4 className="h5lettersp MasterBudgetTitle">My Direct Clients</h4>
              </div> 
              <hr class="compySettingHr" />
              <form id="signUpUser" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" onSubmit={this.shareurl.bind(this)} >
                <h4 style={{paddingBottom: '14px' }}>My Client URL:  <a href={this.state.clientsignupurl} style={{color: '#337ab7' }} target="_blank"> {this.state.clientsignupurl} </a></h4>
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
          
          <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                  
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader ">
                      <h4 className="h5lettersp MasterBudgetTitle">Signed Up Clients</h4>
                  </div> 
                  <hr class="compySettingHr" />
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Client Code</th>
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

          {/*
            this.state.clientRevenue ?
                <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Client Code</th>
                              <th className="text-left">Client Name</th>
                              <th className="text-left">Start Date</th>
                              <th className="text-left">End Date</th>
                              <th className="text-left">Product Opted</th>
                              <th className="text-left">Fees Paid</th>
                              <th className="text-left">Fees Pending</th>
                              
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.clientRevenue && this.state.clientRevenue.length > 0 ?
                            this.state.clientRevenue.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.clientCode} </td> 
                                      <td className="">{a.clientName} </td>
                                      <td>{a.startDate}</td>
                                      <td>{a.endDate}</td>
                                      <td>{a.offeringTitle}</td> 
                                      <td className="text-center">{a.paymentStatus === 'Paid' ? a.offeringAmount : ''}</td>
                                      <td className="text-center">{a.paymentStatus === 'Paid' ? '-' : a.offeringAmount}</td>
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
            :
            null
          */}
          
          {
            this.state.clientSubscription ?
                <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader ">
                      <h4 className="h5lettersp MasterBudgetTitle">Client Revenue</h4>
                  </div> 
                  <hr class="compySettingHr" />
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Client Code</th>
                              <th className="text-left">Client Name</th>
                              <th className="text-left">Product Opted</th>
                              <th className="text-left">Start Date</th>
                              <th className="text-left">End Date</th>                              
                              <th className="text-left">Fees Paid</th>
                              <th className="text-left">Fees Pending</th>
                              
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.clientSubscription && this.state.clientSubscription.length > 0 ?
                            this.state.clientSubscription.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.clientCode} </td> 
                                      <td className="">{a.clientName} </td>
                                      <td>{a.offeringTitle}</td>
                                      <td>{a.startDate}</td>
                                      <td>{a.endDate}</td>
                                       
                                      <td className="text-center"><i class="fa fa-rupee">&nbsp;</i>{a.endDate >= moment().format('YYYY-MM-DD') ? a.offeringAmount : '0'}</td>
                                      <td className="text-center"><i class="fa fa-rupee">&nbsp;</i>{a.endDate > moment().format('YYYY-MM-DD') ? '0' : a.offeringAmount}</td>
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
            :
            null
          }
          

        </section>
      </div>
     );
  }
}


export default Clientlist;