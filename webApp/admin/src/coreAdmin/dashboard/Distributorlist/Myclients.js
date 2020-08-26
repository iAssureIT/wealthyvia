import React,{Component}        from 'react';

import moment                   from "moment";
import swal                     from 'sweetalert';

import Axios                    from "axios";
import $                        from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {ExportCSV} from '../../common/Export/ExportCSV.js';
// import './Clientlist.css';


class Myclients extends Component {
  constructor(props){
    super(props);
    this.state = {
      distributorCode : '',
      fullName        : '',
      email           : '',
      errors          : {},
      fields          : {},
      clientsignupurl : '',
      clientList      : []
    }   
  }
  handleChange(event){
    var checkValue  = event.target.checked;
    const target    = event.target.value;
  }

  componentDidMount(){
    this.getDistributorFormData();    
     
  }

  getDistributorFormData(){    
    var ID = this.props.match.params.ID;
      console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/"+ID)
    .then(res=>{
      console.log("response from api=>",res.data);
      var distributorCode = res.data.distributorCode;
        this.getmyclients(distributorCode); 
        var encryptcode = distributorCode * 298564;
      //  var jobData:res.data.jobManage;
      if(res.data && res.data){
        this.setState({
          DistributorData : res.data,
          clientsignupurl  : "https://wealthyvia.com/signup?x="+ encryptcode
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getmyclients(distributorCode){
    
    Axios.get("api/users/get/list/bydistributorcode/user/"+distributorCode)
    .then(res=>{
      console.log("response from api=>",res.data);

      if(res && res.data){
        
        this.setState({
          clientList : res.data 
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  exportClientdata = () => {
      let client = []
      if(this.state.clientList && this.state.clientList.length > 0)
      {
          var data = this.state.clientList;
          for (let i = 0; i < data.length; i++) {
              client.push({"Client Name": data[i].fullName, "email" : data[i].email,
                          "Contact" : data[i].mobNumber });        
            }
      }
      
      return client;
    }
 
  render(){
    
     return(
      <div className="row">
      {
        this.state.DistributorData ? 
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">

         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Distributor Profile
            <b className="pull-right"> 
              <a href={"/distributorEditForm/"+ this.state.DistributorData._id} >
                <i id={"e-"+this.state.DistributorData._id} className="fa fa-edit fontSize" title="Click to Edit"> </i>
              </a>
            </b>
          </h4>
         </div>
         <hr className="compySettingHr"/>
          
          
            <div className="modal-bodyuser ">
              <form className="newTemplateForm ">
                
                <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 mt20"> 
                <div className = "panel panel-default">
                  
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
                          <li><p><b>Adhar Document:</b> <a title="Click to View"  target="_blank" href={this.state.DistributorData.fileUpload1}>{
                                (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "pdf" || (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "PDF" ?
                                    <img src="/images/pdf.png"/>
                                  :
                                  (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "jpg" || (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "jpeg" || (this.state.DistributorData.fileUpload1 ? this.state.DistributorData.fileUpload1.split('.').pop() : "") === "png"
                                  ?
                                    <img src={this.state.DistributorData.fileUpload1} height="50" width="50"/>
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
                          <li><p><b>Distributor has own office:</b> &nbsp;{this.state.DistributorData.ownOffice}</p></li>
                          <li><p><b>PAN Document:</b> &nbsp; <a title="Click to View"  target="_blank" href ={this.state.DistributorData.fileUpload}> 
                             {
                                (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "pdf" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "PDF" ?
                                    <img src="/images/pdf.png"/>
                                  :
                                  (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "jpg" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "jpeg" || (this.state.DistributorData.fileUpload ? this.state.DistributorData.fileUpload.split('.').pop() : "") === "png"?
                                    <img src={this.state.DistributorData.fileUpload} height="50" width="50"/>
                                  :
                                    null
                              }  </a></p></li>

                              
                        </ul>
                      </div>
                    </div>
                    
                    <hr/>
                      <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-9 tital  pull-right" ><b>Brief about Distributor's Profession or Business:</b>&nbsp;{this.state.DistributorData.description}</div>
                  </div>  

                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader" style={{marginTop: '20px'}}>
                <h4 className="h5lettersp MasterBudgetTitle" >My clients
                <div className=" pull-right" style={{ textAlign: 'right', fontSize: '14px', marginTop: '5px'}}>
                  <ExportCSV csvData={this.exportClientdata()} fileName="clients" />&nbsp;
                </div></h4>
              </div>
               <hr className="compySettingHr"/>


                <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                              <tr>

                                <th className="text-left">Client Name</th>
                                <th className="text-left">Mobile</th>
                                <th className="text-left">Mail</th>
                                
                              </tr>
                                                     
                            </thead>
                            <tbody>     
                            {
                              this.state.clientList && this.state.clientList.length > 0 ?
                              this.state.clientList.map((a, i)=>{
                                  return(
                                      <tr key={i}>  
                                        <td className="">{a.fullName} </td>
                                        <td>{a.mobNumber}</td>
                                        <td>{a.email}</td>
                                          
                                 </tr>
                                  )
                                })
                              :
                                 <tr><td>No clients found</td></tr>
                              }
                              </tbody>
                            
                          </table>
                          </div>
                        </div>
                      </div>    
              </form>
            </div>
            
        </div>
        :
            null
          }
          
      </div>
     );
  }
}


export default Myclients;