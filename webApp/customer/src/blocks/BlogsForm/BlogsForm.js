import React, { Component }      from 'react';

import "./BlogsForm.css";
import {Route, withRouter} from 'react-router-dom';
import axios        from 'axios';
import S3FileUpload from 'react-s3';

import swal from 'sweetalert';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const clientnameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const emailRegex = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

axios.defaults.baseURL = 'http://wealthyviapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class BlogsForm extends Component{
	constructor(props) {
		super(props);
		 this.state={
      "blogTitle"      	  : "",
      "summary"   	      : "",
      "typeOfBlog"   		  : "",
      
      "config"            : "",
      "uploadedImage"     : [],
      "imgPath"           : "",
      "blog1Img"          : "",
      "blogContent"       : '',
      "formerrors"        :{
          "clientName"    : " ",
          "clientEmail"   : " ", 
        },
        "editId"          : this.props.match.params ? this.props.match.params.blogID : ''

      };
      this.handleChange = this.handleChange.bind( this );
      this.onEditorChange = this.onEditorChange.bind( this );
	}

  componentWillReceiveProps(nextProps) {
      var editId = nextProps.match.params.id;
      if(nextProps.match.params.id){
        this.setState({
          editId : editId
        })
        this.edit(editId);
      }
  }

  onEditorChange( evt ) {
      this.setState( {
          blogContent: evt.editor.getData()
      } );
  }
  edit(e){
    var id = this.props.match.params.blogID;
    axios
      .get("/api/blogs/get/"+id)
      .then((response)=>{
        console.log("===>",response.data);
        this.setState({
          "blogTitle":response.data.blogTitle,
          "summary":response.data.summary,
          "typeOfBlog":response.data.typeOfBlog,
          "blogContent":response.data.blogContent

        });
      })
      .catch((error)=>{
         console.log("error = ", error);              
      });

  }
  componentWillReceiveProps(){
    this.edit();
  }
  componentDidMount(){
    this.edit();
      axios
        .get('')
        .then((response)=>{
          
          const config = {
                            bucketName      : response.data.bucket,
                            dirName         : "wealthyvia",
                            region          : response.data.region,
                            accessKeyId     : response.data.key,
                            secretAccessKey : response.data.secret,

                         }
          this.setState({
            config : config
          })
        })
        .catch(function(error){
          console.log(error);
            if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/");
                }
        })
    }

  handleChange(event){
      event.preventDefault();
     /*  const datatype = event.target.getAttribute('data-text');
          const {name,value} = event.target;
          const formerrors = this.state.formerrors;
        console.log("datatype",datatype);
        switch (datatype){
        case 'clientName' : 
             formerrors.clientName = clientnameRegex.test(value)? '' : "Please enter valid name";
             break;
          case 'clientEmail' : 
            formerrors.clientEmail = emailRegex.test(value)? '' : "Please enter valid mail address";
            break;
        default :
        break;
        }*/
      this.setState({
        
        "blogTitle":this.refs.blogTitle.value,
        "summary":this.refs.summary.value,
        "typeOfBlog": this.refs.typeOfBlog.value,
       
      });
      
  }
  uploadDesignImg(e){
          console.log("upload =",e.target.files[0]);
          var file = e.target.files[0];
        this.setState({
          uploadedImage: e.target.files[0]
        },()=>{
          console.log("uploadToS3 =",this.state.uploadedImage);
           S3FileUpload
            .uploadFile(file,this.state.config)
            .then((Data)=>{
                console.log("S3 = ",Data);
                console.log("===>",Data.location);
              this.setState({
                imgPath:Data.location
              })
          })
          .catch((error)=>{
            console.log(error);
          })
        })

      }
/*
uploadBlogImage(event){
   event.preventDefault();
    var index = event.target.getAttribute('id');
    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      console.log("file",newFile);
      if (newFile) {
      // console.log("config--------------->",this.state.config);
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){ 
          if (newFile) {
            if(this.state.blog1Img==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{
                  console.log("Data = ",Data);
                  this.setState({
                    blog1Img : Data.location
                  })
                  this.deleteimageblog1Img(index)
                })
                .catch((error)=>{
                  console.log("formErrors");
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            console.log("Data = ",Data);
                            this.setState({
                              blog1Img : Data.location
                            })
                            
                          })
                          .catch((error)=>{
                            console.log("formErrors");
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }         
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");  
        }
      }
    }
  }*/

  update(event){
    var id = this.props.match.params.blogID;
    event.preventDefault();
    const formValues = {
      "blogContent"         :this.state.blogContent,
      "typeOfBlog"          :this.state.typeOfBlog,
      "summary"             :this.state.summary,
      "blogTitle"           :this.state.blogTitle,

   };
    axios
          .patch('/api/blogs/patch/'+id,formValues)
          .then((res)=>{
                      swal(" Your Blog Update successfully ");
                  })
                  .catch((error)=>{
                    console.log("error = ", error);
                  });
  }
  Submit(event){
    event.preventDefault();
     const formValues = {
        "blogContent"         :this.state.blogContent,
        "typeOfBlog"          :this.state.typeOfBlog,
        "summary"         :this.state.summary,
        "blogTitle"           :this.state.blogTitle,
         };
    axios
          .post('/api/blogs/post',formValues)
          .then((res)=>{
                      swal("Thank you .Your Blog Created.");
            /*console.log(" formValues axios",formValues);*/
                    /* if(res.status === 200){
                      swal("Thank you for contacting us. We will get back to you shortly.");
                      }*/
                      /*this.state.blogContent:"",
                      this.state.typeOfBlog:"",
                      this.state.summary:"",
                      this.state.blogTitle:"",*/
                  })
                  .catch((error)=>{
                    console.log("error = ", error);
                  });
  }
	render() {
    
		return (
			<div>
  			<div className="">
  				<form id="blogForm" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding blogFormBox">
                <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Blog Tittle<span className="redFont">*</span></label>
                    <div className="">
                      <input className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12" id="blogTitle" type="text" name="blogTitle"  ref="blogTitle" value={this.state.blogTitle}	onChange={this.handleChange.bind(this)} placeholder="" required/>
                    </div>
                  </div>
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{height:"auto"}}>
                    <label >Blog Summery<span className="redFont">*</span></label>
                    <div className="">
                      <textarea className="form-control nameSpaceUpper form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" name="blogsummery"  ref="summary" value={this.state.summary} onChange={this.handleChange.bind(this)}  placeholder="" rows="5" id="comment"></textarea>
                    </div>
                  </div>
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="email">Blog Type<span className="redFont">*</span></label>
                    <div className="">
                    	<div className="dropdown">
                    		<select className="form-control" id="sel1" ref="typeOfBlog" value={this.state.typeOfBlog} onChange={this.handleChange.bind(this)}>
  								        <option>Regular</option>
  								        <option>Premium</option>
  								      </select>
                      </div>
                    </div>
                  </div>
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="contactNumber">Banner Image<span className="redFont"></span></label>
                    <div className="">
                      {/*<input id="input-b1" name="input-b1" type="file" class="file" data-show-preview="false" onChange={this.handleChange.bind(this)} required/>*/}
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                        
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                            {/*<label htmlFor="designImg" className="designLabel col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Upload</label>*/}
                            <input type="file" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding row" title="Please choose image" id="designImg" onChange={this.uploadDesignImg.bind(this)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        { this.state.imgPath!=="" ? 
                          <img alt="selected design" src={this.state.imgPath} width="150" height="100"/>
                          : <div> </div>
                        }
                        </div>
                        
                      </div>
                  </div>
                 
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12 ckbox">
                    <label htmlFor="userName">Blog Content<span className="redFont">*</span></label>
                    <div className="">
                      <CKEditor
                        data={this.state.blogContent}
                        onChange={this.onEditorChange} />
                      </div>
                  </div>
                  <div className="formcontent col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    { 
                        this.state.editId ? 
                        <button onClick={this.update.bind(this)} className="btn lightbluebg commentBoxbtn buttonhover">Update</button>
                        :
                        <button onClick={this.Submit.bind(this)}  className="btn lightbluebg commentBoxbtn buttonhover">Submit</button>
                      }
                  </div>
                </div>
    			</form>
    		</div>
			</div>
		);
	}
}
export default withRouter(BlogsForm);