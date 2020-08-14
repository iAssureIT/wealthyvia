import React, { Component }	 from 'react';
import axios 				 from 'axios';
import Moment                from 'moment';
import $                        from 'jquery';
import swal                	 from 'sweetalert';

import './FreeResearchReport.css';


export default class FreeResearchReport extends Component {
	constructor(props){
    super(props); 
	    this.state = {
	    	researchreportlist: [],
	    	noData            : true,
	    	dateTab   : 'Monthly',
	    	todayDate     : '--',
          	newDateOne    : '',
          	weekdays      : '--',
          	monthlyState  : '--',
          	fromdate      : '',
          	todate        : '',
	    };
  	}  
  	componentDidMount() {
  	  	this.getreseachReports();	
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

  	getData(event)
  {
      var Filekey  =  event.currentTarget.getAttribute("data-key");
      console.log("Filekey",event.currentTarget.getAttribute("data-key"))
        axios.get('/api/fileUpload/image/'+Filekey) 
      .then( (UploadedImg)=>{      
        this.setState({
              UploadedImg : UploadedImg.data,
            })
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });  
  }

  	getreseachReports(){
  		axios.get('/api/researchreport/get/all/list/1')
	      .then( (researchreports)=>{      
	        // console.log("offerings = ",offerings.data);   
	        this.setState({
	              researchreportlist : researchreports.data,
	              noData             : false
	            })
	      })
	      .catch((error)=>{
	          if(error.message === "Request failed with status code 401"){
	            console.log(error);
	          }
	      });   
   	}

  	searchResearchreport(event){
		var searchText = this.refs.searchBox.value;
		if(searchText!== ""){
			axios
		      .get('/api/researchreport/get/search/list/'+searchText)
		      .then((response)=>{
		       if(response.data.length >0)
		      	{
		      	this.setState({
		      			researchreportlist:response.data,
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
		  	this.getreseachReports();

		  }

	}

	nextWeek(event){
      event.preventDefault();
      var selectedWeek = $("input#weekpicker").val();
      var newWeekDt = Moment(selectedWeek).add(1, 'weeks').format("YYYY-MM-DD");
      var newWeekNumber = Moment(newWeekDt).week();
      //Construct the WeekNumber string as '2017-W01'
      if(newWeekNumber <= 9){
        newWeekNumber = '0'+newWeekNumber;
      }
      var yearNum=Moment(newWeekDt).format("YYYY");
      var newWeek = yearNum+"-W"+newWeekNumber;
      this.setState({
        weekdays:newWeek,
      },()=>{
        this.searchData()
      });
    }

    previousWeek(event){
      event.preventDefault();
      var selectedWeek = $("input#weekpicker").val();
      var newWeekDt = Moment(selectedWeek).subtract(1, 'weeks').format("YYYY-MM-DD");
      var newWeekNumber = Moment(newWeekDt).week();
      //Construct the WeekNumber string as '2017-W01'
      if(newWeekNumber <= 9){
        newWeekNumber = '0'+newWeekNumber;
      }else if(newWeekNumber === 53){
        newWeekNumber = 52;
      }
      var yearNum=Moment(newWeekDt).format("YYYY");
      var newWeek = yearNum+"-W"+newWeekNumber;
      this.setState({
          weekdays:newWeek,
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

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        },()=>{
          this.searchData()
        });   
    }

    searchData(){
      var formValues ={
            startDate   : "",
            endDate     : "",
            
        }
        var dateTab = this.state.dateTab;
        if(dateTab === "Daily"){
            var todayDateSelected = this.state.todayDate;
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
        
        axios.post('/api/researchreport/get/all/list/bydate',formValues)
      .then((response) => {
      	console.log("response", response.data);
        this.setState({researchreportlist:response.data})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
    }

	
  render() {
  	
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray mb50 researchpage">
					<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 nopadding ">
									<div className="col-lg-12 ">
										<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
											<h4 className="pageheading">Research Reports</h4>
										</div>
										<div  className="col-lg-7 col-md-7 col-sm-12 col-xs-12 ">
											<div className="row">
												<div className="outerborder noPadding reportborder col-lg-5 col-md-5 col-sm-12 col-xs-12"><input type="text" name="search" placeholder="Search.." className="pull-right customInputAllBlog searchinput searchreportinput" ref="searchBox" onKeyUp={this.searchResearchreport.bind(this)}/><i className="fa fa-search pad10search"></i></div>
											    
											    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 reportborder">
								                     <div className="reportWrapper col-lg-12 nopadding">
								                          
								                           <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
						                                        <div className="tab-pane" id="Daily">
						                                          <div className="marginStyle col-lg-12 nopadding">
						                                            <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
						                                              <div className="input-group-addon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousDate.bind(this)}>
						                                                <span className="fa fa-caret-left nextarrow"></span>
						                                              </div>          
						                                              <input type="date" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8" name="todayDate" id="todayDate" onChange={this.handleChange.bind(this)} value={this.state.todayDate}/>

						                                              <div className="input-group-addon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
						                                                <span className="fa fa-caret-right nextarrow"></span>
						                                              </div>
						                                            </div>
						                                          </div>
						                                        </div>
						                                        
						                                        <div className="tab-pane active" id="Monthly">
						                                          <div className="marginStyle col-lg-12 col-md-12 col-sm-12 col-xs-12  searchBoxBugt  margintopReport nopadding">
						                                          
						                                            <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2 lineheightarrw" id="previousDate" onClick={this.previousMonth.bind(this)}>
						                                              <span className="fa fa-caret-left nextarrow"></span>
						                                            </div>
						                                            
						                                            <input type="month" className="todaysdate col-lg-8 col-md-8 col-sm-8 col-xs-8 nopadding lineheightdate" name="monthlyValue" id="monthlyValue" onChange={this.handleChange.bind(this)} value={this.state.monthlyState} />
						                                            
						                                            <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2 lineheightarrw" id="nextDate" onClick={this.nextMonth.bind(this)}>
						                                              <span className="fa fa-caret-right nextarrow"></span>
						                                            </div>
						                                          </div>
						                                          
						                                        </div>
						                                        
						                                        
						                                    </div>

								                            				                              

								                     </div>
								                </div>
								            </div>
									    </div>
										
									</div>
								</div>	
					    
						<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 mb50">
					    	

											
							
					    		

					    	{
					    		this.state.researchreportlist.length > 0 && this.state.noData === false?
					    			this.state.researchreportlist.map((report, j)=>{
	                          			return(
	                          				<div className="top-border-block item1"  key= {j}>
	                          				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                <a href={report.researchreport && report.researchreport[0] ? axios.defaults.baseURL+"/api/fileUpload/image/"+report.researchreport[0].key : "" }>
					                                <h3 className="hidden-xs reporttitle">
					                                	{report.title}
					                                	
					                                </h3>
				                                </a>
				                                <a href={report.researchreport && report.researchreport[0] ? axios.defaults.baseURL+"/api/fileUpload/image/"+report.researchreport[0].key : "" }>
					                                <h3 className="visible-xs ">				                                    	
					                                    		{report.title}
					                                </h3>
				                                </a>

				                                { report.reportImage ?
				                                	<div>
					                                	<div className="data col-lg-3 col-md-3 col-sm-3 col-xs-12 imgblock">
					                                		<a href={report.researchreport && report.researchreport[0] ? axios.defaults.baseURL+"/api/fileUpload/image/"+report.researchreport[0].key : "" }>
					                                		{/*<img src="/images/ResearchPDF.png" className="imgpdf"/>*/}
					                                		{
					                                			report.reportImage ? 
					                                			<img src={report.reportImage} className="imgpdf"/>
					                                			:
					                                			null
					                                		}
					                                		</a>
					                                	</div>
					                                	<div className="data col-lg-9 col-md-9 col-sm-9 col-xs-12">

						                                	<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 datebox">
						                                    	<div className="publish-slugs datebox">
							                                        <span className="date ng-binding">
							                                        	{Moment(report.createdAt).format("Do MMMM YYYY")} | By Wealthvia
							                                        </span>				                                        
							                                        
							                                    </div>
							                                    <div className="reportdescription">
						                                    		{report.description? <div dangerouslySetInnerHTML={ { __html: report.description } }></div> : "" }
						                                    	</div>
							                                    
						                                    </div>
						                                    
						                                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 datebox">
							                                    <div className="publish-slugs col-lg-12 text-center datebox">
								                                        {	report.researchreport ? 
												                            report.researchreport.map((reportpdf, j)=>{
												                            return(
												                              <a key= {j} href={axios.defaults.baseURL+"/api/fileUpload/image/"+reportpdf.key} download data-key={reportpdf.key?reportpdf.key:""} onClick={this.getData.bind(this)}>
									                                                <img src="/images/Pdf-download.ico" title="Download as PDF" className="downloadpdf-img" />
									                                            </a>
												                             )})  
												                            :
												                            null
												                        }			                                        
								                                </div>					                                    
							                                </div>
						                                </div>
					                                </div>
				                                	:

				                                	
					                                <div className="data col-lg-12 col-md-12 col-sm-12 col-xs-12 datebox">
					                                	<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 datebox">
						                                    	<div className="publish-slugs datebox">
							                                        <span className="date ng-binding">
							                                        	{Moment(report.createdAt).format("Do MMMM YYYY")} | By Wealthvia
							                                        </span>				                                        
							                                        
							                                    </div>
							                                    <div className="reportdescription">
						                                    		{report.description? <div dangerouslySetInnerHTML={ { __html: report.description } }></div> : "" }
						                                    	</div>
							                                    
						                                    </div>
						                                    
						                                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 datebox">
							                                    <div className="publish-slugs col-lg-12 text-center datebox leftspace">
								                                        {	report.researchreport ? 
												                            report.researchreport.map((reportpdf, j)=>{
												                            return(
												                              <a key= {j} href={axios.defaults.baseURL+"/api/fileUpload/image/"+reportpdf.key} download data-key={reportpdf.key?reportpdf.key:""} onClick={this.getData.bind(this)}>
									                                                <img src="/images/Pdf-download.ico" title="Download as PDF" className="downloadpdf-img" />
									                                            </a>
												                             )})  
												                            :
												                            null
												                        }			                                        
								                                </div>					                                    
							                                </div>
					                                	
					                                </div>
					                            }
				                                </div>
				                                <div className="clearfix "></div>
				                        	</div>
	                          			)
	                          		})
					    		:
					    		<h4 className="p10 textAlignCenter">No Research Report Found</h4>
					    	}


	                    </div>    
	              	</div>
      			</div>
		);
	}
}
