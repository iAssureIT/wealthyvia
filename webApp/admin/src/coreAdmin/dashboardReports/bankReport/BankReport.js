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

class BankReport extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     menu : "",

     "tableHeading" :{
        "partyName"        : "Party Name",                                       
        "Account Number"   : "Account Number",
        "Bank Name"        : "Bank Name",
        "IFSC Code"        : "IFSC Code",
        "Branch"           : "Branch",
        "Amount To Pay"    : "Amount To Pay",
        // "actions"          : "Action"
     },
     "tableObjects"              : {
              // deleteMethod              : 'delete',
              // apiLink                   : '/api/category/',
              paginationApply           : true,
              searchApply               : true,
              // editUrl                   : '/category-management/'
            },
      "startRange"     : 0,
      "limitRange"     : 9,
      "twolevelHeader":{
                        apply:false,
                        },
     totalData : [],
     tableData : [],
     dataCount : 10,
    }
  }

componentDidMount(){
  this.getData(this.state.startRange, this.state.limitRange);
} 

getData(startRange, limitRange){   
  console.log('getData Mani', startRange, limitRange);
  var startDate = moment().format("YYYY-MM-DD");
  var endDate = moment().format("YYYY-MM-DD");
    console.log(startDate,"<......SED......>",endDate);
      axios
        .get('/api/report/get/bankreport/'+startDate+'/'+endDate+'/'+startRange+'/'+limitRange)
        .then((response)=>{
            console.log("bankreport............>",response.data);
            var tData = [];
            var obj = {
              total:response.data.total,
            };
            var totalData = tData.push(obj);
            console.log("totalData............>",tData);
            var tableData = response.data.returnData.map((a, i)=>{
              return {
                "_id"             : a._id ? a._id : 1,
                "partyName"       : a.partyName ? a.partyName : '-',
                "Account Number"  : a.accountNumber ? a.accountNumber : '-',
                "Bank Name"       : a.bankName ? a.bankName : '-',
                "IFSC Code"       : a.IFSCCode ? a.IFSCCode : '-',
                "Branch"          : a.branch ? a.branch : '-',
                "Amount To Pay"   : a.amountToPay >= 0 ? a.amountToPay : '-',
              }
            })
      
            this.setState({
                tableData : tableData,          
                totalData : totalData,         
              },()=>{
              console.log('tableData', this.state.tableData);
              console.log('totalData1', this.state.totalData);
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableHead">Bank Report</div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
            <IAssureTable 
              tableHeading={this.state.tableHeading}
              twoLevelHeader={this.state.twoLevelHeader} 
              dataCount={this.state.dataCount}
              tableData={this.state.tableData}
              totalData={this.state.totalData}
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
export default BankReport;