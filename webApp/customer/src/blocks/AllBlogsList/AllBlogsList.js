import React 			 from 'react';
import axios       		 from 'axios';
import swal              from 'sweetalert';
import Moment 			 from 'react-moment';
import $                 from "jquery";

import './AllBlogsList.css';

export default class AllBlogsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"Blogs"		: [],
			"viewType"  : "grid",
			"noData"    : false,
		};
	}
	deleteBlog(event){
		event.preventDefault();
		var id= event.target.id;
		console.log("id delet",id);
		 swal({
	          title: "Are you sure you want to delete this Blog?",
	          text: "Once deleted, you will not be able to recover this Blog!",
	          icon: "warning",
	          buttons: true,
	          dangerMode: true,
	        })
	        .then((success) => {
	            if (success) {
	            	axios
				    .delete("/api/blogs/delete/"+id)
				    .then((response)=>{
				     	this.getBlogData();
				       swal("Your Blog is deleted!");
				    })
				    .catch((error)=>{
				       console.log("error = ", error);              
				    });
	            
	              
	            } else {
	            swal("Your Blog is safe!");
	          }
	        }); 
	}
	getBlogData(){
		axios
	      .get('/api/blogs/get/all/list')
	      .then((response)=>{
	       console.log("===>",response.data);
	      	this.setState({
	      			Blogs:response.data
	      		});
	      })
	      .catch(function(error){
	        console.log(error);
	          if(error.message === "Request failed with status code 401")
	              {
	                   swal("Your session is expired! Please login again.","", "error");
	                   this.props.history.push("/");
	              }
	      })
	}
	componentDidMount(){
		var Blogs =[];
		this.getBlogData();

	}
	getView(event)
	{
		var getValue = event.target.getAttribute("data-value");
		console.log("getValue",getValue);
		this.setState({
			viewType : getValue,
		})
		console.log("viewType",this.state.viewType);
	 				
	}
	searchBlogs(event){
		var searchText = this.refs.searchBox.value;
		 console.log("searchText = ", searchText);
		if(searchText!== ""){
			console.log("in if")
			axios
		      .get('/api/blogs/get/search/list/'+searchText)
		      .then((response)=>{
		       console.log("===>",response.data);
		       if(response.data.length >0)
		      	{
		      	this.setState({
		      			Blogs:response.data,
		      			noData : false
		      		});
		      	}else{
		      		console.log("array empty")
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
		  	console.log("in el;s")
		  	this.setState({
      			noData : false
      		})
		  	this.getBlogData();

		  }

	}
	render() {
		var data = this.state.Blogs;
		var subscribed = false;
   		const loggedIn = localStorage.getItem("user_ID");
		return (
			<div className="container-fluid AllBlogsBox" style={{padding:"0px"}}>
				<div className="col-lg-12 nopadding AllBlogsbannerWall">
					<div className="col-lg-12 AllBlogscentered">
						<div  className="col-lg-6 pull-right">
							
							<i className="fa fa-th customGridIcon pull-right" title="Grid view" data-value="grid" onClick={this.getView.bind(this)}></i>
						    <i className="fa fa-list customGridIcon  pull-right"  data-value="list"  title="List view" onClick={this.getView.bind(this)}></i>
						    <div className="outerborder col-lg-5 pull-right noPadding"><input type="text" name="search" placeholder="Search.." className="pull-right customInputAllBlog" ref="searchBox" onKeyUp={this.searchBlogs.bind(this)}/><i className="fa fa-search pad10search"></i></div>
						    
					    </div>
						<div className="col-lg-12 AllBlogstextcentered">
							
							<h1 className="fs72">Blogs</h1>
						</div>
					</div>
				</div>
          					{console.log("this.state.noData "+this.state.noData +"data.length"+data.length)}
          		<div className="col-lg-12">
          			{ this.state.viewType == "grid" 
          				?
			          		this.state.noData == false 	
			          			?
		            			data && data.length > 0 ?
			      					data.map((data, index)=>{
		            					return(
						          			<div className="col-lg-3 Allblog">
						          				<div className="All1blog1 z50">
						          				{data.typeOfBlog == "Premium" ?
						          					<div className="premiumBlogIndicate">Premium</div>
													
													:
													null
												}
													<img className="img-responsive AllblogImgB" src={data.bannerImage ? data.bannerImage.path : ""} alt="Bannerpng"/>
													{ loggedIn ?
														(data.typeOfBlog == "Premium" 
														 ?
															(subscribed 
															 ?
																	<a href={"/blog/"+data.blogURL}>
																		<p className="blogDate p10 col-lg-12 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
																		<h4 className="blogTitle col-lg-12 p10"><b>{data.blogTitle}</b></h4>
																		{/*<p className="blogPara p10 graycolor">{data.summary}</p>*/}
																	</a>														
															:
																	<a href={"/planPage"}>
																		<p className="blogDate p10 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
																		<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
																		{/*<p className="blogPara p10 graycolor">{data.summary}</p>*/}
																	</a>														
															)
														:
															<a href={"/blog/"+data.blogURL}>
																<p className="blogDate  col-lg-12  p10 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm" className="pull-right">{data.createdAt}</Moment></p>
																<h4 className="blogTitle  col-lg-12  p10"><b>{data.blogTitle}</b></h4>
																{/*<p className="blogPara p10 graycolor">{data.summary}</p>*/}
															</a>
														)
													:
														<a href={"/login?destination=/blog/"+data.blogURL}>
															<p className="blogDate p10  col-lg-12 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
															<h4 className="blogTitle col-lg-12  p10"><b>{data.blogTitle}</b></h4>
															{/*<p className="blogPara p10 graycolor">{data.summary}</p>*/}
														</a>
													}
						          				
												</div>

						          			</div>
						          			);
		        					})
	        					:
	        					<h4 className="noBlogs p10 textAlignCenter"><div className="loadingImageContainer col-lg-4 col-lg-offset-4"><img src="/images/Loadingsome.gif"/></div></h4>
	        				:
	        				<h4 className="noBlogs p10 textAlignCenter">No blogs found</h4>
	    	            :
	    	            this.state.noData == false 	
			          	?
		            		data && data.length > 0 ?
			      				data.map((data, index)=>{
		            					return(
		            						<div className="col-lg-12 Allblog">
						          				
						          				<div className="All1blogList ">
						          				{data.typeOfBlog == "Premium" ?
						          					<div className="premiumBlogIndicate">Premium</div>
													
													:
													null
												}
													<img className="img-responsive col-lg-2 AllblogImgList" src={data.bannerImage ? data.bannerImage.path : ""} alt="Bannerpng"/>
													{ loggedIn ?
														(data.typeOfBlog == "Premium" 
														 ?
															(subscribed 
															 ?
																	<a href={"/blog/"+data.blogURL}>
																		<h4 className="blogTitleList col-lg-8 p10"><b>{data.blogTitle}</b></h4>
																		<p className="blogDate p10 col-lg-8 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
																		<p className="blogParaList p10 graycolor">{data.summary}</p>
																	</a>														
															:
																	<a href={"/planPage"}>
																		<p className="blogDate p10 col-lg-8 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
																		<h4 className="blogTitleList col-lg-8 p10"><b>{data.blogTitle}</b></h4>
																		<p className="blogParaList p10 graycolor">{data.summary}</p>
																	</a>														
															)
														:
															<a href={"/blog/"+data.blogURL}>
																<span className="blogDate col-lg-8  p10 graycolor"><Moment format="DD/MM/YYYY HH:mm" className="">{data.createdAt}</Moment></span>
																<h4 className="blogTitleList  col-lg-8  p10"><b>{data.blogTitle}</b></h4>
																<p className="blogParaList col-lg-8 p10 graycolor">{data.summary}</p>
															</a>
														)
													:
														<a href={"/login?destination=/blog/"+data.blogURL}>
															<p className="blogDate p10  col-lg-8 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
															<h4 className="blogTitleList col-lg-8  p10"><b>{data.blogTitle}</b></h4>
															<p className="blogParaList p10 graycolor">{data.summary}</p>
														</a>
													}
						          				
												</div>

						          			</div>
						          			)
		            				})
			      				:
	        				<h4 className="noBlogs p10 textAlignCenter"><div className="loadingImageContainer col-lg-4 col-lg-offset-4"><img src="/images/Loadingsome.gif"/></div></h4>
	        				:
	        			<h4 className="noBlogs p10 textAlignCenter">No blogs found</h4>
	            		
            		}				
	          		
          		</div>
			</div>
		);
	}
}
