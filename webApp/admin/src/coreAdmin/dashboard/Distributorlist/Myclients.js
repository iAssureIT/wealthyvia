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
      clientList      : [],
      subfranchiseurl : '',
      subfranchiseList : [],
      clientSubscription: []
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
      // console.log("response from api=>",res.data);
      var distributorCode = res.data.distributorCode;
        if(distributorCode){
          this.getmyclients(distributorCode); 
          this.getmySubfranchise(distributorCode); 
          var discode = parseInt(distributorCode.substring(3));
          var encryptcode = discode * 298564;
          //  var jobData:res.data.jobManage;
          if(res.data && res.data){
            this.setState({
              DistributorData : res.data,
              clientsignupurl  : "http://wealthyvia.iassureit.com/signup?x="+ encryptcode,
              subfranchiseurl  : "http://wealthyvia.iassureit.com/join-as-partner?x="+ encryptcode
            });
          }
        }
        else{
          this.setState({
              DistributorData : res.data,              
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
        },()=>{
          
          this.getclientofferingsubscription();
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }



  getclientofferingsubscription(){
    console.log("clientList", this.state.clientList);
    var query = {
      params: {
          clientList : JSON.stringify(this.state.clientList)
        }
    }
    Axios.get("api/offeringsubscriptions/get/allofferingsub/byclientist", query)
    .then(res=>{
      console.log("response from api=>client subscription",res.data);

      if(res && res.data){
        
        this.setState({
          clientSubscription : res.data.clientRevenue 
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getmySubfranchise(distributorCode){
    
    Axios.get("api/distributormaster/get/all/myfranchiselist/"+distributorCode)
    .then(res=>{
      console.log("response from api=>client",res.data);

      if(res && res.data){
        
        this.setState({
          subfranchiseList : res.data 
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

    exportClientRevenue = () => {
      let client = []
      if(this.state.clientSubscription && this.state.clientSubscription.length > 0)
      {
          var data = this.state.clientSubscription;
          for (let i = 0; i < data.length; i++) {
              client.push({"Client Code": data[i].clientCode, "Client Name": data[i].clientName, "email" : data[i].email,
                          "Contact" : data[i].mobNumber, "Product Opted" : data[i].offeringTitle, "Start Date" : data[i].startDate,
                            "End Date" : data[i].endDate, "Fees Paid" : (data[i].endDate >= moment().format('YYYY-MM-DD')) ? data[i].offeringAmount : '',
                            "Fees Pending" : ( data[i].endDate > moment().format('YYYY-MM-DD') ) ? '0' : data[i].offeringAmount, "Distributor Code": data[i].distributorCode });        
            }
      }
      
      return client;
    }

  exportsubfranchisedata = () => {
      let subfranchise = []
      if(this.state.subfranchiseList && this.state.subfranchiseList.length > 0)
      {
          var data = this.state.subfranchiseList;
          for (let i = 0; i < data.length; i++) {
              subfranchise.push({" Name": data[i].firstname+" "+data[i].lastname, "email" : data[i].email.address,
                          "Contact" : data[i].phone });        
            }
      }
      
      return subfranchise;
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
                <h4 className="h5lettersp MasterBudgetTitle" >Client List
                <div className=" pull-right" style={{ textAlign: 'right', fontSize: '14px', marginTop: '5px'}}>
                  <ExportCSV csvData={this.exportClientdata()} fileName="clients" />&nbsp;
                </div></h4>
              </div>
               <hr className="compySettingHr"/>


                <div className="tab-content customTabContent col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <h4 style={{paddingBottom: '14px' }}>Client signup url:  <a href={this.state.clientsignupurl} style={{color: '#337ab7' }} target="_blank"> {this.state.clientsignupurl} </a></h4>
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                              <tr>
                                <th className="text-left">Client Code</th>
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
                                        <td className="">{a.clientId} </td> 
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
            

          {
            this.state.clientSubscription ?
                <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader ">
                      <h4 className="h5lettersp MasterBudgetTitle">Client Revenue
                      <div className=" pull-right" style={{ textAlign: 'right', fontSize: '14px', marginTop: '5px'}}>
                        <ExportCSV csvData={this.exportClientRevenue()} fileName="Clients" />&nbsp;
                      </div>
                      </h4>
                  </div> 
                  <hr class="compySettingHr" />
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 ">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Client Code</th>
                              <th className="text-left">Client Name</th>
                              <th className="text-left">Product Opted</th>
                              <th className="text-left">Start Date</th>
                              <th className="text-left">End Date</th>                              
                              <th className="text-left">Fees Paid</th>
                              <th className="text-left">Fees Pending</th>
                              
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.clientSubscription && this.state.clientSubscription.length > 0 ?
                            this.state.clientSubscription.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.clientCode} </td> 
                                      <td className="">{a.clientName} </td>
                                      <td>{a.offeringTitle}</td>
                                      <td>{a.startDate}</td>
                                      <td>{a.endDate}</td>                                       
                                      <td className="text-center">{a.endDate >= moment().format('YYYY-MM-DD') ? a.offeringAmount : ''}</td>
                                      <td className="text-center">{a.endDate > moment().format('YYYY-MM-DD') ? '0' : a.offeringAmount}</td>
                               </tr>
                                )
                              }):
                            null
                            }
                            </tbody>
                          
                        </table>
              </div>    
            </div>
          </div>
            :
            null
          }

          {
              this.state.subfranchiseList && this.state.subfranchiseList.length > 0 ?
            <div className="row">  
              
            <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader" style={{marginTop: '20px'}}>
                <h4 className="h5lettersp MasterBudgetTitle" >Sub Franchise List
                <div className=" pull-right" style={{ textAlign: 'right', fontSize: '14px', marginTop: '5px'}}>
                  <ExportCSV csvData={this.exportsubfranchisedata()} fileName="Subfranchise" />&nbsp;
                </div></h4>

              </div>
               <hr className="compySettingHr"/>
                <h4 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " style={{paddingBottom: '14px' }}>Sub Franchise url:  <a href={this.state.subfranchiseurl} style={{color: '#337ab7' }} target="_blank"> {this.state.subfranchiseurl} </a></h4>
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 ">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Code</th>
                              <th className="text-left">Name</th>
                              <th className="text-left">Mobile</th>
                              <th className="text-left">Mail</th>
                              <th className="text-left">No of clients</th>
                              <th className="text-left">Total AUM</th>
                              <th className="text-left">Total fees pending</th>
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.subfranchiseList?
                            this.state.subfranchiseList.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.distributorCode} </td> 
                                      <td className="">{a.firstname+" "+a.lastname} </td>
                                      <td>{a.phone}</td>
                                      <td>{a.email ? a.email.address : '' }</td>
                                      <td>{a.usercount}</td> 
                                      <td></td>   
                                      <td></td>  
                               </tr>
                                )
                              }):
                            null
                            }
                            </tbody>
                          
                        </table>
              </div>    
            </div>
          </div>
          </div>
          :
           null
            }
            
        </div>
        :
            null
          }
          
          
      </div>
     );
  }
}


export default Myclients;