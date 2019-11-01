import React, { Component }       from 'react';
import { render }                 from 'react-dom';
import SimpleReactValidator       from 'simple-react-validator';
import axios                      from 'axios';
import swal                       from 'sweetalert';
import $                          from "jquery";
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';

import './UploadStatement.css';

var location ="";
class UploadStatement extends Component{

  constructor(props) {
    super(props);
    this.state = {
      uploadStatement  : "",
      imgArrayWSaws    : [],
      offeringTitle    : [],
      fileArray        : [],
      filenames        : [],
      fileType        : "File",

    };
  }
  componentDidMount() {
    axios
    .get('http://api.wealthyvia.com/api/projectsettings/get/S3')
    .then((response)=>{
      const config = 
        {
            bucketName      : response.data.bucket,
            dirName         : response.data.bucket,
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
      axios.get('/api/offerings/get/all/list/1')
      .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
              offeringTitle : offerings.data,
            })
         
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });  
  }
  uploadImg (event){
    var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
        uploadStatementName : newFile.name,
      })
      console.log("fileNamePAN",this.state.fileName);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext=="pdf" || ext=="PDF" || ext == "odp"){ 
          if (newFile) {
/*            if(this.state.uploadStatement.lenght<0){
*/              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{
                  this.setState({
                    uploadStatement : Data.location,
                  })
               
                  var obj2={
                    fileName : this.state.uploadStatementName,
                  }
                  var obj1={
                    filePath : Data.location,
                  }
                  var filenames = this.state.filenames;
                  var fileArray = this.state.fileArray;
                  filenames.push(obj2);
                  fileArray.push(obj1);
                  this.setState({
                    filenames : filenames,
                    fileArray : fileArray
                  },()=>{
                  var fileLocation = this.state.fileArray;
                  localStorage.setItem("fileLocation",fileLocation);
                  console.log("fileLocation",fileLocation);
                  })
                })
                .catch((error)=>{
                  console.log(error);
                })
            /*}else{
              swal({
                    title: "Are you sure you want to replace this file?",
                    text: "Once replaced, you will not be able to recover this file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            this.setState({
                              uploadStatement : Data.location
                            })
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
                            console.log("formErrors");
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }      */   
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload file format (pdf)","warning");  
        }
      }
    }
  }
  Submit(){

  }
   deleteimageLogo(index){
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
              uploadStatement : ""
            })
          } else {
          swal("Your image is safe!");
        }
      }
    );
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">User Statement Upload</h4>
         </div>
          <hr className="compySettingHr"/>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
             <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                      <label className="control-label statelabel locationlabel" >Select Offering</label>
                      <span className="astrick">*</span>
                      <select  ref="planName"
                         type="text" name="planName" placeholder="Enter Subscription Name" 
                         className="selectbox" title="Please enter package Name">
                         {
                            this.state.offeringTitle.map((a, i)=>{
                              return(
                                <option id={a._id}>{a.offeringTitle}</option>
                              )
                            })
                          }  
                      </select>
                    </div>                     
                  </div> 
                </div>
                </div>     
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Upload Document</span>
                          </div>      
                          <input  type="file" title="Click to attach file" name="userPic" ref="statementImg" className="form-control click_input"  onChange={this.uploadImg.bind(this)} id="upload-file2" />
                        </div> 
                      </div>
                     
                    </div>
                 </div>          
          
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls mt40">
                 {/* { this.state.uploadStatement ?
                   <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Statement</h5>
                      </div>
                      <div className="containerC">
                        <label id="" className="pull-right custFaTimes1" title="Delete image" onClick={this.deleteimageLogo.bind(this)}>X</label>
                        <img src={this.state.uploadStatement} alt="Avatar" className="imageC"/>
                        <div className="middleC">
                          <div className="textC">
                            <input type="file" title="Click to change the photo" multiple name="userPic" id={this.state.banner} onChange={this.uploadImg.bind(this)} ref="workspaceImg" className="form-control click_input" />
                            <i className="fa fa-camera fa-2x"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 2 Mb, Format: PDF)</div>
                    </div>
                    :
                    null
                  }      */}
                  {console.log("fileArray",this.state.fileArray.length)}
              {
              this.state.fileArray.length<=0?
              null         
              :
              <div>
                  <div>
                    {
                      this.state.fileType ==="File" ?
                      <div  className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                        <p className="fileName">File Uploaded</p>
                        {
                          this.state.filenames && this.state.filenames.length > 0 ?
                          this.state.filenames.map((a, index)=>{
                            return(
                              <div  key={index}>
                                <img src="/images/pdf.png"/>
                                <p  className="">{a.fileName}</p>
                              </div>
                            )
                          })
                        :
                          null
                        }
                      </div>
                    :
                      null
                    }
                  </div>
             
              </div>
            }
               {/* {
                  this.state.uploadStatement !==""?
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4  imagesDivUploaded">
                      <img src="/images/pdf.png"/>
                      <label className="mt20">{this.state.uploadStatementName}</label>
                    </div>
                    : 
                    <div className="loadingImage"><img src="/images/loading.gif"/></div>
                }*/}
                {/*     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  {this.state.imgArrayWSaws==null?
                    null
                  :
                    this.state.imgArrayWSaws.map((data,index)=>{
                      return(
                              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Workspace Image {index+1}</h5>
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
                  {this.state.imgArrayWSaws.length<=0?
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Workspace Images <span className="astrick">*</span></h5>
                       
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Workspace Images</span>
                          </div>     
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadworkspaceImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Images <span className="astrick">*</span></h5>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k" style={{height:"120px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon1">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="text-center under_ln">Choose another image</span>
                          </div>     
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadworkspaceImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div>
                      </div>
                    </div>
                }
                </div>*/}
                <div className="formcontent col-lg-offset-9 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <button onClick={this.Submit.bind(this)} className="btn bg-primary">Submit</button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>

      );
  }

}

export default UploadStatement;