import React, {Component} from 'react';
import "./disProfile.css";

import Axios from 'axios';
import swal  from 'sweetalert';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios  from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

import $ from 'jquery';

export default class disProfile extends Component{

  constructor(props){
    super();
     this.state  ={
        DistributorData : [],
      }

  }

  componentDidMount(){
      this.getDistributorFormData();      
    }

  getDistributorFormData(){
    var ID = this.props.match.params.ID;
      // console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/"+ID)
    .then(res=>{
      // console.log("response from api=>",res.data);
      //  var jobData:res.data.jobManage;
      if(res.data && res.data){
        this.setState({
          DistributorData : res.data,
        },()=>{
                    console.log("distributor =>",this.state.DistributorData);
                });
      }
    })
    .catch(err=>{
      console.log("err",err);
      Swal.fire("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  deleteDistributor(event){
    event.preventDefault(); 
    var disid = event.currentTarget.id.substr(2);

    // console.log("disid = ",disid);

    Swal.fire({
      title: 'Are you sure, you want to Delete this Data?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',     
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Axios.delete("api/distributormaster/delete/"+disid)
          .then((data)=>{
            this.getDistributorFormData();
              Swal.fire(
                'Deleted!',
                'Distributor Record has been deleted successfully',
                'success'
              )
              this.props.history.push('/new-distributor-list');
          })
          .catch((err)=>{
            console.log("error while deleting employee = ",err);
              Swal.fire(
                'Some Error Occured!',
                ''+err,
                'error'
              )                     
          });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Distributor Record is NOT Deleted :)',
          'error'
        )
      }
    })    
  }




   setDistributorstatus(event){   
    event.preventDefault(); 
    var id = event.currentTarget.id;
    var firstname = $(event.currentTarget).attr('data-firstname');
    var lastname = $(event.currentTarget).attr('data-lastname');
    var email = $(event.currentTarget).attr('data-email');
    var phone = $(event.currentTarget).attr('data-phone');
    var idnstatusarray = id.split("-");
    var id = idnstatusarray[0];
    var status = idnstatusarray[1];
      // console.log("status",status);
    
    var formValues = {
      id: id,
      status: status
    }

  if(status === "Active" ){
     swal({
              title: 'Are you sure you want to Approve this distributor information?',
              dangerMode: true,
              buttons: true,
              icon: 'warning',
            })
   Axios
      .patch("api/distributormaster/set/status",formValues)
       .then((response)=>{
          // console.log("status .data = ",response.data);
         if(response.data){
           // swal( "Distributor information approved successfully!" ,
           //  "Login credentials have been created & email has been sent to the Distributor.",
           //       "success"); 
          // Swal.fire("Distributer Status updated");
          this.getDistributorFormData();      
        }             
            var auth={
              fullName      : firstname + " "+ lastname,
              firstName     : firstname,
              lastName      : lastname,
              email         : email,
              mobNumber     : phone,
              pwd           : "Welcome@123",
              role          : 'distributor',
              status        : 'Active',
          }
          // console.log("auth",auth);
          // console.log("auth",auth.role);
          Axios.post("/api/users/post/signup/user",auth)
           .then((res) => {
                // console.log('sendDataToUser in result==>>>', res.data);

                      Axios.get("/api/users/get/list/role/admin/1")
                        .then((adminusers) => {
                                    // console.log('admin data', adminusers.data);
                                    var adminemaillist = [];
                                    var admindata = adminusers.data;
                                    if(admindata && admindata.length > 0){
                                      for(let i = 0 ; i < admindata.length ; i++){
                                        adminemaillist.push(admindata[i].email);
                                      }
                                    }
                                    adminemaillist.push("partner@wealthyvia.com");
                                    // console.log("admin email list", adminemaillist);
                                    const formValues2 = {
                                      "emaillist"     : adminemaillist ,
                                      "subject"       : "A Partner Profile has been Approved!",
                                      "text"          : "", 
                                      "mail"          : 'Dear Admin,' + '<br/>'+
                                                        'You have successfully approved a Partner profile on Wealthyvia! Now the Partner can login to the system & can refer client to Wealthyvia. Following are the details of the Partner:'+                          
                                                        "<br/>"+
                                                        "Name: " + firstname + " "+ lastname + "<br/>" +
                                                        "Email:  " + email + "<br/>" +
                                                        "Contact:  " + phone + "<br/>" +
                                                        "<br/><br/> " +
                                                        "Regards<br/> " +
                                                        "Team Wealthyvia. " ,
                                                        

                                    };
                                    // console.log("notification",formValues2); 
                                    
                                      Axios
                                      .post('/send-email-admin',formValues2)
                                      .then((res)=>{
                                                if(res.status === 200){
                                                  console.log("Mail Sent TO ADMIN successfully!")
                                                }
                                              })
                                              .catch((error)=>{
                                                console.log("error = ", error);
                                                
                                              });

                                    const formValues1 = {
                                      "email"         : email ,
                                      "subject"       : "Your Partner Profile has been Approved!",
                                      "text"          : "", 
                                      "mail"          : 'Dear ' + firstname + ' '+lastname+', <br/><br/>'+                          
                                                        "Congratulations! Your Partner profile has been approved on Wealthyvia! Now you can login to the system & can refer client to Wealthyvia. Following are your login credentials: <br/> " + 
                                                        "Email: " + email +
                                                        "<br/>Default Password: " + "Welcome@123" +
                                                        "<br/> <br/> " + 
                                                        "Hope you enjoy being a Partner of Wealthyvia! " +
                                                        "& can refer client to Wealthyvia." + 
                                                        "<br/><br/> " +
                                                        "Regards<br/> " +
                                                        "Team Wealthyvia. ",

                                    };
                                    //console.log("notification",formValues1); 
                                    
                                      Axios
                                      .post('/send-email',formValues1)
                                      .then((res)=>{
                                                 if(res.status === 200){
                                                   //Swal("Thank you for contacting us. We will get back to you shortly.")
                                                  }
                                              })
                                              .catch((error)=>{
                                                console.log("error = ", error);
                                                
                                              });        
                   })
                  .catch((error) => { console.log('user error: ',error)}
                      // swal('Distributor information Approved successfully!')    
                    )

                  if(status === 'Active'){
                     Swal.fire(
                    'Congrats!',
                    'Distributor information approved successfully!',
                    'Login credentials have been created & email has been sent to the Distributor.',
                    'success'
                  );
                  }
              })
              .catch((error) => { console.log('user error: ',error)})
                      // swal('Distributor information rejected successfully!')    
               })            
           .catch((error)=>{
            // console.log("Error during get Status Data = ", error);
            Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
           });   
        }
        else if(status === "Rejected" ){
           swal({
              title: 'Are you sure you want to Reject this distributor information?',
              dangerMode: true,
              buttons: true,
              icon: 'warning',
            }).then((result) => {
              if (result) {
                Axios
                  .patch("api/distributormaster/set/status",formValues)
                   .then((response)=>{
                      // console.log("status .data = ",response.data);
                      // swal("Distributer Status rejected");
                     if(response.data){
                      this.getDistributorFormData();  
                        // console.log("reject");
                        Axios.get("/api/users/get/list/role/admin/1")
                          .then((adminusers) => {
                            // console.log('admin data', adminusers.data);
                            var adminemaillist = [];
                            var admindata = adminusers.data;
                            if(admindata && admindata.length > 0){
                              for(let i = 0 ; i < admindata.length ; i++){
                                adminemaillist.push(admindata[i].email);
                              }
                            }
                            adminemaillist.push("partner@wealthyvia.com");
                            // console.log("admin email list", adminemaillist);
                            const formValues2 = {
                              "emaillist"     : adminemaillist ,
                              "subject"       : "A Distributor Profile has been Rejected",
                              "text"          : "", 
                              "mail"          : 'Dear Admin,' + '<br/>'+
                                                'A distributor profile has been rejected on Wealthyvia. <br/>'+  
                                                'Following are the details of the Distributor: <br/>' +                      
                                                "Name: " + firstname + " "+ lastname + "<br/>" +
                                                "Email:  " + email + "<br/>" +
                                                "Contact:  " + phone + "<br/>" +
                                                "<br/><br/> " +
                                                "Regards<br/> " +
                                                "Team Wealthyvia. " ,
                            };
                            // console.log("notification",formValues2); 
                            
                              Axios
                              .post('/send-email-admin',formValues2)
                              .then((res)=>{
                                        if(res.status === 200){
                                          console.log("Mail Sent TO ADMIN successfully!")
                                        }
                                      })
                                      .catch((error)=>{
                                        console.log("error = ", error);
                                        
                                      });

                            const formValues1 = {
                              "email"         : email ,
                              "subject"       : "Your Distributor Profile has been Rejected",
                              "text"          : "", 
                              "mail"          : 'Dear ' + firstname + ' '+lastname+', <br/><br/>'+                          
                                                "Your distributor profile has been rejected on Wealthyvia. Please contact Admin for further details.<br/> <br/> " + 
                                                "<br/><br/> " +
                                                "Regards<br/> " +
                                                "Team Wealthyvia. " ,

                            };
                            // console.log("notification",formValues1); 
                            
                              Axios
                              .post('/send-email',formValues1)
                              .then((res)=>{
                                         if(res.status === 200){
                                           //swal("Thank you for contacting us. We will get back to you shortly.")
                                          }
                                      })
                                      .catch((error)=>{
                                        console.log("error = ", error);
                                        
                                      });  
                          })
                        .catch((error) => { console.log('user error: ',error)})
                                
                        swal('Distributor information rejected successfully!');    
                    } 
                  })
                  .catch((error)=>{
                    console.log("Error during get Status Data = ", error);
                    Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
                  });  
              } else{
                swal(
                  'Cancelled',
                  'Your Distributor Record is NOT rejected',
                  'success'
                )
          }
    })
          
        }
        else{   
                Swal.fire('Oops!','status not defined!');
              }
    
  }

  render(){
    var params = this.props.match.params;
        // console.log("params = ",params);
    return(
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginLeft page">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 mt20"> 
              <div className = "panel panel-default">
                <div className = "panel-heading"><h4 className="pl100"><b >Referrer Profile </b> <b className="pull-right"> <a href={"/distributorEditForm/"+ this.state.DistributorData._id} ><i id={"e-"+this.state.DistributorData._id} className="fa fa-edit fontSize" title="Click to Edit"> </i> </a>&nbsp;&nbsp;&nbsp;
                      &nbsp;</b>
                    {this.state.DistributorData.status==='New' ? 
                  <span><a className="cursor"><i className="fontSize fa fa-thumbs-up cursor"   value="Approve" id={this.state.DistributorData._id+"-"+"Active"} title="Approve Distributor Profile" 
                          data-firstname={this.state.DistributorData.firstname} data-lastname={this.state.DistributorData.lastname} data-email={this.state.DistributorData.email ? this.state.DistributorData.email.address : ''} data-phone={this.state.DistributorData.phone} onClick={this.setDistributorstatus.bind(this)}  ></i></a> &nbsp;&nbsp;
                      <a className="cursor"><i className="fa fa-thumbs-down fontSize"  value="Reject" id={this.state.DistributorData._id+"-"+"Rejected"} title="Reject Distributor Profile" data-firstname={this.state.DistributorData.firstname} data-lastname={this.state.DistributorData.lastname} data-email={this.state.DistributorData.email ? this.state.DistributorData.email.address : ''} data-phone={this.state.DistributorData.phone} onClick={this.setDistributorstatus.bind(this)} ></i></a>&nbsp;&nbsp;</span>:null}</h4>
                </div>
                <div className = "panel-body">
                  <div className = "col-md-3 col-xs-3 col-sm-3 col-lg-3">
                     <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" 
                          className = "img-circle img-responsive"/> 
                  </div>
                  <div className = "col-md-9 col-xs-7 col-sm-7 col-lg-9">

                    <b className="pull-right pt">Status:&nbsp;&nbsp;<div className={this.state.DistributorData.status === "Active" ? 'label label-success' : this.state.DistributorData.status ==='New' ? 'label label-info' : 'label label-danger'}>{this.state.DistributorData.status}</div></b>
                    <h2>{this.state.DistributorData.firstname} {this.state.DistributorData.lastname}</h2>
                    <hr className="mt10 mb10"/>
                    <div className = "col-md-6 col-xs-6 col-sm-6 col-lg-6" >
                      <ul className="container noMl fontWeight pl">
                        <li><p><b>Contact:</b>&nbsp;{this.state.DistributorData.phone}</p></li>
                        <li><p><b>Email:</b>&nbsp;{this.state.DistributorData.email ? this.state.DistributorData.email.address : ''}</p></li>
                        <li><p><b>GST:</b>&nbsp;{this.state.DistributorData.gst}</p></li>
                        <li><p><b>DOB:</b>&nbsp;{this.state.DistributorData.dob}</p></li>
                        <li><p><b>Submitted On:</b>&nbsp;{this.state.DistributorData.currentDate}</p></li>
                        <li><p><b>Adhar Document:</b> <a title="Click to View"  target="_blank" href={this.state.DistributorData.fileUpload}>{
                              (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "pdf" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "PDF" ?
                                  <img src="/images/pdf.png"/>
                                :
                                (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "jpg" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "jpeg" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "png"
                                ?
                                  <img src={this.state.DistributorData.fileUpload} height="50" width="50"/>
                                :
                                  null
                            }  </a></p>
                        </li>
                      </ul>
                    </div>
                    <div className = "col-md-6 col-xs-6 col-sm-6 col-lg-6" >
                      <ul className="container noMl fontWeight pl">
                        <li><p><b>Address:</b> {this.state.DistributorData.address ? this.state.DistributorData.address.adressLine : null}:&nbsp;</p></li>
                        <li><p><b>Education:</b> {this.state.DistributorData.education}</p></li>
                        <li><p><b>Website:</b> &nbsp;{this.state.DistributorData.website}</p></li>
                        <li><p><b>Referrer has own office:</b> &nbsp;{this.state.DistributorData.ownOffice}</p></li>
                        <li><p><b>PAN Document:</b> &nbsp; <a title="Click to View"  target="_blank" href ={this.state.DistributorData.fileUpload1}> 
                           {
                              (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "pdf" || (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "PDF" ?
                                  <img src="/images/pdf.png"/>
                                :
                                (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "jpg" || (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "jpeg" || (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "png"?
                                  <img src={this.state.DistributorData.fileUpload1} height="50" width="50"/>
                                :
                                  null
                            }  </a></p></li>

                            
                      </ul>
                    </div>
                  </div>
                  
                  <hr/>
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-9 tital  pull-right" ><b>Brief about Referrer 's Profession or Business:</b>&nbsp;{this.state.DistributorData.description}</div>
                </div>  

              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 setArea mt20">
              <div className = "panel panel-default setBackgroundAccountdetails">
                  <div className = "panel-heading"><h4 ><b className="bankheading">Bank Details </b></h4></div>
                  <br/>
             
                 <div className = "col-md-6 col-xs-6 col-sm-6 col-lg-6" >
                      <ul className="noMl fontWeight pl">
                        <li><p><b>Bank Account Number:</b>&nbsp;{this.state.DistributorData.accountnumber}</p></li>
                        <li><p><b>Bank Name:</b>&nbsp;{this.state.DistributorData.bankname }</p></li>
                        <li><p><b>Branch Name:</b>&nbsp;{this.state.DistributorData.branchname}</p></li>
                        <li><p><b>IFSC code:</b>&nbsp;{this.state.DistributorData.IFSCcode}</p></li>
                        <li><p><b>MICR code:</b>&nbsp;{this.state.DistributorData.MICRcode}</p></li>   
                                                                  
                      </ul>
                  </div>
                  <div className = "col-md-6 col-xs-6 col-sm-6 col-lg-6" >
                      <ul className="noMl fontWeight pl">
                        <li><p><b>GST:</b>&nbsp;{this.state.DistributorData.gst}</p></li> 
                        <li><p><b>Aadhar Number:</b>&nbsp;{this.state.DistributorData.aadharnumber}</p></li>                                                                       
                        <li><p><b>Pan Number:</b>&nbsp;{this.state.DistributorData.pannumber}</p></li>  
                                              
                      </ul>
                  </div>  
              </div>
            </div> 
            
          </div>

      </div>  
      </div>  

    );
  }


}


