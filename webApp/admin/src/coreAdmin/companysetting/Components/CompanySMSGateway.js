import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';

import swal from 'sweetalert';


class CompanySMSGateway extends Component{
  

  componentWillReceiveProps(nextProps) {

    
  }
  componentDidMount() {
  
    
  
  }
 

  render(){
    
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
         {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 Box-Bottom-Header compyHeader">
          <h4 className="lettersp MasterBudgetTitle">Company Information</h4>
          </div>*/}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border_box1">
                <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">SMS Gateway Credentails</h5>
            </div>
               <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Access Key / ID</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="accessKeytype"  
                         type="text" name="accessKeytype" placeholder="Access Key / ID"
                        className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                       </div> 
                       {/* {this.state.formerrors.companytaxtype &&(
                          <span className="text-danger">{this.state.formerrors.companytaxtype}</span> 
                        )}*/}
                    </div>  
                  </div>

                  <div className="form-group formht col-lg-6 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Secret Key</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="secretKey" placeholder="Secret Key"
                         type="text" name="taxrating" ref="secretKey"
                         className="form-control areaStaes newinputbox" title="Secret Key" autoComplete="off"  />
                        </div> 
                       {/* {this.state.formerrors.companytaxrate &&(
                          <span className="text-danger">{this.state.formerrors.companytaxrate}</span> 
                        )}*/}
                    </div>  
                  </div>
               
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginBtmDiv">
                <button className="btn buttontAddEdit pull-right" id="btnCheck">
                
                      Submit
                  
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>

      );
  }

 }

 export default CompanySMSGateway;