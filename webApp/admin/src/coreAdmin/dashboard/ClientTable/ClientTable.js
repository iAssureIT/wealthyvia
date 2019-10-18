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
    }
      
  }
    

  handleChange(event){
    var checkValue = event.target.checked;
    const valueOfCheck = event.target.value.split("-");

    const offeringID = valueOfCheck[1];
    const offeringName = valueOfCheck[2];
    const userID = valueOfCheck[0];


    if(checkValue){
       var offeringValues={
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
        }).then(function() {
           axios.post('/api/subscriptionorders/post/offering',offeringValues)
          .then( (res)=>{      
              console.log('res', res);
          })
          .catch((error)=>{
             console.log("error = ",error);
          });

        });
      }
      else{
         var offeringValues={
          "userID"      : userID, 
          "planID"      : offeringID,
          "btnStatus"     :"unchecked" ,      
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

        }).then(function() {
           axios.post('/api/subscriptionorders/post/offering',offeringValues)
          .then( (res)=>{      
              console.log('res', res);            
          })
          .catch((error)=>{
             console.log("error = ",error);
          });
        });
      }
  }

  componentDidMount(){
    var data = {
      "startRange"        : this.state.startRange,
      "limitRange"        : this.state.limitRange, 
    }
    var checkedOfferings = [];
    var userSubscription = [];
    //==========  Get User List   ============
    axios.get('/api/users/get/list/1')
    .then( (users)=>{         
      this.setState({
            completeDataCount : users.data.length,
            tableData         : users.data,          
          },()=>{
            console.log('tableData', this.state.tableData);
          })


          //==========  Get Offerings List   ============

          axios.get('/api/offerings/get/all/list/1')
          .then( (offerings)=>{      
            console.log("offerings = ",offerings.data);   
            this.setState({
                  offeringTitle : offerings.data,
                },()=>{console.log("offeringTitle",this.state.offeringTitle);
                })
                if(users.data && offerings.data){
                console.log("users.data = ",users.data.length);
                  var i = 0; //users.data.length
                  for (i=0; i < 2; i++) {
                    console.log("users.data["+i+"] = ",users.data[i]);
                    for (var j=0; j<offerings.data.length; j++) {
/*                        console.log("offerings.data["+j+"] = ",users.data[i]._id + "-" + offerings.data[j]._id);
*/                       checkedOfferings.push({
                       // console.log({
                                                id      : users.data[i]._id + "-" + offerings.data[j]._id,  
                                                value   : users.data[i]._id + "-" + offerings.data[j]._id + "-" + offerings.data[j].offeringTitle,
                                                checked : userSubscription.find(function(elem){return elem.offeringDetails.status === "Active";}) ? "checked" : "",
                                             }); 
                    }
                    // console.log("checkedOfferings[i] = ", checkedOfferings[i]) ;
                  }

                 /* if(i >= users.data.length){
                    console.log("checkedOfferings = ", checkedOfferings);
                  }
*/
                }
          })
          .catch((error)=>{
              if(error.message === "Request failed with status code 401"){
                swal("","", "error");
              }
          });
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
           swal("","", "error");
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
                                        this.state.offeringTitle.map((b, j)=>{
                                          return(
                                                <td className="text-center">
                                                  <input type="checkbox" id={a._id+"-"+b._id} value={a._id+"-"+b._id+"-"+b.offeringTitle}  name={b.offeringTitle}  onChange={this.handleChange.bind(this)} checked={this.state.checked}/>&nbsp;
                                                </td>                                                  
                                              )
                                          })
                                      } 

                             </tr>
                              )
                            })
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