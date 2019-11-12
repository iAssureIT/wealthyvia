import React 			 from 'react';
import axios       		 from 'axios';
import swal              from 'sweetalert';
import Moment 			 from 'react-moment';

import './AllBlogsList.css';

export default class AllBlogsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

			"Blogs"		: [
							/*{
								blogDate:"March 7,2017",
								blogTitle:"Introducing the Website Wireframes Plugin for Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},*/

						  ]
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
render() {
		var data = this.state.Blogs;
		var subscribed = false;
		console.log("data===",data.blogURL);
   		const token = localStorage.getItem("user_ID");
		return (
			<div className="container-fluid AllBlogsBox" style={{padding:"0px"}}>
          		<div className="col-lg-12">
	          		{
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
											{ token ?
												(data.typeOfBlog == "Premium" ?
													(subscribed ?
															<a href={"/blog/"+data.blogURL}>
																<p className="blogDate p10 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
																<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
																<p className="blogPara p10 graycolor">{data.summary}</p>
															</a>
														
															:
															<a href={"/planPage"}>
																<p className="blogDate p10 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
																<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
																<p className="blogPara p10 graycolor">{data.summary}</p>
															</a>
														
														)
												:
												<a href={"/blog/"+data.blogURL}>
													<p className="blogDate p10 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
													<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
													<p className="blogPara p10 graycolor">{data.summary}</p>
												</a>
												)
											:
											<a href="/login">
												<p className="blogDate p10 mtop20 graycolor"><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p>
												<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
												<p className="blogPara p10 graycolor">{data.summary}</p>
											</a>
											}
				          				
										</div>

				          			</div>
				          			);
        					})
        				:
        				<h4 className="noBlogs p10 textAlignCenter"><div className="loadingImageContainer col-lg-4 col-lg-offset-4"><img src="/images/Loadingsome.gif"/></div></h4>
            		}				
	          		
          		</div>
			</div>
		);
	}
}
