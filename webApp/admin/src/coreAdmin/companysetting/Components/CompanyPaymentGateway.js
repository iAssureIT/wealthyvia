import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";

// import swal from 'sweetalert';

class CompanyPaymentGateway extends Component{
   constructor(props) {
    super(props);
    this.state = {
      submitVal      : true,
      subscription   : {},
      sandboxAPI     : '', 
      sandboxKey     : '',
      sandboxSecret  : '',
      prodAPI        : '',
      prodKey        : '',
      prodSecret     : '',
      environment    : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    
  }
  componentDidMount() {
  
  
  }

  handleChange(event){
    const target = event.target;
    const name   = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }
  submit(event){
    event.preventDefault();
    var formvalues = {
                      "environment"   : $("input[name='environment']:checked").val(),
                      "sandboxAPI"    : this.state.sandboxAPI,
                      "sandboxKey"    : this.state.sandboxKey,
                      "sandboxSecret" : this.state.sandboxSecret,
                      "prodAPI"       : this.state.prodAPI,
                      "prodKey"       : this.state.prodKey,
                      "prodSecret"    : this.state.prodSecret,
                     }
          console.log("formvalues123",formvalues);

    // console.log('formvalues: ',formvalues);
      // Meteor.call('saveQWSetting', formvalues, (error,result)=>{
      //   if(error){
      //     console.log("error"+error);
      //   }else{    
      //     swal('Quik Wallet Settings submitted successfully.');
      //   }
      // });
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Payment Information</h5>
          </div>
          <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanyPaymentGatewayForm"  >
              <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <form onSubmit={this.submit.bind(this)}>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutTitle">(Please Select Quik Wallet Environment)</div>
                    <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 form-group envtSettings">
                      <input type="radio" onChange={this.handleChange.bind(this)} ref="environment" name="environment" checked={this.state.environment == 'sandbox' ? true : false } value="sandbox" required/><br/>Sandbox<br/><hr/>
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 envLabel statelabel locationlabel">API</label>
                      <input type="text" onChange={this.handleChange.bind(this)} name="sandboxAPI" ref="sandboxAPI" value={this.state.sandboxAPI} placeholder="Sandbox API" className="form-control" required/><br/>
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 envLabel statelabel locationlabel">Key</label>
                      <input type="text" onChange={this.handleChange.bind(this)} name="sandboxKey" ref="sandboxKey" value={this.state.sandboxKey} placeholder="Sandbox Key" className="form-control" required/><br/>
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 envLabel statelabel locationlabel">Secret</label>
                      <input type="text" onChange={this.handleChange.bind(this)} name="sandboxSecret" ref="sandboxSecret" value={this.state.sandboxSecret} placeholder="Sandbox Secret" className="form-control" required/><br/>
                    </div>
                    <div className="col-lg-5 col-lg-offset-1 col-lg-offset-1 col-md-4 col-sm-4 col-xs-4 form-group envtSettings">
                      <input type="radio" onChange={this.handleChange.bind(this)} ref="environment"  name="environment" checked={this.state.environment == 'production' ? true : false } value="production" required/><br/>Production<br/><hr/>
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 envLabel statelabel locationlabel">API</label>
                      <input type="text" onChange={this.handleChange.bind(this)} name="prodAPI" ref="prodAPI" value={this.state.prodAPI} placeholder="Production API" className="form-control" required/><br/>
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 envLabel statelabel locationlabel">Key</label>
                      <input type="text" onChange={this.handleChange.bind(this)} name="prodKey" ref="prodKey" value={this.state.prodKey} placeholder="Production Key" className="form-control" required/><br/>
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 envLabel statelabel locationlabel">Secret</label>
                      <input type="text" onChange={this.handleChange.bind(this)} name="prodSecret" ref="prodSecret" value={this.state.prodSecret} placeholder="Production Secret" className="form-control" required/><br/>
                    </div>                    
                    <br/>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginBtmDiv">
                      <button type="submit" className=" buttontAddEdit btn btnSubmit pull-right" id="btnCheck"  >
                        {this.state.submitVal?"Submit":"Update"}  
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CompanyPaymentGateway;



 