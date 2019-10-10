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

class DashboardCWSBS extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     menu : "",

     "tableHeading" :{
        "cafeName"       : "Cafe Name",
        "city"           : "City",
        "branch"         : "Branch",
        "totalSeats"     : "Total Seats",
        "occupiedSeats"  : "Occupied Seats",
        "availableSeats" : "Available Seats",
        // "actions"        : "Action"
     },
      "tableObjects"              : {
              // deleteMethod              : 'delete',
              // apiLink                   : '/api/category/',
              paginationApply           : false,
              searchApply               : false,
              // editUrl                   : '/category-management/'
            },
      "startRange"     : 0,
      "limitRange"     : 3,
      "twolevelHeader":{
                        apply:false,
                        },
     tableData : [],
     dataCount : 3,
    }
  }
componentDidMount(){
  this.getData(this.state.startRange, this.state.limitRange);
} 

getData(startRange, limitRange){
  console.log('getData Mani', startRange, limitRange);
      axios
        .get('/api/report/get/cafewisebooking/'+startRange+'/'+limitRange)
        .then((response)=>{
            console.log("cafewisebooking............>",response.data);
            var tableData = response.data.map((a, i)=>{
              return {
                "_id"            : a._id ? a._id : 1,
                "cafeName"       : a.cafeName ? a.cafeName : '-',
                "city"           : a.city ? a.city : '-',
                "branch"         : a.branch ? a.branch : '-',
                "totalSeats"     : a.totalSeats >= 0 ? a.totalSeats : '-',
                "occupiedSeats"  : a.occupiedSeats >= 0  ? a.occupiedSeats : '-',
                "availableSeats" : a.availableSeats >= 0  ? a.availableSeats : '-',
              }
            })
      
            this.setState({
                // dataCount : 10,
                tableData : tableData,          
              },()=>{
              console.log('tableData123', this.state.tableData);
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
      <div className="">
         <div className="">
       {console.log("daily tabledata",this.state.tableData)}
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
export default DashboardCWSBS;