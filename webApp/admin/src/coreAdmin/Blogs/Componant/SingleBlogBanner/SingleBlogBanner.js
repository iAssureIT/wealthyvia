import React from 'react';
import "./SingleBlogBanner.css";
import axios        from 'axios';
import swal from 'sweetalert';

export default class SingleBlogBanner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"blogTitle":"",
		};
	}
	componentDidMount(){
		this.setState({
			/*"blogTitle":  this.props.blogTitle*/
		})
	}
	deleteBlog(event){
	event.preventDefault();
	var id= event.target.id;
	console.log("id delet",id);
	 swal({
          title: "Are you sure you want to delete this Blog?",
          text: "Once deleted, you will not be able to recover this Blog!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
            	axios
			    .delete("/api/blogs/delete/"+id)
			    .then((response)=>{
			     	this.getBlogData();
			       swal("Your Blog is deleted!");
			    })
			    .catch((error)=>{
			       console.log("error = ", error);              
			    });
            
              
            } else {
            swal("Your Blog is safe!");
          }
        }); 
}
	render() {
		{console.log(" img path ===>", this.props.bannerImage)}
		return (
			<div className="col-lg-12 nopadding sbbannerWall" style={{backgroundImage:'url('+this.props.bannerImage+')'}}>
				<div className="middle">									    
			    	<a href={"/blogsform/"+this.props.selectedID} className="hoverbk"><i className="fa fa-pencil wclr"></i></a>
			    	<i className="fa fa-trash rclr hoverbbk" id={this.props.selectedID} onClick={this.deleteBlog.bind(this)}></i>
			 	</div>
				<div className="col-lg-12 sbcentered">
					<div className="col-lg-12 sbbtextcentered">
						<h1 className="fs72">{this.props.blogTitle}</h1>
						<p className="col-lg-6 col-lg-offset-3 fs24"> {/*When you are alone for days or weeks at a time, you eventually become
							drawn to people. Talking to randos is the norm. After a long time I could
							witness the sunrise. I could feel the sun rays falling on my body.*/}{this.props.summary}</p>

					</div>
					

				</div>
			</div>
		);
	}
}
