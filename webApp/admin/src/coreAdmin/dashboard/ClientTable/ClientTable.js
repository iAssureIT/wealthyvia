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
    var attribute = event.target.getAttribute('data-attribute');
    var attributeValue = event.target.getAttribute('data-attributeValue');
    var product_ID  = event.currentTarget.getAttribute('data-ID');
    
    console.log(product_ID);
    var data_id = product_ID.split('-');
    var offering_ID = data_id[1];
    console.log('attribute', attribute, attributeValue, data_id);
    if(offering_ID){
        if(attributeValue=="Active"){
            attributeValue = "Inactive";
        } else {
            attributeValue = "Active";
        }
       var offeringValues={
          "userID"      : attribute, 
          "planID"      : offering_ID,
          "btnStatus"   : "checked",      
        }
        axios.post('/api/subscriptionorders/post/offering',offeringValues)
        .then((response)=>{
         console.log("response",response);
         // window.location.reload();
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
                              {/* {
                                this.state.offeringTitle.map((b, j)=>{
                                  return(
                                          <th className="text-center">{b.offeringTitle}</th>
                                      )
                                    })
                                } */}
                            </tr>
                                                   
                          </thead>
                          {console.log("this.state.tableData",this.state.tableData)}
                          <tbody>     
                          {
                            this.state.tableData.map((a, i)=>{
                                return(
                                    <tr>  
                                      <td>{i<99 ? i<9 ? "WL00"+(i+1) : "WL0"+(i+1) : "WL"+(i+1)}</td>
                                      <td className="">
                                        <p>{a.userName}</p>
                                        <p>{a.userMobile}</p>
                                        <p>{a.userEmail}</p>
                                     
                                      </td>
                                        {
                                          this.state.offeringTitle.reverse().map((b, j)=>{
                                            console.log("b._id"+"U"+i+"P"+j+b._id)
                                            return(
                                               <td className="col-lg-1 textAlignCenter">
                                                   <i onClick={this.changeAttribute.bind(this)} abc={a.offering[j].offeringStatus} data-attribute={a.user_id} data-ID={"U"+i+"P"+j+"-"+b._id} className={'fa fa-check-circle prodCheckboxDim ' + (a.offering[j].offeringStatus == "Active" ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
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