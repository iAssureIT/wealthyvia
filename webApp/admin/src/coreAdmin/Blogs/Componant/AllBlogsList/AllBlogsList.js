import React from 'react';
import axios        from 'axios';
import swal from 'sweetalert';
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
			<div className="container-fluid AllBlogsBox" style={{padding:"0px"}}>
          		<div className="col-lg-12">
	          		{
		                		data && data.length > 0 ?
				      				data.map((data, index)=>{
		                					return(
							          			<div className="col-lg-4 Allblog">
							          				
							          					<div className="All1blog1 z50">
							          					

														<img className="img-responsive AllblogImgB" src={data.bannerImage?data.bannerImage.path:" "} alt="Bannerpng"/>
														<div className="middle">
														    
														    <a href={"/blogsform/"+data._id} className="hoverbk"><i className="fa fa-pencil wclr"></i></a>
														    <i className="fa fa-trash rclr hoverbbk" id={data._id} onClick={this.deleteBlog.bind(this)}></i>
														  </div>
														<a href={"/singleblogpage/"+data._id}>
															<p className="blogDate p10 mtop20 graycolor">{data.createdAt}</p>
															<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
															<p className="blogPara p10 graycolor">{data.summary}</p>
														</a>
														</div>
							          				
							          			</div>
							          			);
	                					})
	                				:
	                				null
		                		}				
	          		
	          		
          		</div>
			</div>
		);
	}
}
