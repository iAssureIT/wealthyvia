import React, {Component}           from 'react';
import {render}                     from 'react-dom';
import $                            from "jquery";
import CompanyInformation           from  '../Components/CompanyInformation.js';
import CompanyLocation              from  '../Components/CompanyLocation.js';
import CompanyBankDetails           from  '../Components/CompanyBankDetails.js';
import CompanyTaxDetails            from  '../Components/CompanyTaxDetails.js';
import CompanyPaymentGateway        from  '../Components/CompanyPaymentGateway.js';
import CompanySMSGateway            from  '../Components/CompanySMSGateway.js';
import CompanyAmazons3              from  '../Components/CompanyAmazons3.js';
// import AddPropertyType           from  '/imports/admin/companySetting/Add_Property_subproperty/AddPropertyType.jsx';
import '../css/CompanySetting.css';

 class CompanySetting extends Component{
    constructor(props) {
    super(props)

    this.state = {

      companyinformation        : "Company Information",
      

    }
    // this.handleChange = this.handleChange.bind(this);
    // this.onChange    = this.onChange.bind(this);

  }
  componentDidMount() {
   

  }

  
  componentWillUnmount(){
    
  }
  clickLi(event){
    event.preventDefault();
    // $("#companyLocationForm").validate().resetForm();
    // $("#companyInformationForm").validate().resetForm();
    $('.error').css({'display':'none'})
  }


  render() {

    return (
       <div>
          <div className="">
             <section className="">
                <div className="row">
                   <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="">
                         <div className="boxMinHeight boxMinHeighttab">
                         <div className="box-header with-border">
                            <h4 className="h4Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Company Settings</h4>
                          </div>
                            <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companySettingMarginTop NOpadding-left">
                              <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPadding"> 
                                <ul className="nav nav-tabs tabs-left sideways">
                                    <li className="active  col-lg-12 col-md-12 col-xs-12 col-sm-12" onClick={this.clickLi.bind(this)}><a className="tabLeft tablefthr lettersp" href="#companyInformation" data-toggle="tab">Company Information</a></li>
                                    <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"         onClick={this.clickLi.bind(this)}><a className="tabLeft lettersp tablefthr" href="#CompanyLocation" data-toggle="tab">Location Details</a></li>
                                    {/*<li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"         onClick={this.clickLi.bind(this)}><a className="tabLeft lettersp tablefthr" href="#CompanyBankDetails" data-toggle="tab">Bank Details</a></li>*/}
                                    <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"         onClick={this.clickLi.bind(this)}><a className="tabLeft lettersp tablefthr" href="#CompanyTaxDetails" data-toggle="tab">Tax Information</a></li>
                                    <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"         onClick={this.clickLi.bind(this)}><a className="tabLeft lettersp tablefthr" href="#CompanyPaymentGateway" data-toggle="tab">Payment Gateway</a></li>
                                    <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"         onClick={this.clickLi.bind(this)}><a className="tabLeft lettersp tablefthr" href="#CompanySMSGateway" data-toggle="tab">SMS Gateway</a></li>
                                    <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"         onClick={this.clickLi.bind(this)}><a className="tabLeft lettersp tablefthr" href="#CompanyAmazons3" data-toggle="tab">Amazon S3</a></li>
                                </ul>
                              </div>
                              <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">
                                <div className="tab-pane active" id="companyInformation"> <CompanyInformation/> </div>
                                <div className="tab-pane" id="CompanyLocation"> <CompanyLocation/> </div>
                                {/*<div className="tab-pane" id="CompanyBankDetails"> <CompanyBankDetails/> </div>*/}
                                <div className="tab-pane" id="CompanyTaxDetails"> <CompanyTaxDetails/> </div>
                                <div className="tab-pane" id="CompanyPaymentGateway"> <CompanyPaymentGateway/> </div>
                                <div className="tab-pane" id="CompanySMSGateway"> <CompanySMSGateway/> </div>
                                <div className="tab-pane" id="CompanyAmazons3"> <CompanyAmazons3/> </div>
                              </div> 
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </section>
          </div>
      </div>
    );

  }

}
export default CompanySetting;