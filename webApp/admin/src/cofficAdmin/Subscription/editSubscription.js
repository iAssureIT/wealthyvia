// import React, { Component } from 'react';
// import { render }           from 'react-dom';
// import $ from "jquery";
// import axios from 'axios';
// // import './addSubscription.css';
// import swal from 'sweetalert';
// import SimpleReactValidator from 'simple-react-validator';

// axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
// // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';


// const formValid = formerrors=>{
//   console.log("formerrors",formerrors);
//   let valid = true;
//   Object.values(formerrors).forEach(val=>{
//   val.length>0 && (valid = false);
//   })
//   return valid;
//   }

// const companymobileRegex  = RegExp(/^[0-9][0-9]{9}$|^$/);
// const companyAddressRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);
// const companywebsiteRegex = RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
// const companypincodeRegex = RegExp(/^[1-9][0-9]{5}$/);
// const companynameRegex    = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
// const emailRegex          = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^$/);


// class editSubscription extends Component{

//      constructor(props) {
//     super(props);
//     this.state = {
//       SubscriptionName         : "",
//       Validity                 : "",
//       Cost                     : "",
//       CheckIn                  : "",
//       allPosts                 : [],
     
      
//       formerrors :{
//         firstcompanyname  : "",
//         companyMobile     : " ",
//         companyEmailID    : " ",
//         companyAddress    : " ",
//         companywebsitename : " ",
//         country           : " ",
//         district          : " ",
//         state             : " ",
//         taluka            : " ",
//         city              : " ",
//         pincode           : " ",
     



//       },
//       subscription : {
        
//       }

//     };
   
//     this.handleChange = this.handleChange.bind(this);
//   }


//   componentDidMount(){

//     axios
//       .get('/api//list')
//       .then(
//         (res)=>{
//           console.log('res', res);
//           const postsdata = res.data;
//           console.log('postsdata',postsdata);
//           this.setState({
//             allPosts : postsdata,
//           });
//         }
//       )
//       .catch((error)=>{

//         console.log("error = ",error);
//           if(error.message === "Request failed with status code 401")
//               {
//                    swal("Your session is expired! Please login again.","", "error");
//                    this.props.history.push("/");
//               }
//         // alert("Something went wrong! Please check Get URL.");
//          });        

//   }

//   submitSubscriptionInfo=(event)=>{
//     event.preventDefault();
   
//     var subscriptionInfoFormValue = {
//       SubscriptionName               : this.state.SubscriptionName,
//       CheckIn                        : this.state.CheckIn,
//       Cost                           : this.state.LandMark,
//       Validity                       : this.state.City,
  
      
//     }//close array
  
//   if(formValid(this.state.formerrors)){
//     console.log('workspaceInfoFormValue :', subscriptionInfoFormValue);

//     axios.post('/api/subscription',{subscriptionInfoFormValue})
//     .then(function (response) {
//       // handle success
//       console.log("this is response===>>>",response);
//       swal("Good job!", "workspace Information Submited!", "success")
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//       swal("", "workspace Information submition failed!", "Danger")
//       if(error.message === "Request failed with status code 401")
//         {
//              swal("Your session is expired! Please login again.","", "error");
//              this.props.history.push("/");
//         }

//     })
//     .finally(function () {
//       // always executed
//     });

//   }else{
//     swal("Please enter mandatory fields", "", "warning");
//     console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
//   }
//     // if($('#companyInformationForm').valid()){
      
//     // }
  
//   }

//    handleChange(event){
//     // const target = event.target;
//     // const {name , value}   = event.target;
//     const datatype = event.target.getAttribute('data-text');
//     const {name,value} = event.target;
//     let formerrors = this.state.formerrors;
    
//     console.log("datatype",datatype);
//     switch (datatype){
     
//       case 'firstcompanyname' : 
//        formerrors.firstcompanyname = companynameRegex.test(value)  && value.length>0 ? '' : "Please Enter Valid Name";
//        break;

//        case 'companyMobile' : 
//        formerrors.companyMobile = companymobileRegex.test(value) && value.length>0 ? '' : "Please Enter Numbers only";
//        break;

//        case 'companyEmailID' : 
//         formerrors.companyEmailID = emailRegex.test(value)  && value.length>0? "":"Invalid EmailID";
//        break;
//       //  case "email" : 
//       //  formErrors.email = emailRegex.test(value)? "":"Please enter valid mail address";
//       //  break;
//       case 'companywebsitename' : 
//          formerrors.companywebsitename = companywebsiteRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;

//        case 'companyAddress' : 
//        formerrors.companyAddress = companyAddressRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;
    
//       case 'country' : 
//         formerrors.country = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;
    
//       case 'state' : 
//         formerrors.state = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;
    
//       case 'district' : 
//         formerrors.district = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;

//       case 'taluka' : 
//         formerrors.taluka = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;

//       case 'city' : 
//         formerrors.city = companynameRegex.test(value)  && value.length>0 ? '' : "Invalid Field";
//       break;

//       case 'pincode' : 
//         formerrors.pincode = companypincodeRegex.test(value)   && value.length>0? '' : "Invalid Field";
//       break;
       
//        default :
//        break;

//       //  case 'companyName' : 
//       //  formerrors.companyName = value.length < 1 && value.lenght > 0 ? 'Minimum 1 Character required' : "";
//       //  break;

//     }
//     // this.setState({formerrors,})
//     this.setState({ formerrors,
//       [name]:value
//     } );
//   }

  

//   componentWillReceiveProps(nextProps) {

    
//   }
//   componentDidMount() {
  
    
  
//   }
 
// getdata(data){
//         console.log("getdata",data);
//         var allPosts = this.state.allPosts;
//         allPosts.push(data);
//         this.setState({
//           allPosts:allPosts
//         })

//       }
//   render(){
    
//     return(
//       <div className="">
//         <div className=""></div>
//         <section className="">
//               <div className="">
//                 <div className="">
//                   <div className="">
//                     <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
//                       <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12 box-header with-border">
//                         <h4 className="h4Title col-lg-12 col-md-12 col-sm-12 col-xs-12"><a href="/UMListOfUsers"><i className="cursorpointer fa fa-chevron-circle-left"></i></a>&nbsp;&nbsp;List of Subscriptions</h4>
//                       </div>
//                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">
//                        <div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                          <table className="table iAssureITtable-bordered table-striped table-hover">
//                          <thead className="tempTableHeader">
//                           <tr className="">
//                             <th className="umDynamicHeader srpadd textAlignCenter">Subscription Name</th>
//                             <th className="umDynamicHeader srpadd textAlignCenter">No Of CheckIns </th>
//                             <th className="umDynamicHeader srpadd textAlignCenter">Validity in Days </th>
//                             <th className="umDynamicHeader srpadd textAlignCenter"> Cost </th>
//                             <th className="umDynamicHeader srpadd textAlignCenter"> Actions </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                         {this.state.allPosts.map( (roleData, index)=>{
//                            return( 
//                           <tr>
//                             <td className="textAlignLeft"></td>    
//                             <td className="roleTextCenter">             
//                               <i className="fa fa-pencil editTcon editIcon" data-toggle="modal" data-target="#edit" title="Edit Department Name" ></i>
//                               &nbsp;&nbsp;
//                               <i className="deleteIcon roleDelete  redFont fa fa-trash delIcon detailsCenter"  id="" title="Edit Department Name" ></i>
//                             </td>   
//                             <div id="edit" className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" role="dialog">
//                               <div className="modal-dialog adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12" role="document">
//                                 <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
//                                   <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                                     <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel1">Edit Role</h4>
//                                     <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-12 NOpadding-left NOpadding-right">
//                                       <button type="button" className="adminCloseButton" data-dismiss="modal" data-target="edit">&times;</button>
//                                     </div>
//                                    </div>
//                                    <div className="modal-body addressModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
//                                     <form className="editroles">
//                                      <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-xs-12 col-sm-12 paddingLeftz addRoleMarginBtm">
//                                       <label className="textAlignLeft">Role Name</label>
//                                       <input type="text" ref="roleName" className="form-control rolesField" required/>
//                                      </div>
//                                      <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                                       <div className="form-group col-lg-4 col-lg-offset-8 col-md-4 col-md-offset-8 col-xs-12 col-sm-12">
//                                         <label>&nbsp;</label>
//                                           <button type="button" id="" className="btn adminFinish-btn" data-dismiss="modal">Edit Role</button>
//                                       </div>
//                                     </div>
//                                   </form>
//                                   </div>
//                                 </div>

//                               </div>
//                             </div>

//                           </tr>
//                           )
                          
//                           })
//                         }
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
  

//       );
//   }

//  }

//  export default editSubscription;