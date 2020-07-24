import React, { Component } from 'react';

import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import Linechart             from "./Linechart.js";
import './ProductChart.css';

var ActiveArrayUser =[]; 
class ProductChart extends Component{

  constructor(props) {
    super(props);
    this.state = {
        productName             : '',
        indexName               : '',
        productID               : '',
        userID                  : '',
        "errors"              : false,
        "productData"         : '',
        'prdatawithoutmax'    : ''
        
    };
    
  }

  componentDidMount() {
    var offeringname = this.props.offeringName;
    
    axios.get('/api/offerings/get/name/'+offeringname)
        .then( (offerings)=>{      
          // console.log("offerings = ",offerings.data);   
          this.getproductchartdata(offerings.data._id);
        
        })
        .catch((error)=>{
            if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
        }
    });  

    
      
  }

    
    getproductchartdata(productid){
      //console.log("productid", productid);
        axios
        .get("/api/productrates/get/rates/"+productid)
        .then( (response)=>{      
          //console.log("productdata = ",response.data);   
            if(response.data.MAX){
              var prdatawithoutmax = Object.assign({}, response.data);
              prdatawithoutmax = Object.keys(prdatawithoutmax).reduce((object, key) => {
                                  if (key !== 'MAX') {
                                    object[key] = prdatawithoutmax[key]
                                  }
                                  return object
                                },{});

                console.log("productdata = ",prdatawithoutmax);  
                this.setState({
                  productData : response.data,
                  prdatawithoutmax : prdatawithoutmax,
                  productName : response.data.MAX.productName,
                  indexName : response.data.MAX.indexName
                })
             }

          })
          .catch((error)=>{
              if(error.message === "Request failed with status code 401"){
              swal("Error!","Something went wrong!!", "error");
          }
      }); 
    }

    
   

   

  render(){
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productchartout blockborder">
      {
        this.state.productData ?
        
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1  col-sm-12 col-xs-12">

              
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 extspace">

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hrline extspace">

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 iceBlueColor">
                          <h4 className="chartheading">Past Performance vs {this.state.indexName}</h4>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 extspace">
                            <ul className="nav nav-pills chartpills" id="myTab" role="tablist">
                              
                              { Object.entries(this.state.prdatawithoutmax).map(([key, value]) => {
                                    return (
                                     <li className="nav-item" key={key}>
                                          <a className="nav-link" id={key+"-tab"} data-toggle="tab" href={"#"+key} role="tab" aria-controls={key} >{key}</a>
                                     </li>
                                    )
                                  })  
                              }
                              { this.state.productData.MAX ? 
                                  <li className="nav-item active" key="max">
                                    <a className="nav-link" id="MAX-tab" data-toggle="tab" href="#MAX" role="tab" aria-controls="MAX"  >MAX</a> 
                                  </li>
                                :
                                null
                              } 

                            </ul>
                         </div>
                      </div>      
                       

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productspace extspace">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 extspace">
                              <h5 className="investingva">Current value of ₹ 100 invested once on inception of this smallcase would be</h5>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 extspace">
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 extspace">
                                  <h4>{this.state.productName} ₹287.63</h4>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 extspace">
                                  <h4>{this.state.indexName} ₹112.65</h4>
                              </div>
                          </div>
                        </div>

                        <div className="tab-content extspace" id="myTabContent">
                          
                          { Object.entries(this.state.prdatawithoutmax).map(([key, value]) => {
                                return (
                                  <div className="tab-pane fade" key={key} id={key} role="tabpanel" aria-labelledby={key+"-tab"}>
                                    <Linechart productData = { value }/>
                                  </div>  
                                )
                              })  
                          }
                          { this.state.productData.MAX ? 
                            <div className="tab-pane fade in active" id="MAX" role="tabpanel" aria-labelledby={"MAX-tab"}>
                                    <Linechart productData = { this.state.productData.MAX }/>
                            </div>  
                            :
                            null
                          }  

                        </div>
                    </div> 
                    
                
            </div>
          
          :
                    null
          }   
        </div>

      );
  }

}

export default ProductChart;