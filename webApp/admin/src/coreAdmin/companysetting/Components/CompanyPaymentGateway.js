import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
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
      action         : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    
  }
  componentDidMount() {
    this.getData();
  
  }

  handleChange(event){
    const target = event.target;
    const name   = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  getData(){
    var type = 'PG';
    axios.get('/api/projectsettings/get/'+type)
            .then((response) => {
              console.log("response", response.data);
              
              if(response.data){
                this.setState({
                  environment   : response.data.environment,
                  sandboxAPI    : response.data.sandboxAPI,
                  sandboxKey    : response.data.sandboxKey,
                  sandboxSecret : response.data.sandboxSecret,
                  prodAPI       : response.data.prodAPI,
                  prodKey       : response.data.prodKey,
                  prodSecret    : response.data.prodSecret,
                  action        : "update",
                });
              }             
                
            })
            .catch((error) => {});
}

  submit(event){
    event.preventDefault();
    var formvalue = {
                      "environment"   : $("input[name='environment']:checked").val(),
                      "sandboxAPI"    : this.state.sandboxAPI,
                      "sandboxKey"    : this.state.sandboxKey,
                      "sandboxSecret" : this.state.sandboxSecret,
                      "prodAPI"       : this.state.prodAPI,
                      "prodKey"       : this.state.prodKey,
                      "prodSecret"    : this.state.prodSecret,
                      "type"          : 'PG',
                      "createdBy"     : localStorage.getItem("user_ID")
                     }
          
        console.log("formvalue===>",formvalue);
        if(this.state.action === 'update'){

          axios.patch('/api/projectsettings/patch/PG',formvalue)
          .then((response)=> {
            console.log("response===>",response.data);
            
            swal({                
                  text: "Payment Gateway details added successfully!",
                });
              
            this.getData();
          })
          .catch((error)=> {
            swal({                
                  text: "Failed to add Payment Gateway details!",
                });
          })

        }
        else{
          axios.post('/api/projectsettings/post',formvalue)
          .then((response)=> {
            console.log("response===>",response.data);
            
            swal({                
                  text: "Payment Gateway details added successfully!",
                });
              
            this.getData();
          })
          .catch((error)=> {
            swal({                
                  text: "Failed to add Payment Gateway details!",
                });
          })
        }
          
    
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
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutTitle">(Please Select Razor Pay Environment)</div>
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



 