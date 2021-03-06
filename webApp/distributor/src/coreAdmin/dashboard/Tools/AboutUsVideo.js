import React, { Component } from 'react';
import $ from "jquery";
import './AboutUsVideo.css'

import axios                      from 'axios';
import swal                       from 'sweetalert';
import ReactMoment        from 'react-moment';
import Moment                from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player'

export default class sendYoutubeUrl extends Component {
     constructor(props){
    super();
      this.state ={
        "toolsList"   :[],
        "url"         :[],
        "noData"      : false,
        dateTab           : 'Monthly',
        todayDate         : '--',
            newDateOne    : '',
            weekdays      : '--',
            monthlyState  : '--',
            fromdate      : '',
            todate        : '',
      }
  }
  

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        },()=>{
          this.searchData()
        });   
    }

  componentDidMount(){
    this.getUrl()
    // console.log("getUrl",this.getUrl());

    var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;

        this.setState({
          todayDate : today,
        });

        var weeknumber = Moment(today).week();
        if(weeknumber<=9){
          weeknumber="0"+weeknumber;
        }
        var yyyy = Moment(today).format("YYYY");
        var weekVal = yyyy+"-W"+weeknumber;
        this.setState({
          weekdays:weekVal,
        });

        var yyyy = Moment(today).format("YYYY");
        var monthNum = Moment(today).format("MM");
        var currentMonth = yyyy+"-"+monthNum;
        this.setState({
          monthlyState:currentMonth,
        });

        var fromDt = new Date();
        var toDt = new Date(Moment(fromDt).add(1,'d'));

        this.setState({
          fromdate : fromDt,
          toDate: toDt
        })

        var currentYear = Moment().format('YYYY');

        this.setState({
          currentYear : currentYear
        })
    }  
  
  
  getUrl(){
    console.log("inside");
    axios.get("api/uploadVideoUrl/get/list")
          .then((response) =>{
            console.log("response getUrl",response);
            this.setState({
              toolsList :response.data
            })
        })
        .catch((error) =>{
          console.log("error",error);
        });
  }

  openNewTab(event){
    event.preventDefault(); 
      var id = event.currentTarget.id;
      var youtubeUrl = $(event.currentTarget).attr('data-url');
    window.open(youtubeUrl, "_blank"); 
  }

  searchTool(event){
    var searchText = this.refs.searchBox.value;
    console.log("searchText",searchText);
    if(searchText!== ""){
      axios 
          .get('/api/uploadVideoUrl/get/search/list/'+searchText)
          .then((response)=>{
           if(response.data.length >0)
            {
            this.setState({
                toolsList:response.data,
                noData : false
              });
            }else{
              this.setState({
                noData : true
              })

            }
          })
          .catch(function(error){
            console.log(error);
              if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/");
                  }
          })
      }else{
        this.setState({
            noData : false
          })
        this.getUrl();

      }

  }
  
  fromdates(event){
    var selectedDate1 = $("input#fromdate").val();
    
    var dd = new Date(selectedDate1).getDate();
    var mm = new Date(selectedDate1).getMonth()+1; //January is 0!
    var yyyy = new Date(selectedDate1).getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var Fromdate = yyyy+'-'+mm+'-'+dd;
    this.setState({
        fromdate:Fromdate,
    },()=>{
      this.searchData()
      
    });
  }

    todates(event){
      var selectedDate2 = $("input#todate").val();
      var dd       = new Date(selectedDate2).getDate();
      var mm       = new Date(selectedDate2).getMonth()+1; //January is 0!
      var yyyy     = new Date(selectedDate2).getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var Todate = yyyy+'-'+mm+'-'+dd;
     var dateCompare =  Moment(Todate).isAfter(this.state.fromdate);
     if(dateCompare === true){
      this.setState({
          todate:Todate,
      },()=>{
        this.searchData()
        
      });
     }else{
      swal('From date should not be less than To date')
      this.setState({
        todate:this.state.fromdate
      },()=>{
        this.searchData()
        
      })
     }  
    }

    nextYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = Moment(currentYear).add(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{
        this.searchData()
        
    })
    }

    previousDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#todayDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');
      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
      // Session.set('newDate', newDate2);
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;
      this.setState({
        todayDate : newDate3,
      },()=>{
        this.searchData()
        
      });
    }

    nextDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#todayDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');

      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;

      this.setState({
          todayDate : newDate3,
      },()=>{
         this.searchData()
        
      });
    }

    previousMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();
      var newMonthDt = Moment(selectedMonth).subtract(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = Moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=Moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{
        this.searchData()
        
      });
    }

    previousYear(event){
      event.preventDefault();
      var currentYear = this.state.currentYear;
      var newYear = Moment(currentYear).subtract(1,'years').format('YYYY');
      this.setState({currentYear: newYear},()=>{
          this.searchData()
          
      })
    }

    changeTab(value,event){
      this.setState({dateTab:value},()=>{
            this.searchData()
        })
    }
    searchData(){
      console.log("inside searchData")
      var formValues ={
            startDate   : "",
            endDate     : "",
          }
        var dateTab = this.state.dateTab;
        if(dateTab === "Daily"){
            var todayDateSelected = this.state.todayDate;
              console.log("todayDateSelected",todayDateSelected); 
            var startDate = Moment(todayDateSelected).startOf('day'); // set to 12:00 am today
            var endDate = Moment(todayDateSelected).endOf('day'); // set to 23:59 pm today
            formValues.startDate    = new Date(startDate);
            formValues.endDate      = new Date(endDate);
        }else if(dateTab === "Weekly"){
            var weekData = this.state.weekdays;
            var mondayInWeek = Moment(weekData).day("Monday").week(weekData).format();
            var mondayInWeekDt = new Date(mondayInWeek);
            var sundayOfWeek = Moment(mondayInWeek).add(7,"days").format();
            var sundayOfWeekDt = new Date(sundayOfWeek);
            formValues.startDate = mondayInWeekDt;
            formValues.endDate   = sundayOfWeekDt;
        }else if(dateTab === "Monthly"){
            var selectedMonth = this.state.monthlyState;
            var monthDateStart = new Date(Moment(selectedMonth).month("YYYY-MM"));//Find out first day of month with selectedMonth
            var monthDateEnd = new Date(Moment(selectedMonth).add(1,"M"));
            formValues.startDate = monthDateStart;
            formValues.endDate   = monthDateEnd;
        }else if(dateTab === "Yearly"){
            var selectedYear = this.state.currentYear;
            var yearDateStart = new Date("1/1/" + selectedYear);
            var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
            formValues.startDate = yearDateStart;
            formValues.endDate   = yearDateEnd;
        }else if(dateTab === "Custom"){
            var fromDate = this.state.fromdate;
            var todate    = this.state.todate;
            formValues.startDate = new Date(fromDate);
            formValues.endDate   = new Date(todate);
        }
        axios.post('/api/uploadVideoUrl/get/all/list/bydate',formValues)
      .then((response) => {
        console.log("response", response.data);
        this.setState({
                  toolsList:response.data,
                  noData : false
        })
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
    }
    nextMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();
      var newMonthDt = Moment(selectedMonth).add(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = Moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=Moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{
          this.searchData()
        });
    }

    previousMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();
      var newMonthDt = Moment(selectedMonth).subtract(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = Moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=Moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{
        this.searchData()
        
      });
    }


    render(){
      // console.log("link",this.toolsList());
        return(
      <div className="pagewrapper">           
      <div className="container-fluid AllBlogsBox" style={{padding:"0px"}}>
        <div className="col-lg-12 nopadding AllBlogsbannerWall">
          <div className="col-lg-12 AllBlogscentered">
            <div  className="col-lg-7 pull-right">
              <div className="outerborder col-lg-6 setSizeResponsive pull-right noPadding">
                <input type="text" name="search" placeholder="Search.." className="pull-right customInputAllBlog" ref="searchBox" 
                  onKeyUp={this.searchTool.bind(this)}/>
                  <i className="fa fa-search pad10search"></i>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 toolsDate setPaddingLeft">
                <div className="reportWrapper col-lg-12 nopadding"> 
                  <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                    <div className="tab-pane" id="Daily">
                      <div className="marginStyle col-lg-12 nopadding">
                        <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                          <div className="input-group-addon  col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousDate.bind(this)}>
                            <span className="fa fa-caret-left nextarrow setTextColor"></span>
                          </div>          
                          <input type="date" className="todaysdate  col-lg-4 col-md-4 col-sm-8 col-xs-8" name="todayDate" id="todayDate" onChange={this.handleChange.bind(this)} value={this.state.todayDate}/>
                          <div className="input-group-addon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
                            <span className="fa fa-caret-right nextarrow setTextColor"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane active" id="Monthly">
                      <div className="marginStyle col-lg-12 col-md-12 col-sm-12 col-xs-12 setResponsive searchBoxBugt  margintopReport nopadding monthfieldright">
                        <div className="input-group-addon setLeftHeight HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2 lineheightarrw" id="previousDate" onClick={this.previousMonth.bind(this)}>
                          <span className="fa fa-caret-left setmarginTop nextarrow setTextColor"></span>
                        </div>
                        <input type="month" className="todaysdate  col-lg-8 col-md-8 col-sm-8 col-xs-8 nopadding lineheightdate" name="monthlyValue" id="monthlyValue" onChange={this.handleChange.bind(this)} value={this.state.monthlyState} />
                        <div className="input-group-addon HRMSAddon setLeftHeight nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2 lineheightarrw" id="nextDate" onClick={this.nextMonth.bind(this)}>
                          <span className="fa fa-caret-right setmarginTop nextarrow setTextColor"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="col-lg-12 AllBlogstextcentered setMarginTop">
            <h1 className="fs72">Tools</h1>
          </div>
        </div>
        </div>
        <div className="col-lg-12">
            {
              this.state.toolsList.length > 0 && this.state.noData === false
              ?
                this.state.toolsList.map((data, index)=>
                  {
                    return(
                        <div className="col-lg-3 Allblog">              
                          <div className="All1tools z50">
                            {
                              data.url !== ""
                              ?
                                <div onClick={this.openNewTab.bind(this)} data-url={data.url}>
                                    <ReactPlayer url={data.url} className="AllblogImgB" width='241px' height='170px' controls loop  />
                                </div> 
                              :
                                <div>
                                    <img src="/images/safeH.jpg" className="AllblogImgB"  width='241px' height='170px'/>
                                </div> 
                            }
                              <p className="toolDate  col-lg-12 mtop20 graycolor"><ReactMoment format="DD/MM/YYYY HH:mm" className="pull-right">{data.createdAt}</ReactMoment></p>
                              <p className="toolFile p10">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    { 
                                      data.fileUpload 
                                        ?
                                        (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "pdf" || (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "PDF" 
                                          ?
                                            <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                                              <img src="/images/pdf.png" height="60" width="60"/><br/>
                                            </a>
                                          :
                                            <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                                              <img src="/images/ppt.png" height="60" width="60"/><br/>
                                            </a>

                                      : 
                                        <a title="No File Available"> 
                                          <img src="/images/noFile.webp" height="60" width="60"/><br/>
                                        </a>
                                    }  
                                  
                                </div>
                              </p>
                              <h4 className="blogTitle pl25" ><b>{data.title}</b></h4>
                          </div>            
                        </div> 
                    )
                  }
                )
              :
              <h4 className="p10 textAlignCenter">No Tools Found</h4>

            }     
        </div>    
      </div>
      </div>
      
      

        );
    }
}


