import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';
import './UploadStatement.css';
axios.defaults.baseURL = 'http://api.wealthyvia.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';


class UploadStatement extends Component{

  constructor(props) {
    super(props);
    this.state = {
      "uploadStatement":"",
    
    };
  
  }
  uploadImg (event){
     var index = event.target.getAttribute('id');
    console.log("index--------------->",index);
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
        if(ext=="pdf" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){ 
          if (newFile) {
            if(this.state.uploadStatement==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{
                  this.setState({
                    uploadStatement : Data.location
                  },()=>{                
                    console.log("uploadStatement",this.state.uploadStatement)})
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
                console.log("uploadStatement--->",this.state.uploadStatement)
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
            }         
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");  
        }
      }
    }
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
  
  }
   deleteimageLogo(index){
   /* var data = index.split("/");
    var imageName = data[4];
    console.log("index1--------------->",imageName);
      if(index){
        S3FileUpload
          .deleteFile(imageName,this.state.config)
          .then((response) =>{
            console.log("Deletedddd...",response)
            swal("Image deleted successfully");
          })
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
          })
      }*/
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
        });
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">User Statement Upload</h4>
         </div>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 backColorUserDetails userDetailsDiv1 NOPadding">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6  ">
                <label className="mt20 "><b>Name - </b>Priyanka Lewade</label><br/>
                <label  className="mt20"><b>Email - </b>priyankalewade96@gmail.com</label><br/>
                <label  className="mt20"><b>Mobile - </b>8208066599</label><br/>
                        
              </div>
           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6  ">
               
                <label  className="mt20"><b>Start Date - </b> 11-10-2019</label><br/>
                <label  className="mt20"><b>End Date - </b> 11-02-2019</label><br/>             
              </div>
        </div>
          <hr className="compySettingHr" />
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
                              <option >---- Select ----</option>
                              <option>5GCPM</option>
                              <option>Safe Heaven</option>
                              <option>Safe Heaven Stocks & Alpha</option>
                              <option>USA Stocks Portfolio</option>
                              <option>Unlisted Stocks</option>     
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
                           <span className="under_ln">Upload Statement</span>
                          </div>      
                          <input  type="file" title="Click to attach file" name="userPic" ref="statementImg"  className="form-control click_input"  onChange={this.uploadImg.bind(this)} id="upload-file2" />
                        </div> 
                      </div>
                     
                    </div>
                 </div>          
          
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls mt40">
                  <label  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><b>Date : 11-10-2019</b></label>
                  { this.state.uploadStatement ?
                   <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Banner Image</h5>
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
                  }      
               {/*   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4  imagesDivUploaded">
                    <img src={this.state.uploadStatement} alt=""/>
                  </div>*/}
              </div>

            </form>
          </div>
        </div>
      </div>

      );
  }

}

export default UploadStatement;