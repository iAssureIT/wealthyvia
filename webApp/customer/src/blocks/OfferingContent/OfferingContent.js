import React from 'react';

export default class OfferingContent extends React.Component {



	constructor(props) {
		super(props);
		this.state = {
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
		var imgPath = <img src="/images/user1.png" alt="i1"/>
		return (
          	<div className="container-fluid" style={{padding:"0px"}}>

				<div className="col-lg-12">
					<div  className="col-lg-8 col-lg-offset-2 blogBox">
    					<div dangerouslySetInnerHTML={ { __html: (this.props.blogContent).replace("[IMG]",imgPath) } }></div>
					</div>
				</div>

				<div className="col-lg-8 col-lg-offset-2">
				<hr/>
					
				</div>
					
			</div>
		);
	}
}
