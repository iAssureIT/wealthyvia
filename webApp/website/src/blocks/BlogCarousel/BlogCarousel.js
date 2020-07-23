import React, { Component } from 'react';
import OwlCarousel 		 from 'react-owl-carousel';
import axios        from 'axios';
import swal from 'sweetalert';


import "./BlogCarousel.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class BlogCarousel extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	 responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    },
	  "Blogs"		: [ ] 	
	    };
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
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  blogContainer otherCss ">
				<div className="row">
			  		<OwlCarousel
					    className="owl-theme  col-md-12 col-lg-12 col-sm-12 col-xs-12 "
					    loop
					    margin={20}
					    items={4}
					    nav={0}
					    dots={0}
					    responsiveClass={true}
					    autoplay={false}
						>
						
						    <div className="item">
							
								{
		                		data && data.length > 0 ?
				      				data.map((data, index)=>{
		                					return(
							          			<div className="col-lg-3 Allblog">
							          				
							          					<div className="All1blog1 z50">
							          					

														<img className="img-responsive AllblogImgB" src={data.bannerImage ? data.bannerImage.path : ""} alt="Bannerpng"/>
													{/*	<div className="middle">
														    
														    <a href={"/blogsform/"+data._id} className="hoverbk"><i className="fa fa-pencil wclr"></i></a>
														    <i className="fa fa-trash rclr hoverbbk" id={data._id} onClick={this.deleteBlog.bind(this)}></i>
														  </div>*/}
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
	                				<h4 className="noBlogs p10 textAlignCenter"><b>No blogs found</b></h4>

		                		}				
	          		
							</div>
							 <div className="item ">
								{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/blog1.jpg"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Earnings Analysis with Wealthyvia</label>
										<p>Consumer demand slowdown is now an economy wide issue - this is not an NBFC issue any more." 

										These are the words coming from the management of Edelweiss.

										...<a href="/login"> read more</a></p>
									</div>
								</div>*/}
							</div>
							 <div className="item ">
								{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/blog1.jpeg"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Earnings Analysis with Wealthyvia</label>
										<p>Consumer demand slowdown is now an economy wide issue - this is not an NBFC issue any more." 

										These are the words coming from the management of Edelweiss.

										...<a href="/login"> read more</a></p>
									</div>
								</div>*/}
							</div>
							
						</OwlCarousel>
				
					</div>		
			</div>		
		);
	}
}
