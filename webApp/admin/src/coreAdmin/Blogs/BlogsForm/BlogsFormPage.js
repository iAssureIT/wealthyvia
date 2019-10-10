import React from 'react';

import BlogsForm      from "../Componant/BlogsForm/BlogsForm.js";


export default class BlogsFormPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
        		<div className="container-fluid" style={{padding:"0px"}}>
        			<BlogsForm/>
				</div>
		);
	}
}
