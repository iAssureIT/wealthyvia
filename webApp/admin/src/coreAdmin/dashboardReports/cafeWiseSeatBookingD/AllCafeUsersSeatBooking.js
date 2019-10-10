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

class AllCafeUsersSeatBooking extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     menu : "",

     "tableHeading" :{
        userName       : "User Name",                                              
        checkInTime    : "Check-In time",
        checkOutTime   : "Check-Out time",
        menuOrder      : "Menu Order"
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
  console.log('getData Mani', startRange, limitRange);
    var workspace_ID = "5d80e01783958eb333c50238";
    var selectDate = moment().format("YYYY-MM-DD");
    console.log("selectDate............workspace_ID>",selectDate,workspace_ID);
      axios
        .get('/api/report/get/vendordailycheckins/'+workspace_ID+'/'+selectDate+'/'+startRange+'/'+limitRange)
        .then((response)=>{
            console.log("vendordailycheckins............>",response.data);
            var tableData = response.data.map((a, i)=>{
              // var x = a.accountNumber.toString();
              // console.log('x',x);
              return {
                // "_id" : a._id ? a._id : 1,
                userName       : a.userName ? a.userName : '-',                                             
                checkInTime    : a.checkInTime ? moment(a.checkInTime).format("h:mm a") : '-',
                checkOutTime   : a.checkOutTime ? a.checkOutTime : 'Ongoing...',
                menuOrder      : a.menuOrder ? a.menuOrder : '-',
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableHead">All Current Check-Ins and Check-Outs</div>
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
          <IAssureTable 
            tableHeading={this.state.tableHeading}
            twoLevelHeader={this.state.twoLevelHeader} 
            dataCount={this.state.dataCount}
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
export default AllCafeUsersSeatBooking;