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

class SettlementReportD extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     menu : "",
     "tableHeading" :{
        dateAndTime    : "Date & Time",                                       
        userName       : "User Name",
        menuItem       : "Menu Item",
        quantity       : "Quantity",
        itemAmount     : "Item Amount",
        gst            : "GST",
        totalAmount    : "Total Amount",
     },
      "startRange"     : 0,
      "limitRange"     : 10,
      "twolevelHeader":{
                        apply:false,
                        },
     tableData : [],
     completeDataCount : 3,
    }
  }

  componentDidMount(){
    this.getData(this.state.startRange, this.state.limitRange);
  } 

  getData(startRange, limitRange){   
    var startDate = moment("2019-09-01T14:07:54+05:30").format("YYYY-MM-DD");
    var endDate = moment().format("YYYY-MM-DD");
    var vendorID = this.props.match.params.vendor_ID;
      console.log(startDate,"<......SED......>",endDate);
      console.log("<............>",startDate+'/'+endDate+'/'+vendorID+'/'+startRange+'/'+limitRange);
        if(vendorID){
        axios
          .get('/api/report/get/settlementReportDetail/'+startDate+'/'+endDate+'/'+vendorID+'/'+startRange+'/'+limitRange)
          .then((response)=>{
              console.log("settlementReportDetail............>",response.data);
              var tableData = response.data.returnData.map((a, i)=>{
                return {
                  // "_id" : a._id ? a._id : 1,
                  dateAndTime    : a.dateTime ? moment(a.dateTime).format("DD-MM-YYYY")+" ("+moment(a.dateTime).format("h:mm a")+")" : '-',                                      
                  userName       : a.userName ? a.userName : '-',
                  menuItem       : a.menuItem ? a.menuItem : '-',
                  quantity       : a.quantity ? a.quantity : '-',
                  itemAmount     : a.itemAmount ? a.itemAmount : '-',
                  gst            : a.gst ? a.gst : '-',
                  totalAmount    : a.totalAmount ? a.totalAmount : '-',
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
  }
  
  render(){
    return(
    <div>
      {this.state.menu==""?
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableHead">Settlement Report</div>
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
       {console.log("daily tabledata",this.state.tableData)}
                              <IAssureTable 
                                tableHeading={this.state.tableHeading}
                                twoLevelHeader={this.state.twoLevelHeader} 
                                dataCount={this.state.completeDataCount}
                                tableData={this.state.tableData}
                                getData={this.getData.bind(this)}
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
export default SettlementReportD;