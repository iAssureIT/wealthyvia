import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import Moment                from 'moment';

import BulkUpload             from "../../common/bulkupload/BulkUpload.js";
import Linechart             from "./Linechart.js";
import './ProductChart.css';

var ActiveArrayUser =[]; 
class ProductChart extends Component{

  constructor(props) {
    super(props);
    this.state = {
        offeringTitle           : [],
        productName             : '',
        chartProductName        : '',
        indexName               : '',
        productID               : '',
        userID                  : '',
        CAGR                    : '',
        fileDetailUrl           : "/api/productrates/get/filedetails/",
        goodRecordsTable        : [],
        failedRecordsTable      : [],
        goodRecordsHeading      :{
            date           : "Date",
            productRate    : "Product Rate",
            indexRate      : "Index Rate",                
        },
        failedtableHeading      :{
            date           : "Date",
            productRate    : "Product Rate",
            indexRate      : "Index Rate",
            failedRemark   : "Failed Data Remark"
        },
        "tableHeading"        : {
          Date                : "Date",
          productRate         : "Product Rate",
          indexRate           : "Index Rate",
        },
        "tableObjects"        : {
          apiLink             : '/api/productrates/',
          editUrl             : '/productrate',        
          paginationApply     : false,
          downloadApply       : true,
          searchApply         : true,
        },
        "startRange"          : 0,
        "limitRange"          : 10000,
        "errors"              : false,
        "shown"               : true,
        "fields"              : {},
        "productData"         : '',
        "prdatawithoutmax"    : '',
        uploadTime            : new Date(),
        propsdata             : {
          uploadTime : new Date(),
        }
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.uploadedData = this.uploadedData.bind(this);
    this.getFileDetails = this.getFileDetails.bind(this);
  }

  componentDidMount() {
    var userid = localStorage.getItem('admin_id');
    //console.log("adminid", userid);
    this.setState({
      userID : userid
    })
     
    axios.get('/api/offerings/get/all/list/1')
        .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
                offeringTitle : offerings.data,
            })
        })
        .catch((error)=>{
            if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
        }
    });  

    
      
  }

    handleChange=(event)=>{
        const target = event.target.value;
        
        if(event.target.name == "productName"){
          var product = target.split("-");
          console.log("product Name", product[0]);
            this.setState({ productName : product[0], productID: product[1], errors: false } )
            this.getproductchartdata(product[1]);
        }
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

                /*calculate CAGR*/
                var rates = response.data.MAX.rates;
                var productstartvalue = rates[0].productRate;
                var productendvalue = rates[rates.length - 1].productRate;
                var startdatemax = rates[0].date;
                var enddatemax = rates[rates.length - 1].date;
                var startdatearr = startdatemax.split("-");
                var enddatearr  = enddatemax.split("-");
                /*console.log("ehdghs", enddatearr[0],enddatearr[1],enddatearr[2], "startghsgf", startdatearr[0],startdatearr[1],startdatearr[2] )
                var a = Moment([enddatearr[0], enddatearr[1], enddatearr[2]]);
                var b = Moment([startdatearr[0], startdatearr[1], startdatearr[2]]);
                console.log(a, b);
                var years = a.diff(b, 'year');
                console.log("yesr", years);
                b.add(years, 'years');

                var months = a.diff(b, 'months');
                b.add(months, 'months');

                var days = a.diff(b, 'days');

                console.log(years + ' years ' + months + ' months ' + days + ' days');*/

                var startdatemaxDate = Moment(startdatemax);
                var enddatemaxDate = Moment(enddatemax);

                var years = enddatemaxDate.diff(startdatemaxDate, 'years');
                var months = enddatemaxDate.diff(startdatemaxDate, 'months');
                var months = months % 12;

                console.log(years + ' years, ' + months + ' months');


                
                var converttoyear = months / 12 ;
                console.log("conver", converttoyear);

                var actualyear = years + converttoyear;
                console.log("actualyear", actualyear);
              
                /*carg formula = (((endvalue / startvalue) power (1 / noof years)) - 1 ) * 100 */
                var yearpower = 1 / actualyear ;

                var CAGR = (Math.pow(productendvalue / productstartvalue, yearpower ) - 1 )* 100;
                console.log("cagr", CAGR);
                /*end CAGR*/

                this.setState({
                  productData : response.data,
                  prdatawithoutmax : prdatawithoutmax,
                  // productName : response.data.MAX.productName,
                  indexName : response.data.MAX.indexName,
                  chartProductName : response.data.MAX.productName,
                  CAGR  : CAGR
                })
             }
             else{
                this.setState({
                  productData : '',
                  prdatawithoutmax : '',
                  // productName : '',
                  indexName : ''
                })
             }
            
          })
          .catch((error)=>{
              if(error.message === "Request failed with status code 401"){
              swal("Error!","Something went wrong!!", "error");
          }
          this.setState({
                  productData : '',
                  prdatawithoutmax : '',
                  // productName : '',
                  indexName : ''
                })
      }); 
    }

    uploadedData(data){
        var inputGetData = {
          "productID"       : this.state.productID,
          "uploadTime"      : this.state.uploadTime
        }
        this.getData(inputGetData);
    }

    getData(inputGetData){
        this.setState({
            propsdata : inputGetData
        },()=>{
         //console.log("propsdata",this.state.propsdata)
        })
        if(inputGetData){
            axios.get('/api/productrates/get/ratesoneproduct/'+this.state.productID)
            .then((response)=>{
            //console.log('response', response);
            var tableData = response.data.rates.map((a, i)=>{
                return {
                  _id             : a._id,
                  date            : a.date,
                  productRate     : a.productRate,
                  indexRate       : a.indexRate,
                  fileName        : a.fileName
                }
            })
            this.setState({
                tableData : tableData,
                prevtableData : tableData
            })
            })
            .catch(function(error){
            console.log("error = ",error);
            }); 
        }      
    }

    getFileDetails(fileName, uploadTime){
      var uploadTime = new Date(uploadTime).toISOString();
        console.log("filename", fileName, );
        axios
        .get(this.state.fileDetailUrl+this.state.productID+"/"+fileName+"/"+uploadTime)
        .then((response)=> {
        $('.fullpageloader').hide();  
        if (response) {
          
            this.setState({
                fileDetails:response.data,
                failedRecordsCount : response.data.failedRecords.length,
                goodDataCount : response.data.goodrecords.length,
                goodRecordsHeading : {  date : "Date",
                                          productRate    : response.data.productName,
                                          indexRate        : response.data.indexName
                  },
                failedtableHeading : {  date : "Date",
                                      productRate    : response.data.productName,
                                      indexRate      : response.data.indexName,
                                      failedRemark   : "Failed Data Remark"
                }                                   
                
            });
            //console.log("failedrecors", response.data);
            //console.log("goodrecords", response.data.goodrecords);
            
              var tableData = response.data.goodrecords.map((a, i)=>{
                return{
                    "date"          : a.date        ? a.date    : '-',
                    "productRate"   : a.productRate ? a.productRate    : '-',
                    "indexRate"     : a.indexRate   ? a.indexRate    : '-',
                  
                }
              })
            
            
              var failedRecordsTable = response.data.failedRecords.map((a, i)=>{
              return{
                    "date"          : a.date        ? a.date    : '-',
                    "productRate"   : a.productRate ? a.productRate    : '-',
                    "indexRate"     : a.indexRate   ? a.indexRate    : '-',
                    "failedRemark"  : a.failedRemark   ? a.failedRemark    : '-',
                }
              })
              this.setState({
                  goodRecordsTable : tableData,
                  failedRecordsTable : failedRecordsTable
              })

              this.getproductchartdata(this.state.productID);
          }
        })
        .catch((error)=> { 
              console.log("error", error);
        }) 
    } 

  handleSubmit(event){
    event.preventDefault();
    //console.log("product", this.state.productID)
    //this.setState({uploadTime : new Date()});
    if(!this.state.productID){
      this.setState({errors: true});
      
    }
    
  }  

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Product Charts</h4>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm" onSubmit={this.handleSubmit.bind(this)} >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="productselection">
                      <label className="control-label statelabel locationlabel" >Select Product</label>
                      <span className="astrick">*</span>
                      <select 
                         type="text" name="productName" placeholder="Enter Product Name" 
                         className="selectbox" thisitle="Please enter product Name" ref="offeringTitle" onChange={this.handleChange}>
                            <option value="">Select Product</option>
                             {
                              this.state.offeringTitle.map((a, i)=>{
                                return(
                                  <option value={a.offeringTitle+"-"+a._id} id={a._id} key={i}>{a.offeringTitle}</option>
                                )
                              })
                            }
                        
                      </select>
                      <label className="errorlabel">{this.state.errors ? "Please select product" : ""}</label>
                    </div>                     
                  </div> 
                </div>
            
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bulkuploadfile">
                    
                        <BulkUpload url="/api/productrates/bulk_upload_productrates" 
                                data={{"productName" : this.state.productName, "productID" : this.state.productID, "userID" : this.state.userID }}
                                uploadedData={this.uploadedData} 
                                fileurl="/csvfile/sampledata.csv"
                                fileDetailUrl={this.state.fileDetailUrl}
                                getData={this.getData.bind(this)}
                                propsdata={this.state.propsdata}
                                getFileDetails={this.getFileDetails}
                                fileDetails={this.state.fileDetails}
                                goodRecordsHeading ={this.state.goodRecordsHeading}
                                failedtableHeading={this.state.failedtableHeading}
                                failedRecordsTable ={this.state.failedRecordsTable}
                                failedRecordsCount={this.state.failedRecordsCount}
                                goodRecordsTable={this.state.goodRecordsTable}
                                goodDataCount={this.state.goodDataCount}
                        />
                        
                </div>
              </form> 

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productchartout">   

                {
                  this.state.productData ?
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hrline">

                        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                          Past Performance vs {this.state.indexName}
                        </div>

                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                          <span className="colorwealthypr">CAGR </span> <span className="cagrvalue">{this.state.CAGR ? parseFloat(this.state.CAGR).toFixed(2) : 0 }% </span>
                        </div>

                        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
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
                       

                        

                        <div className="tab-content" id="myTabContent">
                          
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
                                    <Linechart productData = { this.state.productData.MAX } productkey="MAX" />
                            </div>  
                            :
                            null
                          }  

                        </div>
                    </div> 
                  :
                    null
                }   
              </div> 
{/*
            {this.state.productData ? 
            <div>
              <ul class="nav nav-tabs" id="myTab" role="tablist">
              
              { this.state.productData.map((elem,index)=>{
                  return(
                    <li class="nav-item">
                <a class="nav-link active" id={elem+"-tab"} data-toggle="tab" href={"#"+elem} role="tab" aria-controls={elem} aria-selected="true">elem</a>
              </li>
              
                  )
              })
              } 
              </ul>

              <div class="tab-content" id="myTabContent">
              { this.state.productData.map((elem,index)=>{
                  return(
                    <div class="tab-pane fade" id={elem} role="tabpanel" aria-labelledby={elem+"-tab"}>
                      {
                      this.state.productData ? 
                      <Linechart productData = { this.state.productData.elem }/>
                      : null 
                      } 
                  </div>
                  )
              })
              } 
              </div>
              </div>
              :
              null
            } */}
            {/*  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productchartout">
                {this.state.productData ? 
                  <Linechart productData = { this.state.productData }/>
                : null 
                } 
              </div> */}
                      

                
          </div>
        </div>
      </div>

      );
  }

}

export default ProductChart;