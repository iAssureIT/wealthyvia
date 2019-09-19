import React from 'react';
import SingleBlogBanner      from "../../blocks/SingleBlogBanner/SingleBlogBanner.js";
import BlogContent      from "../../blocks/BlogContent/BlogContent.js";


export default class SingleBlogPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
          	<div className="container-fluid" style={{padding:"0px"}}>
          		<SingleBlogBanner />
          		<BlogContent/>
          		
			</div>
		);
	}
}
