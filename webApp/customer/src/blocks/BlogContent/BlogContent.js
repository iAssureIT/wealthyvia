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


		};
	}

	render() {
		console.log("===>",this.state.Blog);
		return (
          	<div className="container-fluid" style={{padding:"0px"}}>

				<div className="col-lg-12">
					{ this.state.Blog.map((data,index)=>{
								return(
										<div  key={index} className="col-lg-8 col-lg-offset-2">
										<h3><b>{data.Blogheader}</b></h3>
										<p>{data.Blogpara1}</p>
										<p>{data.Blogpara2}</p>

										<p>{data.BlogScontent}</p>
										</div>
									);
							})
						
					}
				</div>
					
			</div>
		);
	}
}
