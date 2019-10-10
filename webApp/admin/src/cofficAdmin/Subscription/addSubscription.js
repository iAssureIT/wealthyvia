import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import renderHTML           from 'react-render-html';
import CKEditor             from "react-ckeditor-component";
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import './addSubscription.css';

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
}
const numberRegex  = RegExp(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/);

class addSubscription extends Component{
  constructor(props) {
    super(props);
    this.state = {
      planName                     : "",
      maxCheckIns                  : "",
      price                        : "",
      discount                     : "",
      validityDays                 : "",
      description                  : "",
      totalCount                   : '',
      id                           : '',
      editId                       : '',
      SubscriptionList             : [],
      formerrors                   : {
                                      discount:"",
                                     },
    };
   
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSubscriptionList = this.getSubscriptionList.bind(this);
  }

  componentDidMount() {
    this.getSubscriptionList();   
    if(this.props.match.params.id){
      var id = this.props.match.params.id;
    this.setState({
      id : id,
      editId: id
    })
    this.props.history.push('/addSubscription/'+id);
     axios
        .get('/api/subscriptionplan/get/one/'+id)
        .then((response)=> {
          console.log("res------>",response.data);
          this.setState({
            'planName'         : response.data.planName,
            'maxCheckIns'      : response.data.maxCheckIns,
            'price'            : response.data.price,
            'discount'         : response.data.discount,
            'validityDays'     : response.data.validityDays,
            'description'      : response.data.description,
            'createdBy'        : response.data.createdBy,
            'createAt'         : response.data.createAt,
          })    
        })
        .catch(function (error) {
            console.log(error);
            if(error.message === "Request failed with status code 401")
              {
                swal("Your session is expired! Please login again.","", "error");
                this.props.history.push("/");
              }
        });
      }
  }

  submitSubscriptionInfo=(event)=>{
    event.preventDefault();   
    var subscriptionInfoFormValuePost = {
            'planName'         : this.state.planName,
            'maxCheckIns'      : this.state.maxCheckIns,
            'price'            : this.state.price,
            'discount'         : this.state.discount,
            'validityDays'     : this.state.validityDays,
            'description'      : this.state.description,
            'createdBy'        : "Admin",
    }    
    var subscriptionInfoFormValueUpdate = {
            'plan_id'          : this.state.id,
            'planName'         : this.state.planName,
            'maxCheckIns'      : this.state.maxCheckIns,
            'price'            : this.state.price,
            'discount'         : this.state.discount,
            'validityDays'     : this.state.validityDays,
            'description'      : this.state.description,
            'updatedBy'        : "Admin",
    }   
      if(this.state.planName && this.state.maxCheckIns  && this.state.price && this.state.validityDays){
        if(this.props.match.params.id){
          if(formValid(this.state.formerrors)){
            console.log("subscriptionInfoFormValueUpdate--",subscriptionInfoFormValueUpdate ); 
             axios
                .patch('/api/subscriptionplan/patch/update/'+this.state.id,subscriptionInfoFormValueUpdate)
                .then( (response)=> {
                  swal("Good job!", "Subscription details updated!", "success");
                  this.getSubscriptionList();
                  this.props.history.push('/addSubscription');
                  this.setState({
                    planName                     : "",
                    maxCheckIns                  : "",
                    price                        : "",
                    discount                     : "",
                    validityDays                 : "",
                    description                  : "",
                    editId                       : ""
                  })
                })
                .catch(function (error) {
                  console.log(error);
                  swal("Oops...", "Subscription details updation failed!", "warning");
                  if(error.message === "Request failed with status code 401")
                    {
                      swal("Your session is expired! Please login again.","", "error");
                      this.props.history.push("/");
                    }
                })
                }else{
                  swal("Oops...","Entered percentage value is wrong","warning");
                }
        }else{
          console.log("subscriptionInfoFormValuePost",subscriptionInfoFormValuePost ); 
          if(formValid(this.state.formerrors)){
          axios
            .post('/api/subscriptionplan/post',subscriptionInfoFormValuePost)
            .then( (response)=> {
              if(response.data=="Subscription Plan Already exists"){
                swal("Oops...", "Record already exists", "warning");
              }else{
                swal("Good job!", "Subscription Submitted!", "success");
                this.getSubscriptionList();
                this.setState({
                    planName                     : "",
                    maxCheckIns                  : "",
                    price                        : "",
                    discount                     : "",
                    validityDays                 : "",
                    description                  : "",
                  })
              }
            })
            .catch(function (error) {
              console.log(error);
              swal("Oops...", "Subscription submition failed!", "warning");
              if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
            })
            }else{
              swal("Oops...","Entered percentage value is wrong","warning");
            }
          }
      }else{
        swal("", "Please fill mandatory fields", "warning");
      }
     
  }
  getSubscriptionList(){
    axios
        .get('/api/subscriptionplan/get/list')
        .then((response)=> {
          console.log("response======>",response);
            if(response.data){             
                  var count = (response.data).length;
                  this.setState({
                    SubscriptionList : response.data,
                    totalCount       : count
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
  }

  handleChangeSelect(event){
    var selectVal = this.refs.planName.value;
    this.setState({
      "planName" : selectVal
    });
    console.log(" event.target.value", selectVal);
  }

  deleteItem=(event)=>{
    event.preventDefault();
    var id = event.target.getAttribute('data-id');
    if(id){
      swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this information!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                 axios
                      .delete('/api/subscriptionplan/delete/'+id)
                      .then((response)=> {
                        console.log("delete---res",response);
                        if(response.data=='Deleted Successfully'){
                          swal("Subscription deleted successfully");
                          this.getSubscriptionList(); 
                          // $('#myModal'+this.state.deleteId).css('display','none');                   
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

            } else {
              swal("Your Subscription is safe!");
            }
          });
    }
  }

  editItem=(event)=>{
    event.preventDefault();
    $("html,body").scrollTop(0);
    var id = event.target.getAttribute('data-id');
    this.setState({
      id : id,
      editId: id
    })
    this.props.history.push('/addSubscription/'+id);
     axios
        .get('/api/subscriptionplan/get/one/'+id)
        .then((response)=> {

          console.log("res------>",response.data);
          this.setState({
            'planName'         : response.data.planName,
            'maxCheckIns'      : response.data.maxCheckIns,
            'price'            : response.data.price,
            'validityDays'     : response.data.validityDays,
            'discount'         : response.data.discount,
            'description'      : response.data.description,
            'createdBy'        : response.data.createdBy,
            'createAt'         : response.data.createAt,
          })
            
        })
        .catch(function (error) {
            console.log(error);
            if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
        });
  }

// submitSubscriptionInfo=(event)=>{
//     event.preventDefault();
   
//    //close array

//     console.log("subscriptionInfoFormValue",subscriptionInfoFormValue);
//      axios.post('http://cofficapi.iassureit.com/api/subscription',{subscriptionInfoFormValue})
//     .then(function (response) {
//       // handle success
//       console.log("this is response===>>>",response);
//       swal("Good job!", "Subscription Information Submitted!", "success")
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//       swal("", "Subscription Information  failed to submit!", "Danger")

//     })
//     .finally(function () {
//       // always executed
//     });

  
//   }

   handleChange(event){
    const target = event.target;
    const name   = target.name;
    this.setState({
      [name]: event.target.value,
    });

    // const target = event.target;
    // const {name , value}   = event.target;
    const datatype = event.target.getAttribute('name');
    console.log('==>>',datatype);
    const {name1,value} = event.target;
    let formerrors = this.state.formerrors;

    switch (datatype){
      case 'discount' : 
        formerrors.discount = numberRegex.test(value)   && value.length>0? '' : "Invalid percentage value";
      break;
      default :
      break;
    }
    // this.setState({formerrors,})
    this.setState({formerrors,
      [name1]:value
    } );
  }

  

  componentWillReceiveProps(nextProps) {

    
  }


  onChange(evt){
    var newContent = evt.editor.getData();
    console.log("onChange fired with event info: ", newContent);
    this.setState({
      description: newContent
    },()=>{
      if(this.state.content){
        this.setState({
          contentError : ''
        });
      }else{
        this.setState({
          contentError : 'This field is required'
        })
      }
    })
  }

  render(){
    console.log("this.state.SubscriptionList",this.state.SubscriptionList);
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Subscription Details</h4>
         </div>
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noborder">
          <h5 className="h5Title  col-lg-12 col-md-12 col-sm-12 col-xs-12">Create Subscription Packages</h5>
         </div>
           <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls"> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                   <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Subscription Name</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                          <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                          </div>   
                          <select onChange={this.handleChangeSelect.bind(this)} ref="planName"
                             type="text" name="planName" placeholder="Enter Subscription Name" value={this.state.planName} 
                             className="selectbox" title="Please enter package Name">
                              <option >----Select Package----</option>
                              <option>Monthly Package</option>
                              <option>Weekly Package</option>
                              <option>Daily Package</option>     
                          </select>
                       </div> 
                       {/* {this.state.formerrors.companytaxtype &&(
                          <span className="text-danger">{this.state.formerrors.companytaxtype}</span> 
                        )}*/}
                    </div>  
                  </div>
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Number of Check-ins</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="maxCheckIns" placeholder="Enter Number of Check-ins" onChange={this.handleChange}
                         type="number" name="maxCheckIns" ref="maxCheckIns" value={this.state.maxCheckIns}
                         className="form-control areaStaes newinputbox" title="maxCheckIns" autoComplete="off"  />
                        </div> 
                       {/* {this.state.formerrors.companytaxrate &&(
                          <span className="text-danger">{this.state.formerrors.companytaxrate}</span> 
                        )}*/}
                    </div>  
                  </div>  
                 </div> 
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                   <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Validity in Days</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="validityDays"  onChange={this.handleChange}
                          type="number" name="validityDays" placeholder="Enter Validity" value={this.state.validityDays}
                          className="form-control areaStaes newinputbox" title="Please enter validity of plan" />
                       </div> 
                       {/* {this.state.formerrors.companytaxtype &&(
                          <span className="text-danger">{this.state.formerrors.companytaxtype}</span> 
                        )}*/}
                    </div>  
                  </div>
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Cost(INR)</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="price"  onChange={this.handleChange} value={this.state.price}
                         type="number" name="price" placeholder="Enter Cost" ref="price"
                        className="form-control areaStaes newinputbox" title="Please enter total price of package" />
                       </div> 
                       {/* {this.state.formerrors.companytaxtype &&(
                          <span className="text-danger">{this.state.formerrors.companytaxtype}</span> 
                        )}*/}
                    </div>  
                  </div>
                </div>                 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                   <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Discount (in %)</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-building"></i>
                         </div>  
                        <input id="discount"  onChange={this.handleChange} max="100"
                         type="number" name="discount" placeholder="Enter discount" value={this.state.discount}
                          className="form-control areaStaes newinputbox" title="Please enter validity of plan" />
                       </div> 
                        {this.state.formerrors.discount &&(
                          <span className="text-danger">{this.state.formerrors.discount}</span> 
                        )}
                    </div>  
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                      <label className="control-label statelabel locationlabel" >Description</label>
                      <span className="astrick">*</span>
                    </div>
                        {/*<input id="Description"  onChange={this.handleChange} value={this.state.Description}
                         type="text" name="Description" placeholder="Enter Descriptiont" ref="Description"
                        className="form-control areaStaes newinputbox" title="Please enter alphanumeric only" />
                       */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">  
                      <CKEditor activeClass="p15" id="editor" className="templateName" content={this.state.description} events={{"change": this.onChange}}/>
                    </div> 
                       {/* {this.state.formerrors.companytaxtype &&(
                          <span className="text-danger">{this.state.formerrors.companytaxtype}</span> 
                        )}*/}
                  </div>
                 </div> 
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marTop20 marginBtmDiv">
                <button className="btn buttontAddEdit pull-right" id="btnCheck" onClick={this.submitSubscriptionInfo.bind(this)}>{this.state.editId==''?"Submit":"Update"}  </button>
              </div>
              <div className="col-lg-12">
                <table className="table tableCustom table-striped">
                  <thead className="bgThead">
                    <tr>
                      <th>Subscription Name</th>
                      <th className="text-center">No. of Check-ins</th>
                      <th className="text-center">Validity in Days</th>
                      <th className="text-center">Cost</th>
                      <th className="text-center">Discount</th>
                      <th className="text-center">Description</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  {this.state.SubscriptionList.length>0?
                    <tbody>
                      {this.state.SubscriptionList.map((itemData,index)=>{
                        var textcontent = renderHTML(itemData.description );                                   
                          return (
                              <tr key={index}>
                                <td className="text-left">{itemData.planName}</td>
                                <td className="text-center">{itemData.maxCheckIns}</td>
                                <td className="text-center">{itemData.validityDays}</td>
                                <td className="text-center">{itemData.price}</td>
                                <td className="text-center">{itemData.discount}</td>
                                <td className="text-left">{textcontent}</td>
                                <td className="text-center">
                                  <i className="fa fa-pencil cptr" title="Edit" data-id={itemData._id} onClick={this.editItem}>
                                  </i>&nbsp;&nbsp;&nbsp;&nbsp;
                                  <i className="fa fa-trash cptr" title="Delete" data-id={itemData._id} onClick={this.deleteItem} data-toggle="modal" aria-labelledby="myModal" data-target={"myModal"+itemData._id} aria-hidden="true"></i>
                                </td>
                              </tr>
                            )
                        })
                      }
                    
                    </tbody>
                    :
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center">No record found</td>                 
                      </tr>
                    </tbody>
                  }

                </table>
              </div>
            </form>
          </div>
        </div>
      </div>

      );
  }

 }

 export default addSubscription;