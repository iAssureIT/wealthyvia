import React 					from 'react';
import $                        from "jquery";

import "./AllBlogsBanner.css";
export default class AllBlogsBanner extends React.Component {
	constructor(props) {
		super(props);
	}
	searchButton(event)
	{

	 	$('.searchIconABB').click(function(){
	  		$(this).siblings().toggleClass('open');
		});
				
	}
	
render() {
		return (
			<div className="col-lg-12 nopadding AllBlogsbannerWall">
				<div className="col-lg-12 AllBlogscentered">
                {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                 	<input  type="text" title="Search " placeholder="Search.." className="click_input customInputAllBlog col-lg-8"   />
	                 <div className="searchIconABB col-lg-2" onClick={this.searchButton.bind(this)} title="Search"><i className="fa fa-search "></i>
	                 </div>
                 </div>*/}
					<div className="col-lg-12 AllBlogstextcentered">
						<h1 className="fs72">Blogs</h1>
					</div>
				</div>
			</div>
		);
	}
}

