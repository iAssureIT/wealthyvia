import React from 'react';
import "./RelatedBlogs.css";

import axios        from 'axios';
import swal from 'sweetalert';

export default class RelatedBlogs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			"Blogs"		: [

							
							
						  ]
	};
}
getBlogData(){
	axios
      .get('/api/blogs/get/all/list')
      .then((response)=>{
      	this.setState({
      			Blogs:response.data
      		});
      })
      .catch(function(error){
          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   /*this.props.history.push("/");*/
              }
      })
}
componentDidMount(){
	var Blogs =[];
	this.getBlogData();
}
	render() {
		var data = this.state.Blogs;
		return (
          	<div className="container-fluid RelatedBlogsBox" style={{padding:"0px"}}>
          		<div className="col-lg-12 mtop75">
	          		<div className="col-lg-12">
	          			<h5 className="text-center" style={{marginBottom:"27px"}}> RELATED POSTS</h5>
	          		</div>
	          		<div className="col-lg-12">
	          		{
		                		data && data.length > 0 ?
				      				data.slice(0, 3).map((data,index)=>{
				      					/*index=(0,1);*/
		                					return(
							          			<div className="col-lg-4">
							          				<div className="col-lg-12 rblog">
							          					<div className="r1blog1">
															<img className="img-responsive blogImgB" src={data.bannerImage ? data.bannerImage.path : ""} alt="Bannerpng"/>
															<a href={"/blog/"+data.blogURL}>

																<p className="blogDate p10 mtop20 graycolor">{data.blogDate}</p>
																<h4 className="blogTitle p10 mt40"><b>{data.blogTitle}</b></h4>
																<p className="blogPara p10 graycolor">{data.summary}
																</p>
															</a>
														<hr/>
															
														</div>
							          				</div>
							          			</div>
							          			);
	                					})
	                				:
	                				null
		                		}				
	          		
	          		</div>
          		</div>
			</div>
		);
	}
}
