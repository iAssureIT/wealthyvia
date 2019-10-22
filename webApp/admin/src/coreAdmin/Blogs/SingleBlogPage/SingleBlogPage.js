import React from 'react';
import SingleBlogBanner          from "../Componant/SingleBlogBanner/SingleBlogBanner.js";
import BlogContent               from "../Componant/BlogContent/BlogContent.js";
import RelatedBlogs              from "../Componant/RelatedBlogs/RelatedBlogs.js";

import BlogComment              from "../Componant/BlogComment/BlogComment.js";
import Moment                   from 'react-moment';

import axios                    from 'axios';
import swal                     from 'sweetalert2';



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
  var blogURL = this.props.match.params.selectedUrl;
  console.log("blogURL  ==",blogURL);
  // var blogURL = this.pro
  axios
      .get('/api/blogs/get/count/url/'+blogURL)
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

		axios
      .get('/api/blogs/get/'+blogURL)
      .then((response)=>{
      	console.log("response blogs mani==",response.data);
        this.setState({
          "blogTitle"		:response.data.blogTitle,
          "summary"		  :response.data.summary,
          "typeOfBlog"	:response.data.typeOfBlog,
          "blogContent"	:response.data.blogContent,
          "bannerImage" :response.data.bannerImage.path          
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
    console.log(this.props.match.params);
		return (
          	<div className="container-fluid" style={{padding:"0px"}}>
          		<SingleBlogBanner blogTitle={this.state.blogTitle} summary={this.state.summary} bannerImage={this.state.bannerImage} blogURL={this.props.match.params.selectedUrl}/>
          	  <div className="mt40 col-lg-10"><label className="blogDateSBP pull-right"><b>Date :</b> <Moment format="DD-MM-YYYY HH:mm">{this.state.createdAt}</Moment></label></div>

            	<BlogContent blogContent={this.state.blogContent}/>
               <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 likeDiv mt40">
                <span className="countNumberLike">{this.state.viewCount} views</span>
              </div>
         {/*     <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 bottomDiv">
                <span className="countNumberLike">{this.state.viewCount} views</span>
              </div>*/}
          		{/*<RelatedBlogs/>
          		<BlogComment/>*/}

          		
			</div>
		);
	}
}
