import React,{Component}        from 'react';
import { render }               from 'react-dom';
import { BrowserRouter,Route }  from 'react-router-dom';
import { Switch,Link,location } from 'react-router-dom';
import moment                   from "moment";
import axios                    from "axios";
import IAssureTable             from './IAssureTable.js'
import $                        from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './../dashboardReport.css';

class SettlementReportS extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     menu : "",
     "tableHeading" :{
        vendorID      : "Vendor ID",                                       
        vendorName    : "Vendor Name",
        numOfTrans    : "Num of Trans",
        totalAmount   : "Total Amount",
        deduction     : "Deduction",
        payableAmount : "Payable Amount",
        Status        : "Status",
        Action        : "Action",
     },
     "tableObjects"              : {
              // deleteMethod              : 'delete',
              // apiLink                   : '/api/category/',
              paginationApply           : true,
              searchApply               : true,
              // editUrl                   : '/category-management/'
            },
      "startRange"     : 0,
      "limitRange"     : 10,
      "twolevelHeader":{
                        apply:false,
                        },
     tableData : [],
     completeDataCount : 10,
    }
  }

  componentDidMount(){
    this.getData(this.state.startRange, this.state.limitRange);
  } 

  getData(startRange, limitRange){
    var startDate = moment("2019-09-01T14:07:54+05:30").format("YYYY-MM-DD");
    var endDate = moment().format("YYYY-MM-DD");
      console.log(startDate,"<......SED......>",endDate);
          axios
            .get('/api/report/get/settlementReportSummary/'+startDate+'/'+endDate+'/'+startRange+'/'+limitRange)
            // .get('/get/settlementReportDetail/'+startDate+'/'+endDate+'/'+vendor_ID+'/'+startRange+'/'+limitRange)
            .then((response)=>{
                console.log("settlementReportSummary............>",response.data.returnData);
                var tableData = response.data.returnData.map((a, i)=>{
                  return {
                    "_id"         : a._id ? a._id : 1,
                    vendorID      : a.vendorId ? a.vendorId : '-',                                       
                    vendorName    : a.vendorName ? a.vendorName : '-',
                    numOfTrans    : a.numTransaction ? a.numTransaction : '-',
                    totalAmount   : a.totalAmt ? a.totalAmt : '-',
                    deduction     : a.deduction ? a.deduction : '-',
                    payableAmount : a.payableAmount ? a.payableAmount : '-',
                    Status        : a.status ? a.status : '-',
                    Action        : a.action ? a.action : '-',
                  }
                })
          
                this.setState({
                    completeDataCount : 10,
                    tableData : tableData,          
                  },()=>{
                  console.log('tableData', this.state.tableData);
                  })

            })
            .catch(function (error) {
              console.log(error);
            })  
  }
  
  render(){
    return(
    <div>
      {this.state.menu==""?
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableHead">Settlement Report Summary</div>
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
       {console.log("daily tabledata",this.state.tableData)}
                              <IAssureTable 
                                tableHeading={this.state.tableHeading}
                                twoLevelHeader={this.state.twoLevelHeader} 
                                dataCount={this.state.completeDataCount}
                                tableData={this.state.tableData}
                                getData={this.getData.bind(this)}
                                tableObjects={this.state.tableObjects}
                              />
                            </div>
          <div rowSpan="4" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableFoot">
          </div>
      </div>
      :
      <div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center bgImgWt">
            <img src="/images/cofficLoader.gif" alt="Logo_img" height="15%" width="15%" className="imgHt"/>
          </div>
      </div>
    }
    </div>
    );
  }
}
export default SettlementReportS;