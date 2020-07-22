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
        productID               : '',
        userID                  : '',
        "errors"              : false,
        "shown"               : true,
        "fields"              : {},
        "productData"         : ''
        
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
            this.setState({
              productData : response.data,
            })
          })
          .catch((error)=>{
              if(error.message === "Request failed with status code 401"){
              swal("Error!","Something went wrong!!", "error");
          }
      }); 
    }

    
   

   

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productchartout">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1  col-sm-12 col-xs-12">

              <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#performance" role="tab" aria-controls="performance" aria-selected="false">Performance</a>
                  </li>
                </ul>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">overview</div>
                <div class="tab-pane fade" id="performance" role="tabpanel" aria-labelledby="performance-tab">{
                    this.state.productData ? 
                      <Linechart productData = { this.state.productData }/>
                    : null 
                    } 
                </div>
                
              </div>
                
            </div>
          </div>  
        </div>

      );
  }

}

export default ProductChart;