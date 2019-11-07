import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import DatePicker           from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import './OfferingCheckForm.css';

const formValid = formerrors=>{
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
const amenitiesNameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
var ActiveArrayUser =[];
class OfferingCheckForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      SubscriptionName             : "",
      formerrors                   :{amenitiesName  : "",},
      subscription                 : {},
      totalCount                   : '',
      id                           : '',
      ActiveList                   : [],
      InactiveUsers                : [],
      ActiveArray                  : [],
      editId                       : "",
      offeringTitle                : [],
      AmenitiesList                : [],
      startRange                   : 0,
      limitRange                   : 100,
      tableData                    : "",
      userDetailsDisplay           : "",
      startDate                    : new Date(),


    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      editId : this.props.match.params.id
    })

    /*Get all users details*/
     var data = {
    "startRange"        : this.state.startRange,
    "limitRange"        : this.state.limitRange, 
    }
    axios.get('/api/users/get/list/'+data.limitRange)
    .then( (res)=>{      
      this.setState({
        userDetailsDisplay : res.data[0],
      })
      console.log("userDetailsDisplay",this.state.userDetailsDisplay)
      var tableData = res.data.map((a, i)=>{
        return {
          _id             : a._id,
          userId          : "WL00"+(i+1),
          fullName        : a.fullName ? a.fullName : "-",
          email           : a.email ? a.email : "-",
          mobNumber       : a.mobNumber ? a.mobNumber : "-", 
          status          : a.status ? a.status : "-",  
          role            : a.role[0] ? a.role[0] : "-",
          checked         : false,
        }
      })
      this.setState({
          completeDataCount : res.data.length,
          tableData         : tableData,
        },()=>{
        })
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });

    /* Get all Active users*/
    axios
      .get('/api/subscriptionorders/get/usersOfferOrderStatus/Active')
      .then((response)=> {
          if(response.data){            
                this.setState({
                  ActiveList : response.data,
              });
          }
    })
    .catch(function (error) {
      console.log(error);
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });

    axios.get('/api/offerings/get/all/list/1')
      .then( (offerings)=>{      
        this.setState({
              offeringTitle : offerings.data,
            })
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });  

    /* Get all Inactive users*/


    axios.get('/api/subscriptionorders/get/usersOfferingStatus/all/Inactive')
    .then( (inactiveUser)=>{      
      this.setState({
          InactiveUsers : inactiveUser.data,
        })
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });  
  }
  getDate = date => {
    this.setState({
      startDate: date
    });
    console.log("startDate",this.state.startDate);
  };
  handleChange=(event)=>{
    const target = event.target.value;

    /*Get details of perticular user*/
     axios.get('/api/users/get/'+target)
    .then( (res)=>{      

      this.setState({
          completeDataCount : res.data.length,
          userDetailsDisplay : res.data,
        },()=>{
          console.log("userDetailsDisplay",this.state.userDetailsDisplay);
        })
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });
/*==========================*/
    if(target != "all")
    {
     axios.get('/api/subscriptionorders/get/usersOfferingStatus/'+target+'/Active')
      .then( (Active)=>{      
        this.setState({
            ActiveList : Active.data,
          })
      })
      .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });
    }else{
      axios
      .get('/api/subscriptionorders/get/usersOfferOrderStatus/Active')
      .then((response)=> {
        if(response.data){            
              this.setState({
                ActiveList : response.data,
            });
        }
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });  

    }
  }

  render(){
    const {formerrors} = this.state;
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Select Offerings for Client</h4>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                <div className=" formht  col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="">
                    <label className="control-label statelabel fromHead locationlabel" >Select Client</label>
                    <span className="astrick">*</span>
                    <select 
                       type="text" name="planName" placeholder="Enter Subscription Name" 
                       className="selectbox" thisitle="Please enter package Name" ref="offeringTitle" onChange={this.handleChange}>
                         {
                          this.state.tableData?
                          this.state.tableData.map((a, i)=>{
                            return(
                              <option value={a._id} id={a._id}>{a.fullName} ({a.userId})</option>
                            )
                          })
                          :
                          <option value="" id="">No data found</option>

                        }
                    
                    </select>

                  </div>                     
                </div>
                <div className=" formht col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <label className="control-label statelabel  locationlabel" >Client Details</label><br/>
                    {
                      this.state.userDetailsDisplay?

                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt20">
                                <label className="fromHead">{this.state.userDetailsDisplay.fullName}</label><br/>
                                <label className="fromHead">{this.state.userDetailsDisplay.mobNumber}</label><br/>
                                <label className="fromHead">{this.state.userDetailsDisplay.email}</label><br/>
                              </div>
                            
                          :
                          <label value="" id="">No data found</label>
                    }

                  </div>   
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding ">
                    <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label className="fromHead">Start Date<span className="redFont">*</span></label><br/>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.getDate}
                        className="customDatePicker"
                        dateFormat="dd-MM-yyyy"

                      />
                    </div>
                    <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>End Date</label>
                      <div className="">
                        
                         <input type="text" ref="pageUrl" id="basicPageName" value={this.state.pageUrl} name="basicPageName"  className="customDatePicker col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid hinput30" onChange={this.handleChange.bind(this)} disabled/>
                      </div>
                   </div>
                  </div>
                  <div className="col-lg-12 NOpadding table-responsive">
                        <table className="table tableCustom table-striped col-lg-12">
                          <thead className="bgThead">
                            <tr>

                            {/*  <th className="text-center">5GCPM</th>
                              <th className="text-center">Safe Heavan</th>
                              <th className="text-center">SHM Alpha Enhancer</th>
                              <th className="text-center">US Stocks</th>
                              <th className="text-center">Fly Nifty</th>
                              <th className="text-center">Multibagger</th>*/}
                               {
                                this.state.offeringTitle.map((b, j)=>{
                                  return(
                                          <th className="text-center">{b.offeringTitle}</th>
                                      )
                                    })
                                } 
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          <tr>  
                          {
                            this.state.offeringTitle.map((b, j)=>{
                                return(
                                       <td className="col-lg-1 textAlignCenter">
                                           <i  className={'fa fa-check-circle prodCheckboxDim ' + (this.state.offeringTitle == "Active" ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td>  
                                                                                 
                                      )
                                    })
                              } 

                               </tr>
                             </tbody>
                        </table>
                  </div>   
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 submitOffering pull-right">
                        Submit
                  
                    </div> 
                  </div>                           
                </div> 
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default OfferingCheckForm;