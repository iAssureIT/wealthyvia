import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';

import swal from 'sweetalert';

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const taxtypeRegex  = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const taxrateRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);
const effectiveRegex = RegExp(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/);


class CompanyTaxDetails extends Component{
   constructor(props) {
    super(props);
    this.state = {
      taxID       : '',
      taxrating   : '',
      taxtype     : '',
      Effective   : '',
      submitVal   : true,
      formerrors  :{
                    companytaxtype   : " ",
                    companytaxrate   : " ",
                    effective        : " ",
                   }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    
  }
  componentDidMount() {
   axios
      .get('/api/companysettings/list')
      .then((response)=>{
        console.log("get list companyLocationsInfo.............",response.data[0].companyLocationsInfo[0]);
        var respData = response.data[0].taxSettings[0];
        if(response.data[0].taxSettings.length>0){
          this.setState({
                        companyId       : response.data[0].companyId,
                        taxID           : respData._id,
                        taxrating       : respData.taxRating,
                        taxtype         : respData.taxType,
                        Effective       : respData.effectiveFrom,
                        submitVal       : false,
                        formerrors      :{
                                          companytaxtype   : "" ,
                                          companytaxrate   : "",
                                          effective        : "",
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

  submitCompanyInformation=(event)=>{
    event.preventDefault();
   
    var companytaxinfo = {
      taxRating             : this.state.taxrating,
      taxType               : this.state.taxtype,
      effectiveFrom         : this.state.Effective,
      companyId             : 1 
    }//close array
    var companytaxinfoUpdate = {
      taxRating             : this.state.taxrating,
      taxType               : this.state.taxtype,
      effectiveFrom         : this.state.Effective,
      taxID                 : this.state.taxID,
      companyId             : 1 
    }//close array
    console.log('companytaxinfo',companytaxinfoUpdate)

  if(this.state.companyId == "1"){
    if(formValid(this.state.formerrors)){
      axios.patch('/api/companysettings/taxSettings',companytaxinfoUpdate)
      .then(function (response) {
        // handle success
        console.log("this is response===>>>",response);
        swal("Good job!", "Tax Information Added Successfully!", "success")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal("","Error while updating tax details.", "error")
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
      axios.patch('/api/companysettings/taxSettings',companytaxinfo)
      .then(function (response) {
        // handle success
        console.log("this is response===>>>",response);
        swal("Good job!","Tax Information Added Successfully!", "success")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal("","Error while adding tax details.", "error")
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

handleChange(event){
  // const target = event.target;
  // const {name , value}   = event.target;
  const datatype = event.target.getAttribute('data-text');
  const {name,value} = event.target;
  let formerrors = this.state.formerrors;
  
  console.log("datatype",datatype);
  switch (datatype){
   
    case 'companytaxtype' : 
     formerrors.companytaxtype = taxtypeRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
    break;

    case 'companytaxrate' : 
     formerrors.companytaxrate = taxrateRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
    break;

    case 'effective' : 
     formerrors.effective = effectiveRegex.test(value)   && value.length>0? '' : "Please Enter Date";
    break;

  
    
     default :
     break;

  
  }
  
  this.setState({ formerrors,
    [name]:value
  } );
}


  render(){
    
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
         {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 Box-Bottom-Header compyHeader">
          <h4 className="lettersp MasterBudgetTitle">Company Information</h4>
          </div>*/}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border_box1">
                <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Tax Information</h5>
            </div>
               <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanyTaxDetailsForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Tax Type</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="taxtype" value={this.state.taxtype} data-text="companytaxtype" 
                        onChange={this.handleChange.bind(this)} type="text" name="taxtype" placeholder="Tax Type"
                        className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                       </div> 
                        {this.state.formerrors.companytaxtype &&(
                          <span className="text-danger">{this.state.formerrors.companytaxtype}</span> 
                        )}
                    </div>  
                  </div>

                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12 zzero">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Tax Rating</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="taxrating" value={this.state.taxrating} data-text="companytaxrate" placeholder="Tax Rating"
                        onChange={this.handleChange.bind(this)} type="text" name="taxrating" ref="taxrating"
                         className="form-control areaStaes newinputbox" title="taxrating" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.companytaxrate &&(
                          <span className="text-danger">{this.state.formerrors.companytaxrate}</span> 
                        )}
                    </div>  
                  </div>
               
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Effective From</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input className="form-control areaStaes newinputbox " data-text="effective" placeholder="Effective From"
                         onChange={this.handleChange.bind(this)} title="Please enter date" id="Effective" type="date" 
                         name="Effective" ref="Effective"required />  
                        </div>  
                        {this.state.formerrors.effective &&(
                          <span className="text-danger">{this.state.formerrors.effective}</span> 
                        )}
                    </div> 
                  </div>
                  
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginBtmDiv">
                <button className="btn buttontAddEdit pull-right" id="btnCheck" onClick={this.submitCompanyInformation.bind(this)} >
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

      );
  }

 }

 export default CompanyTaxDetails;