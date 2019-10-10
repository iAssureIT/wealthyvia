import React, { Component }     from 'react';
import { render }               from 'react-dom';
import $ from "jquery";
import swal from 'sweetalert';
import InputMask          from 'react-input-mask';
import axios from 'axios';


const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
}

const accountnumberRegex  = RegExp(/^[0-9]{9,18}$|^$/);
const companyAddressRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);
const ifsccodeRegex = RegExp(/^([ a-zA-Z0-9&/\(\)\.'-]+)$/);
const companynameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);


class CompanyBankDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
          bankID         : "",
          accHolderName  : this.props.accHolderName,
          accNickName    : this.props.accNickName,
          accType        : this.props.accType,
          bankName       : this.props.bankName,
          branchName     : this.props.branchName,
          accNumber      : this.props.accNumber,
          ifscCode       : this.props.ifscCode,
          submitVal      : false,
          formerrors     :{
                            accountholdername : " ",
                            bankname : " ",
                            accountnumber  : " ",
                            branchname : " ",
                            ifsccode : " ",
                          }
        };
    this.handleChange = this.handleChange.bind(this);
       
      }
  componentDidMount(){
   axios
      .get('/api/companysettings/list')
      .then((response)=>{
        console.log("get list companyLocationsInfo.............",response.data[0].companyLocationsInfo[0]);
        var respData = response.data[0].bankDetails[0];
        if(response.data[0].bankDetails.length>0){
        console.log("Inside Outside...........");
          this.setState({
                        companyId      : response.data[0].companyId,
                        bankID         : respData._id,
                        accHolderName  : respData.accHolderName,
                        accNickName    : respData.accNickName,
                        accType        : respData.accType,
                        bankName       : respData.bankName,
                        branchName     : respData.branchName,
                        accNumber      : respData.accNumber,
                        ifscCode       : respData.ifscCode,
                        submitVal      : false,
                        formerrors     :{
                                          accountholdername : "",
                                          bankname : "",
                                          accountnumber  : "",
                                          branchname : "",
                                          ifsccode : "",
                                        }
                        })
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
  
  submitBankDetail(event){
    event.preventDefault();
      var companyBankDetailsFormValue ={
              accHolderName  : this.state.accHolderName,
              accNickName    : this.state.accNickName,
              accType        : this.state.accType,
              bankName       : this.state.bankName,
              branchName     : this.state.branchName,
              accNumber      : this.state.accNumber,
              ifscCode       : this.state.ifscCode,
              companyId      : 1
            }//close array
      var companyBankDetailsFormValueUpdate ={
              accHolderName  : this.state.accHolderName,
              accNickName    : this.state.accNickName,
              accType        : this.state.accType,
              bankName       : this.state.bankName,
              branchName     : this.state.branchName,
              accNumber      : this.state.accNumber,
              ifscCode       : this.state.ifscCode,
              bankID         : this.state.bankID,
              companyId      : 1
            }//close array

  console.log('companyBankDetailsFormValue',companyBankDetailsFormValueUpdate)
  if(this.state.companyId == "1") {
    if(formValid(this.state.formerrors)){
      axios.patch('/api/companysettings/bank/edit',companyBankDetailsFormValueUpdate)
      .then(function (response) {
        // handle success
        console.log("this is response===>>>",response);
        swal("Good job!", "Bank Details Updated Successfully!", "success")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal("", "Error while updating Bank Details.", "error")
        if(error.message === "Request failed with status code 401")
          {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
  
      })
      .finally(function () {
        // always executed
      });
  
    }else{
      swal("Please enter mandatory fields", "", "warning");
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }else{
    if(formValid(this.state.formerrors)){
      axios.patch('/api/companysettings/bank/add',companyBankDetailsFormValue)
      .then(function (response) {
        // handle success
        console.log("this is response===>>>",response);
        swal("Good job!", "Bank Details Added Successfully!", "success")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal("", "Error while adding Bank Details.", "error")
        if(error.message === "Request failed with status code 401")
          {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
  
      })
      .finally(function () {
        // always executed
      });
  
    }else{
      swal("Please enter mandatory fields", "", "warning");
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }
}
// handleChange(event){
//   const target = event.target;
//   const name   = target.name;
//   this.setState({
//     [name]: event.target.value,
//   });
// }

handleChange(event){
  // const target = event.target;
  // const {name , value}   = event.target;
  const datatype = event.target.getAttribute('data-text');
  const {name,value} = event.target;
  let formerrors = this.state.formerrors;
  
  console.log("datatype",datatype);
  switch (datatype){
   
    case 'accountholdername' : 
     formerrors.accountholdername = companynameRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
    break;

    case 'bankname' : 
     formerrors.bankname = companynameRegex.test(value)   && value.length>0? '' : "Please Enter Valid Name";
    break;

    case 'accountnumber' : 
     formerrors.accountnumber = accountnumberRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
    break;

    case 'branchname' : 
     formerrors.branchname = companynameRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
    break;

    case 'ifsccode' : 
     formerrors.ifsccode = ifsccodeRegex.test(value)   && value.length>0? '' : "Please Enter Valid Name";
    break;

    
     default :
     break;

    //  case 'companyName' : 
    //  formerrors.companyName = value.length < 1 && value.lenght > 0 ? 'Minimum 1 Character required' : "";
    //  break;

  }
  // this.setState({formerrors,})
  this.setState({ formerrors,
    [name]:value
  } );
}


 

  
  render(){
    
    return(
      <div className="">
          <section className="">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 companyDisplayForm ">
                <div className="">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border_box1">
                    <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Bank Details</h5>
                  </div>
                  <hr className="compySettingHr" />
                    <div className="tablebd col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <form id="bankDetailForm" className="bankDetailForm">

                           <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="form-group">
                                  <label className="control-label statelabel locationlabel" >Enter Account Holder Name</label>
                                  <span className="astrick">*</span>
                                  <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon inputIcon">
                                    <i className="fa fa-info-circle"></i>
                                 </div>  
                                  <input id="accHolderName" value={this.state.accHolderName}  data-text="accountholdername" 
                                  onChange={this.handleChange.bind(this)} type="text" name="accHolderName" ref="accHolderName"
                                  className="form-control newinputbox areaStaes" placeholder="Account Holder Name" title="Please enter alphanumeric only" />
                                </div>   
                                  {this.state.formerrors.accountholdername &&(
                                    <span className="text-danger">{this.state.formerrors.accountholdername}</span> 
                                  )}
          
                              </div>  
                          </div>
                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label statelabel locationlabel" >Enter Account Nick Name</label>
                                <span className="astrick"></span>
                                <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                    <i className="fa fa-info-circle"></i>
                                 </div> 
                                <input id="accNickName" value={this.state.accNickName} onChange={this.handleChange.bind(this)} 
                                type="text" name="accNickName" ref="accNickName" placeholder="Account Nick Name " className="form-control areaStaes newinputbox "
                                 title="Please enter alphanumeric only" />
                                </div> 
                            </div>  
                          </div>
                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label statelabel locationlabel" >Enter Account Type</label>
                                <span className="astrick"></span>
                                <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                    <i className="fa fa-building"></i>
                                 </div> 
                                <input id="accType" value={this.state.accType} onChange={this.handleChange.bind(this)} 
                                type="text" name="accType" ref="accType" className="form-control areaStaes newinputbox"
                                 title="Please enter alphanumeric only"placeholder="Account Type" />
                                </div> 
                                 {/* <select value={this.state.accType} onChange={this.handleChange} className="form-control accType inputValid required" name="accType">
                                  <option value="0" selected="true" disabled="disabled">Enter Account Type</option>
                                  <option value="Current">Current</option>
                                  <option value="Saving">Saving</option>
                                </select>    */}
                            </div>  
                          </div>
                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label statelabel locationlabel" >Enter Bank Name</label><span className="astrick">*</span>
                                <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i class="fa fa-university"></i>
                               </div>  
                                <input id="bankName" value={this.state.bankName}  data-text="bankname"
                                 onChange={this.handleChange.bind(this)} type="text" name="bankName" placeholder="Bank Name"
                                 className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                              </div>  
                                {this.state.formerrors.bankname &&(
                                    <span className="text-danger">{this.state.formerrors.bankname}</span> 
                                  )}
                            </div>  
                          </div>

                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label statelabel locationlabel" >Enter Account Number</label>
                                <span className="astrick">*</span>
                                <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                    <i className="fa fa-info-circle"></i>
                                 </div>  
                                <input id="accNumber" value={this.state.accNumber} data-text="accountnumber" 
                                onChange={this.handleChange.bind(this)} type="text" name="accNumber" placeholder="Account Number"
                                className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                               </div> 
                                {this.state.formerrors.accountnumber &&(
                                    <span className="text-danger">{this.state.formerrors.accountnumber}</span> 
                                )}
                            </div>  
                          </div>

                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label statelabel locationlabel" >Enter Branch Name</label>
                                <span className="astrick">*</span>
                                <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                   <i class="fa fa-university"></i>
                                 </div> 
                                <input id="branchName" value={this.state.branchName} data-text="branchname" 
                                onChange={this.handleChange.bind(this)} type="text" name="branchName" placeholder="Branch Name"
                                 className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                               </div>  
                           </div>  
                                {this.state.formerrors.branchname &&(
                                    <span className="text-danger">{this.state.formerrors.branchname}</span> 
                                )}
                            
                          </div>

                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label statelabel locationlabel" >Enter IFSC Code</label>
                                <span className="astrick">*</span>
                                <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                    <i className="fa fa-building"></i>
                                 </div> 
                                <input id="ifscCode" value={this.state.ifscCode} data-text="ifsccode" 
                                onChange={this.handleChange.bind(this)} type="text" name="ifscCode" placeholder="IFSC Code"
                                 className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                                 </div>
                                {this.state.formerrors.ifsccode &&(
                                    <span className="text-danger">{this.state.formerrors.ifsccode}</span> 
                                )}
                            </div>  
                          </div>
                          
                        
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginBtmDiv">
                          {/* <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12  btn btn-primary btnSubmit pull-right bankDetails" onClick={this.submitBankDetail.bind(this)}>Submit</button> */}

                          <button className="buttontAddEdit btn  pull-right" id="btnCheck"  onClick={this.submitBankDetail.bind(this)}>
                            {this.state.submitVal
                              ?
                                "Submit"
                              : 
                                "Update"
                            }  
                          </button>
                        </div>
                      </form>
                     
                    </div>
                  </div>
                </div>
              </div>
            </section>
              
        </div>


      );
  }

 }

export default CompanyBankDetails;
