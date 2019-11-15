import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import './Statements.css';


var ActiveArrayUser =[];
class Statements extends Component{

  constructor(props) {
    super(props);
    this.state = {
      SubscriptionName             : "",
      Validity                     : "",
      Cost                         : "",
      maxCheckIns                  : "",
      formerrors                   :{amenitiesName  : "",},
      subscription                 : {},
      amenitiesIcon                : '',
      amenitiesName                : '',
      totalCount                   : '',
      id                           : '',
      ActiveList                   : [],
      subscriptionData             : "",
      InactiveUsers                : [],
      ActiveArray                  : [],
      editId                       : "",
      offeringTitle                : [],
      AmenitiesList                : [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      editId : this.props.match.params.id
    })
     /*User Subscribed*/
     axios.get('/api/offeringsubscriptions/get/offer_wise_status/all/Active')
      .then( (res)=>{      
        this.setState({
              completeDataCount       : res.data.length,
              subscriptionData        : res.data,          
            },()=>{
              console.log("subscriptionData",this.state.subscriptionData);
        })
      
      })
      .catch((error)=>{
        console.log("error",error);
        if(error.message === "Request failed with status code 401")
          { 
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
      });
      axios.get('/api/offerings/get/all/list/1')
      .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
              offeringTitle : offerings.data,
            })
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });  
      axios.get('/api/offeringsubscriptions/get/offer_wise_status/all/Inactive')
      .then( (inactiveUser)=>{      
        this.setState({
            InactiveUsers : inactiveUser.data,
          })
        console.log("inactiveUser.data",inactiveUser.data);
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });  
  }

  handleChange=(event)=>{
    const target = event.target.value;
    console.log("target",target);
   
     axios.get('/api/offeringsubscriptions/get/offer_wise_status/'+target+'/Active')
      .then( (Active)=>{      
        this.setState({
            
           subscriptionData  : Active.data,
          })
        console.log("subscriptionData",this.state.subscriptionData);
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });
   
  }

  render(){
    const {formerrors} = this.state;
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Subscribed Users for Offerings</h4>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                      <label className="control-label statelabel locationlabel" >Select Offering</label>
                      <span className="astrick">*</span>
                      <select 
                         type="text" name="planName" placeholder="Enter Subscription Name" 
                         className="selectbox" thisitle="Please enter package Name" ref="offeringTitle" onChange={this.handleChange}>
                            <option value="all">All</option>
                             {
                              this.state.offeringTitle.map((a, i)=>{
                                return(
                                  <option value={a._id} id={a._id}>{a.offeringTitle}</option>
                                )
                              })
                            }
                        
                      </select>
                    </div>                     
                  </div> 
                  </div>
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray planContainer mt40 NOpadding">
                    <ul className="nav nav-pills customStack textAlignCenter">
                      <li className="active col-lg-3"><a data-toggle="pill" href="#home">Active User</a></li>
                       <li className=" col-lg-3"><a data-toggle="pill" href="#menu1">Inactive User</a></li>
                    </ul>

                      <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div id="home" className="tab-pane fade in active">
                          <div className="col-lg-12 NOpadding">
                              <table className="table tableCustom table-striped">
                                <thead className="bgThead">
                                  <tr>
                                    <th>Client ID</th>
                                    <th>Name</th>
                                    <th className="text-center">Mobile</th>
                                    <th className="text-center">Mail </th>
                                    <th className="text-center">Start Date</th>
                                    <th className="text-center">End Date</th>
                                    <th className="text-center">Action</th>
                                 </tr>
                                </thead>
                                <tbody>
                                {
                                 this.state.subscriptionData
                                 ? 
                                  this.state.subscriptionData.map((ActiveList, j)=>{
                                  return(
                                    <tr>
                                      <td>{j<99 ? j<9 ? "WL00"+(j+1) : "WL0"+(j+1) : "WL"+(j+1)}</td>
                                      <td>{ActiveList.name}</td>
                                      <td className="text-center">{ActiveList.mobileNumber}</td>
                                      <td className="text-center">{ActiveList.emailId}</td>
                                      <td className="text-center">{ActiveList.startDate}</td>
                                      <td className="text-center">{ActiveList.endDate}</td>
                                      <td className="text-center"><a href={"/uploadStatement/"+ActiveList.offerSub_ID+"-"+ActiveList.user_ID} data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a></td>
                                    </tr>
                                    )
                                  })
                                  :
                                  null

                                } 
                                </tbody>
                              </table>
                          </div>    
                        </div>
                        <div id="menu1" className="tab-pane fade">
                          <div className="col-lg-12 NOpadding">
                              <table className="table tableCustom table-striped">
                                <thead className="bgThead">
                                  <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th className="text-center">Mobile</th>
                                    <th className="text-center">Mail </th>
                                    <th className="text-center">Start Date</th>
                                    <th className="text-center">End Date</th>
                                    <th className="text-center">Action</th>
                                 </tr>
                                </thead>
                                <tbody>
                                  {
                                  this.state.InactiveUsers.length>0?
                                  this.state.InactiveUsers.map((InactiveList, k)=>{
                                  return(
                                    <tr>
                                      <td>{k<99 ? k<9 ? "WL00"+(k+1) : "WL0"+(k+1) : "WL"+(k+1)}</td>
                                      <td>{InactiveList.name}</td>
                                      <td className="text-center">{InactiveList.mobileNumber}</td>
                                      <td className="text-center">{InactiveList.emailId}</td>
                                      <td className="text-center">{InactiveList.startDate}</td>
                                      <td className="text-center">{InactiveList.endDate}</td>
                                      <td className="text-center"><a href={"/uploadStatement/"+InactiveList.offerSub_ID} data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a></td>
                                    </tr>
                                    )
                                  })
                                  :
                                  <tr>
                                    <td className="text-center">No data found.</td>
                                  </tr>
                                } 
                                                                       
                                 
                                </tbody>
                              </table>
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

export default Statements;