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
      offeringTitle    : [],
      tableData        : [],
      subscriptionData : "",
      startRange       : 0,
      limitRange       : 100,
    }   
  }
  handleChange(event){
    var checkValue  = event.target.checked;
    const target    = event.target.value;
  }

  componentDidMount(){
    var data = {
      "startRange"        : this.state.startRange,
      "limitRange"        : this.state.limitRange, 
    }
    /*User Subscribed*/
     axios.get('/api/offeringsubscriptions/get/alloffersub')
      .then( (res)=>{      
        this.setState({
              completeDataCount       : res.data.length,
              subscriptionData        : res.data,          
            },()=>{
              console.log("subscriptionData",this.state.subscriptionData);
        })
      
      })
      .catch((error)=>{
        console.log("error",error);
        if(error.message === "Request failed with status code 401")
          { 
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
      });
   
   /* axios.get('/api/subscriptionorders/get/showchart/'+ 2019)
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
    });*/
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
                              {/*<th className="text-center">Multibagger</th>
                              <th className="text-center">Fly Nifty</th>
                              <th className="text-center">US Stocks</th>
                              <th className="text-center">SHM Alpha Enhancer</th>
                              <th className="text-center">Safe Heavan</th>
                              <th className="text-center">5GCPM</th>
                              <th className="text-center">Super Focused</th>*/}
                               {
                                this.state.subscriptionData && this.state.subscriptionData.length > 0 && this.state.subscriptionData[0].offering ? 
                                this.state.subscriptionData[0].offering.map((b, j)=>{
                                  return(
                                          <th className="text-center">{b.offeringTitle}</th>
                                      )
                                    })
                                :
                                null
                                } 
                            </tr>
                                                   
                          </thead>
                          {console.log("this.state.subscriptionData",this.state.subscriptionData)}
                          <tbody>     
                          {
                            this.state.subscriptionData?
                            this.state.subscriptionData.map((a, i)=>{
                                return(
                                    <tr>  
                                      <td>{a.clientID}</td>
                                      <td className=""> 
                                        <p>{a.userName}</p>
                                        <p>{a.mobileNumber}</p>
                                        <p>{a.email}</p>
                                      </td>
                                        {
                                          this.state.offeringTitle.map((b, j)=>{
                                          return(

                                               <td className="col-lg-1 textAlignCenter">
                                                   <i  data-attribute={a.user_id} data-ID={"U"+i+"P"+j+"-"+b._id} 
                                                   className={'prodCheckboxDim ' + (a.offering[j].offeringStatus == "Active" ? "fa fa-check prodCheckboxDimSelected" : "fa fa-times prodCheckboxDimNotSelected" )}
                                                   aria-hidden="true"></i>
                                                </td>
                                                
                                              /* <td className="col-lg-1 textAlignCenter">
                                                 <i className="fa fa-check-circle prodCheckboxDim prodCheckboxDimNotSelected" aria-hidden="true"></i>
                                              </td>  */ 
                                                                                         
                                                )
                                            })
                                          

                                        } 

                               </tr>
                                )
                              }):
                            null
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