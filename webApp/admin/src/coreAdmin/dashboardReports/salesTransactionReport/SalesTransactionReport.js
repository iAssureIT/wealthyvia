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

class SalesTransactionReport extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      menu : "",
      typeUser : "Active",
      startDate : moment().format("YYYY-MM-DD"),
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
     "tableObjects"              : {
              // deleteMethod              : 'delete',
              // apiLink                   : '/api/category/',
              paginationApply           : true,
              searchApply               : true,
              // editUrl                   : '/category-management/'
            },
      "startRange"     : 0,
      "limitRange"     : 10,
      "twolevelHeader" :{
                        apply:false,
                        },
     tableData : [],
     completeDataCount : 10,
    }
  }

  componentDidMount(){
    this.getData(this.state.startRange,this.state.limitRange)  
  } 

  handleChange(event){
    const target = event.target;
    const name = target.name;
    console.log("D.....",event.target.value)
    this.setState({
      [name]:event.target.value,
    },()=>{
      this.getData(this.state.startRange, this.state.limitRange);
    });
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
                  completeDataCount : response.data.length>0?response.data.length:10,
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
      {this.state.menu==""?
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableHead">Sales Transaction Report</div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 NOpadding">
            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17 NOpadding">Activity</label>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
              <select onChange={this.handleChange.bind(this)} value={this.state.typeUser} id="typeUser" ref="typeUser" name="typeUser" className="col-lg-12 col-md-12 col-sm-6 col-xs-12  noPadding  form-control">
                <option value="Not Selected" disabled>--Select--</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div> 
          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 NOpadding">
          </div> 
          <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12 NOpadding">
            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17 NOpadding">Start Date</label>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
              <input type="date" className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPadding  form-control"
                 name="startDate" ref="startDate" value={this.state.startDate} style={{fontFamily:'Montserrat-Regular'}} 
                 onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="col-lg-1 col-md-4 col-sm-12 col-xs-12 NOpadding">
          </div> 
          <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12 NOpadding">
            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17 NOpadding">End Date</label>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
               <input type="date" className="col-lg-6 col-md-6 col-sm-6 col-xs-6 noPadding  form-control"
                 name="endDate" ref="endDate" value={this.state.endDate} style={{fontFamily:'Montserrat-Regular'}} 
                 onChange={this.handleChange.bind(this)}/>
            </div>
          </div> 
        </div>  
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
export default SalesTransactionReport;