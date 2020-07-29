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
				                                <h3 className="hidden-xs reporttitle">
				                                	{report.title}
				                                	
				                                </h3>
				                                
				                                <div className="data ">
				                                    <h3 className="visible-xs ">
				                                    	<a className="ng-binding" href="/research/stock-specific-reports-1/PNB-Housing-Finance-Ltd--Q1FY21-Result-Update-097539">
				                                    		{report.title}
				                                    	</a>
				                                    </h3>
				                                    <div className="publish-slugs ">
				                                        <span className="date ng-binding">
				                                        	{Moment(report.createdAt).format("Do MMMM YYYY")}
				                                        </span>
				                                        
				                                        
				                                    </div>
				                                    
				                                    <div className="reportdescription">
				                                    	{report.description}
				                                    </div>
				                                    <div className="report">
				                                    	{
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
                          }
				                                    </div>
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
