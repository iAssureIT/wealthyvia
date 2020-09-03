import React,{Component}        from 'react';

import moment                   from "moment";
import swal                     from 'sweetalert';

import Axios                    from "axios";
import $                        from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import './Clientlist.css';


class ClientRevenue extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientSubscription: [],
    }   
  }
  handleChange(event){
    var checkValue  = event.target.checked;
    const target    = event.target.value;
  }

  componentDidMount(){
    this.getallclients();    
     
  }

  getallclients(){
    
    axios.get('/api/offeringsubscriptions/get/allclientoffsubscription')
    .then( (res)=>{      
      console.log("userDetailsDisplay",res)
      
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
        {
             swal("Your session is expired! Please login again.","", "error");
             this.props.history.push("/");
        }
    });
  }



 
  render(){
    
     return(
      <div className="">
        <section className="">
                   
                
          {
            this.state.clientSubscription ?
                <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th className="text-left">Client Code</th>
                              <th className="text-left">Client Name</th>
                              <th className="text-left">Start Date</th>
                              <th className="text-left">End Date</th>
                              <th className="text-left">Product Opted</th>
                              <th className="text-left">Fees Paid</th>
                              <th className="text-left">Fees Pending</th>
                              
                            </tr>
                                                   
                          </thead>
                          <tbody>     
                          {
                            this.state.clientSubscription && this.state.clientSubscription.length > 0 ?
                            this.state.clientSubscription.map((a, i)=>{
                                return(
                                    <tr key={i}> 
                                      <td className="">{a.clientCode} </td> 
                                      <td className="">{a.clientName} </td>
                                      <td>{a.startDate}</td>
                                      <td>{a.endDate}</td>
                                      <td>{a.offeringTitle}</td> 
                                      <td className="text-center">{a.endDate >= moment().format('YYYY-MM-DD') ? a.offeringAmount : ''}</td>
                                      <td className="text-center">{a.endDate > moment().format('YYYY-MM-DD') ? '0' : a.offeringAmount}</td>
                               </tr>
                                )
                              }):
                            null
                            }
                            </tbody>
                          
                        </table>
              </div>    
            </div>
          </div>
            :
            null
          }
          

        </section>
      </div>
     );
  }
}


export default ClientRevenue;