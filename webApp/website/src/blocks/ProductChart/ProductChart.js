import React, { Component } from 'react';

import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import Moment                from 'moment';
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
        'prdatawithoutmax'    : '',
        CAGR                  : '',
        
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

                // console.log("productdata = ",prdatawithoutmax);  

                /*calculate CAGR*/
                var rates = response.data.MAX.rates;
                var productstartvalue = rates[0].productRate;
                var productendvalue = rates[rates.length - 1].productRate;
                var startdatemax = rates[0].date;
                var enddatemax = rates[rates.length - 1].date;
                var startdatearr = startdatemax.split("-");
                var enddatearr  = enddatemax.split("-");
                var a = Moment([enddatearr[0], enddatearr[1], enddatearr[2]]);
                var b = Moment([startdatearr[0], startdatearr[1], startdatearr[2]]);

                var years = a.diff(b, 'year');
                b.add(years, 'years');

                var months = a.diff(b, 'months');
                b.add(months, 'months');

                var days = a.diff(b, 'days');

                // console.log(years + ' years ' + months + ' months ' + days + ' days');

                var converttoyear = months / 12 ;
                
                var actualyear = years + converttoyear;
                
                /*carg formula = (((endvalue / startvalue) power (1 / noof years)) - 1 ) * 100 */
                var yearpower = 1 / actualyear ;

                var CAGR = (Math.pow(productendvalue / productstartvalue, yearpower ) - 1 )* 100;
                // console.log("cagr", CAGR);
                /*end CAGR*/

                this.setState({
                  productData : response.data,
                  prdatawithoutmax : prdatawithoutmax,
                  productName : response.data.MAX.productName,
                  indexName : response.data.MAX.indexName,
                  CAGR      : CAGR
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
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productchartout blockborder" id="productchart">
      {
        this.state.productData ?
        
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1  col-sm-12 col-xs-12">

              
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 extspace">

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hrline extspace">

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 iceBlueColor">
                          <h4 className="chartheading">Past Performance vs {this.state.indexName}</h4>
                        </div>

                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                          <h4 className="cagrheading">CAGR <span className="cagrvalue">{this.state.CAGR ? parseFloat(this.state.CAGR).toFixed(2) : 0 }% </span></h4>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 extspace">
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
                       

                        

                        <div className="tab-content extspace chartheightfix" id="myTabContent">
                          
                          { Object.entries(this.state.prdatawithoutmax).map(([key, value]) => {
                                return (
                                  <div className="tab-pane fade" key={key} id={key} role="tabpanel" aria-labelledby={key+"-tab"}>
                                    <Linechart productData = { value } productkey={key}/>
                                  </div>  
                                )
                              })  
                          }
                          { this.state.productData.MAX ? 
                            <div className="tab-pane fade in active" id="MAX" role="tabpanel" aria-labelledby={"MAX-tab"}>
                                    <Linechart productData = { this.state.productData.MAX } productkey="MAX"/>
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