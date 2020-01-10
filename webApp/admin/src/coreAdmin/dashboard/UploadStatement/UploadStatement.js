import React, { Component }       from 'react';
import { render }                 from 'react-dom';
import SimpleReactValidator       from 'simple-react-validator';
import axios                      from 'axios';
import swal                       from 'sweetalert';
import $                          from "jquery";
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';
import './UploadStatement.css';

var wmSub_id = "";
var location ="";
var performanceDoc={};
class UploadStatement extends Component{

  constructor(props) {
    super(props);
    this.state = {
      uploadStatement        : "",
      userDetailsDisplay     : "",
      uploadPerformanceName  : "",
      uploadPerformance      : "",
      imgArrayWSaws          : [],
      offeringTitle          : [],
      fileArray              : [],
      selectedFiles          : [],
      selectedFilesData      : [],
      showFile               : [],
      filenames              : [],
      fileArrayPerformance   : [],
      fileArrayPerformanceData   : [],
      fileType               : "File",
      chosenOffering         : "",
      chosenTargetID         : "",
      chosenOfferingID       : "",

    };
  }
  componentDidMount() {
    var user_IDOff_id = this.props.match.params.user_ID;
    wmSub_id = user_IDOff_id;
    console.log("wmSub_id",wmSub_id)
  
     axios.get('/api/wmsubscriptions/get/detaillistoffersub/'+wmSub_id)
    .then( (res)=>{
      this.setState({
          userDetailsDisplay : res.data[0],
          offeringTitle : res.data[0].offerings,
        },()=>{

          /*for performance*/
          console.log("this.state.userDetailsDisplay.performanceDoc",this.state.userDetailsDisplay.performanceDoc);
          if(this.state.userDetailsDisplay.performanceDoc)
            {
             if(this.state.userDetailsDisplay.performanceDoc.length >0)
              {
                this.setState({
                  fileArrayPerformanceData : this.state.userDetailsDisplay.performanceDoc,
                })
              }
              console.log("fileArrayPerformanceData",this.state.fileArrayPerformanceData);
          
          }
        })
      })
      .catch((error)=>{
        if(error.message === "Request failed with status code 401")
          {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
      });
  }
  handleChange(event){
    event.preventDefault();
    const target      = event.target.value;
    var target_id     = $(event.currentTarget).find('option:selected').attr('id');
    var offering_id   = $(event.currentTarget).find('option:selected').attr('offering_id');
    this.setState({
      chosenOffering   : target,
      chosenTargetID   : target_id,
      chosenOfferingID : offering_id,
    },()=>{
      if(this.state.userDetailsDisplay.offerings){
      
        console.log(this.state.userDetailsDisplay.offerings);
        var x = this.state.userDetailsDisplay.offerings.filter((a)=> {
          console.log(this.state.chosenOfferingID+'==='+ a.offering_ID);
          return this.state.chosenOfferingID === a.offering_ID
        });
          if(x[0].statements.length>0)
          {
            this.setState({
              selectedFiles : x[0].statements,
            });
         }
         else{
          this.setState({
              selectedFiles : "",
            });
         }
      }
    })
  }
  uploadStatement(event){
    var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files) {
      var file = event.currentTarget.files[0];
      //var newFile = new File([file],newFileName);
      if (file) {
        var ext = file.name.split('.').pop();
        if(ext=="pdf" || ext=="PDF" || ext == "odp"){ 
          if (file) {
            var showFile = this.state.showFile;
            showFile.push(event.target.files[0]);

            this.setState({
              showFile      : showFile,
            },()=>{
              console.log("this.state.selectedFiles",this.state.selectedFiles, this.state.selectedFilesData);
              console.log("this.state.showFile",this.state.showFile);
            })
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload file format (pdf)","warning");  
        }
      }
    }
  }
  uploadPerformance(event){
    var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      if (file) {
        var ext = file.name.split('.').pop();
        if(ext=="pdf" || ext=="PDF" || ext == "odp"){ 
          if (file) {
              var fileArrayPerformance = this.state.fileArrayPerformance;
              fileArrayPerformance.push(event.currentTarget.files[0]);

              this.setState({
                fileArrayPerformance : fileArrayPerformance
              }); 
              console.log("fileArrayPerformance",fileArrayPerformance);
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload file format (pdf)","warning");  
        }
      }
    }
  }

  Submit(event)
  {
    const data = new FormData();
    if (this.state.showFile) {
       for ( let i = 0; i < this.state.showFile.length; i++ ) {
        console.log("this.state.selectedFiles[i],this.state.selectedFiles[ i ].name",this.state.showFile[i],this.state.showFile[ i ].name)
        data.append( 'file', this.state.showFile[i],this.state.showFile[ i ].name );
       }
    }
    axios.post('/api/fileUpload/',data)
    .then( (uploadedStatements)=>{  
         if(uploadedStatements.status === 200){
            swal("Congrats..!","Document uploaded successfully", "success");
           var statementsConcat = this.state.selectedFiles;
           console.log("statementsConcat",statementsConcat,this.state.selectedFiles);
           var statements = {};
           if(uploadedStatements.data.keyList != undefined){
              if(this.state.selectedFiles)
              {
               statementsConcat = statementsConcat.concat(uploadedStatements.data.keyList);
               statements ={
                  statements : statementsConcat,
                } 
              console.log("statements if",statements);

              }else{
                statements ={
                  statements : uploadedStatements.data.keyList,
                } 
              }

            }else{
              statements ={
                statements : this.state.selectedFiles,
              }
              
            console.log("statements else",statements);
            }
            console.log("statementsConcat",statements);
            axios.patch('/api/offeringsubscriptions/patch/update_statements/'+this.state.chosenTargetID,statements)
                .then( (uploadedStatements)=>{      
                  this.setState({
                        uploadedStatementsDatabase : uploadedStatements.data,
                      })
                  console.log("uploadedStatementsDatabase",uploadedStatements.data);
                  if(uploadedStatements.data === "Statement uploaded"){
                    swal("Congrats..!","Document uploaded successfully", "success");
                  }else{
                    swal("Error..!","Something went wrong", "error");
                  }
                })
                .catch((error)=>{
                  console.log(error);
                    if(error.message === "Request failed with status code 404"){
                      swal("Error!","Please select offering !!", "error");
                    }else{
                      swal("Error!","Something went wrong !!", "error");
                    }
                });  
          
          }else{
            swal("Error..!","Something went wrong", "error");
          } 

        })
      .catch((error)=>{
        console.log(error);
          if(error.message === "Request failed with status code 404"){
            swal("Error!","Please select offering !!", "error");
          }else{
            swal("Error!","Something went wrong !!", "error");
          }
      });  
  }
  SubmitPerformance(event)
  {

    const data = new FormData();

    if (this.state.fileArrayPerformance) {
      for ( let i = 0; i < this.state.fileArrayPerformance.length; i++ ) {
            console.log("this.state.selectedFiles[i],this.state.selectedFiles[ i ].name",this.state.fileArrayPerformance[i],this.state.fileArrayPerformance[ i ].name)
            data.append( 'file', this.state.fileArrayPerformance[i],this.state.fileArrayPerformance[ i ].name );
          }
    }
      axios.post('/api/fileUpload/',data)
        .then( (uploadedStatements)=>{  
          console.log("uploadedStatements",uploadedStatements);    
           var performanceConcat = this.state.fileArrayPerformanceData;
           var performanceDoc = {};

          if(uploadedStatements.status === 200){
            swal("Congrats..!","Document uploaded successfully", "success");
            if(uploadedStatements.data.keyList != undefined)
            {
              performanceConcat = performanceConcat.concat(uploadedStatements.data.keyList);
              performanceDoc ={
                performanceDoc : performanceConcat,
              } 
            }else{
              performanceDoc ={
                performanceDoc : this.state.fileArrayPerformanceData,
              } 
            }
            console.log("performanceDoc",performanceDoc);   
            axios.patch('/api/wmsubscriptions/patch/'+wmSub_id,performanceDoc)
              .then( (uploadedStatements)=>{      
                this.setState({
                      uploadedStatementsDatabase : uploadedStatements.data,
                    })
                    console.log("uploadedStatementsDatabase",uploadedStatements.data);
                    swal("Congrats..!","Document uploaded successfully", "success");
                })
                .catch((error)=>{
                    console.log(error);
                    if(error.message === "Request failed with status code 401"){
                      swal("Error!","Something went wrong!!", "error");
                    }
                });  
          }else{
            swal("Error..!","Something went wrong", "error");
          } 
        })
        .catch((error)=>{
          if(error.message === "Request failed with status code 404"){
            swal("Error!","Please select offering !!", "error");
          }else{
            swal("Error!","Something went wrong !!", "error");
          }
      });  
  
  }
  deleteDocument(e)
  {
    var fileToDelete = e.target.getAttribute("data-name");
    var index        = e.target.getAttribute('id');
    var filePath     = e.target.getAttribute('data-id');
  
    if(index){
      swal({
            title: "Are you sure you want to delete this document?",
            text: "Once deleted, you will not be able to recover this document!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             
                var array = this.state.selectedFiles; // make a separate copy of the array
                array.splice(index, 1);
                swal("File deleted successfully");
                this.setState({
                  selectedFiles: array
                });
                console.log("selectedFiles",this.state.selectedFiles)
             
            }else {
              swal("Your document is safe!");
            }
          });
    }
  }

  deletePerformanceDocument(e)
  {
    var fileToDelete = e.target.getAttribute("data-name");
    var index        = e.target.getAttribute('id');
    var filePath     = e.target.getAttribute('data-id');

    if(index){
      swal({
            title: "Are you sure you want to delete this document?",
            text: "Once deleted, you will not be able to recover this document!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              var array = this.state.fileArrayPerformanceData; // make a separate copy of the array
              array.splice(index, 1);
              swal("File deleted successfully");
              this.setState({
                fileArrayPerformanceData: array,
              });
            }else {
              swal("Your document is safe!");
            }
          });
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Upload User Documents </h4>
         </div>
          <hr className="compySettingHr"/>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
             <form id="CompanySMSGatewayForm"  >
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 userInfoContainer ">
                  <label className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">Name<br/>
                   <span className="noBold">{this.state.userDetailsDisplay.name}</span></label>
                  <label  className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">Email<br/>
                  <span className="noBold"> {this.state.userDetailsDisplay.emailId}</span></label>
                  <label  className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">Mobile No.<br/>
                  <span className="noBold"> {this.state.userDetailsDisplay.mobileNumber}</span></label>
                 <label  className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">Start Date<br/>
                  <span className="noBold">{this.state.userDetailsDisplay.startDate}</span></label>
                  <label  className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">End Date<br/>
                  <span className="noBold">{this.state.userDetailsDisplay.endDate}</span></label>
               </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40 ">
                  <ul className="nav nav-pills customStack textAlignCenter">
                    <li className="active col-lg-3"><a data-toggle="pill" href="#home">Statement</a></li>
                    <li className=" col-lg-3"><a data-toggle="pill" href="#menu1">Performance</a></li>
                  </ul>
                </div>
                <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                        <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                          <div className="">
                            <label className="control-label statelabel locationlabel" >Select Offering for Statements</label>
                            <select  ref="planName"
                               type="text" name="planName" placeholder="Enter Subscription Name" 
                               className="selectbox" title="Please enter package Name"
                               onChange={this.handleChange.bind(this)}>
                                <option hidden >--Select--</option>

                               {
                                  this.state.offeringTitle.map((a, i)=>{
                                    return(
                                      <option id={a._id} offering_id={a.offering_ID}>{a.offeringTitle}</option>
                                    )
                                  })
                                }  
                            </select>
                          </div>                     
                        </div> 
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  ">
                      <div className="col-lg-12 col-md-5 col-sm-12 col-xs-12 padTopC">
                          <div className="clr_k ">
                            <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                              <img src="/images/Upload-Icon.png"/>
                            </div>
                            <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                             <b className="text_k11"></b>
                             <span className="under_ln">Upload Document</span>
                            </div>      
                            <input type="file" className="noPadding click_input" title="Please choose file" id="designImg" name="bannerImg" ref="bannerImg" onChange={this.uploadStatement.bind(this)} />
                          </div> 
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls mt40">
                     
                     
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div>
                            
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row padTopC">
                                {
                                  this.state.showFile.length >0 || this.state.selectedFiles.length>0?
                                  <p className="fileName">File Uploaded</p>
                                  :
                                  null

                                }
                                {
                                  this.state.showFile  && this.state.showFile.length > 0 ?
                                  this.state.showFile.map((a, index)=>{
                                    return(
                                      <div  key={index} className="pdfContainer col-lg-2" >

                                        <img src="/images/pdf.png"/>
                                        <i id={index} className="fa fa-times-circle customCircle pull-right" title="Remove Document" data-name={a.name} onClick={this.deleteDocument.bind(this)}></i>
                                        <p className="">{a.name}</p>

                                      </div>
                                    )
                                  })
                                :
                                  null
                                }
                                  {
                                  this.state.selectedFiles  && this.state.selectedFiles.length > 0 ?
                                  this.state.selectedFiles.map((a, index)=>{
                                    return(
                                      <div  key={index} className="pdfContainer col-lg-2" >

                                        <img src="/images/pdf.png"/>
                                        <i id={index} className="fa fa-times-circle customCircle pull-right" title="Remove Document" data-name={a.name} onClick={this.deleteDocument.bind(this)}></i>
                                        <p className="">{a.name}</p>

                                      </div>
                                    )
                                  })
                                :
                                  null
                                }
                              </div>
                           
                          </div>
                     
                      </div>
                     
                    </div>
                     <div className="formcontent col-lg-offset-8 col-lg-4 col-md-3 col-sm-12 col-xs-12">
                      <div onClick={this.Submit.bind(this)} className="submitOffering pull-right" >Submit</div>
                    </div> 
                  </div>
                  <div id="menu1" className="tab-pane fade">
                      <div className="  col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="">
                          <label className="control-label statelabel locationlabel" >Upload Performance</label>
                         
                        </div>                     
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                        <div className="col-lg-6 col-md-5 col-sm-12 col-xs-12 padTopC">
                            <div className="clr_k ">
                              <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                                <img src="/images/Upload-Icon.png"/>
                              </div>
                              <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                               <b className="text_k11"></b>
                               <span className="under_ln">Upload Document</span>
                              </div>      
                              <input type="file" className="noPadding click_input" title="Please choose image" id="designImg" name="bannerImg" ref="bannerImg" onChange={this.uploadPerformance.bind(this)} />
                          </div> 
                        </div>
                    </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls mt40">
                      
                      
                      
                      
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div>
                            
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row padTopC">
                              {
                                  this.state.fileArrayPerformance.length >0 || this.state.fileArrayPerformanceData.length>0?
                                <p className="fileName">File Uploaded</p>
                                :
                                null

                                }                               
                                {
                                  this.state.fileArrayPerformance && this.state.fileArrayPerformance.length > 0 ?
                                  this.state.fileArrayPerformance.map((a, index)=>{
                                    return(
                                      <div  key={index} className="pdfContainer col-lg-2" >
                                        <img src="/images/pdf.png"/>
                                        <i id={index} className="fa fa-times-circle customCircle pull-right" title="Remove Document" data-name={a.name} onClick={this.deletePerformanceDocument.bind(this)}></i>
                                        <p className="">{a.name}</p>

                                      </div>
                                    )
                                  })
                                :
                                  null
                                }
                                 {
                                  this.state.fileArrayPerformanceData && this.state.fileArrayPerformanceData.length > 0 ?
                                  this.state.fileArrayPerformanceData.map((a, index)=>{
                                    return(
                                      <div  key={index} className="pdfContainer col-lg-2" >
                                        <img src="/images/pdf.png"/>
                                        <i id={index} className="fa fa-times-circle customCircle pull-right" title="Remove Document" data-name={a.name} onClick={this.deletePerformanceDocument.bind(this)}></i>
                                        <p className="">{a.name}</p>

                                      </div>
                                    )
                                  })
                                :
                                  null
                                }
                              </div>
                           
                          </div>
                     
                      </div>
                     
                    </div> 
                     <div className="formcontent col-lg-offset-8 col-lg-4 col-md-3 col-sm-12 col-xs-12">
                      <div onClick={this.SubmitPerformance.bind(this)} className="submitOffering pull-right" >Submit</div>
                    </div>  
                  </div>
                </div> 

            {/*    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 row ">
                  <div className="col-lg-12 col-md-5 col-sm-12 col-xs-12 padTopC">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                      <div className="clr_k ">
                        <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                          <img src="/images/Upload-Icon.png"/>
                        </div>
                        <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                         <b className="text_k11"></b>
                         <span className="under_ln">Upload Performance</span>
                        </div>      
                        <input  type="file" title="Click to attach file" name="userPic" ref="PerformanceDoc" className="form-control click_input"  onChange={this.uploadPerformance.bind(this)} id="upload-file2" />
                      </div> 
                    </div>
                  </div>
                </div>*/}          
                      {/*  <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                      <input id="input-b1" name="input-b1" type="file" className="file" data-show-preview="false" onChange={this.handleChange.bind(this)} required/>
                    </div>
                   <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <label htmlFor="designImg" className="designLabel col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Upload</label>
                        <input type="file" className="noPadding " title="Please choose image" id="designImg" name="bannerImg" ref="bannerImg" onChange={this.uploadStatement.bind(this)} />
                        <div className="errorMsg"></div>

                      </div>
                    </div>*/}
                   {/* <div className="col-lg-4 col-lg-offset-2 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        { this.state.filenames!=="" && this.state.filenames ? 
                          <div>
                            <label className="pull-right custFaTimes" title="Delete image"  >X</label>data-id={this.state.imgbPath}
                            <img src={this.state.filenames.fileName} width="150" height="100"/>
                          </div>
                          : <div> </div>
                        }
                        </div>
                      </div>
                    </div>*/}
          
               {/*<div className="formcontent col-lg-offset-8 col-lg-4 col-md-3 col-sm-12 col-xs-12">
                  <div onClick={this.Submit.bind(this)} className="submitOffering pull-right" >Submit</div>
                </div>
*/}
            </form>
          </div>
        </div>
      </div>

      );
  }

}

export default UploadStatement;