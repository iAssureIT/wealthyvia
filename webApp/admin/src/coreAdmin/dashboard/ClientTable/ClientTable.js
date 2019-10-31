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
    axios.get('/api/users/get/list/role/user/1')
    .then( (users)=>{         
      if(users.data.length > 0){
          console.log("users.data.length = ", users.data);
        this.setState({
              completeDataCount : users.data.length,
              tableData         : users.data,          
            },()=>{
              // console.log('tableData', this.state.tableData);
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

    const offeringID    = valueOfCheck[1];
    const offeringName  = valueOfCheck[2];
    const userID        = valueOfCheck[0];


    if(checkValue){
      var offeringValues = {
          "userID"      : userID, 
          "planID"      : offeringID,
          "btnStatus"   : "checked",      
      }
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
              // console.log("usersData = ",usersData.length);
              for (var i=0; i < usersData.length; i++) {
                  axios.get("/api/subscriptionorders/get/type/offering/"+usersData[i]._id)
                       .then((userSubscriptions)=>{
/*                           console.log(i+" userSubscriptions = "+JSON.stringify(userSubscriptions.data,4,null));
*/                        this.setState({
                            userSubscriptions : userSubscriptions.data,
                           });
                        })
                       .catch((error)=>{
                          console.log("Error!","Something went wrong!!", "error");
                        });

                for(var j=0; j<offerings.data.length; j++) {
                  // console.log("offerings.data["+j+"] = ",offerings.data[j]);
                  checkedOfferings
                    .push({
                            id      : usersData[i]._id + "-" + offerings.data[j]._id,  
                            value   : usersData[i]._id + "-" + offerings.data[j]._id + "-" + offerings.data[j].offeringTitle,
                            offeringTitle   : usersData[i].offeringTitle,
                            checked : this.state.userSubscriptions.find(function(elem){return elem.offeringDetails.status === "Active";}) ? "checked" : "",
                         }); 

                }
              }

             if(i >= usersData.length){
                // console.log("checkedOfferings = ", checkedOfferings);
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
                            {
                              this.state.tableData.length > 0 
                              ? 
                                this.state.tableData.map((a, i)=>{
                                return(
                                    <tr>
                                        <td>PL001</td>
                                        <td className="">
                                          <p><b>{a.fullName}</b></p>
                                          <p>{a.mobNumber}</p>
                                          <p>{a.email}</p>
                                        </td>
                                        {
                                          this.state.checkedOfferings.map((chkoff, j)=>{
                                            return(
                                               <td className="text-center">
                                                   <div className="centreDetailContainer col-lg-1 col-xs-3">
                                                    <input type="checkbox" id={chkoff.id} value={chkoff.value}  name={chkoff.offeringTitle}  onChange={this.handleChange.bind(this)} checked={chkoff.checked}/>&nbsp;
                                                    <span className="centreDetailCheck"></span>
                                                  </div>
                                                </td>
                                            )
                                          })
                                        } 
                                    </tr>
                                  )
                                })
                              : "<div> Loading... </div>"
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