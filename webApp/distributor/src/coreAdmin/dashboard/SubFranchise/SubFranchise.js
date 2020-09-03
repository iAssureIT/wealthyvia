import React,{Component}        from 'react';

import moment                   from "moment";
import swal                     from 'sweetalert';

import Axios                    from "axios";
import $                        from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {ExportCSV} from '../../common/Export/ExportCSV.js'; 
// import './Clientlist.css';


class SubFranchise extends Component {
  constructor(props){
    super(props);
    this.state = {
      distributorCode : '',
      fullName        : '',
      email           : '',
      errors          : {},
      fields          : {},
      subfranchiseurl : '',
      subfranchiseList : []
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
        this.getmySubfranchise(distributorCode); 
        var discode = parseInt(distributorCode.substring(3));
        var encryptcode = discode * 298564;
        this.setState({
          distributorCode  : distributorCode,
          subfranchiseurl  : "http://wealthyvia.iassureit.com/join-as-partner?x="+ encryptcode
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getmySubfranchise(distributorCode){
    
    Axios.get("api/distributormaster/get/all/myfranchiselist/"+distributorCode)
    .then(res=>{
      console.log("response from api=>client",res.data);

      if(res && res.data){
        
        this.setState({
          subfranchiseList : res.data 
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
        "subject"       : "Wealthyvia - Join as a Partner",
        "mail"          : 'Dear ' + this.state.fullName + ', <br/><br/>'+                          
                          "<b>Welcome to wealthvia <br/><br/>"+
                          "Partner has shared the Referrer link with you to join Wealthyvia. <br/>"+
                          "Please click the following link to Sign Up: <br/>" + 
                          "<pre> " + this.state.subfranchiseurl+ "</pre>" + 
                          " <br/> <br/> =============================== " + 
                          "<br/><br/> Thank You, <br/> Wealthyvia Team, <br/> www.wealthyvia.com " ,

      };
      console.log("notification",formValues); 
      
        Axios
        .post('/send-email',formValues)
        .then((res)=>{
                   if(res.status === 200){
                    swal("Signup url email sent to this "+this.state.email);
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

  exportsubfranchisedata = () => {
      let subfranchise = []
      if(this.state.subfranchiseList && this.state.subfranchiseList.length > 0)
      {
          var data = this.state.subfranchiseList;
          for (let i = 0; i < data.length; i++) {
              subfranchise.push({" Name": data[i].firstname+" "+data[i].lastname, "email" : data[i].email.address,
                          "Contact" : data[i].phone, "No of clients" : data[i].usercount, "Fees Paid": data[i].feespaid, 
                          "Fees Pending": data[i].feespending});        
            }
      }
      
      return subfranchise;
    } 
 
  render(){
    
     return(
      <div className="">
        <section className="">
          
          { this.state.distributorCode ?
            <div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader ">
                <h4 className="h5lettersp MasterBudgetTitle">Sub Franchise</h4>
              </div> 
              <hr class="compySettingHr" />
              <form id="signUpUser" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" onSubmit={this.shareurl.bind(this)} >
                <h4 style={{paddingBottom: '14px' }}>My Sub Franchise URL:  <a href={this.state.subfranchiseurl} style={{color: '#337ab7' }} target="_blank"> {this.state.subfranchiseurl} </a></h4>
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
                      <h4 className="h5lettersp MasterBudgetTitle">Sub Franchise List
                      <div className="pull-right" style={{fontSize: '15px'}}><ExportCSV csvData={this.exportsubfranchisedata()} fileName="Subfranchise"  /></div></h4>
                  </div> 
                  <hr class="compySettingHr" />
                <div className=" pull-right" style={{ textAlign: 'right', fontSize: '14px', marginBottom: '10px'}}>
                  
                </div>

                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 ">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Code</th>
                              <th className="text-left">Name</th>
                              <th className="text-left">Mobile</th>
                              <th className="text-left">Mail</th>
                              <th className="text-left">No of clients</th>
                              <th className="text-left">Total AUM</th>
                              <th className="text-left">Total fees paid</th>
                              <th className="text-left">Total fees pending</th>
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.subfranchiseList && this.state.subfranchiseList.length > 0?
                            this.state.subfranchiseList.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.distributorCode} </td> 
                                      <td className="">{a.firstname+" "+a.lastname} </td>
                                      <td>{a.phone}</td>
                                      <td>{a.email ? a.email.address : '' }</td>
                                      <td>{a.usercount}</td> 
                                      <td></td>   
                                      <td><i class="fa fa-rupee"></i>&nbsp;{a.feespaid}</td> 
                                      <td><i class="fa fa-rupee"></i>&nbsp;{a.feespending}</td> 
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


export default SubFranchise;