import React, { Component } from 'react';
import './tools.css';

import $ from "jquery";
import axios                      from 'axios';
import swal                       from 'sweetalert';
import Swal   from 'sweetalert2';
import SimpleReactValidator from 'simple-react-validator';

import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ReactPlayer from 'react-player'


export default class tools extends Component {
  constructor(props){
      super();
      this.state = {
        title           : "",
        tag           : "",
        url             : "",
        fileUpload      : [],
        portfolioImage1 : "",
        videoData       : [],
        updateID        : "",
        submit          : true,
      };
      console.log("fileUpload",this.state.fileUpload)
  }

  componentDidMount(){
      this.getDataList();
      console.log("this.props.match.params = ",this.props.match.params);

      var editId = this.props.match.params.editId;

      if(editId){
        console.log("2 editId = ",editId);
        this.setState({submit : false});
        this.getOneData(editId);
      }
      axios
        .get('/api/projectsettings/get/S3')
        .then((response)=>{
          // console.log("response",response);
          const config = {
                            bucketName      : response.data.bucket,
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
            if(error.message === "Request failed with status code 401"){
              swal("Your session is expired! Please login again.","", "error");
              this.props.history.push("/");
            }
        });
  }

  uploadppt(event){
    event.preventDefault();
    var file = event.target.files[0];
    console.log("file",file)
    if(file){
     if(file.size>=2097152)
     {
        swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
        event.target.value ="";
     }else{
          this.setState({
              "fileUpload":event.target.value,
            });
        }
      }
    var index = event.target.getAttribute('id');

    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
        fileUpload : newFile.name,
      })
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="PDF" ||  ext==="pdf"||  ext==="ppt"||  ext==="pdf"){ 
          if (newFile) {
            if(this.state.fileUpload && this.state.fileUpload.length === 0){
            console.log("this.state.fileUpload",this.state.fileUpload)
            console.log("this.state.confiq",this.state.config);
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    portfolioImage1 : Data.location,
                  },()=>{console.log("this.state.portfolioImage1",this.state.portfolioImage1)})
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace?",
                    text: "Once replaced, you will not be able to recover!",
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
                              portfolioImage1 : Data.location,
                            })
                            console.log("portfolio",Data.location);
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
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
          swal("Format is incorrect","Only Upload (jpg,pdf,jpeg)","warning");  
        }
      }
    }
  }
  
  getDataList(){
    axios.get("api/uploadVideoUrl/get/list")
          .then((response) =>{
            console.log("response",response);
            this.setState({
              videoData :response.data
            })
        })
        .catch((error) =>{
          console.log("error",error);
        });
  }

  getOneData(editId){
    console.log("2 editId = ",editId);
    axios
      .get("/api/uploadVideoUrl/get/"+editId)
      .then((response)=>{
        console.log("===>",response);
        this.setState({
          "title"           : response.data.title,
          "url"             : response.data.url,
          "fileUpload"      : response.data.fileUpload,
          "portfolioImage1" : response.data.fileUpload, 
          "updateID"        : response.data._id,
        });
        console.log("response===>",response.data._id);
        console.log("fileUpload===>",response.data.fileUpload);
      })
      .catch((error)=>{
         console.log("error = ", error);              
      });
  }

  deletetools(event){
    event.preventDefault(); 
    var disid = event.currentTarget.id.substr(2);
    console.log("disid = ",disid);
    Swal.fire({
      title: 'Are you sure, you want to Delete this Data?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',     
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      console.log("result",result)
      if (result.value) {
        axios.delete("api/uploadVideoUrl/delete/"+disid)
          .then((data)=>{
            this.getDataList();
              Swal.fire(
                'Deleted!',
                'Distributor Record has been deleted successfully',
                'success'
              )
          })
          .catch((err)=>{
            console.log("error while deleting data = ",err);
              Swal.fire(
                'Some Error Occured!',
                ''+err,
                'error'
              )                     
          });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Distributor Record is NOT Deleted :)',
          'error'
        )
      }
    })    
  }

  handleChange(event){
      event.preventDefault();
      var name       = event.target.name;
      var value      = event.target.value;
      //console.log(name, value);
      this.setState({ [name] : value })
      console.log("fileUpload",this.state.fileUpload)
      // console.log("fileUpload",this.state.portfolioImage1)
  }

  handleSubmit(event){
    // event.preventDefault();
    // || this.state.url === ''|| this.state.fileUpload.length <= 0
      if(this.state.title === '' || this.state.tag === ''){
        swal("", "Please fill required fields", "error")
      }else if(this.state.url !== '' || this.state.fileUpload.length <= 0){
        // swal("", "Submitted", "success")
        var dataArray1={
              "title"     : this.state.title ,
              "tag"       : this.state.tag ,
              "url"       : this.state.url, 
              "fileUpload": this.state.portfolioImage1,
        }
         console.log("dataArray1", dataArray1);
         console.log("dataArray1", dataArray1.fileUpload);
      axios
        .post("api/uploadVideoUrl/post",dataArray1)
        .then((response) =>{
            console.log("Url Upload  successfully!", response);
            swal("Congrats..!", "Tools Updated successfully","success" );
            this.getDataList();
            this.props.history.push('/tools'); 
            this.setState({
                "title"     : "" ,
                "tag"       : "" ,
                "url"       : "", 
                "fileUpload": "",
                "portfolioImage1": "",
            });
          
        })
        .catch((error) =>{
          console.log("Some Error occured in Insert = ", error);
        });
      }else if(this.state.url === '' || this.state.fileUpload.length >= 0){
            var dataArray1={
              "url"     : this.state.url, 
              "title"   : this.state.title ,
              "tag"     : this.state.tag ,
              "fileUpload": this.state.portfolioImage1,
            }
     console.log("dataArray1", this.state.portfolioImage1);
      axios
        .post("api/uploadVideoUrl/post",dataArray1)
        .then((response) =>{
          console.log("Url Upload  successfully!", response);
            swal("Congrats..!", "Tools Updated successfully","success" );
            this.getDataList();
            this.setState({
                "title"     : "" ,
                "tag"       : "" ,
                "url"       : "", 
                "fileUpload": "",
                "portfolioImage1": "",
            }); 
            this.props.history.push('/tools');

        })
      }else{
        swal("", "Please fill required fields", "error")

      } 
  }

  uploadLogoImage(event){
   event.preventDefault();
    var file = event.target.files[0];
    if(file){
     if(file.size>=3097152)
     {
      swal("Warning!", "File size should not be greater than 3 MB..!", "warning")
      event.target.value ="";
     }else{
        this.setState({
            "fileUpload":event.target.value,
          });
        console.log("fileUpload inside Function",this.state.fileUpload.length)
        }
      }
    var index = event.target.getAttribute('id');
    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
        fileUpload : newFile.name,
      })
      console.log("file",newFile);
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(  ext==="PDF" ||  ext==="pdf" || ext==="PPT" || ext==="PPTX"|| ext==="pptx"){ 
          if (newFile) {
            console.log("newFile")
            if(this.state.fileUpload && this.state.fileUpload.length === 0){
              console.log("this.state.confiq",this.state.config);
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    portfolioImage1 : Data.location,
                  },()=>{console.log("this.state.portfolioImage1",this.state.portfolioImage1)})
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this File?",
                    text: "Once replaced, you will not be able to recover this File!",
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
                              portfolioImage1 : Data.location,
                            })
                            console.log("portfolioImage1",this.state.portfolioImage1);
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
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
          swal("Format is incorrect","Only Upload format (pdf,ppt,pptx,jpg,jpeg,png)","warning");  
        }
      }
    }
  }

  deleteimageLogo(index){
    var data = index.split("/");
    var imageName = data[4];
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
      }
  }

  update(event){
    console.log("inside update id");
    var id = this.state.updateID;
    console.log("id",id);
    const formValues = {
      "title"         :this.state.title,
      "tag"           :this.state.tag,
      "url"           :this.state.url,
      "fileUpload"    :this.state.portfolioImage1,
      "videoData"     :this.state.videoData,
   };
    console.log("portfolioImage1",formValues);
    axios
    .patch('/api/uploadVideoUrl/patch/'+id,formValues)
    .then((res)=>{
        console.log("res",res);
        swal("Congrats..!","Your Tools Data Update successfully","success");
        this.getDataList();
        this.props.history.push("/");

      })
    .catch((error)=>{
      console.log("error = ", error);
    });
  }

  deleteBlogimage(event){
      // event.preventDefault();
      swal({
          title: "Are you sure you want to delete this image?",
          text: "Once deleted, you will not be able to recover this image!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
          })
          .then((success) => {
            console.log("inside success",success);
              if (success) {
                swal("Your image is deleted!");
                this.setState({
                  portfolioImage1 : "",
                  fileUpload      : "", 
                })

            console.log("inside fileUpload",this.state.fileUpload);
              } else {
              swal("Your image is safe!");
            }
          });
  }

  openNewTab(event){
      event.preventDefault(); 
      var id = event.currentTarget.id;
      var youtubeUrl = $(event.currentTarget).attr('data-url');
       window.open(youtubeUrl, "_blank"); 
  }

    render(){
      // console.log("this.state.portfolioImage1",this.state.fileUpload);
        return(
          <div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mheight">                
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setTopMargin ">
                <h3 className="heading"><b>Upload Training</b></h3>
               <hr/>
              </div>
              <div className="col-lg-10  col-lg-offset-1 col-sm-12 col-xs-12 col-md-12 setMb nppadding">  
                <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 setMb nppadding">  
                  <div className=" col-lg-10 col-md-10 col-xs-12 col-sm-12 inputContent">
                    <label className="zeroMarginB">Title <label className="requiredsign">*</label></label>
                  </div>
                  <div className=" col-lg-12 col-md-10 col-xs-12 col-sm-12 inputContent ">
                    <input type="text"  className="form-control inputText form-control has-content" name="title" ref="title"  required
                        data-text="title"
                        title="Please enter alphanumeric only"
                        onChange={this.handleChange.bind(this)}
                        value   ={this.state.title} 
                   />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 setMb nppadding">  
                  <div className=" col-lg-10 col-md-10 col-xs-12 col-sm-12 inputContent">
                    <label className="zeroMarginB">Tag <label className="requiredsign">*</label></label>
                  </div>
                  <br/>
                  <div className=" col-lg-12 col-md-10 col-xs-12 col-sm-12 inputContent ">
                    <input type="text"  className="form-control inputText form-control has-content" name="tag" ref="tag" required
                        data-text="title"
                        title="Please enter alphanumeric only"
                        onChange={this.handleChange.bind(this)}
                        value   ={this.state.tag} 
                   />
                  </div>
                </div>
              </div>
              <div className="col-lg-10  col-lg-offset-1 col-sm-12 col-xs-12 col-md-12 setMb nppadding">  
                <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 setMb nppadding">  
                  <div className=" col-lg-10 col-md-10 col-xs-12 col-sm-12 inputContent">
                  <label className="zeroMarginB">Upload YouTube Video Link <label className="requiredsign">*</label></label>
                  </div>
                  <div className=" col-lg-12 col-md-10 col-xs-12 col-sm-12 inputContent ">
                    <input type="text" className="form-control inputText form-control has-content" name="url" ref="url" 
                        onChange={this.handleChange.bind(this)}
                        value   ={this.state.url}
                    />
                </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 setMb nppadding">  
                  <div className=" col-lg-10 col-md-10 col-xs-12 col-sm-12 inputContent">
                    <label className="zeroMarginB">Upload File <label className="requiredsign">*</label></label>
                  </div>
                  <br/>
                  <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
                    <input type="file"  className="form-control inputText form-control has-content" id="upload-file2" name="fileUpload" ref="fileUpload" 
                        onChange={this.uploadLogoImage.bind(this)}
                    />
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-xs-5  col-sm-12 nopadding ">
                  <div className="col-lg-1 col-md-12 col-sm-12 col-xs-6 row pull-right nopadding setMarginRight">
                  { this.state.portfolioImage1 !== "" 
                    ? 
                    <div>
                        <label className="pull-right custFaTimes pptZeromargin" title="Delete image"  onClick={this.deleteBlogimage.bind(this)}>X</label>
                       {
                        (this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "") === "pdf" || (this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "") === "PDF" ?
                          <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12 " id="LogoImageUpOne">
                            <img src="/images/pdf.png" height="50" width="50"/>
                            <span className="setp">{(this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "")}</span>
                          </div>
                          :
                        (this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "") === "pptx" || (this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "") === "ppt" ?
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosPersonmaster" id="licenseProof">
                            <img src="/images/ppt.png" height="50" width="50"/>
                            <span className="setp">{(this.state.portfolioImage1 ? this.state.portfolioImage1.split('.').pop() : "")}</span>
                          </div>
                          :
                          null
                        }
                    </div>
                    : null
                  }
                  </div>
              </div>
              </div>
              
              <div className="col-lg-12   col-sm-12 col-xs-9 col-md-12 mt20 ">  
                {
                  this.state.submit 
                  ?
                    <div className="col-lg-2 col-sm-2 col-xs-2 col-md-2 pull-right  mr20 ">
                      <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>&nbsp; &nbsp;Submit&nbsp; &nbsp;</button>
                    </div>
                  :
                    <div className="col-lg-2 col-sm-2 col-xs-2 col-md-2 pull-right mr20">
                      <button className="btn btn-primary" onClick={this.update.bind(this)}>&nbsp; &nbsp;Update&nbsp; &nbsp;</button>
                    </div>
                }
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setTopMargin">
                <h3 className="heading"><b>Uploaded Training List</b></h3>
                <hr/>
              </div>      
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="table-responsive">
                  <table className="table table-bordered tableCustom table-striped reserachtable">
                    <thead>
                      <tr>
                        <th className="text-center">Sr No</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Tag </th>
                        <th className="text-center">Youtube Video </th>
                        <th className="text-center">File </th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.videoData && this.state.videoData.length > 0
                        ?
                          this.state.videoData.map((data, index)=>{
                            return(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td className="td_title">{data.title}</td>
                                <td>{data.tag}</td>
                                <td>
                                  {data.url !== ""
                                    ?
                                      <a data-url={data.url}  onClick={this.openNewTab.bind(this)} ><ReactPlayer url={data.url}  width='100px' height='70px'  target="_blank" controls loop  /></a>
                                    :
                                      <div><h5>File not Found</h5></div>
                                  }
                                </td>
                                <td className="td_pdf">
                                  {data.fileUpload 
                                    ?
                                    (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "pdf" || (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "PDF" 
                                      ?
                                        <a  title="Click to View"  target="_blank" href={data.fileUpload}> 
                                          <img src="/images/pdf.png" className="pl50" height="50" width="50"/><br/>
                                        </a>
                                      :
                                        <a  title="Click to View"  target="_blank" href={data.fileUpload}> 
                                          <img src="/images/ppt.png" className="pl50" height="50" width="50"/><br/>
                                        </a>
                                    : <div><h5>File not Found</h5></div>
                                  }
                                </td>
                                <td className="text-center td_action">  
                                  <a className="pt30" href={"/tools/"+ data._id}><i id={data._id} className="fa fa-edit fontSize " title="Click to Edit"> </i> </a> &nbsp;&nbsp;
                                  <a><i id={"d-"+data._id} className="fa fa-trash fontSize" title="Click to Delete" onClick={this.deletetools.bind(this)}> </i></a>&nbsp;&nbsp;&nbsp;</td>
                              </tr>
                            )
                          })
                        :
                        <tr> 
                          <td colSpan="13"> Sorry... No Data available! </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>           
        );
    }
}