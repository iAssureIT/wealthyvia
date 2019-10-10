import React, { Component }     from 'react';
import { render }               from 'react-dom';
import $ from "jquery";
import swal from 'sweetalert';

import axios from 'axios';

axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const companycontact  = RegExp(/^[0-9][0-9]{9}$|^$/);
const companylocation = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const companybuilding = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const companynameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const companypincodeRegex = RegExp(/^[1-9][0-9]{5}$/);
class CompanyLocation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      companyLocation       : "",
      companyId             : "",
      locationID            : "",
      companycontact        : "", 
      companyaltcontact     : "",
      companybuildingblock  : "",
      companylandmark       : "",
      companyCountry        : "",
      companyState          : "",
      companyDist           : "",
      taluka                : "",
      companyCity           : "",
      companyPincode        : "",
      submitVal             : true,
      formerrors            :{
                              companylocation : " ",
                              companyMobile : " ",
                              companyArea  : " ",
                              country : " ",
                              district : " ",
                              state : " ",
                              taluka : " ",
                              city : " ",
                              pincode : " ",
                             },
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount(){
    axios
      .get('/api/companysettings/list')
      .then((response)=>{
        console.log("get list companyLocationsInfo.............",response.data[0].companyLocationsInfo[0]);
        var respData = response.data[0].companyLocationsInfo[0];
        if(response.data[0].companyLocationsInfo.length>0){
        console.log("Inside Outside...........");
          this.setState({
                        locationID            : respData._id,
                        companyId             : response.data[0].companyId,
                        companyLocation       : respData.Location,
                        companycontact        : respData.contactnumber, 
                        companybuildingblock  : respData.blockname,
                        companylandmark       : respData.landmark,
                        companyCountry        : respData.companyCountry,
                        companyState          : respData.companyState,
                        companyDist           : respData.companyDistrict,
                        taluka                : respData.companytaluka,
                        companyCity           : respData.companyCity,
                        companyPincode        : respData.companyPincode,
                        submitVal             : false,
                        formerrors            :{
                                                companylocation : "",
                                                companyMobile : "",
                                                companyArea  : "",
                                                country : "",
                                                district : "",
                                                state : "",
                                                taluka : "",
                                                city : "",
                                                pincode : "",
                                               },
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
  
  handleChange(event){
    // const target = event.target;
    // const {name , value}   = event.target;
    const datatype = event.target.getAttribute('data-text');
    const {name,value} = event.target;
    let formerrors = this.state.formerrors;
    
    console.log("datatype",datatype);
    switch (datatype){
     
      case 'companylocation' : 
       formerrors.companylocation = companylocation.test(value)  && value.length>0 ? '' : "Please Enter valid reuirement";
       break;

       case 'companyMobile' : 
       formerrors.companyMobile = companycontact.test(value)  && value.length>0 ? '' : "Please Enter Numbers only";
       break;

       case 'companyArea' : 
        formerrors.companyArea = companybuilding.test(value)   && value.length>0? '' : "Please Enter valid reuirement";
       break;
       
      case 'country' : 
      formerrors.country = companynameRegex.test(value)   && value.length>0? '' : "Invalid Field";
      break;
    
      case 'state' : 
        formerrors.state = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
      break;
    
      case 'district' : 
        formerrors.district = companynameRegex.test(value)   && value.length>0? '' : "Invalid Field";
      break;

      case 'taluka' : 
        formerrors.taluka = companynameRegex.test(value)   && value.length>0? '' : "Invalid Field";
      break;

      case 'city' : 
        formerrors.city = companynameRegex.test(value)   && value.length>0? '' : "Invalid Field";
      break;

      case 'pincode' : 
        formerrors.pincode = companypincodeRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
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
   
 
  submitCompanyLocation(event){
    event.preventDefault();
    // var sessionVar = Session.get('location');
    var companyLocationFormValue ={
      Location                  : this.state.companyLocation,
      contactnumber             : this.state.companycontact,
      blockname                 : this.state.companybuildingblock,
      landmark                  : this.state.companylandmark,
      companyCountry            : this.state.companyCountry,
      companyState              : this.state.companyState,   
      companyDistrict           : this.state.companyDist,
      companytaluka             : this.state.taluka,
      companyCity               : this.state.companyCity,
      companyPincode            : this.state.companyPincode,
      companyId                 : 1,
    }
    var companyLocationFormValueUpdate ={
      Location                  : this.state.companyLocation,
      contactnumber             : this.state.companycontact,
      blockname                 : this.state.companybuildingblock,
      landmark                  : this.state.companylandmark,
      companyCountry            : this.state.companyCountry,
      companyState              : this.state.companyState,   
      companyDistrict           : this.state.companyDist,
      companytaluka             : this.state.taluka,
      companyCity               : this.state.companyCity,
      companyPincode            : this.state.companyPincode,
      locationID                : this.state.locationID,
      companyId                 : 1,
    }
    console.log('companyLocationFormValue',companyLocationFormValueUpdate)

    if(this.state.companyId == "1"){
      if(formValid(this.state.formerrors)){
        axios.patch('/api/companysettings/companyLocationsInfo',companyLocationFormValueUpdate)
        .then(function (response) {
          console.log(response);
          swal("Great","Location added successfully","success")
        })
        .catch(function (error) {
          console.log(error);
          swal("", "Company location submition failed!", "error")
            if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
        })
        .finally(function () {
        });
      }else{
        swal("Please enter mandatory fields", "", "warning");
        console.error("FORM INVALID 1- DISPLAY ERROR MESSAGE");
      }
    }else{
      if(formValid(this.state.formerrors)){
        axios.patch('/api/companysettings/companyLocationsInfo',companyLocationFormValue)
        .then(function (response) {
          console.log(response);
          swal("Great","Location added successfully","success")
        })
        .catch(function (error) {
          console.log(error);
          swal("", "Company location submition failed!", "error")
            if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
        })
        .finally(function () {
        });
      }else{
        swal("Please enter mandatory fields", "", "warning");
        console.error("FORM INVALID 2- DISPLAY ERROR MESSAGE");
      }
    }
}

  render(){
    const {formerrors} = this.state;
    return(
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 companyDisplayForm zzero">
             {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 Box-Bottom-Header">
                <h4 className="lettersp MasterBudgetTitle">Location Details</h4>
              </div>*/}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border_box1">
                <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Location Details</h5>
              </div>
               <hr className="compySettingHr" />
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <form id="companyLocationForm" className="companyLocationForm">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  compForm">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className=" formht pdcls col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="">
                            <label className="controllabel statelabel locationlabel" >Company Location</label><span className="astrick">*</span>
                           <div className="input-group inputBox-main  new_inputbx " >
                            <div className="input-group-addon inputIcon">
                            <i className="fa fa-map-marker"></i>
                           </div>   
                            <input value={this.state.companyLocation} onChange={this.handleChange} placeholder="Location" 
                            data-text="companylocation" type="text" title="Please enter valid location" 
                            id="companyLocation" name="companyLocation" className="form-control CLcompanyLocation newinputbox inputValid" required/>
                            </div>
                            {this.state.formerrors.companylocation &&(
                              <span className="text-danger">{formerrors.companylocation}</span> 
                            )}
                        </div>
                    </div> 
                  </div>
                 
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="formht pdcls col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="">
                            <label className="control-label statelabel locationlabel" >Contact Number</label><span className="astrick">*</span>
                            <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                              <i className="fa fa-mobile"></i>
                            </div>  
                            <input id="companycontact" value={this.state.companycontact} onChange={this.handleChange} 
                            data-text="companyMobile"  type="text" name="companycontact" title="Please enter valid number" 
                            className="form-control companyNo newinputbox inputValid " required placeholder="Contact"/>
                           </div> 
                            {this.state.formerrors.companyMobile &&(
                              <span className="text-danger">{formerrors.companyMobile}</span> 
                            )}
                        </div>
                    </div> 
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                
                  
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                    <div className=" formht pdcls col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="">
                            <label className="control-label statelabel locationlabel" >Block Name/Building</label>
                            <span className="astrick">*</span>
                            <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                               <i className="fa fa-building"></i>
                            </div>  
                            <input value={this.state.companybuildingblock} onChange={this.handleChange} 
                            data-text="companyArea" type="text" id="companybuildingblock" placeholder="Building/Name"
                             title="Please enter valid address" name="companybuildingblock" 
                             className="form-control CLcompanyAddress newinputbox inputValid " required/>
                            </div> 
                            {this.state.formerrors.companyArea &&(
                              <span className="text-danger">{formerrors.companyArea}</span> 
                            )}
                        </div>
                    </div> 
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="formht pdcls col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="">
                            <label className="control-label statelabel locationlabel" >Near by Landmark</label>
                             <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                             <i className="fa fa-map-marker"></i>
                            </div> 
                             <input value={this.state.companylandmark} onChange={this.handleChange} type="text"
                              id="companylandmark"  name="companylandmark" placeholder="Landmark"
                              className="form-control CLcompanylandmark newinputbox inputValid" />
                             </div> 
                        </div>
                    </div> 
                  </div>
                  

                </div>

                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  {/* <div className="formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                  <div className="form-group">
                      <label className="control-label statelabel locationlabel" >Country<span className="astrick">*</span></label>
                      <select className="stateselection countrySelect form-control" title="Please select country" id="companyCountry" value={this.state.companyCountry}  ref="companyCountry" name="companyCountry" onChange={this.handleChange} required>
                      <option value="">-Select-</option>
                    
                      </select>
                  </div>
                  </div>
                  <div className="formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <div className="form-group">
                      <label className="control-label statelabel locationlabel" >State<span className="astrick">*</span></label>
                      <select className="stateselection stateSelect form-control" title="Please select state" id="companyState" value={this.state.companyState}  ref="companyState" name="companyState" onChange={this.handleChange} required>
                        <option value="">-Select-</option>
                      
                        </select> 
                    </div> 
                  </div>
                  <div className="formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <div className="form-group">
                          <label className="control-label statelabel locationlabel" >District<span className="astrick">*</span></label>
                         <select className="stateselection districtSelect form-control" title="Please select district" id="companyDist" value={this.state.companyDist}  ref="companyDist" name="companyDist" onChange={this.handleChange} required>
                         <option value="">-Select-</option>
                       
                        </select> 
                    </div>
                  </div> */}

                  <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            Country
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                              <i className="fa fa-flag"></i>
                            </div>   
                          <input
                            onChange={this.handleChange} 
                            type="text" name="companyCountry" 
                            data-text="country" placeholder="Country"
                            className="form-control newinputbox areaStaes"
                            value={this.state.companyCountry}
                            title="Please enter alphanumeric only" />
                           </div> 
                          
                          {this.state.formerrors.country &&(
                            <span className="text-danger">{formerrors.country}</span> 
                          )}

                      </div>  
                    </div>

                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            State
                          </label>
                          <span className="astrick">*</span>
                           <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                              <i className="fa fa-crosshairs"></i>
                             </div>  
                          <input
                            onChange={this.handleChange} 
                            type="text" name="companyState" 
                            data-text="state"
                            className="form-control newinputbox areaStaes"
                            value={this.state.companyState} placeholder="State"
                            title="Please enter alphanumeric only" />
                           </div> 
                          
                          {this.state.formerrors.state &&(
                            <span className="text-danger">{formerrors.state}</span> 
                          )}

                      </div>  
                    </div>

                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            District
                          </label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                               <i className="fa fa-crosshairs"></i>
                            </div>    
                          <input
                            onChange={this.handleChange} 
                            type="text" name="companyDist" 
                            data-text="district" placeholder="District"
                            className="form-control newinputbox areaStaes"
                            value={this.state.companyDist}
                            title="Please enter alphanumeric only" />
                           </div>
                          {this.state.formerrors.district &&(
                            <span className="text-danger">{formerrors.district}</span> 
                          )}

                      </div>  
                    </div>

                  </div>
                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                    {/* <div className="formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >Taluka<span className="astrick">*</span></label>
                           <select className="stateselection talukaSelect form-control" title="Please select taluka" id="taluka" value={this.state.taluka}  ref="taluka" name="taluka" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                         
                          </select>  
                      </div>
                    </div>
                    <div className="formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >City<span className="astrick">*</span></label>
                           <select className="stateselection villageSelect form-control" title="Please select city" id="companyCity" value={this.state.companyCity}  ref="companyCity" name="companyCity" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                          
                          </select> 
                      </div>
                    </div>
                    <div className="formht col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <label className="control-label statelabel locationlabel" >Pin Code<span className="astrick">*</span></label>
                          <select className="stateselection  form-control" title="Please select pincode" id="companyPincode" value={this.state.companyPincode} ref="companyPincode" name="companyPincode" onChange={this.handleChange} required>
                          <option value="">-Select-</option>
                        
                          </select>
                      </div>
                    </div> */}
                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            Taluka
                          </label>
                          <span className="astrick">*</span>
                            <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                              <i className="fa fa-crosshairs"></i>
                            </div>  
                          
                          <input
                            onChange={this.handleChange} 
                            type="text" name="taluka" 
                            data-text="taluka"
                            value={this.state.taluka}
                            className="form-control newinputbox areaStaes"
                            title="Please enter alphanumeric only" placeholder="Taluka" />
                           </div> 
                          
                          {this.state.formerrors.taluka &&(
                            <span className="text-danger">{formerrors.taluka}</span> 
                          )}

                      </div>  
                    </div>


                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            City
                          </label>
                          <span className="astrick">*</span>
                           <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                               <i className="fa fa-crosshairs"></i>
                            </div>  
                          
                          <input
                            onChange={this.handleChange} 
                            type="text" name="companyCity" 
                            data-text="city" placeholder="City"
                            value={this.state.companyCity}
                            className="form-control newinputbox areaStaes"
                            title="Please enter alphanumeric only" />
                           </div> 
                          
                          {this.state.formerrors.city &&(
                            <span className="text-danger">{formerrors.city}</span> 
                          )}

                      </div>  
                    </div>


                    <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="">
                          <label className="control-label statelabel locationlabel" >
                            Pincode
                          </label>
                          <span className="astrick">*</span>
                           <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon inputIcon">
                               <i className="fa fa-crosshairs"></i>
                            </div>    
                          <input
                            onChange={this.handleChange} 
                            type="number" name="companyPincode" 
                            data-text="pincode" placeholder="Pincode"
                            value={this.state.companyPincode}
                            className="form-control newinputbox areaStaes"
                            title="Please enter alphanumeric only" />
                           </div> 
                          
                          {this.state.formerrors.pincode &&(
                            <span className="text-danger">{formerrors.pincode}</span> 
                          )}

                      </div>  
                    </div>
                  

                  </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginBtmDiv">
                  {/* <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn btnSubmit pull-right" id="btnCheck" onClick={this.submitCompanyLocation.bind(this)}>Submit</button> */}

                  <button className=" btn buttontAddEdit pull-right" id="btnCheck" onClick={this.submitCompanyLocation.bind(this)} >
                    {this.state.submitVal?"Submit":"Update"}  
                  </button>
                </div>
                </div>
              </form>
              
            </div>
        </div>
      </div>


      );
  }

 }

export default CompanyLocation;
