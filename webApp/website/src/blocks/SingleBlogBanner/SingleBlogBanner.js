import React from 'react';
import "./SingleBlogBanner.css";

export default class SingleBlogBanner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"blogTitle":"",
		};
	}
	componentDidMount(){
		this.setState({
		})
	}
	render() {
		return (
			<div className="col-lg-12 nopadding sbbannerWall" style={{backgroundImage:'url('+this.props.bannerImage+')',backgroundSize:"100% 100%"}}>
				<div className="col-lg-12 sbcentered">
					<div className="col-lg-12 sbbtextcentered">
						<div className="col-lg-12 col-md-12 hidden-xs hidden-md ht100">
						<h1 className="fs72">{this.props.blogTitle}</h1>
						<p className="col-lg-8 col-lg-offset-2 fs24"> 
						{this.props.summary}</p>
						</div>
						<div className="col-sm-12 col-xs-12 hidden-md hidden-lg ht100">
						<h1 className="fs40 mt40">{this.props.blogTitle}</h1>
						<p className="col-lg-8 col-lg-offset-2 fs24"> 
						{this.props.summary}</p>
						</div>

					</div>
					

				</div>
			</div>
		);
	}
}
