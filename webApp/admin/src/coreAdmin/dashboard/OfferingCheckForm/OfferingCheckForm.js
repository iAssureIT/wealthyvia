import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import DatePicker           from "react-datepicker";
import Moment               from 'react-moment';
 
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
var result = [];
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
      offeringArray                : [],
      startRange                   : 0,
      limitRange                   : 100,
      tableData                    : "",
      userDetailsDisplay           : "",
      userIdG                      : "",
      subscriptionData             : "",
      usersOfferingStatus          : "",
      userOfferingEndDate          : "",
       userOfferingStartDate       : "",
          
      startDateAlready             : "",
      startDate                    : new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
   
    
    /*Get all users details*/
     var data = {
    "startRange"        : this.state.startRange,
    "limitRange"        : this.state.limitRange, 
    }
    axios.get('/api/users/get/list/'+data.limitRange)
    .then( (res)=>{      
      this.setState({
        userDetailsDisplay : res.data[0],
        userIdG            : res.data[0]._id,
      },()=>{
        axios.get('/api/offeringsubscriptions/get/'+ this.state.userIdG)
          .then( (res)=>{   
          var date =    res.data.startDate;
          console.log("date",date);
            this.setState({
                  userOfferingEndDate       : res.data.endDate,
                  // userOfferingStartDate       : res.data.startDate,
                  subscriptionData        : res.data.offering,          
                },()=>{
                  // console.log("subscriptionData",this.state.subscriptionData);
            })
           /* for(var i=0;i<res.data.length-1;i++)
            {
              if(res.data[i].user_id == this.state.userIdG)
              {
                result = res.data[i].offering;
                this.setState({
                  usersOfferingStatus       :res.data[i].offering,
                },()=>{});
              }
            }*/
          })
          .catch((error)=>{
            console.log("error",error);
            if(error.message === "Request failed with status code 401")
              { 
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
          }); 
      })
      console.log("userDetailsDisplay",this.state.userDetailsDisplay)
      console.log("userIdG",this.state.userIdG)
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
    /*Subscription Details*/
   
    /* Get all Active users
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
    */
    /*Offering Details*/

    axios.get('/api/offerings/get/all/list/1')
      .then( (offerings)=>{      
        this.setState({
              offeringTitle : offerings.data,
            })
        console.log("offeringTitle",this.state.offeringTitle);
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });  

    /* Get all Inactive users

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
    */
 
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
          completeDataCount  : res.data.length,
          userDetailsDisplay : res.data,
          userIdG            : target,


        },()=>{
        axios.get('/api/offeringsubscriptions/get/'+ this.state.userIdG)
          .then( (res)=>{      
            this.setState({
                  userOfferingEndDate       : res.data.endDate,
                  subscriptionData        : res.data.offering,          
                },()=>{
                  console.log("userOfferingSatrtDate",this.state.userOfferingStartDate);

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
      })
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });
  }
  changeAttribute(event){
    var attribute       = event.target.getAttribute('data-attribute');
    var attributeValue  = event.target.getAttribute('data-value');
    var offering_ID     = event.currentTarget.getAttribute('data-ID');      
    var offeringData    = this.state.subscriptionData;
    var getIndex =  offeringData.findIndex(x=>x.offering_ID===offering_ID) 
    if(getIndex>=0){
      if(offeringData[getIndex].offeringStatus==="Active"){
        offeringData[getIndex].offeringStatus="Inactive"
      }else{
        offeringData[getIndex].offeringStatus="Active"
      }
    }  
        // for(var i=0;i<offeringData.length;i++)
        //   {
        //       console.log("offeringData[i].offering_ID->"+offeringData[i].offering_ID +"offering_ID"+offering_ID)
        //     if(offeringData[i].offering_ID == offering_ID)
        //     {
        //       console.log("match",offeringData[i].offeringStatus == "Active")
        //       if(offeringData[i].offeringStatus == "Active")
        //       {
        //         console.log("Making Inactive-",offeringData[i].offeringStatus)
        //         offeringData[i].offeringStatus = "Inactive";
        //         break;
        //       }
        //       else{ 
        //         console.log("Making Active-",offeringData[i].offeringStatus)
        //         offeringData[i].offeringStatus = "Active";
        //         break;
        //       }
        //     }
        //     else{
        //       // res.data.offering[i].offeringStatus = res.data.offering[i].offeringStatus;
        //       console.log("No match",offeringData[i].offeringStatus);
        //     }
        //   }
   
          this.setState({
            subscriptionData        : offeringData,  
          },()=>{
            console.log('subscriptionData', this.state.subscriptionData)
          })
      /*var offeringArray = this.state.offeringArray;
      offeringArray.push({
                            offering_ID:offering_ID,
                            offeringTitle:attributeValue,
                            offeringStatus:"Active",
                         })
      console.log("offeringArray",offeringArray);
      var offeringValues={
          "user_ID"       : this.state.userIdG, 
          "startDate"     : start_Date,
          "endDate"       : "",
          "offeringArray" :offeringArray,
        }
        console.log("offeringValues",offeringValues);*/
  }

  submitChanges(event){
    var start_Date = this.state.startDate;
    start_Date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(start_Date);
    
    var offeringValues={
          "user_ID"       : this.state.userIdG, 
          "startDate"     : start_Date,
          "endDate"       : "",
          "offering"      :this.state.subscriptionData,

     }
     console.log("offeringValues",offeringValues);
     axios.post('/api/offeringsubscriptions/post',offeringValues)
        .then((response)=>{
         console.log("response",response);
         if(response.startDate !== "")
         {
          this.setState({
            startDateAlready : response.startDate
          })
         }
         if(response)
         {
           swal({
            title: 'Congratulation!',
            text: 'Offering details added successfully',
            buttons: [
              "Cancel",
              'Ok'
            ],
            }).then((option)=> {
              console.log("option---->",option)
               window.location.reload();
              
            });
          }
        })
        .catch((error)=>{
          console.log('error', error);
        })
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
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <form id="CompanySMSGatewayForm" className="borderOfOuter"  >
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
                        {console.log("this.state.userOfferingStartDate",this.state.userOfferingStartDate)}
                      <DatePicker
                        selected={this.state.userOfferingStartDate ? this.state.userOfferingStartDate :this.state.startDate}
                        onChange={this.getDate}
                        className="customDatePicker"
                        dateFormat="yyyy-MM-dd"
                        disabled ={this.state.userOfferingStartDate ? true : false}

                      />
                    </div>
                    <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label className="fromHead">End Date<span className="redFont">*</span></label>
                      <div className="">
                         <input type="text" ref="pageUrl" id="basicPageName" value={this.state.userOfferingEndDate} name="basicPageName"  className="customDatePicker col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid hinput30" onChange={this.handleChange.bind(this)} disabled/>
                      </div>
                   </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 NOpadding table-responsive mt20">

                          <table className="table tableCustomOC table-striped col-lg-12">
                            <thead className="bgThead">
                              <tr>

                                {
                                  this.state.subscriptionData?
                                  this.state.subscriptionData.map((b, j)=>{
                                    return(
                                            <th className="text-center" key={j+b.offeringStatus}>{b.offeringTitle}</th>
                                        )
                                      }):
                                      null
                                  } 
                              </tr>
                                                     
                            </thead>
                            <tbody>     
                            <tr>  
                            {
                              this.state.subscriptionData?
                              this.state.subscriptionData.map((b,j)=>{
                                  return(
                                         <td className="col-lg-1 textAlignCenter" key={j+b.offeringTitle}>
                                             <i  data-ID={b.offering_ID} data-value={b.offeringTitle} data-attribute={this.state.userIdG} onClick={this.changeAttribute.bind(this)}  className={'prodCheckboxDim ' + (this.state.subscriptionData ? b.offeringStatus  == "Active" ? " fa fa-check prodCheckboxDimSelected" : " fa fa-times prodCheckboxDimNotSelected" : " fa fa-check prodCheckboxDimNotSelected")} aria-hidden="true"></i>
                                          </td>  
                                                                                   
                                        )
                                      })
                              :null
                                } 

                                 </tr>
                               </tbody>
                          </table>
                    </div>
                  </div>   
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 submitOffering pull-right" onClick={this.submitChanges.bind(this)}>
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