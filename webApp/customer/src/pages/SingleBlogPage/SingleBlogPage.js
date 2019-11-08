import React from 'react';
import SingleBlogBanner      from "../../blocks/SingleBlogBanner/SingleBlogBanner.js";
import BlogContent           from "../../blocks/BlogContent/BlogContent.js";
import RelatedBlogs          from "../../blocks/RelatedBlogs/RelatedBlogs.js";
import Moment                from 'react-moment';
import MetaTags              from 'react-meta-tags';
// import ShareLink             from 'react-facebook-share-link'

import BlogComment           from "../../blocks/BlogComment/BlogComment.js";
import { FacebookProvider, Share } from 'react-facebook';

import axios                 from 'axios';
import swal                  from 'sweetalert2';
/*import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  } from 'react-share';*/
var id;
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
    var url = this.props.location.pathname;
    localStorage.setItem("lastUrl",url);
    this.setState({
      CurrentUrl:window.location.href
    })
    id = this.props.match.params.selectedUrl;

		axios
      .get('/api/blogs/get/'+id)
      .then((response)=>{
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
          if(error.message === "Request failed with status code 401")
              {
                swal("Your session is expired! Please login again.","", "error");
              }
      })
      var blogURL = this.props.match.params.selectedUrl;

      axios
      .get('/api/blogs/get/count/url/'+blogURL)
      .then((response)=>{
        this.setState({
            viewCount: response.data.count,
        })
        
      })
      .catch(function(error){
        if(error.message === "Request failed with status code 401")
            {
                 swal("Your session is expired! Please login again.","", "error");
            }
        })
	}


  handleClick(){
    return true;
  }

	render() {
    console.log('CurrentUrl',this.state.CurrentUrl);
    const token = localStorage.getItem("user_ID");
    if(token){

		return (
      	<div className="container-fluid" style={{padding:"0px"}}>
       {/*  <MetaTags>
            <meta property="og:url"                 content={this.state.CurrentUrl}  />
            <meta property="og:type"               content="Blog" />
            <meta property="og:title"              content={this.state.blogTitle} />
            <meta property="og:description"        content={this.state.blogContent} />
            <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
          </MetaTags>*/}
      		<SingleBlogBanner blogTitle={this.state.blogTitle} summary={this.state.summary} bannerImage={this.state.bannerImage}/>
          <div className="mt40 col-lg-10"><label className="blogDateSBP pull-right"><b>Date :</b> <Moment format="DD-MM-YYYY HH:mm">{this.state.createdAt}</Moment></label></div>
      		  <BlogContent blogContent={this.state.blogContent}/>
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 likeDiv mt40">
              <a href={"https://www.facebook.com/sharer/sharer.php?u="+ this.state.CurrentUrl} target="_blank"><i className="fa fa-facebook" href=""></i></a><a href={"https://twitter.com/home?status=" + this.state.CurrentUrl} target="_blank"><i className="fa fa-twitter" ></i></a><a href={"https://www.linkedin.com/shareArticle?mini=true&url="+this.state.CurrentUrl} target="_blank"><i class="fa fa-linkedin"></i></a>
            </div>

{/*
              <FacebookProvider appId="409175303314400">
                <Share href="http://www.facebook.com">
                  {({ handleClick, loading }) => (
                    <button type="button"  onClick={handleClick}>Share</buttx on>
                  )}                
                </Share>
              </FacebookProvider>*/}
         {/*     <ShareLink link='http://wealthyvia.iassureit.com/blog/why-you-need-5gcpm-like-framework-to-succeed-in-stock-investments'>
                 {link => (
                    <a href={link} target='_blank'>Share this on Facebook</a>
                 )}
              </ShareLink>*/}
             {/* <FacebookShareCount url={this.state.CurrentUrl}>
                {shareCount => (
                  <span className="myShareCountWrapper">{shareCount}</span>
                )}
              </FacebookShareCount>
            */}

            {/* <div class="fb-share-button" 
                data-href={this.state.CurrentUrl} 
                data-layout="button_count">
              </div>*/}
             {/* <a href="https://twitter.com/iOGSolutions?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="true">
                   <i class="col-lg-12 fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com/intent/tweet?screen_name=ViaWealthy&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">Tweet to @ViaWealthy</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            */}<div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 bottomDiv">
              <span className="countNumberLike">{this.state.viewCount} views</span>
            </div>
      		<RelatedBlogs/>
			 </div>
      
	   	);
    }else{
       this.props.history.push("/login");
        window.location.reload();
    }
	}
}

