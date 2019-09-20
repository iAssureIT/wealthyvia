import React from 'react';
import "./BlogContent.css";


export default class BlogContent extends React.Component {


	constructor(props) {
		super(props);
		this.state = {

			"Blog"		: [
							{
								Blogheader:"You will remember the people more than the place.",
								Blogpara1:"Talking to randos is the norm. I’ll never forget the conversation with the aquarium fisherman, forest ranger, and women at the Thai market. It’s refreshing to compare notes on life with people from vastly different backgrounds. When you are alone for days or weeks at a time, you eventually become drawn to people.",
								Blogpara2:"When you meet fellow travelers, you’ll find they are also filled with a similar sense of adventure and curiosity about the world. Five days of friendship on the road is like five months of friendship at home. It’s the experiences that bond you together, not the place. A rule I followed that worked well: be the first to initiate conversation. I met some incredible people by simply being the first to talk.",
								
								BlogScontent:"Make a radical change in your lifestyle and begin to boldly do things which you may previously never have thought of doing, or been too hesitant to attempt. But once you become accustomed to such a life you will see its full meaning and its incredible beauty"
							},
							{
								Blogheader:"Travel can be affordable.",
								Blogpara1:"Talking to randos is the norm. I’ll never forget the conversation with the aquarium fisherman, forest ranger, and women at the Thai market. It’s refreshing to compare notes on life with people from vastly different backgrounds. When you are alone for days or weeks at a time, you eventually become drawn to people.",
								Blogpara2:"When you meet fellow travelers, you’ll find they are also filled with a similar sense of adventure and curiosity about the world. Five days of friendship on the road is like five months of friendship at home. It’s the experiences that bond you together, not the place. A rule I followed that worked well: be the first to initiate conversation. I met some incredible people by simply being the first to talk.",
								
								
							},
							{
								Blogheader:"You will remember the people more than the place.",
								Blogpara1:"Talking to randos is the norm. I’ll never forget the conversation with the aquarium fisherman, forest ranger, and women at the Thai market. It’s refreshing to compare notes on life with people from vastly different backgrounds. When you are alone for days or weeks at a time, you eventually become drawn to people.",
								Blogpara2:"When you meet fellow travelers, you’ll find they are also filled with a similar sense of adventure and curiosity about the world. Five days of friendship on the road is like five months of friendship at home. It’s the experiences that bond you together, not the place. A rule I followed that worked well: be the first to initiate conversation. I met some incredible people by simply being the first to talk.",
								
								BlogScontent:"Make a radical change in your lifestyle and begin to boldly do things which you may previously never have thought of doing, or been too hesitant to attempt. But once you become accustomed to such a life you will see its full meaning and its incredible beauty"
							},
							{
								Blogheader:"You will remember the people more than the place.",
								Blogpara1:"Talking to randos is the norm. I’ll never forget the conversation with the aquarium fisherman, forest ranger, and women at the Thai market. It’s refreshing to compare notes on life with people from vastly different backgrounds. When you are alone for days or weeks at a time, you eventually become drawn to people.",
								Blogpara2:"When you meet fellow travelers, you’ll find they are also filled with a similar sense of adventure and curiosity about the world. Five days of friendship on the road is like five months of friendship at home. It’s the experiences that bond you together, not the place. A rule I followed that worked well: be the first to initiate conversation. I met some incredible people by simply being the first to talk.",
								
								BlogScontent:"Make a radical change in your lifestyle and begin to boldly do things which you may previously never have thought of doing, or been too hesitant to attempt. But once you become accustomed to such a life you will see its full meaning and its incredible beauty"
							},

						  ],
			"user": [
						{
							userimg:"/images/user1.png",
							userName:"Joan Doe",
							UserDes:"Based in New York, Uncode is a blog by John Doe. His posts explore modern web design and development through photos and quotes by influential architects, engineers, and creatives."
						}
					]
		};
	}

	render() {
		var data = this.state.Blog;
		console.log("===>",data);
		return (
          	<div className="container-fluid" style={{padding:"0px"}}>

				<div className="col-lg-12">
					{ 	data && data.length > 0 ?
						data.map((data,index)=>{
								return(
										<div  key={index} className="col-lg-8 col-lg-offset-2 blogBox">
											<h3><b>{data.Blogheader}</b></h3>
											<p className="graycolor">{data.Blogpara1}</p>
											<p className="graycolor">{data.Blogpara2}</p>
											{ data.BlogScontent ?
											<blockquote className="blockquote">
												<p className="sCont">
													<b>{data.BlogScontent}</b>
												</p>
											</blockquote>:null
											}
											
										</div>
									);
							}):
	                null
						
					}

				</div>

				
				<div className="col-lg-8 col-lg-offset-2">
				<hr/>
					<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding">
						<img className="img-responsive userImgB" src={this.state.user[0].userimg} alt="Bannerpng"/>
					</div>
					<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 NOpadding">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
							<div className="row">
								<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
									<h5><b>{this.state.user[0].userName}</b></h5>
									<h6 className="graycolor">{this.state.user[0].date}</h6>
								</div>
								
							</div>
							<p className="graycolor">{this.state.user[0].UserDes}</p>
							<div className="userbtn">All Author Post</div>

						</div>

					</div>
				</div>
					
			</div>
		);
	}
}
