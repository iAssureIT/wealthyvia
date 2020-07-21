import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
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
        productID               : '',
        userID                  : '',
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
        "productData"         : ''
        
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

    uploadedData(data){
        var inputGetData = {
          "productID"       : this.state.productID,
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
            axios.post('/api/productrates/get/rates', this.state.productID)
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

    getFileDetails(fileName){
        //console.log("filename", fileName);
        axios
        .get(this.state.fileDetailUrl+this.state.productID+"/"+fileName)
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
                                fileurl="#"
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
                {this.state.productData ? 
                  <Linechart productData = { this.state.productData }/>
                : null 
                } 
              </div>
                      

          </div>
        </div>
      </div>

      );
  }

}

export default ProductChart;