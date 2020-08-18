import React,{Component}        from 'react';
import { render }               from 'react-dom';
import { BrowserRouter,Route }  from 'react-router-dom';
import { Switch,Link,location } from 'react-router-dom';
import moment                   from "moment";
import swal                     from 'sweetalert';
import axios                    from "axios";
import $                        from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './ClientTable.css';

class ClientTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      offeringTitle : [],
      tableData :[],
      checkValueCT :"",
      checkedOfferings : [],
      userSubscriptions : [],
    }
      
  }
    
  componentDidMount(){
    this.getUsersData();
  }

  getUsersData(){
    //==========  Get User List   ============
    axios.get('/api/subscriptionorders/get/showchart/'+ 2019)
    .then( (users)=>{         
      if(users.data.length > 0){
          // console.log("users.data.length = ", users.data.length);
        this.setState({
              completeDataCount : users.data.length,
              tableData         : users.data,          
            },()=>{
              this.getCheckOfferingData(users.data);
        })        
      }
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
           swal("","", "error");
        }
    });    
  }

  handleChange(event){
    var checkValue      = event.target.checked;
    const valueOfCheck  = event.target.value.split("-");
    const userID        = valueOfCheck[0];
    const offeringID    = valueOfCheck[1];
    const offeringName  = valueOfCheck[2];


    if(checkValue){
      var offeringValues = {
          "userID"      : userID, 
          "planID"      : offeringID,
          "btnStatus"   : "checked",      
      }
      console.log("offeringValues = ", offeringValues);

        swal({
          title: 'Hello!',
          text: 'Are you sure you want to subscribe this offering!',
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
        ],
        }).then((option)=> { 
          if(option){
            axios.post('/api/subscriptionorders/post/offering',offeringValues)
            .then( (res)=>{      
              this.getUsersData();
              // console.log('res', res);
            })
            .catch((error)=>{
               console.log("error = ",error);
            });
          }
        });
      }
      else{
        var offeringValues={
          "userID"      : userID, 
          "planID"      : offeringID,
          "btnStatus"   : "unchecked" ,      
        }
        swal({
          title: 'Hello!',
          text: 'Are you sure you want to unsubscribe this offering!',
          icon:'warning',
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
        ],
        dangerMode: true,

        }).then((option)=> { 
          if(option){
           axios.post('/api/subscriptionorders/post/offering',offeringValues)
           .then( (res)=>{      
              // console.log('res', res);            
              this.getUsersData();
            })
           .catch((error)=>{
             console.log("error = ",error);
            });
        }
        });

      }
  }


getCheckOfferingData(usersData){
    var checkedOfferings = [];
    var userSubscription = [];
      //==========  Get Offerings List   ============
      axios.get('/api/offerings/get/all/list/1')
      .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
              offeringTitle : offerings.data,
            },()=>{
              // console.log("offeringTitle",this.state.offeringTitle);
            })
            if(usersData && offerings.data){
              for (var i=0; i < usersData.length; i++) {
                  axios.get("/api/subscriptionorders/get/all/"+usersData[i]._id+"/1")
                       .then((userSubscriptions)=>{
                        console.log(i+"usersData"+usersData[i]._id)
                        if(userSubscriptions.data){
                          for(var k=0; k<userSubscriptions.data.length; k++){

                            if(userSubscriptions.data[k].planStatus == "Active"){

                              var offeringDetails = userSubscriptions.data[k].offeringDetails;
                              console.log("offeringDetails = ",offeringDetails);

                              for(var j=0; j<offerings.data.length; j++) {
                                 console.log("checkedOfferings 4 = ", usersData[i]._id);
                                var checked = "";
                                for(var l=0; l<offeringDetails.length; l++){
                                  console.log(l," = offering_ID",offeringDetails[l].offering_ID);
                                  console.log(j," = offerings.data[j]._id",offerings.data[j]._id);
                                  if(offeringDetails[l].offering_ID == offerings.data[j]._id){
                                    if(offeringDetails[l].offeringStatus == "Active"){
                                      checked = "checked";
                                      break;
                                    }else{
                                      checked = "";
                                    }
                                  }
                                }
                                checkedOfferings.push({
                                          id              : usersData[i]._id + "-" + offerings.data[j]._id,  
                                          value           : usersData[i]._id + "-" + offerings.data[j]._id + "-" + offerings.data[j].offeringTitle,
                                          offeringTitle   : usersData[i].offeringTitle,
                                          checked         : checked,
                                       }); 
                              }


                              // this.setState({
                              //   userSubscriptions : offeringDetails,
                              //  });
                            }
                          }
                        }

                           // ,()=>{console.log(" this.state.userSubscriptions", this.state.userSubscriptions)}
                        })
                       .catch((error)=>{
                          console.log("Error!","Something went wrong for user!!", error);
                        });


                        // for(var j=0; j<offerings.data.length; j++) {
                        //   // console.log("checkedOfferings 1 = ", checkedOfferings.length);
                        //   var checked = "";
                        //   for(var l=0; l<this.state.userSubscriptions.length; l++){
                        //     console.log(l," = offering_ID",this.state.userSubscriptions[l].offering_ID);
                        //     console.log(j," = offerings.data[j]._id",offerings.data[j]._id);
                        //     if(this.state.userSubscriptions[l].offering_ID == offerings.data[j]._id){
                        //       if(this.state.userSubscriptions[l].offeringStatus == "Active"){
                        //         checked = "checked";
                        //         break;
                        //       }else{
                        //         checked = "";
                        //       }
                        //     }
                        //   }
                        //   checkedOfferings.push({
                        //             id      : usersData[i]._id + "-" + offerings.data[j]._id,  
                        //             value   : usersData[i]._id + "-" + offerings.data[j]._id + "-" + offerings.data[j].offeringTitle,
                        //             offeringTitle   : usersData[i].offeringTitle,
                        //             checked : checked,
                        //          }); 

                        //   if(this.state.userSubscriptions.length>0){

                        //   }
                        //   // console.log("checkedOfferings 2 = ", checkedOfferings.length);

                        //   // console.log("checkedOfferings.id"+checkedOfferings.id+"checkedOfferings.checked"+checkedOfferings.checked)
                        // }

              }

             if(i >= usersData.length){
                console.log("checkedOfferings = ", checkedOfferings);
                this.setState({checkedOfferings : checkedOfferings});
              }

            }
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });   
}


render(){
  // console.log('this.state.completeDataCount', this.state.completeDataCount);
  var adminRolesListDataList = this.state.adminRolesListData;
  // console.log("adminRolesListDataList",adminRolesListDataList);
     return(
      <div className="">
          <section className="">
              <div className="modal-bodyuser">
                <form className="newTemplateForm">
                   <div className="col-lg-12 NOpadding table-responsive">
                      <table className="table tableCustom table-striped col-lg-12">
                        <thead className="bgThead">
                          <tr>
                            <th className="text-center">Client ID</th>
                            <th className="">Client Details</th>
                            {
                            this.state.offeringTitle.map((a, i)=>{

                              return(
                                <th className="text-center">{a.offeringTitle}</th>
                              )
                              })
                          }
                         </tr>
                        </thead>
                        <tbody>
                        {console.log("this.state.tableData",this.state.tableData)}
                            {
                              this.state.tableData.length > 0 
                              ? 
                                this.state.tableData.map((a, i)=>{
                                return(
                                    <tr>
                                        <td>{i<100 ? i<10 ? "PL00"+i : "PL0"+i : "PL"+i}</td>
                                        <td className="">
                                          <p><b>{a.userName}</b>=  {a._id}</p>
                                          <p>{a.userMobile}</p>
                                          <p>{a.userEmail}</p>
                                        </td>
                                        {
                                          this.state.offeringTitle.map((offTitle, j)=>{
                                            return(
                                               <td className="text-center">
                                                   <div className="centreDetailContainer col-lg-1 col-xs-3">
                                                    <input type="checkbox" id={this.state.checkedOfferings[i*this.state.offeringTitle.length + j] ? this.state.checkedOfferings[i*this.state.offeringTitle.length + j].id : ""} 
                                                           value={this.state.checkedOfferings[i*this.state.offeringTitle.length + j] ? this.state.checkedOfferings[i*this.state.offeringTitle.length + j].value : ""}  
                                                           name={this.state.checkedOfferings[i*this.state.offeringTitle.length + j] ? this.state.checkedOfferings[i*this.state.offeringTitle.length + j].offeringTitle : ""}  
                                                           onChange={this.handleChange.bind(this)} 
                                                           checked={this.state.checkedOfferings[i*this.state.offeringTitle.length + j] ? this.state.checkedOfferings[i*this.state.offeringTitle.length + j].checked : ""}/>&nbsp;
                                                    <span className="centreDetailCheck"></span>
                                                  </div>
                                                </td>
                                            )
                                          })
                                        } 
                                    </tr>
                                  )
                                
                              })
                              : 
                                "<div> Loading... </div>"
                            }
                  
                          </tbody>
                      </table>
                    </div>    
                  </form>
                </div>
          </section>
      </div>
     );
    }
}


export default ClientTable;



/*

        const token = localStorage.getItem("checkedValue");


*/