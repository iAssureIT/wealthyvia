import React from 'react';
import SingleBlogBanner      from "../../blocks/SingleBlogBanner/SingleBlogBanner.js";
import BlogContent           from "../../blocks/BlogContent/BlogContent.js";
import RelatedBlogs          from "../../blocks/RelatedBlogs/RelatedBlogs.js";
import Moment                 from 'react-moment';

import BlogComment           from "../../blocks/BlogComment/BlogComment.js";

import axios                 from 'axios';
import swal                  from 'sweetalert2';


export default class SingleBlogPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			    "blogTitle"      	  : "",
		      "summary"   	      : "",
		      "typeOfBlog"   	    : "",
		      "blogContent"       : "",
          "bannerImage"       : {},

		};
	}


componentDidMount(){
  var id = this.props.match.params.selectedID;
  

		axios
      .get('/api/blogs/get/'+id)
      .then((response)=>{
      	console.log("response blogs==",response.data);
        this.setState({

        "blogTitle"		:response.data.blogTitle,
        "summary"		  :response.data.summary,
        "typeOfBlog"	:response.data.typeOfBlog,
        "blogContent"	:response.data.blogContent,
        "bannerImage" :response.data.bannerImage.path,
        "createdAt"   :response.data.createdAt

          
        })
      })
      .catch(function(error){
        console.log(error);
          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
              }
      })
	}

	render() {
    const token = localStorage.getItem("user_ID");
    if(token){
		return (
          	<div className="container-fluid" style={{padding:"0px"}}>
          		<SingleBlogBanner blogTitle={this.state.blogTitle} summary={this.state.summary} bannerImage={this.state.bannerImage}/>
              <div className="mt40 col-lg-10"><label className="blogDateSBP pull-right"><b>Date :</b> <Moment format="DD-MM-YYYY HH:mm">{this.state.createdAt}</Moment></label></div>
          		<BlogContent blogContent={this.state.blogContent}/>
          		<RelatedBlogs/>
{/*          		<BlogComment/>
*/} 

			       </div>
		);
  }else{
     this.props.history.push("/login");
      window.location.reload();
    }


	}
}
