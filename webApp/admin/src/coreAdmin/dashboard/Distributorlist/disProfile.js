import React, {Component} from 'react';
// import "./distributerList.css";
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
      console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/"+ID)
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

  deleteDistributor(event){
    event.preventDefault(); 
    var disid = event.currentTarget.id.substr(2);
    console.log("disid = ",disid);

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
      console.log("status",status);
    
    var formValues = {
      id: id,
      status: status
    }

    Axios
      .patch("api/distributormaster/set/status",formValues)
       .then((response)=>{
          console.log("status .data = ",response.data);
         if(response.data){
          Swal.fire("Distributer Status updated");
          this.getDistributorFormData();      
        }
        if(status === "Active" ){
            var auth={
              fullName      : firstname + " "+ lastname,
              firstName     : firstname,
              lastName      : lastname,
              email         : email,
              mobNumber     : phone,
              pwd           : "welcome@123",
              role          : 'users',
              status        : 'Active',
          }
          console.log("auth",auth);
          console.log("auth",auth.role);
          Axios.post("/api/users/post/signup/user",auth)
         .then((res) => {
              console.log('sendDataToUser in result==>>>', res.data)
              if(status === 'Active'){
                  Swal.fire('Congrats!','Distributor Data Approved  Successfully!' , 'success');
              }
          })
          .catch((error) => { console.log('notification error: ',error)})
          // console.log("Distributer Master Data inserted successfully!", response.data);
        }else{   
                Swal.fire('Oops!','Distributor  Data reject Successfully!' , 'success');
              }
       })

       .catch((error)=>{
        console.log("Error during get Status Data = ", error);
        Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
       });    
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
                <div className = "panel-heading"><h4 ><b>Distributer Profile </b> <b className="pull-right"> <a href={"/distributorEditForm/"+ this.state.DistributorData._id} ><i id={"e-"+this.state.DistributorData._id} className="fa fa-edit fontSize" title="Click to Edit"> </i> </a>&nbsp;&nbsp;&nbsp;
                      <a><i id={"d-"+this.state.DistributorData._id} className="fa fa-trash fontSize" title="Click to Delete" onClick={this.deleteDistributor.bind(this)}> </i></a>&nbsp;&nbsp;&nbsp;</b>
                    {this.state.DistributorData.status==='New' ? 
                  <span><a className="cursor"><i className="fontSize fa fa-thumbs-up cursor"   value="Approve" id={this.state.DistributorData._id+"-"+"Active"} title="Approve Distributor Profile" 
                          data-firstname={this.state.DistributorData.firstname} data-lastname={this.state.DistributorData.lastname} data-email={this.state.DistributorData.email} data-phone={this.state.DistributorData.phone} onClick={this.setDistributorstatus.bind(this)}  ></i></a> &nbsp;&nbsp;
                      <a className="cursor"><i className="fa fa-thumbs-down fontSize"  value="Reject" id={this.state.DistributorData._id+"-"+"Rejected"} title="Reject Distributor Profile" onClick={this.setDistributorstatus.bind(this)} ></i></a>&nbsp;&nbsp;</span>:null}</h4>
                </div>
                <div className = "panel-body">
                  <div className = "col-md-3 col-xs-3 col-sm-3 col-lg-3">
                     <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" 
                          className = "img-circle img-responsive"/> 
                  </div>
                  <div className = "col-md-4 col-xs-3 col-sm-3 col-lg-4">
                    <h2>{this.state.DistributorData.firstname} &nbsp;{this.state.DistributorData.lastname}</h2>
                    
                    <hr className="mt10 mb10"/>
                    <div >
                      <ul className="container noMl fontWeight">
                        <li><p><span className = "fa fa-mobile fontWeight"></span>&nbsp; &nbsp;{this.state.DistributorData.phone}</p></li>
                        <li><p><span className = "glyphicon glyphicon-envelope one"></span>&nbsp; &nbsp;{this.state.DistributorData.email}</p></li>
                        <li><p>GST: &nbsp; {this.state.DistributorData.gst}</p></li>
                        <li><p>DOB: &nbsp; {this.state.DistributorData.dob}</p></li>
                        <li><p>Submit Application: &nbsp; {this.state.DistributorData.dob}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className = "col-md-5 col-xs-6 col-sm-6 col-lg-5 mt20">
                    <p><b>&nbsp; &nbsp;Status :&nbsp; &nbsp;{this.state.DistributorData.status}</b></p>
                  </div>
                  <hr/>
                  <div className = "col-md-5 col-xs-4 col-sm-4 col-lg-5" >
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-12 tital setMargin" >Address : {this.state.DistributorData.address ? this.state.DistributorData.address.adressLine : null}</div>
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-12 tital setMargin" >Education : {this.state.DistributorData.education}</div>
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-12 tital setMargin" >Do you have your own Office? : &nbsp;&nbsp;{this.state.DistributorData.ownOffice}</div>
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-12 tital setMargin" >Attach PAN and Aadhar self attested copies  : &nbsp;&nbsp; <a href={this.state.DistributorData.fileUpload}> <img src="/images/pdf.png" height="50" width="50"/></a></div>
                  </div>
                    <div className = "col-md-12 col-xs-12 col-sm-12 col-lg-9 tital  pull-right" >How long you have been doing Financial Product distribution, Broking, planning or 
                           insurance selling? Please Brief about your profession or business : &nbsp;&nbsp;{this.state.DistributorData.description}</div>
                </div>  

              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 nopadding setArea mt20">
                <div className = "panel panel-default setBackground">
                  <div className = "panel-heading"><h4 ><b>Earning Table </b></h4></div>
                  <br/>
             
             <div className="col-lg-10 col-lg-offset-1 col-md-8 col-lg-offset-2 col-sm-10 col-xs-10">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Cap Inv</th>
                        <th>My Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Client-1</td>
                        <td>1 Crore</td>
                        <td>2</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Client-2</td>
                        <td>2 Crore</td>
                        <td>4</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Client-3</td>
                        <td>2 Crore</td>
                        <td>4</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Client-4</td>
                        <td>1.5 Crore</td>
                        <td>3</td>
                        <td>1.5</td>
                      </tr>
                       <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>6.5</td>
                      </tr>
                    </tbody>
                  </table>

                  </div>
                  </div>
                      </div>
          
            </div>
          </div>

      </div>  
      </div>  

    );
  }


}


