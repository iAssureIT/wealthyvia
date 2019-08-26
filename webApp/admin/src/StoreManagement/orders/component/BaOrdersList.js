import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';
// import '../css/AdminOrdersList.css';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
class BaOrdersList extends Component{
    constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[]
                
            };
            
        } else{
            this.state = {
                "orderData":[]
            };
        }
        
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getOrders();   
    }
    getOrders(){
      axios.get("/api/orders/get/list")
            .then((response)=>{
              var finaldata = $(response.data).filter(function (i,n){
                  return n.deliveryStatus[0].status == 'Dispatch' || n.deliveryStatus[0].status == 'Deliver Order'
                     || n.deliveryStatus[0].status == 'Delivered' || n.deliveryStatus[0].status == 'Delivered & Paid '; 
              });
              console.log(finaldata);
              this.setState({
                  orderData : finaldata
              })
            })
            .catch((error)=>{   
                console.log('error', error);
            })
    }
    
    componentWillReceiveProps(nextProps){
      console.log(nextProps);
        
        
    }
    componentWillUnmount() {
      //this.getOrders();
        $("body").find("script[src='/js/adminLte.js']").remove();
        if(this.basicPageTracker)
          this.basicPageTracker.stop();
    }

    changeOrderStatus(event){
        event.preventDefault();
        var status = $(event.currentTarget).attr('data-status');
        var id = $(event.currentTarget).attr('data-id');
        
        if(status != "Dispatch"){
            if(status!="Done"){
                swal({
                    title: 'Do you want to change status to '+status+ "?",
                    text: 'Do you want to change status to '+status+ "?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then((obj)=> {
                    if(obj==true){
                        var formValues = {
                          "orderID" :  id,  
                          "status"  :  status,
                          "userid"  :  1
                        }
                        axios.patch('/api/orders/patch/updateDeliveryStatus', formValues)
                        .then((response)=>{
                          this.getOrders();
                          
                          swal({
                            title : response.data.message,
                            text  : response.data.message,
                          });
                        })
                        .catch((error)=>{
                          console.log('error', error);
                        })
                    }
                  });
            }
        }   
    }

    closeModal(event){
        // console.log('event',event);
        event.preventDefault();
        $('.dispatchCompanyName').val('');
        $('.deliveryPersonName').val('');
        $('.deliveryPersonContact').val('');
    }
    render(){

        return(         
            <div className="container-fluid">
              <div className="row">
                <div className="formWrapper">
                  <section className="content">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
                            Shipment Tracking                     
                          </div>
                          <hr className="hr-head container-fluid row"/>
                        </div>
                        <div className="row">
                          <div className="col-md-12">

                              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop">
                                   <div className="admin-orders-SubTitleRow  row">
                                      <div className="col-lg-12">
                                          <div className="admin-orders-listofColors">
                                              <span className="">
                                                  <span className="admin-orders-stat-Dispatched comm-status-of-order"></span>
                                                  Deliver Order
                                              </span>
                                              <span className="">
                                                  <span className="admin-orders-stat-Delivered comm-status-of-order"></span>
                                                  Delivered
                                              </span>
                                              <span className="">
                                                  <span className="admin-orders-stat-Deliveredpaid comm-status-of-order"></span>
                                                  Delivered & Paid
                                              </span>
                                             
                                          </div>
                                      </div>
                                  </div>
                                  <div className="admin-orders-SubTitleTable marginTop11">
                                      <table className="table iAssureITtable-bordered table-striped table-hover">
                                          <thead className="tempTableHeader">
                                              <tr>
                                                  <th className="col-lg-1 whiteSpace">Order ID</th>
                                                  <th className="col-lg-2">Customer</th>
                                                  <th className="col-lg-2">No. of Products</th>
                                                  <th className="col-lg-1">Quantity</th>
                                                  <th className="col-lg-1">Total Price</th>
                                                  <th className="col-lg-1 whiteSpace">Order Date</th>
                                                  <th className="col-lg-2">Status</th>
                                                  <th className="col-lg-2">Action</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {
                                                  this.state.orderData.map((index, listData)=>{
                                            
                                                      return(
                                                          <tr key={index}>
                                                              <td className="col-lg-1">
                                                                  {listData.orderID}
                                                              </td>
                                                              <td className="col-lg-2">
                                                                  {listData.userFullName }
                                                              </td>
                                                             
                                                              <td className="col-lg-2 textAlignRight">
                                                                  {listData.productLength }
                                                              </td>
                                                              <td className="col-lg-1 textAlignRight">
                                                                  {listData.totalQuantity }
                                                              </td>
                                                              <td className="col-lg-1 textAlignRight">
                                                                 {/* R &nbsp;{listData.totalAmount } */}
                                                                 {(parseInt(listData.totalAmount)).toFixed(2)}
                                                              </td>
                                                              <td className="col-lg-1 textAlignCenter">
                                                                  { moment(listData.createdAt).format("MMM Do YY") }
                                                                  
                                                              </td>
                                                              <td className="col-lg-2">
                                                                  <div className="admin-orders-stat1">
                                                                      {listData.status}
                                                                  </div>
                                                                  <div className={ 
                                                                        listData.deliveryStatus[0].status == "Dispatch" ?
                                                                         "admin-orders-stat-Dispatched" : ( 
                                                                            listData.deliveryStatus[0].status == "Deliver Order"    ? "admin-orders-stat-Dispatched" :
                                                                            listData.deliveryStatus[0].status == "Delivered"    ? "admin-orders-stat-Delivered" :
                                                                            listData.deliveryStatus[0].status == "Delivered & Paid"   ? "admin-orders-stat-Deliveredpaid" : ""
                                                                                ) 
                                                                                                                                    
                                                                      }>
                                                                      {
                                                                         listData.deliveryStatus[0].status
                                                                      }
                                                                  </div>
                                                                  

                                                              </td>
                                                              <td className="col-lg-2 textAlignCenter">
                                                                  <a href={"/orderPlaced/"+listData._id} target="_blank" title="View Invoice" className="admin-order-view">
                                                                      <i className="fa fa-eye" aria-hidden="true"></i>
                                                                  </a>    

                                                                  {listData.deliveryStatus[0].status == "Delivered & Paid" ? 
                                                                      ""
                                                                      :
                                                                      <div className="admin-order-changeStatus " onClick={this.changeOrderStatus.bind(this)} data-id={listData._id} data-status={
                                                                              
                                                                              listData.deliveryStatus[0].status == "Dispatch"          ? "Deliver Order" :  
                                                                              listData.deliveryStatus[0].status == "Deliver Order"     ? "Delivered" :  
                                                                              listData.deliveryStatus[0].status == "Delivered"         ? "Delivered & Paid" :
                                                                              listData.deliveryStatus[0].status == "Delivered & Paid"  ? "Done" : "Done"
                                                                          } 
                                                                          title={
                                                                              
                                                                              listData.deliveryStatus[0].status == "Dispatch"           ? "Change Status to Deliver Order" :
                                                                              listData.deliveryStatus[0].status == "Deliver Order"      ? "Change Status to Delivered" :  
                                                                              listData.deliveryStatus[0].status == "Delivered"          ? "Change Status to Delivered & Paid" :  
                                                                              listData.deliveryStatus[0].status == "Delivered & Paid"   ? "Done" : "Done"
                                                                          }
                                                                          data-target={
                                                                              listData.deliveryStatus[0].status == "Dispatch"          ? "" :  
                                                                              listData.deliveryStatus[0].status == "Delivered"         ? "" :  
                                                                              listData.deliveryStatus[0].status == "Delivered & Paid"  ? "" : ""
                                                                          } 
                                                                          data-toggle="modal"
                                                                          >
                                                                          <i className={                                                                    
                                                                            listData.deliveryStatus[0].status == "Dispatch"           ? "fa fa-truck admin-orders-stat-Dispatchedicon" :
                                                                            listData.deliveryStatus[0].status == "Deliver Order"           ? "fa fa-truck admin-orders-stat-Dispatchedicon" :  
                                                                            listData.deliveryStatus[0].status == "Delivered"          ? "fa fa-check-circle admin-orders-stat-Deliveredicon" :  
                                                                            listData.deliveryStatus[0].status == "Delivered & Paid"   ? "fa fa-check-circle" : ""
                                                                        }
                                                                         aria-hidden="true"></i>
                                                                      </div>
                                                                  }


                                                                  
                                                              </td>
                                                          </tr>
                                                      );
                                                  })
                                              }


                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div> 
        );
    }
}

export default BaOrdersList
