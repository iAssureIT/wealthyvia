import React,{Component}  from 'react';
import { render }         from 'react-dom';
import {Link}             from 'react-router-dom';
import moment             from 'moment';
import axios              from 'axios';
import $                  from 'jquery';
import OfferingCheckForm  from './OfferingCheckForm/OfferingCheckForm.js'

import { Chart }          from "react-google-charts";
import DashboardCWSBS     from "../dashboardReports/cafeWiseSeatBookingS/DashboardCWSBS.js";
import SalesTransactionReportDashB from '../dashboardReports/salesTransactionReport/SalesTransactionReportDashB.js';

class AdminContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      allUserData     : [],
      pieOptions      : "",
      pieData         : "",
      dataColumnChart : "",
      activeVendor    : "",
      earningMTD      : "",
      earningYTD      : "",
      menuMTD         : "",
      menuYTD         : "",
      subUsers        : "",
      subscrptionData : [],
      totalUsers      : "",
      totalVendor     : "",
      userCount       : "",
      InactiveUsersCount      : "",
      ActiveUserCount         : "",
      twelveMonthGrossEarning :[],
    };
  }
  componentDidMount(){
    $('.sidebar').css({display:'block',background: '#222d32'});
    axios.get('/api/users/get/list/'+100)
      .then( (res)=>{      
        this.setState({
          userCount : res.data.length,
      })
    })
    .catch(function (error) {
    })
    axios.get('/api/subscriptionorders/get/usersOfferingStatus/all/Inactive')
    .then( (inactiveUser)=>{      
      this.setState({
          InactiveUsersCount : inactiveUser.data.length,
        })
    })
    .catch((error)=>{
        
    });
    axios
      .get('/api/subscriptionorders/get/usersOfferOrderStatus/Active')
      .then((response)=> {
        if(response.data){            
              this.setState({
                ActiveUserCount : response.data.length,
            });
          console.log("ActiveUserCount",response.data)
        }
      })
      .catch((error)=>{
          
      });    
    
    axios
        .get('/api/report/get/dashboard')
        .then((response)=>{
          console.log("dashboard............>",response.data);
           this.setState({
                activeVendor    : response.data.activeVendor,
                earningMTD      : response.data.earningMTD,
                earningYTD      : response.data.earningYTD,
                menuMTD         : response.data.menuMTD,
                menuYTD         : response.data.menuYTD,
                subUsers        : response.data.subUsers,
                subscrptionData : response.data.subscrptionData,
                totalUsers      : response.data.totalUsers,
                totalVendor     : response.data.totalVendor,
                twelveMonthGrossEarning: response.data.twelveMonthGrossEarning,
              });

              console.log('this.state.subscrptionData', response.data.subscrptionData.length);
            var subscrptionData=[{packageName: "Daily Package", count: 5},{packageName: "Weekly Package", count: 3},{packageName: "Monthly Package", count: 5}]
            
            var pieArray = [["Monthly", "Weekly"]];  
            for (var i = 0; i < subscrptionData.length; i++) {
              var pieArr = [subscrptionData[i].packageName , subscrptionData[i].count];
              pieArray.push(pieArr)
            }
 // var twelveMonthGrossEarning =[{monthYear: "Oct", earning: 100},{monthYear: "Nov", earning: 489},{monthYear: "Dec", earning: 573},{monthYear: "Jan", earning: 710},{monthYear: "Feb", earning: 249},{monthYear: "Mar", earning: 432},{monthYear: "Apr", earning: 685},{monthYear: "May", earning: 589},{monthYear: "Jun", earning: 729},{monthYear: "Jul", earning: 635},{monthYear: "Aug", earning: 565},{monthYear: "Sep", earning: 900}]
            var twelveClrArray = ["#6D78AD","#5CCDA0","#DF7970","#4C9CA0","#AE7D99","#C9D45B","#5592AC","#F4C12E","#CC68DE","#F18230","#79B2F5","#424263"];
            var chartArray = [["Month", "Cost (RS)", { role: "style" }],];  
            for (var i = 0; i < this.state.twelveMonthGrossEarning.length; i++) {
              var chartArr = [this.state.twelveMonthGrossEarning[i].monthYear , this.state.twelveMonthGrossEarning[i].earning , twelveClrArray[i]];
              chartArray.push(chartArr)
              console.log('chartArray',chartArray );
            }
      
            this.setState({
                pieData : pieArray,          
                dataColumnChart : chartArray,          
              },()=>{
              console.log('pieData', this.state.pieData);
              console.log('dataColumnChart', this.state.dataColumnChart);
              })
        })
        .catch(function (error) {
        })
  }

  componentDidMount() {
    const dataColumnChart = [
      ["Month", "Cost (Lac)", { role: "style" }],
      ["#6D78AD","#5CCDA0","#DF7970","#4C9CA0","#AE7D99","#C9D45B","#5592AC","#F4C12E","#CC68DE","#F18230","#79B2F5","#424263"],
      // [["Jan", "Feb", "March","Jan", "Feb", "March","Jan", "Feb", "March","Jan", "Feb", "March"], [1,2,3,4,5,6,7,8,9,10,11,12]]
    ];

    const pieOptions = {
      title: "",
      pieHole: 0.6,
      slices: [
        {
          color: "#6D78AD"
        },
        {
          color: "#5CCDA0"
        },
        {
          color: "#DF7970"
        },
        {
          color: "#e9a227"
        }
      ],
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 14,
          font: "montserrat",
        }
      },
      tooltip: {
        showColorCode: true
      },
      chartArea: {
        left: 0,
        top: 20,  
        width: "100%",
        height: "80%"
      },
      fontName: "Roboto"
    };

    this.setState({
      pieOptions      : pieOptions,
    })
  }
  allUserCount(){
    return this.state.allUserData.length;
  }
  render(){

    return(
      <div>
        <div className="content-wrapper">
          <section className="content-header">
            <h1>Dashboard</h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-orange">
                    <img src="/images/blogging.png"/>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-number">0<small></small></span>
                    <span className="info-box-text">
                      Blog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.totalUsers}</b>
                    </span>
                    <span className="info-box-text">
                      Subscribed&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.subUsers}</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-green">
                    <img src="/images/subscription.png"/>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-number">{this.state.ActiveUserCount?this.state.ActiveUserCount:"0"}<small></small></span>
                    <span className="info-box-text">
                      Offering&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.totalUsers}</b>
                    </span>
                    <span className="info-box-text">
                      Subscribed&nbsp;&nbsp;&nbsp;&nbsp;<b></b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-aqua">
                    <img src="/images/time-management.png"/>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-number">{this.state.ActiveUserCount?this.state.ActiveUserCount:"0"}<small></small></span>
                    <span className="info-box-text">
                      Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.totalVendor}</b>
                    </span>
                    <span className="info-box-text">
                      Active&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b></b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-red">
                    <img src="/images/inactive.png"/>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-number">{this.state.InactiveUsersCount?this.state.InactiveUsersCount:"0"}<small></small></span>
                    <span className="info-box-text">
                      Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.earningYTD}</b>
                    </span>
                    <span className="info-box-text">
                      Inactive&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b></b>
                    </span>
                  </div>
                </div>
              </div>
          
            </div>
           
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  boxWrapDashboard graphWrapperTab">
               <div className="col-lg-12 col-md-12 col-sm-12 innerGraphWrap innerGraphWraptbl tableClrPdg" style={{padding:"0px 0px"}}>
                  <OfferingCheckForm />
                </div>
              </div>
            
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default AdminContent;