import React, {Component} from 'react';
import "./Myprofile.css";

import Axios from 'axios';
import swal  from 'sweetalert';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios  from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

import $ from 'jquery';

export default class Myprofile extends Component{

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
    var ID = localStorage.getItem('user_id');
      console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/byuserid/"+ID)
    .then(res=>{
      console.log("response from api=>",res.data);
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

   

  render(){
    var params = this.props.match.params;
        console.log("params = ",params);
    return(
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginLeft page">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 mt20"> 
              <div className = "panel panel-default">
                <div className = "panel-heading">
                    <h4 className=""><b >My Profile </b> <b className="pull-right"> <a href={"editprofile"} ><i id={"e-"+this.state.DistributorData._id} className="fa fa-edit fontSize" title="Click to Edit"> </i> </a>&nbsp;&nbsp;&nbsp;
                      &nbsp;</b>
                    </h4>
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
                      <ul className=" noMl fontWeight pl">
                        <li><p><b>Contact:</b>&nbsp;{this.state.DistributorData.phone}</p></li>
                        <li><p><b>Email:</b>&nbsp;{this.state.DistributorData.email ? this.state.DistributorData.email.address : ''}</p></li>
                        <li><p><b>DOB:</b>&nbsp;{this.state.DistributorData.dob}</p></li>
                        <li><p><b>Submitted On:</b>&nbsp;{this.state.DistributorData.currentDate}</p></li>
                      </ul>
                    </div>
                    <div className = "col-md-6 col-xs-6 col-sm-6 col-lg-6" >
                      <ul className="noMl fontWeight pl">
                        <li><p><b>Address:</b> {this.state.DistributorData.address ? this.state.DistributorData.address.adressLine : null}:&nbsp;</p></li>
                        <li><p><b>Education:</b> {this.state.DistributorData.education}</p></li>
                        <li><p><b>Referral has own office:</b> &nbsp;{this.state.DistributorData.ownOffice}</p></li>
                        
                      </ul>
                    </div>
                  </div>
                  
                  <hr/>
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-9 tital  pull-right" ><b>Brief about Referral's Profession or Business:</b>&nbsp;{this.state.DistributorData.description}</div>
                </div>  

              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 nopadding setArea mt20">
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
                        <li><p><b>GST:</b>&nbsp;{this.state.DistributorData.gst}</p></li>                                            
                      </ul>
                  </div>
                  <div className = "col-md-6 col-xs-6 col-sm-6 col-lg-6" >
                      <ul className="noMl fontWeight pl">
                        <li><p><b>Aadhar Number:</b>&nbsp;{this.state.DistributorData.aadharnumber}</p></li>
                        <li><p><b>Aadhar Document:</b>&nbsp; <a title="Click to View"  target="_blank" href={this.state.DistributorData.fileUpload1}>{
                              (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "pdf" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "PDF" ?
                                  <img src="/images/pdf.png"/>
                                :
                                  <img src={this.state.DistributorData.fileUpload1} height="50" width="50"/>
                            }  </a></p>
                        </li>                                                
                        <li><p><b>Pan Number:</b>&nbsp;{this.state.DistributorData.pannumber}</p></li>  
                        <li><p><b>PAN Document:</b> &nbsp; <a title="Click to View"  target="_blank" href ={this.state.DistributorData.fileUpload}> 
                           {
                              (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "pdf" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "PDF" ?
                                  <img src="/images/pdf.png"/>
                                :
                                  <img src={this.state.DistributorData.fileUpload} height="50" width="50"/>
                            }  </a></p>
                        </li>                      
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


