import React, { Component } from 'react';
import "./AllBlogs.css";

export default class AllBlogs extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 mainBlogView ">
				<div className="row">
			
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						
						  <ul className="nav nav-pills customPillsBlogs noPadding col-lg-9 col-md-8 hidden-sm hidden-xs">
						    <li className="active"><a data-toggle="pill" href="#home">All Posts</a></li>
						    <li><a data-toggle="pill" href="#menu2">Earings Season Update</a></li>
						    <li><a data-toggle="pill" href="#menu3">Important Changes: Ecosystem</a></li>
						  </ul>
						 <ul className="nav nav-pills customPillsBlogsSmall noPadding hidden-md hidden-lg col-sm-12 col-xs-12">
						    <li className="active"><a data-toggle="pill" href="#home">All Posts</a></li>
						    <li><a data-toggle="pill" href="#menu2">Earings Season Update</a></li>
						    <li><a data-toggle="pill" href="#menu3">Important Changes: Ecosystem</a></li>
						  </ul>
						  <form class="form-inline col-lg-3 row">
					      <div class=" col-lg-2  col-md-2  col-sm-1 col-xs-1   SearchIN pull-right "><i className="fa fa-search"></i></div>
					      <input class="customInputBV col-lg-8 col-md-8  col-sm-11  col-xs-11 margin0 pull-right " type="text" placeholder="Search" aria-label="Search"/>
					    </form>
						  
						  <div className="tab-content">
							    <div id="home" className="tab-pane fade in active descriptionData">
							      <a href=""><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogBody" >
							      	<div className="row">
							      		 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 blogImage">
							      		 	<img src="/images/blog1.jpg"/>
							      		</div>
							      		 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 blogContent">
							      	
							      		 	<div className="col-lg-8 col-md-8 col-sm-10 col-xs-10"><div className="col-lg-2 col-md-2 col-xs-3 col-sm-3 backColorPurple logoOfBlogs"></div>
							      		 	<label className="nameOfBoggerAB">Priyanka Lewade</label>&nbsp;<i className="fa fa-user"></i><br/>
							      		 	<span className="nameOfBoggerAB">4 days ago </span>&nbsp;<span>3 min</span>
							      		 	</div>
							      		 	<div class="dropdown col-lg-4 col-md-4 col-sm-2 col-xs-2">
											  <i class="fa fa-ellipsis-v pull-right btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											  </i>
											  <div class="dropdown-menu dropDownMenuDiv" aria-labelledby="dropdownMenuButton">
											    <a class="dropdown-item col-lg-12" href="#">Follow Post</a>
											    <a class="dropdown-item col-lg-12" href="#">Share Post</a>
											  </div>
											</div>
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 blogContantDiv">
												<label>Safe Haven Stocks</label>
												<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently. Asked him what he has.. he didn't say much but said I saw many bull and bear markets but it’s the quality of earnings and quality of management that prevails. Market is like "alawavarach paani" ...</p>
											</div>
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 commentSectioAB">
												<span>672 Views</span> &nbsp;&nbsp;&nbsp; <span> 1 Comment </span> <span className="pull-right">1 &nbsp;<i className="fa fa-heart"></i></span>
											</div>

							      		 	
							      		</div>
							      	</div>
							      </div></a>
							      <a href="/BlogViewPage"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogBody" >
							      	<div className="row">
							      		 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 blogImage">
							      		 	<img src="/images/blog1.jpg"/>
							      		</div>
							      		 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 blogContent">
							      	
							      		 	<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div className="col-lg-2 backColorPurple logoOfBlogs"></div>
							      		 	<label className="nameOfBoggerAB">Priyanka Lewade</label>&nbsp;<i className="fa fa-user"></i><br/>
							      		 	<span className="nameOfBoggerAB">4 days ago </span>&nbsp;<span>3 min</span>
							      		 	</div>
							      		 	<div class="dropdown col-lg-4">
											  <i class="fa fa-ellipsis-v pull-right btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											  </i>
											  <div class="dropdown-menu dropDownMenuDiv" aria-labelledby="dropdownMenuButton">
											    <a class="dropdown-item col-lg-12" href="#">Follow Post</a>
											    <a class="dropdown-item col-lg-12" href="#">Share Post</a>
											  </div>
											</div>
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 blogContantDiv">
												<label>Safe Haven Stocks</label>
												<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently. Asked him what he has.. he didn't say much but said I saw many bull and bear markets but it’s the quality of earnings and quality of management that prevails. Market is like "alawavarach paani" ...</p>
											</div>
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 commentSectioAB">
												<span>672 Views</span> &nbsp;&nbsp;&nbsp; <span> 1 Comment </span> <span className="pull-right">1 &nbsp;<i className="fa fa-heart"></i></span>
											</div>

							      		 	
							      		</div>
							      	</div>
							      </div></a>
							      <a href="/BlogViewPage"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogBody" >
							      	<div className="row">
							      		 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 blogImage">
							      		 	<img src="/images/blog1.jpg"/>
							      		</div>
							      		 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 blogContent">
							      	
							      		 	<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div className="col-lg-2 backColorPurple logoOfBlogs"></div>
							      		 	<label className="nameOfBoggerAB">Priyanka Lewade</label>&nbsp;<i className="fa fa-user"></i><br/>
							      		 	<span className="nameOfBoggerAB">4 days ago </span>&nbsp;<span>3 min</span>
							      		 	</div>
							      		 	<div class="dropdown col-lg-4">
											  <i class="fa fa-ellipsis-v pull-right btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											  </i>
											  <div class="dropdown-menu dropDownMenuDiv" aria-labelledby="dropdownMenuButton">
											    <a class="dropdown-item col-lg-12" href="#">Follow Post</a>
											    <a class="dropdown-item col-lg-12" href="#">Share Post</a>
											  </div>
											</div>
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 blogContantDiv">
												<label>Safe Haven Stocks</label>
												<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently. Asked him what he has.. he didn't say much but said I saw many bull and bear markets but it’s the quality of earnings and quality of management that prevails. Market is like "alawavarach paani" ...</p>
											</div>
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 commentSectioAB">
												<span>672 Views</span> &nbsp;&nbsp;&nbsp; <span> 1 Comment </span> <span className="pull-right">1 &nbsp;<i className="fa fa-heart"></i></span>
											</div>

							      		 	
							      		</div>
							      	</div>
							      </div></a>
							    </div>

							    <div id="menu2" className="tab-pane fade">
							    	
															 
							    </div>
							    <div id="menu3" className="tab-pane fade writeReviewTextEcommerce">
					    
							   	</div>
						 	</div>
						</div>
					</div>

				</div>		
		);
	}
}

