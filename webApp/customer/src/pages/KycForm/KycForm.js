import React, { Component } from 'react';
import swal from 'sweetalert';
import $ from "jquery";
import "./KycForm.css";


export default class KycForm extends Component {

  constructor(){
      super();
        this.state = {           
          loggedIn : false,
          auth: {
                email           : '',
                pwd             : '',
            }
        }
  }
 
  render(){

    return(  
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
        <div className="row">
        <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 formContainer">
            <form>
              <div className="col-lg-12   col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                  <h4 className="formNameTitle "><span className="">KYC Collection Form</span></h4>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainer">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                      <label>Name</label>
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                      <input type="text" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Name" ref="unitCost" />
                    </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainer">
                <div className="row"> 
                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                      <label>Mobile Number</label>
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                      <input type="number" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Mobile Number" ref="unitCost" />
                    </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainer">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                      <label>Email ID</label>
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                         <input type="email" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Email ID" ref="unitCost" />

                    </div>
                </div>
              </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainer">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                      <label>PAN </label>
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                         <input type="file" className="customInputKF inputBox nameParts" name="unitCost"  ref="unitCost" />
                    </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainer">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                      <label>Adress Proof</label>
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                         <input type="file" className="customInputKF inputBox nameParts" name="unitCost" placeholder="Enter Name" ref="unitCost" />
                    </div>
                </div>
              </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainer textAlignCenter">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 submitButton pull-right">
                      Submit
                    </div>
                     
              </div>
            </form>
        </div>
         <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 kycImage">
          <img src="/images/KYC.jpg"/>
        </div>
      </div>
      </div>

    );
  }
}
