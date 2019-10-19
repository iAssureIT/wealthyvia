import React from 'react';
import SingleBlogBanner      from "../../blocks/SingleBlogBanner/SingleBlogBanner.js";
import BlogContent           from "../../blocks/BlogContent/BlogContent.js";
import RelatedBlogs          from "../../blocks/RelatedBlogs/RelatedBlogs.js";
import Moment                 from 'react-moment';

import BlogComment           from "../../blocks/BlogComment/BlogComment.js";

import axios                 from 'axios';
import swal                  from 'sweetalert2';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  } from 'react-share';

export default class SingleBlogPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			    "blogTitle"      	  : "",
		      "summary"   	      : "",
		      "typeOfBlog"   	    : "",
		      "blogContent"       : "",
          "bannerImage"       : {},
          "viewCount"         : "",

		};
	}


componentDidMount(){
  var id = this.props.match.params.selectedID;
  this.setState({
    CurrectUrl:window.location.href
  })

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
      axios
      .get('/api/blogs/get/count/'+id)
      .then((response)=>{
        console.log("Count ==",response.data.count);
        this.setState({
            viewCount: response.data.count,
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
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 likeDiv mt40">
               <a href={"https://www.facebook.com/sharer/sharer.php?u="+ this.state.CurrectUrl} target="_blank"><i className="fa fa-facebook" href=""></i></a><a href=" https://twitter.com/ViaWealthy" target="_blank"><i className="fa fa-twitter" ></i></a><a href="https://www.linkedin.com/in/wealthy-via-882512194/" target="_blank"><i class="fa fa-linkedin"></i></a>
              </div>
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 bottomDiv">
                <span className="countNumberLike">{this.state.viewCount} views</span>
              </div>
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
