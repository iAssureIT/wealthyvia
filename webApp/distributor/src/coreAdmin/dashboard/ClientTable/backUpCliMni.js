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
      offeringTitle :[],
      tableData     :[],

    }   
  }
  handleChange(event){
        var checkValue = event.target.checked;
        const target = event.target.value;
        // console.log("checkValue",checkValue);
    }

  componentDidMount(){
    var data = {
      "startRange"        : this.state.startRange,
      "limitRange"        : this.state.limitRange, 
    }
    axios.get('/api/subscriptionorders/get/showchart/'+ 2019)
    .then( (res)=>{      
      this.setState({
            completeDataCount : res.data.length,
            tableData         : res.data,          
          },()=>{
            // console.log('tableData', this.state.tableData);
          })
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });
    axios.get('/api/offerings/get/all/list/1')
    .then((res)=>{      
      this.setState({
        offeringTitle : res.data,
      })
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
    });
    // this.getData(this.state.startRange, this.state.limitRange)
  }
  changeAttribute(event){
    event.preventDefault();
    // console.log('this', this.state.startRange, this.state.limitRange);
    var offering_id = "";
    var offering_Name = event.target.getAttribute('data-attribute');
    var attributeCheckedValue = event.target.getAttribute('data-attributeValue');
    var user_id  = event.currentTarget.getAttribute('data-ID');
    console.log('attribute', offering_Name, attributeCheckedValue, user_id);
     axios.get('/api/offerings/get/name/',offering_Name)
      .then((response)=>{
        console.log("response",response);
        offering_id = response._id;

      })
      .catch((error)=>{
        console.log('error', error);
      })
        if(user_id){
            if(attributeCheckedValue=="Active"){
                attributeCheckedValue = "Inactive";
            } else {
                attributeCheckedValue = "Active";
            }
           var offeringValues={
              "userID"      : user_id, 
              "planID"      : offering_id,
              "btnStatus"   : "checked",      
            }
      console.log("offeringValues",offeringValues);
      axios.post('/api/subscriptionorders/post/offering',offeringValues)
      .then((response)=>{
        console.log("response",response);
        // console.log('this', this.state.startRange, this.state.limitRange);
        // this.props.getData(this.state.startRange, this.state.limitRange);
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
  }
render(){
  var adminRolesListDataList = this.state.adminRolesListData;
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
                              <th className="text-center">Client Details</th>
                              <th className="text-center">5GCPM</th>
                              <th className="text-center">Safe Heavan</th>
                              <th className="text-center">SHM Alpha Enhancer</th>
                              <th className="text-center">US Stocks</th>
                              <th className="text-center">Fly Nifty</th>
                              <th className="text-center">Multibagger</th>
                            </tr>
                          </thead>
                          <tbody>
                          {console.log("this.state.tableData",this.state.tableData)}
                          {
                            this.state.tableData.map((a, i)=>{
/*                               console.log(i+"a"+a.offering[i]?a.offering[i].offeringStatus:"");*/
                                return(
                                    <tr>
                                      <td>{i<99 ? i<9 ? "WL00"+(i+1) : "WL0"+(i+1) : "WL"+(i+1)}</td>
                                        
                                      <td className="">
                                        <p>{a.userName}</p>
                                        <p>{a.userMobile}</p>
                                        <p>{a.userEmail}</p>
                                     

                                      </td>
                           
                                  {/*  <td className="col-lg-1 textAlignCenter">
                                       <i onClick={this.changeAttribute.bind(this)} data-attribute={a.user_id} data-ID={b._id} className={'fa fa-check-circle prodCheckboxDim ' + (a.offering[j].offeringStatus == "Active" ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                    </td> */ }
                                      <td className="col-lg-1 textAlignCenter">
                                            <i onClick={this.changeAttribute.bind(this)} data-attribute="5GCPM" data-ID={a.user_id} data-attributeValue={a.featured} className={'fa fa-check-circle prodCheckboxDim ' + ( a.user_id == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td>
                                        <td className="col-lg-1 textAlignCenter">
                                            <i onClick={this.changeAttribute.bind(this)} data-attribute="Safe Heavan" data-ID={a.user_id} data-attributeValue={a.exclusive}   className={'fa fa-check-circle prodCheckboxDim ' + ( a.user_id == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td>
                                        <td className="col-lg-1 textAlignCenter">
                                            <i onClick={this.changeAttribute.bind(this)} data-attribute="SHM Alpha Enhancer" data-ID={a.user_id} data-attributeValue={a.newProduct}  className={'fa fa-check-circle prodCheckboxDim ' + ( a.user_id == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td>
                                        <td className="col-lg-1 textAlignCenter">
                                            <i onClick={this.changeAttribute.bind(this)} data-attribute="US Stocks" data-ID={a.user_id} data-attributeValue={a.bestSeller}   className={'fa fa-check-circle prodCheckboxDim ' + ( a.user_id == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td>    
                                        <td className="col-lg-1 textAlignCenter">
                                            <i onClick={this.changeAttribute.bind(this)} data-attribute="Fly Nifty" data-ID={a.user_id} data-attributeValue={a.bestSeller}  className={'fa fa-check-circle prodCheckboxDim ' + ( a.user_id == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td> 
                                        <td className="col-lg-1 textAlignCenter">
                                            <i onClick={this.changeAttribute.bind(this)} data-attribute="Multibagger" data-ID={a._id} data-attributeValue={a.bestSeller}   className={'fa fa-check-circle prodCheckboxDim ' + ( a.user_id == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                        </td>                                         
                               
                                     

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