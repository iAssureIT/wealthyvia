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

class SalesTransactionReportDashB extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      menu : "",
      typeUser : "Active",
      startDate : moment("2019-09-30T11:16:15+05:30").format("YYYY-MM-DD"),
      endDate : moment().format("YYYY-MM-DD"),

      "tableHeading" :{
        userName        : "Name of User",
        packageName     : "Package Name",
        amount          : "Amount",
        totalChkIn      : "Total Checkins",
        checkInLeft     : "Checkins Left",
        packageStartDate: "Package Purchase Date",
        packageEndDate  : "Package End Date",
     },
      "startRange"     : 0,
      "limitRange"     : 3,
      "twolevelHeader" :{
                        apply:false,
                        },
     tableData : [],
     completeDataCount : 3,
    }
  }

  componentDidMount(){
    this.getData(this.state.startRange,this.state.limitRange)  
  }

  getData(startRange, limitRange){   
    var startDate = this.state.startDate === moment().format("YYYY-MM-DD")?this.state.startDate:moment(this.state.startDate).format("YYYY-MM-DD");
    var endDate = this.state.endDate === moment().format("YYYY-MM-DD")?this.state.endDate:moment(this.state.endDate).format("YYYY-MM-DD");
    var typeUser = this.state.typeUser;
    console.log(startDate,"<......SED......>",endDate);
        if(startDate&&endDate){
          axios
          .get('/api/report/get/sales/'+startDate+'/'+endDate+'/'+typeUser+'/'+startRange+'/'+limitRange)
          .then((response)=>{
              console.log("sales............>",response.data);
              if(response.data.message !== "Data not found"){
                var tableData = response.data.map((a, i)=>{
                  return {
                    // "_id" : a._id ? a._id : 1,
                    userName        : a.userName ? a.userName : '-',
                    packageName     : a.packageName ? a.packageName : '-',
                    amount          : a.amount >= 0? a.amount : '-',
                    totalChkIn      : a.totalChkIn? a.totalChkIn : '-',
                    checkInLeft     : a.checkInLeft >= 0? a.checkInLeft : '0',
                    packageStartDate: a.packageStartDate ? moment(a.packageStartDate).format('DD-MM-YYYY') : '-',
                    packageEndDate  : a.packageEndDate ? moment(a.packageEndDate).format('DD-MM-YYYY') : '-',
                  }
                })
              }

              this.setState({
                  completeDataCount : 3,
                  tableData : tableData,          
                },()=>{
                console.log('tableData', this.state.tableData);
                })

          })
          .catch(function (error) {
            console.log(error);
          })
        } 
    console.log("end")
    
  }
    
  render(){
    return(
    <div>
      {this.state.tableData!==""?
          <IAssureTable 
            tableHeading={this.state.tableHeading}
            twoLevelHeader={this.state.twoLevelHeader} 
            dataCount={this.state.completeDataCount}
            tableData={this.state.tableData}
            getData={this.getData.bind(this)}
          />
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
export default SalesTransactionReportDashB;