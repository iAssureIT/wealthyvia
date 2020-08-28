import React,{Component}        from 'react';

import moment                   from "moment";
import swal                     from 'sweetalert';

import axios                    from "axios";
import $                        from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {ExportCSV} from '../../common/Export/ExportCSV.js';
// import './Clientlist.css';


class Clientlist extends Component {
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
    this.getallusers();    
     
  }

  getallusers(){
     var data = {
    "startRange"        : this.state.startRange,
    "limitRange"        : this.state.limitRange, 
    }
    axios.get('/api/users/get/list/role/user/'+data.limitRange)
    .then( (res)=>{      
      console.log("userDetailsDisplay",res)
      this.setState({
        userDetailsDisplay : res.data[0],
        userIdG            : res.data[0]._id,
      })
      console.log("userIdG",this.state.userIdG)
      var tableData = res.data.map((a, i)=>{
        return {
          _id             : a._id,
          clientId        : a.clientId,
          fullName        : a.fullName ? a.fullName : "-",
          email           : a.email ? a.email : "-",
          mobNumber       : a.mobNumber ? a.mobNumber : "-", 
          status          : a.status ? a.status : "-",  
          role            : a.role[0] ? a.role[0] : "-",
          checked         : false,
          distributorCode : a.distributorCode ? a.distributorCode : "-",
        }
      })
      this.setState({
          completeDataCount : res.data.length,
          tableData         : tableData,
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
  }

  exportClientdata = () => {
        let client = []
        if(this.state.tableData && this.state.tableData.length > 0)
        {
            var data = this.state.tableData;
            for (let i = 0; i < data.length; i++) {
                client.push({"Client Code": data[i].clientId, "Client Name": data[i].fullName, "email" : data[i].email,
                            "Contact" : data[i].mobNumber });        
              }
        }
        
        return client;
      }

 
  render(){
    
     return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Client List
              <div className=" pull-right" style={{ textAlign: 'right', marginTop: '2px', fontSize: '16px'}}>
                <ExportCSV csvData={this.exportClientdata()} fileName="clients" />&nbsp;
              </div> 
          </h4>
         </div>
         <hr className="compySettingHr"/>
          <div className="modal-bodyuser ">
            <form className="newTemplateForm ">
               
              <div className="tab-content customTabContent col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                              <tr>
                                <th>Client Code</th>
                                <th>Full Name</th> 
                                <th>Email</th>
                                <th>Mobile Number</th> 
                                <th>Distributor Code</th>
                                <th>Actions</th>                                 
                              </tr>
                                                     
                            </thead>
                            <tbody>     
                             
                            {
                              this.state.tableData?
                              this.state.tableData.map((b,j)=>{
                                  return(
                                        <tr key={j}>
                                        <td className="col-lg-1"> {b.clientId} </td>
                                          <td className="col-lg-1"> {b.fullName} </td> 
                                          <td className="col-lg-1"> {b.email} </td> 
                                          <td className="col-lg-1"> {b.mobNumber} </td>  
                                          <td className="col-lg-1"> 
                                            { b.distributorCode }                                            
                                          </td>
                                          <td className="col-lg-1">
                                            { b.distributorCode === '-' ? 
                                            <a href={"/clientmapping/"+ b._id} className="btn btn-primary btn-sm">
                                                Map distributor 
                                            </a>  
                                            :
                                             null
                                            }
                                          </td> 
                                        </tr>                                         
                                        )
                                      })
                              :null
                                } 
                                
                               </tbody>
                          </table>
                        </div>
                      </div>
              </div>    
            </form>
          </div>
        </div>
      </div>
     );
  }
}


export default Clientlist;