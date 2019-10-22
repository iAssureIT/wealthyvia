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
    axios.get('/api/users/get/list/1')
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
    axios.get('http://api.wealthyvia.com/api/offerings/get/all/list/1')
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
    // console.log('attribute', attribute, attributeValue, product_ID);
        if(product_ID){
            if(attributeValue=="true"){
                attributeValue = false;
            } else {
                attributeValue = true;
            }
             var offeringValues={
        "userID"      : "userID", 
        "planID"      : product_ID,
        "btnStatus"   : "checked",      
      }
      axios.post('/api/subscriptionorders/post/offering',offeringValues)
      .then((response)=>{
        // console.log('this', this.state.startRange, this.state.limitRange);
        this.props.getData(this.state.startRange, this.state.limitRange);
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
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
                          {
                            this.state.tableData.map((a, i)=>{
                            console.log('a',a);
                                return(
                                    <tr>
                                      <td>Wl01212819</td>

                                      <td className="">
                                        <p>{a.fullName}</p>
                                        <p>{a.mobNumber}</p>
                                        <p>{a.email}</p>

                                      </td>
                                        {
                                          this.state.offeringTitle.map((value, j)=>{
                                              console.log("value ",value);
                                            return(
                                                 <td className="col-lg-1 textAlignCenter">
                                                   <i onClick={this.changeAttribute.bind(this)} data-attribute={value.offeringTitle} data-ID={value._id} data-attributeValue={value.featured} title={ (value.featured == true )? "Disable It" : "Enable It" } className={'fa fa-check-circle prodCheckboxDim ' + ( value.featured == true ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
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