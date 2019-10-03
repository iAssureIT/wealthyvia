import React from 'react';


import SingleBlogBanner      from "../../blocks/SingleBlogBanner/SingleBlogBanner.js";
import OfferingContent           from "../../blocks/OfferingContent/OfferingContent.js";

import axios                 from 'axios';
import swal     			 from 'sweetalert2';


export default class OfferingPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			  "blogTitle"      	  : "",
		      "summary"   	      : "",
		      "typeOfBlog"   	  : "",
		      "blogContent"       : "",
          	  "bannerImage"       : {},

		};
	}


componentDidMount(){
  var id = this.props.match.params.selectedID;
  

		axios
      .get('/api/offerings/get/'+id)
      .then((response)=>{
      	console.log("response blogs==",response.data);
        this.setState({


        "blogTitle"		:response.data.offeringTitle,
       /* "summary"		  :response.data.summary,
        "typeOfBlog"	:response.data.typeOfBlog,*/
        "blogContent"	:response.data.offeringContent,
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
		return (
			<div>
          		<SingleBlogBanner blogTitle={this.state.blogTitle}  bannerImage={this.state.bannerImage}/>
          		<OfferingContent blogContent={this.state.blogContent}/>

				
			</div>
		);
	}
}
