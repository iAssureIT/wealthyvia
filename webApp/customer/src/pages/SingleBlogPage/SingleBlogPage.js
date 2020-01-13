import React                 from 'react';
import SingleBlogBanner      from "../../blocks/SingleBlogBanner/SingleBlogBanner.js";
import BlogContent           from "../../blocks/BlogContent/BlogContent.js";
import RelatedBlogs          from "../../blocks/RelatedBlogs/RelatedBlogs.js";
// import BlogComment           from "../../blocks/BlogComment/BlogComment.js";
import axios                 from 'axios';
import swal                  from 'sweetalert2';
import Moment                from 'react-moment';
import "./SingleBlogPage.css";
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
   
    const token = localStorage.getItem("user_ID");
    if(this.state.typeOfBlog == "Premium"){
        if(token)
        {
        return (

            <div className="container-fluid" style={{padding:"0px"}}>
              <SingleBlogBanner blogTitle={this.state.blogTitle} summary={this.state.summary} bannerImage={encodeURI(this.state.bannerImage)}/>
              <div className="mt40 col-lg-10"><label className="blogDateSBP pull-right"><b>Date :</b> <Moment format="DD-MM-YYYY HH:mm">{this.state.createdAt}</Moment></label></div>
                <BlogContent blogContent={this.state.blogContent}/>
                <div className="col-lg-8 col-lg-offset-2 col-md-10 hidden-xs hidden-sm likeDiv mt40">
                  <a href={"https://www.facebook.com/sharer/sharer.php?u="+ this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i className="fa fa-facebook" href=""></i></a>
                  <a class="twitter-share-button"
                       href={"https://twitter.com/intent/tweet?url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href={"https://www.linkedin.com/shareArticle?mini=true&url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i class="fa fa-linkedin"></i></a>
                 
                </div>
                  <div className="hidden-ms hidden-lg col-sm-12 col-xs-12 likeDivSmall mt40">
                    <a href={"https://www.facebook.com/sharer/sharer.php?u="+ this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i className="fa fa-facebook" href=""></i></a><a class="twitter-share-button"
                        href={"https://twitter.com/intent/tweet?url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href={"https://www.linkedin.com/shareArticle?mini=true&url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </div>
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 bottomDiv">
                  <span className="countNumberLike">{this.state.viewCount} views</span>
                </div>
              <RelatedBlogs/>
           </div>
          
          );

        }
        else{
           this.props.history.push("/login");
            window.location.reload();
        }
    }else{

  		return (

        	<div className="container-fluid" style={{padding:"0px"}}>
       
        		<SingleBlogBanner blogTitle={this.state.blogTitle} summary={this.state.summary} bannerImage={this.state.bannerImage}/>
            <div className="mt40 col-lg-10"><label className="blogDateSBP pull-right"><b>Date :</b> <Moment format="DD-MM-YYYY HH:mm">{this.state.createdAt}</Moment></label></div>
        		  <BlogContent blogContent={this.state.blogContent}/>
              <div className="col-lg-8 col-lg-offset-2 col-md-10 hidden-xs hidden-sm likeDiv mt40">
                <a href={"https://www.facebook.com/sharer/sharer.php?u="+ this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i className="fa fa-facebook" href=""></i></a><a class="twitter-share-button"
                href={"https://twitter.com/intent/tweet?url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
                  <a href={"https://www.linkedin.com/shareArticle?mini=true&url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i class="fa fa-linkedin"></i></a>
                 {/*<LinkedinShareButton
                    title       = {this.state.blogTitle}
                    description = {this.state.summary}
                    url         = {this.state.CurrentUrl}
                  >
                  <i class="fa fa-linkedin"></i>
                  </LinkedinShareButton>*/}
              </div>
                <div className="hidden-ms hidden-lg col-sm-12 col-xs-12 likeDivSmall mt40">
                  <a href={"https://www.facebook.com/sharer/sharer.php?u="+ this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i className="fa fa-facebook" href=""></i></a><a class="twitter-share-button"
                  href={"https://twitter.com/intent/tweet?url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>

                  <a href={"https://www.linkedin.com/shareArticle?mini=true&url="+this.state.CurrentUrl} target="_blank"  rel="noopener noreferrer"><i class="fa fa-linkedin">

                  </i></a>
                     
                </div>



            
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-sm-12 col-xs-12 bottomDiv">
                <span className="countNumberLike">{this.state.viewCount} views</span>
              </div>
        		<RelatedBlogs/>
  			 </div>
        
  	   	);
      
    }
	}
}

