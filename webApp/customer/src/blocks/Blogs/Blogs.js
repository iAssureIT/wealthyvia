import React, { Component } from 'react';
import OwlCarousel 		 	from 'react-owl-carousel';
import axios        		from 'axios';
import swal 				from 'sweetalert';

import "./Blogs.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
var blogData = [];
export default class Blogs extends Component {
	constructor(props){
    super(props);
	    this.state = {
		    "Blogs"		: [],
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
			}
		};
	}
	componentDidUpdate(prevProps, prevState){
		console.log('prevProps, prevState',prevProps, prevState)
		if(prevState.Blogs.length!==this.state.Blogs.length){
			this.setState({
      			Blogs:this.state.Blogs
      		});
		}
	}
	componentDidMount(){
		axios
	      .get('/api/blogs/get/all/list')
	      .then((response)=>{
	      	blogData =response.data;
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
	  componentWillReceiveProps() {
   		
  }

   
  render() {
  	// var data = this.state.Blogs;
  	// const {data = []} = this.state.Blogs;
  	 const {data = undefined} = this.state;

  	console.log("data",blogData);
		return (
			<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12  blogContainer ">
			  	<div className="blogHeading  col-md-12 col-lg-12 col-sm-12 col-xs-12"> Blogs </div>
			  		<OwlCarousel
					    className="owl-theme  col-md-12 col-lg-12 col-sm-12 col-xs-12 boxShadow"
					    loop
					    margin 			=  {20}
					    items  			=  {1}
					    nav    			=  {0}
					    dots   			=  {0}
					    responsiveClass =  {true}
					    autoplay        =  {true}
					>
					{
					this.state.Blogs && this.state.Blogs.length>0?
					  this.state.Blogs.map((data, index) => {
					    return (
					      <div className="item" key={index}>
					      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
								<div className="row">
									<img src={data.bannerImage.path}/>

								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
								<div className="row">
									<label>{data.blogTitle}</label>
									<p>{data.summary}<a href="/allblogs"> read more</a></p>
								</div>
							</div>
					      </div>
					    );
					  })
					  :
					  null
					}

				</OwlCarousel>
			</div>		
		);
	}
}

{/* <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="/images/monthly.png"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Monthly Communique : Effect of tax reforms and opportunity one can’t afford to miss!</label>
										<p>This is one of major reforms in Indian business ecosystem after 1991...<br/><a href="/allblogs"> read more</a></p>
									</div>
								</div>
							</div>
							 <div className="item ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<img src="/images/stockb.jpeg"/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
									<div className="row">
										<label>Safe Heaven Stocks</label>
										<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently...<a href="/allblogs"> read more</a></p>
									</div>
								</div>
							</div>*/}