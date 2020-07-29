import React, { Component }       from 'react';
import { render }                 from 'react-dom';
import SimpleReactValidator       from 'simple-react-validator';
import axios                      from 'axios';
import swal                       from 'sweetalert';
import Swal                       from 'sweetalert2';
import $                          from "jquery";
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';
import './FreeResearchReport.css';

var wmSub_id = "";
var location ="";
var performanceDoc={};
class FreeReseachReport extends Component{

  constructor(props) {
    super(props);
    this.state = {
    	title 					: "",
    	description 			: "",
		fileArray              : [],
		showFile               : '',
    selectedfiles          : '',
		filenames              : [],
		fileType               : "File",   
		researchreportlist     : [],
		action                 : 'insert',
		reportid               : '',
    uploadReport           : '',
    userID                 : '' 

    };
    this.baseState = this.state;
  }

  componentDidMount() {

    var userid = localStorage.getItem('admin_id');
    //console.log("adminid", userid);
    this.setState({
      userID : userid
    })

    /*axios
      .get('/api/projectsettings/get/S3')
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
      })*/

  	var reportid = this.props.match.params.reportid;
  	//console.log("reportid", reportid);
		//console.log("reportid = ",reportid);
		if(reportid){
			this.setState({reportid : reportid, action:"update"});
			this.getOneResearchReport(reportid);
		}
  	this.getresearchreport();

  }

  getOneResearchReport(reportid){

		axios.get("/api/researchreport/get/"+reportid)
			.then(response => {
				if(response.data){
          var researchreportobj = '';
          if(response.data.researchreport){
            researchreportobj = response.data.researchreport[0];
          }
          
					console.log("response.data = ",response.data);
					this.setState({title :response.data.title,
									description: response.data.description, selectedfiles: researchreportobj});
				}
			})
			.catch(error=>{
				console.log("Error while getting Car Category Details", error);
				swal('Oops...', 'Something went wrong!', 'error')
			});		

	}

  getresearchreport(){
  	axios.get('/api/researchreport/get/all/list/1')
      .then( (researchreports)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
              researchreportlist : researchreports.data,
            })
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
          }
      });  
    
  }

  handleChange(event){
    event.preventDefault();
    var name       = event.target.name;
    var value      = event.target.value;
    //console.log(name, value);
    this.setState({ [name] : value })
    
  }
  uploadResearchReport(event){
    var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files) {
      var file = event.currentTarget.files[0];
      //var newFile = new File([file],newFileName);
      if (file) {

        var ext = file.name.split('.').pop();
        if(ext=="pdf" || ext=="PDF" || ext == "odp"){ 
          if (file) {

            if(file.size > 207200){
            swal("", "File size must be less than 2MB", "warning");
          }
          else{

            /*S3FileUpload
                .uploadFile(file,this.state.config)
                .then((Data)=>{
                  console.log("data uplod file", Data);
                  this.setState({
                    uploadReport : Data.location,
                  },()=>{                
                    console.log("uploadReport",this.state.uploadReport)})
                console.log("uploadReport--->",Data.location)
/*                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })*/

            //var showFile = this.state.showFile;
            //showFile.push(event.target.files[0]);

            this.setState({
              showFile      : event.target.files[0],
              selectedfiles : event.target.files[0]
            },()=>{
              console.log("this.state.showFile",this.state.showFile);
            })
          }
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
       console.log("selected file",this.state.showFile,this.state.showFile.name)
        data.append( 'file', this.state.showFile,this.state.showFile.name );
       //console.log("file data", data);

    }
    
  	if(this.state.action == 'update'){

     //console.log("selectedfiles", this.state.selectedfiles);
     //console.log("data", data);
  		axios.post('/api/fileUpload',data)
    .then( (uploadedReports)=>{  
      console.log("jci");
        if(uploadedReports.status === 200){
            swal("Congrats..!","Document uploaded successfully", "success");
            var formvalues = {};
            console.log("selectedfiles", this.state.selectedfiles,"showFile", this.state.showFile);

            if(!this.state.selectedfiles){
               formvalues ={
                title          : this.state.title,
                description    : this.state.description,
                researchreport : null,
                newuploaded    : true,
                updatedBy      : this.state.userID
              } 
            }
            else if(!uploadedReports.data.keyList){
               formvalues ={
                title          : this.state.title,
                description    : this.state.description,
                newuploaded    : false,
                researchreport : '',
                updatedBy      : this.state.userID
              } 
            }            
            else{
                  var formvalues ={
                    title          : this.state.title,
                    description    : this.state.description,
                    researchreport : uploadedReports.data.keyList,
                    updatedBy      : this.state.userID,
                    newuploaded    : true,
               }
            }
           
            
             
            
            console.log("researchreport",formvalues);
            axios.patch('/api/researchreport/patch/'+this.state.reportid, formvalues)
            .then( (uploadedReports)=>{      
                  this.setState({
                        uploadedReportsDatabase : uploadedReports.data,
                      })
                  	console.log("uploadedReportsDatabase",uploadedReports.data);
                    swal("Congrats..!","Research document updated successfully", "success");
                    this.getresearchreport();
                    this.setState( this.baseState );
                    this.props.history.push("/free-research-reports");
                  
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
  	else{


    
    axios.post('/api/fileUpload',data)
    .then( (uploadedReports)=>{  
      console.log("jci");
        if(uploadedReports.status === 200){
            swal("Congrats..!","Document uploaded successfully", "success");
           console.log("data", uploadedReports.data );
           var formvalues ={
           		  title          : this.state.title,
           		  description    : this.state.description,
                researchreport : uploadedReports.data.keyList,
                createdBy      : this.state.userID
           } 
            
            console.log("researchreport",formvalues);
            axios.post('/api/researchreport/post', formvalues)
                .then( (uploadedReports)=>{      
                  this.setState({
                        uploadedReportsDatabase : uploadedReports.data,
                      })
                  	console.log("uploadedReportsDatabase",uploadedReports.data);
                    swal("Congrats..!","Research document uploaded successfully", "success");
                    this.getresearchreport();
                    this.setState( this.baseState );
                  
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
  }
  
  deleteDocument(e)
  {
    var fileToDelete = e.target.getAttribute("data-name");
    var index        = e.target.getAttribute('id');
    var filePath     = e.target.getAttribute('data-id');
  
    //if(index){
      swal({
            title: "Are you sure you want to delete this document?",
            text: "Once deleted, you will not be able to recover this document!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             
                //var array = this.state.showFile; // make a separate copy of the array
               // array.splice(index, 1);
                swal("File deleted successfully");
                this.setState({
                  selectedfiles: '',
                  showFile : ''
                });
                //console.log("selectedfiles",this.state.selectedfiles)
             
            }else {
              swal("Your document is safe!");
            }
          });
    //}
  }

  getData(event)
  {
      var Filekey  =  event.currentTarget.getAttribute("data-key");
      console.log("Filekey",event.currentTarget.getAttribute("data-key"))
        axios.get('/api/fileUpload/image/'+Filekey) 
      .then( (UploadedImg)=>{      
        this.setState({
              UploadedImg : UploadedImg.data,
            })
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });  
  }

  deleteResearchRecord(event){
  		var id = event.currentTarget.id;
		
		swal({
			title: 'Are you sure you want to Delete this Record?',
			text: 'You will not be able to recover this record after delete!',
			icon: "warning",
	        buttons: true,
	        dangerMode: true,
		}).then((result) => {
		  if (result) {

			axios.delete("/api/researchreport/delete/"+id)
				.then(response =>{
					console.log("response = ", response.data);
					swal('Deleted!', 'Research record Deleted Successfully!', 'success');
					this.getresearchreport();
				})
				.catch(error=>{
					console.log("Error while deleting Research Report", error);
					swal('Oops...', 'Something went wrong!', 'error')
				});

		  } else {
		    swal(
		      'Ok Fine!',
		      'Your record is safe :)',
		      'info'
		    )
		  }
		})
  }

  
  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Upload Free Research Report</h4>
         </div>
          <hr className="compySettingHr"/>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
             <form id="researchreportForm"  >
               
                
                <div className="tab-content customTabContent col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                      
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  ">
	                    <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                    <label>Title</label>
		                    <div className="">
		                      <input className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12" id="title" type="text" name="title"  ref="title" value={this.state.title}	onChange={this.handleChange.bind(this)}  required/>
		                      <div className="errorMsg"></div>

		                    </div>
	                  	</div>

	                  	<div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{height:"auto"}}>
		                    <label >Description</label>
		                    <div className="">
		                      <textarea className="form-control nameSpaceUpper form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" name="description"  ref="description" value={this.state.description} onChange={this.handleChange.bind(this)}  placeholder="" rows="5" id="dexcription"></textarea>
		                      <div className="errorMsg"></div>
		                    </div>
		                </div>

                      <div className="formcontent col-lg-12 col-md-5 col-sm-12 col-xs-12 padTop">
                          <div className="clr_k ">
                            <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                              <img src="/images/Upload-Icon.png"/>
                            </div>
                            <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                             <b className="text_k11"></b>
                             <span className="under_ln">Upload Document</span>
                            </div>      
                            <input type="file" className="noPadding click_input" title="Please choose file" id="designImg" name="bannerImg" ref="bannerImg" onChange={this.uploadResearchReport.bind(this)} />
                          </div> 
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls mt40">
                     
                     
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div>
                            
                              <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row padTopC">
                                
                                {
                                  this.state.selectedfiles  ?
                                  
                                      <div  className="pdfContainer col-lg-2" >

                                        <img src="/images/pdf.png"/>
                                        <i  className="fa fa-times-circle customCircle pull-right" title="Remove Document" data-name={this.state.selectedfiles.name} onClick={this.deleteDocument.bind(this)}></i>
                                        <p className="">{this.state.selectedfiles.name}</p>

                                      </div>
                                   
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
                  
                </div> 

            </form>

            { this.state.researchreportlist.length > 0 ?
	            <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
	                <div id="home" className="tab-pane fade in active">
	                  <div className="col-lg-12 NOpadding">
	                      <table className="table tableCustom table-striped">
	                        <thead className="bgThead">
	                          <tr>
	                            <th>Title</th>
	                            <th className="text-center">Description</th>
	                            <th className="text-center">Research report </th>
	                            <th className="text-center">Action</th>
	                         </tr>
	                        </thead>
	                        <tbody>
	                        {
	                         this.state.researchreportlist
	                         ? 
	                          this.state.researchreportlist.map((report, j)=>{
	                          return(
	                            <tr key={j}>
									<td>{report.title}</td>
									<td className="td_description">{report.description? report.description : "-" }</td>
									<td className="text-center">
                          {
                            report.researchreport ? 
                            report.researchreport.map((reportpdf, j)=>{
                            return(
                              <a key= {j} href={axios.defaults.baseURL+"/api/fileUpload/image/"+reportpdf.key} download target="_blank" data-key={reportpdf.key?reportpdf.key:""} onClick={this.getData.bind(this)}>
                                                    <div >
                                                      <i className="fa fa-download"></i><br/>
                                                      {reportpdf.name} 
                                                    </div>
                                                    </a>
                             )})  
                            :
                            null
                          }
                            </td>
									<td className="text-center">
										&nbsp;&nbsp;
										<a href={"/free-research-reports/"+report._id}> <i className="fa fa-edit"> </i> </a>
														&nbsp;&nbsp;
										<i className="fa fa-trash" id={report._id} onClick={this.deleteResearchRecord.bind(this)}></i>
										
									</td>
	                            </tr>
	                            )
	                          })
	                          :
	                          null

	                        } 
	                        </tbody>
	                      </table>
	                  </div>    
	                </div>
	            </div>  
            :
            	null
        	}

          </div>
        </div>
      </div>

      );
  }

}

export default FreeReseachReport;