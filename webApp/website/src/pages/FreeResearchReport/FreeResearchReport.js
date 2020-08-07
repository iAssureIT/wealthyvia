import React, { Component }	 from 'react';
import axios 				 from 'axios';
import Moment                from 'moment';
import swal                	 from 'sweetalert';

import './FreeResearchReport.css';


export default class FreeResearchReport extends Component {
	constructor(props){
    super(props); 
	    this.state = {
	    	researchreportlist: [],
	    	noData            : true
	    };
  	}  
  	componentDidMount() {
  	  	this.getreseachReports();	

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
	
  render() {
  	
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray mb50 researchpage">
					<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 nopadding ">
									<div className="col-lg-12 ">
										<div className="col-lg-6 ">
											<h4 className="pageheading">Research Reports</h4>
										</div>
										<div  className="col-lg-6 ">
											<div className="outerborder pull-right noPadding reportborder"><input type="text" name="search" placeholder="Search.." className="pull-right customInputAllBlog searchinput" ref="searchBox" onKeyUp={this.searchResearchreport.bind(this)}/><i className="fa fa-search pad10search"></i></div>
										    
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
						                                    	

							                                    <div className="publish-slugs col-lg-6 text-right datebox">
							                                        {	report.researchreport ? 
											                            report.researchreport.map((reportpdf, j)=>{
											                            return(
											                              <a key= {j} href={axios.defaults.baseURL+"/api/fileUpload/image/"+reportpdf.key} download data-key={reportpdf.key?reportpdf.key:""} onClick={this.getData.bind(this)}>
								                                                <img src="/images/Pdf-download.ico" title="Download as Pdf" className="downloadpdf-img" />
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

					                                	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 datebox">
					                                    	<div className="publish-slugs col-lg-6 datebox">
						                                        <span className="date ng-binding">
						                                        	{Moment(report.createdAt).format("Do MMMM YYYY")} | By Wealthvia
						                                        </span>				                                        
						                                        
						                                    </div>

						                                    <div className="publish-slugs col-lg-6 text-right datebox">
						                                        {	report.researchreport ? 
										                            report.researchreport.map((reportpdf, j)=>{
										                            return(
										                              <a key= {j} href={axios.defaults.baseURL+"/api/fileUpload/image/"+reportpdf.key} download data-key={reportpdf.key?reportpdf.key:""} onClick={this.getData.bind(this)}>
					                                                      	<i className="fa fa-download"></i>
					                                                    </a>
										                             )})  
										                            :
										                            null
										                        }			                                        
						                                        
						                                    </div>
					                                    </div>
					                                    
					                                    <div className="reportdescription">
					                                    	{report.description? <div dangerouslySetInnerHTML={ { __html: report.description } }></div> : "" }
					                                    </div>
					                                    <div className="report">
					                                    	{ /*
									                            report.researchreport ? 
									                            report.researchreport.map((reportpdf, j)=>{
									                            return(
									                              <a key= {j} href={axios.defaults.baseURL+"/api/fileUpload/image/"+reportpdf.key} download data-key={reportpdf.key?reportpdf.key:""} onClick={this.getData.bind(this)}>
									                                                    <div >
									                                                      <i className="fa fa-download"></i> &nbsp;
									                                                      {reportpdf.name} 
									                                                    </div>
									                                                    </a>
									                             )})  
									                            :
									                            null
									                        */}
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
