import React,{Component}        from 'react';

import moment                   from "moment";
import swal                     from 'sweetalert';

import axios                    from "axios";
import $                        from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {ExportCSV} from '../../common/Export/ExportCSV.js';
import './Clientlist.css';


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
      clientList      : [],
      clientSubscription : []
    }   
  }
  handleChange(event){
    var checkValue  = event.target.checked;
    const target    = event.target.value;
  }

  componentDidMount(){
    /*this.getallusers(); */   
     this.getallclients(); 
  }

   getallclients(){
    
    axios.get('/api/offeringsubscriptions/get/offersub/allclientsubscription')
    .then( (res)=>{      
      this.setState({clientSubscription: res.data})
      
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });
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
        if(this.state.clientSubscription && this.state.clientSubscription.length > 0)
        {
            var data = this.state.clientSubscription;
            for (let i = 0; i < data.length; i++) {
              var productdata =  data[i].productdata;
              if(productdata){
                for (let j = 0; j < productdata.length; j++) {
                client.push({"Client Code": data[i].clientId, "Client Name": data[i].fullName, "Email" : data[i].email,
                            "Contact" : data[i].mobNumber, "Product Opted" : productdata[j].offeringTitle, "Start Date" : productdata[j].startDate,
                            "End Date" : productdata[j].endDate, "Fees Paid" : (productdata[j].endDate >= moment().format('YYYY-MM-DD')) ? productdata[j].offeringAmount : '',
                            "Fees Pending" : ( productdata[j].endDate > moment().format('YYYY-MM-DD') ) ? '0' : productdata[j].offeringAmount, "Distributor Code": data[i].distributorCode  });        
                }
              }
              else{
                client.push({"Client Code": data[i].clientId, "Client Name": data[i].fullName, "Email" : data[i].email,
                            "Contact" : data[i].mobNumber, "Distributor Code": data[i].distributorCode  }); 
              }
              
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
                    <div className="col-lg-12 NOpadding scrollhz">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                              <tr>
                                <th>Client Code</th>
                                <th>Full Name</th> 
                                <th>Email</th>
                                <th>Mobile Number</th> 
                                <th>City</th> 
                                <th>State</th> 
                                <th>Age</th>
                                <th>Product Opted</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Fees paid</th>
                                <th>Fees pending</th>
                                <th>Referrer Code</th>
                                <th>Actions</th>                                 
                              </tr>
                                                     
                            </thead>
                               
                             
                            {
                              this.state.clientSubscription.length > 0 ?
                              this.state.clientSubscription.map((b,j)=>{
                                  return(
                                      <tbody key={j}> 
                                        {
                                          b.productdata && b.productdata.length > 0 ?
                                          b.productdata.map((sub,k)=>{
                                              return(
                                                <tr key={k}>
                                                <td className="col-lg-1"> {b.clientId} </td>
                                                <td className="col-lg-1"> {b.fullName} </td> 
                                                <td className="col-lg-1"> {b.email} </td> 
                                                <td className="col-lg-1"> {b.mobNumber} </td> 
                                                <td className="col-lg-1"> {b.city} </td> 
                                                <td className="col-lg-1"> {b.states} </td> 
                                                <td className="col-lg-1"> {b.dob ? moment().diff(b.dob, 'years') : '' } </td> 
                                                <td className="col-lg-1"> {sub.offeringTitle} </td> 
                                                <td className="col-lg-1"> {sub.startDate} </td> 
                                                <td className="col-lg-1"> {sub.endDate} </td> 
                                                <td className="text-center"><i class="fa fa-rupee"></i>&nbsp;{sub.endDate >= moment().format('YYYY-MM-DD') ? sub.offeringAmount : '0'}</td>
                                                <td className="text-center"><i class="fa fa-rupee"></i>&nbsp;{sub.endDate > moment().format('YYYY-MM-DD') ? '0' : sub.offeringAmount}</td>
                                                <td className="col-lg-1"> 
                                                 <a href={"/distributor/myclients/"+ b.distributorid}> { b.distributorCode }  </a>                                          
                                                </td>
                                                <td className="col-lg-1">
                                                  { b.distributorCode === '-' ? 
                                                  <a href={"/clientmapping/"+ b._id} className="btn btn-primary btn-sm">
                                                      Map Distributor 
                                                  </a>  
                                                  :
                                                   null 
                                                  }
                                                </td>
                                                 </tr> 
                                                )
                                            })
                                          :
                                          <tr key={j}>
                                                <td className="col-lg-1"> {b.clientId} </td>
                                                <td className="col-lg-1"> {b.fullName} </td> 
                                                <td className="col-lg-1"> {b.email} </td> 
                                                <td className="col-lg-1"> {b.mobNumber} </td>
                                                <td className="col-lg-1"> {b.city} </td> 
                                                <td className="col-lg-1"> {b.states} </td> 
                                                <td className="col-lg-1"> {b.dob ? moment().diff(b.dob, 'years') : '' } </td> 
                                                <td className="col-lg-1">  </td> 
                                                <td className="col-lg-1">  </td> 
                                                <td className="col-lg-1"> </td>
                                                <td className="text-center"></td>
                                                <td className="text-center"></td>
                                                <td className="col-lg-1"> 
                                                  <a href={"/distributor/myclients/"+ b.distributorid}>{ b.distributorCode }  </a>                                          
                                                </td>
                                                <td className="col-lg-1">
                                                  { b.distributorCode === '' ? 
                                                  <a href={"/clientmapping/"+ b._id} className="btn btn-primary btn-sm">
                                                      Map Distributor 
                                                  </a>  
                                                  :
                                                   null 
                                                  }
                                                </td>
                                                 </tr> 
                                        }
                                         </tbody>
                                                                               
                                        )
                                      })
                              :null
                                } 
                                
                               
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