import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import swal                 from 'sweetalert';
import IAssureTable         from "../../common/bulkupload/IAssureTable.js";
import './filewiseproductratelist.css';
import Moment                from 'moment';


class FilewiseProductratesList extends Component{
  
  constructor(props){
    super(props); 
    this.state = {
        offeringTitle           : [],
        productName             : '',
        indexName               : '',
        productID               : '',
        userID                  : '',
       tableHeading:{
            "productName"  : 'Product Name',            
            "fileName"     : "File Name",
            "displayuploadTime"   : "Upload Time",
            "count"        : "Product rate Count",
            "actions"      : "Action"
          },
          "tableObjects"              : {
              deleteMethod              : 'delete',
              apiLink                   : '/api/productrates/file/delete/',
              paginationApply           : false,
              searchApply               : false,
            },
          startRange : 0,
          limitRange : 100000
    }
    
  }
  componentDidMount(){
    
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
    //this.getData(this.state.startRange, this.state.limitRange);
  }

  handleChange=(event)=>{
        const target = event.target.value;
        
        if(event.target.name == "productName"){
          var product = target.split("-");
            this.setState({ productName : product[0], productID: product[1], errors: false } )
            this.getCount(product[1]);
            this.getData(this.state.startRange, this.state.limitRange, product[1]);
    }
  }

  getData(startRange, limitRange, productid){
      var data = {
        startRange : startRange,
        limitRange : limitRange,
        productID  : productid
        
      }
      axios.post('/api/productrates/get/files', data)
      .then((response)=>{
        if(response.data === "data not found"){
          this.setState({
              tableData : []
            })
      
        }
        else{
             console.log(response.data);
          var tableData = response.data.map((a, i)=>{
          return {
                productName: this.state.productName,
                fileName: a.fileName != null ? a.fileName : "-", 
                displayuploadTime: a.uploadTime != null ? Moment(a.uploadTime).format("DD MMM YYYY HH:MM:SS") : "-",
                uploadTime: a.uploadTime != null ? a.uploadTime : "-",
                count: a.count != NaN ? "<p>"+a.count+"</p>" : "a", 
                _id: this.state.productID != null ? this.state.productID : "-",
                recordindex: i 
              }
            })
            console.log('tableData', tableData)
            this.setState({
              tableData : tableData
            })
            
        }
       })
      .catch((error)=>{
        console.log('error', error);
      })
    }

    getCount(productid){
      axios.get('/api/productrates/get/files/count/'+productid)
      .then((response)=>{
         console.log(response.data)
        this.setState({
          dataCount : response.data
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
  render() {
    return (
      <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="formWrapper"> 
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageSubHeader">
                      Filewise Product rates Details
                    </div>
                  </div>
                  <form id="CompanySMSGatewayForm" >
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
                  </form>
                  <hr className="hr-head"/>
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <IAssureTable 
                        id="FilewiseProductratesList"
                        tableHeading={this.state.tableHeading}
                        twoLevelHeader={this.state.twoLevelHeader} 
                        dataCount={this.state.dataCount}
                        tableData={this.state.tableData}
                        getData={this.getData.bind(this)}
                        tableObjects={this.state.tableObjects}
                      />
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
export default FilewiseProductratesList