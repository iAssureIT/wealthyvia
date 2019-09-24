import React from 'react';
import './AllBlogsList.css';

export default class AllBlogsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

			"Blogs"		: [

							{
								blogDate:"March 7,2017",
								blogTitle:"Introducing the Website Wireframes Plugin for Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},
							
							{
								blogDate:"March 7,2017",
								blogTitle:"3 reasons Uncode is a smart choice for your service website",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user.png",
								blogImg:"/images/blog1.jpeg"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"6 Top-quality marketing websites built with Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"6 Reasons to Use Uncode for Your E-Commerce Site",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/help.jpg"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"Introducing the Website Wireframes Plugin for Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},
							
							{
								blogDate:"March 7,2017",
								blogTitle:"3 reasons Uncode is a smart choice for your service website",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user.png",
								blogImg:"/images/blog1.jpeg"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"6 Top-quality marketing websites built with Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"6 Reasons to Use Uncode for Your E-Commerce Site",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/help.jpg"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"Introducing the Website Wireframes Plugin for Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},
							
							{
								blogDate:"March 7,2017",
								blogTitle:"3 reasons Uncode is a smart choice for your service website",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user.png",
								blogImg:"/images/blog1.jpeg"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"6 Top-quality marketing websites built with Uncode",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/ceo.png"
							},
							{
								blogDate:"March 7,2017",
								blogTitle:"6 Reasons to Use Uncode for Your E-Commerce Site",
								blogPara:"I was surprised how many people spoke English...",
								blogwritter:"John Doe",
								buBlogger:"Blogger",
								bloggerImg:"/images/user1.png",
								blogImg:"/images/help.jpg"
							},
						  ]
	};
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
							          			<div className="col-lg-3 Allblog">
							          				
							          					<div className="All1blog1 z50">
							          					<a href="/singleblogpage">
															<img className="img-responsive AllblogImgB" src={data.blogImg} alt="Bannerpng"/>
															<p className="blogDate p10 mtop20 graycolor">{data.blogDate}</p>
															<h4 className="blogTitle p10"><b>{data.blogTitle}</b></h4>
															<p className="blogPara p10 graycolor">{data.blogPara}</p>
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
