
import React, { Component }      from 'react';

import "./OfferingForm.css";
import {Route, withRouter} from 'react-router-dom';
import axios        from 'axios';
import S3FileUpload from 'react-s3';

import swal from 'sweetalert';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

axios.defaults.baseURL = 'http://api.wealthyvia.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class OfferingForm extends Component{
	constructor(props) {
		super(props);
		 this.state={
      "offeringTitle"      	  : "",
      "summary"   	      : "",
      "typeOfBlog"   		  : "",
      "imgArrayWSaws"     : [],
      "config"            : "",
      "uploadedImage"     : [],
      "imgPath"           : "",
      "imgOfferPath"         : {},

      "blog1Img"          : [],
      "offeringContent"       : '',
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
      var editId = nextProps.match.params.selectedID;
      if(nextProps.match.params.selectedID){
        this.setState({
          editId : editId
        })
        this.edit(editId);
      }
  }

  onEditorChange( evt ) {
      this.setState( {
          offeringContent: evt.editor.getData()
      } );
  }
  edit(selectedID){
    
    /*console.log('id mani', selectedID);*/
    axios
      .get("/api/offerings/get/"+selectedID)
      .then((response)=>{
        console.log("===>",response.data);
        this.setState({
          "offeringTitle":response.data.offeringTitle,
          "imgOfferPath":{
          	path:response.data.bannerImage.path
          },
          "offeringContent":response.data.offeringContent

        });
      })
      .catch((error)=>{
         console.log("error = ", error);              
      });

  }
  
  componentDidMount(){
    this.edit(this.props.match.params.selectedID);
      axios
        .get('http://api.wealthyvia.com/api/projectsettings/get/S3')
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
      this.setState({
        
        "offeringTitle":this.refs.offeringTitle.value,
        /*"summary":this.refs.summary.value,
        "typeOfBlog": this.refs.typeOfBlog.value,*/
       
      });
      
  }
  uploadDesignImg(e){
          console.log("upload =",e.target.files[0]);
          var file = e.target.files[0];
        this.setState({
          uploadedImage: e.target.files[0]
        },()=>{
          console.log("uploadToS3 =",this.state.uploadedImage);
          console.log("config",this.state.config);
           S3FileUpload
            .uploadFile(file,this.state.config)
            .then((Data)=>{
                console.log('mani', Data);
              this.setState({
                imgOfferPath : {
                  "path"    : Data.location,
                }
              })
          })
          .catch((error)=>{
            console.log(error);
          })
        })

      }

uploadBlogImage(event){
   event.preventDefault();
   let self = this;
   if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      // console.log("file",newFile);
      if (newFile) {
      // console.log("config--------------->",this.state.config);
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){ 
          if (newFile) {
      console.log("blog1Img--------------->",newFile);
            S3FileUpload
              .uploadFile(newFile,this.state.config)
              .then((Data)=>{
                
                  var obj1={
                    path : Data.location,
                  }
                  var imgArrayWSaws = this.state.imgArrayWSaws;
                  imgArrayWSaws.push(obj1);
                  this.setState({
                    // workspaceImages : imgArrayWSaws
                    blog1Img : imgArrayWSaws
                  })
      			console.log("blog1Img1--------------->",imgArrayWSaws);
              })
              .catch((error)=>{
                console.log("formErrors");
                console.log(error);
              })
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }
        }else{
          swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");  
        }
      }
    }
  }

  deleteBlogimage(event){
    event.preventDefault();
    swal({
          title: "Are you sure you want to delete this image?",
          text: "Once deleted, you will not be able to recover this image!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
              swal("Your image is deleted!");
              this.setState({
                imgOfferPath : ""
              })
            } else {
            swal("Your image is safe!");
          }
        });
  }

  deleteimageWS(e){
    e.preventDefault();
    var index = e.target.getAttribute('id');
    var filePath = e.target.getAttribute('data-id');
    var data = filePath.split("/");
    var imageName = data[4];
    console.log("imageName==",imageName);

    if(index){
      swal({
            title: "Are you sure you want to delete this image?",
            text: "Once deleted, you will not be able to recover this image!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              var array = this.state.imgArrayWSaws; // make a separate copy of the array
              array.splice(index, 1);
              swal("Image deleted successfully");
              this.setState({
                imgArrayWSaws: array
              });
            }else {
              swal("Your image is safe!");
            }
          });
    }
  }


  update(event){
    var id = this.props.match.params.blogID;
    event.preventDefault();
    const formValues = {
      "offeringContent"         :this.state.offeringContent,
     /* "typeOfBlog"          : this.state.typeOfBlog,
      "summary"                 :this.state.summary,*/
      "offeringTitle"           :this.state.offeringTitle,
      "imgOfferPath"            :this.state.imgOfferPath,
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
        "offeringContent"         :this.state.offeringContent,
        "imgOfferPath"            :this.state.imgOfferPath,
        "offeringTitle"           :this.state.offeringTitle,
        "bannerImage"             :this.state.imgOfferPath,
        "images"                  : this.state.blog1Img,
         };
    axios
          .post('/api/offerings/post',formValues)
          .then((res)=>{
                      swal("Thank you .Your Blog Created.");
                       this.props.history.push("/offeringpage/"+res.data.ID);
                       console.log("response = ", res.data);
                  })
                  .catch((error)=>{
                    console.log("error = ", error);
                  });
    }
	render() {
    
		return (
			<div>
  			<div className=" boxform1">
  				<form id="blogForm" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding blogFormBox">
                <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Offering Tittle<span className="redFont">*</span></label>
                    <div className="">
                      <input className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12" id="offeringTitle" type="text" name="offeringTitle"  ref="offeringTitle" value={this.state.offeringTitle}	onChange={this.handleChange.bind(this)} placeholder="" required/>
                    </div>
                  </div>
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="contactNumber">Banner Image<span className="redFont"></span></label>
                    
                    <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <input type="file" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding row" title="Please choose image" id="designImg" onChange={this.uploadDesignImg.bind(this)} />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        { this.state.imgOfferPath!=="" ? 
                          <div>
                            <label className="pull-right custFaTimes" title="Delete image"  onClick={this.deleteBlogimage.bind(this)}>X</label>{/*data-id={this.state.imgOfferPath}*/}
                            <img alt="selected design" src={this.state.imgOfferPath.path} width="150" height="100"/>
                          </div>
                          : <div> </div>
                        }
                        </div>
                      </div>
                    </div>
                  {/*  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                      {this.state.blog1Img==null?
                        null
                      :
                        this.state.blog1Img.map((data,index)=>{
                          return(
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                      <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Image {index+1}</h5>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                      <div className="imgcss" key={index}>
                                        <label id={index} className="pull-right custFaTimes" title="Delete image" data-id={data.imgPath} onClick={this.deleteimageWS.bind(this)}>X</label>
                                        <img className="img-responsive" src={data.imgPath}/>
                                      </div>
                                    </div>
                                  </div>
                                )
                        })
                      }
                  {this.state.blog1Img.length<=0?
                    <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Blog Images <span className="astrick">*</span></h5>
                       
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon">
                            <img src="/images/file_upload.png" width="50"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Blog Images</span>
                          </div>     
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadBlogImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Images <span className="astrick">*</span></h5>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k" style={{height:"120px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon1">
                            <img src="/images/file_upload.png" width="50"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="text-center under_ln">Choose another image</span>
                          </div>     
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadBlogImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div>
                      </div>
                    </div>
                }
                </div>*/}
                 
                  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12 ckbox">
                    <label htmlFor="userName">Offering Content</label>
                    <div className="">
                      <CKEditor
                        data={this.state.offeringContent}
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
export default withRouter(OfferingForm);
