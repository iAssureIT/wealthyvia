import React, { Component }       from 'react';
import { render }                 from 'react-dom';
import SimpleReactValidator       from 'simple-react-validator';
import Axios                      from 'axios';
import swal                       from 'sweetalert';
import Swal                       from 'sweetalert2';
import $                          from "jquery";
import S3FileUpload               from 'react-s3';
import { deleteFile }             from 'react-s3';
import CKEditor from 'ckeditor4-react';
// import './FreeResearchReport.css';

var wmSub_id = "";
var location ="";
var performanceDoc={};
class Clientmapping extends Component{

  constructor(props) {
    super(props);
    this.state = {
    	clientName      : '',
      clientEmail     : '',
      clientId        : '',
      errors          : {},   
      config          : "",
      DistributorData : [],
      distributorCode : ''
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    var ID = this.props.match.params.ID;
      console.log("response from api=>", ID);
      Axios.get("api/users/get/"+ID)
       .then((response)=>{
         if(response.data){
          this.setState({
             clientName : response.data.fullName,
             clientEmail : response.data.email,
             clientId    : ID
           });
        console.log("response.data.clientdata = ",response.data);
        }
       })
       .catch((error)=>{
        console.log("Error during get Data = ", error);
        Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
       }); 

  	this.getDistributorList();

  }

  getDistributorList(){
    Axios.get("api/distributormaster/get/list")
       .then((response)=>{
         if(response.data){
          if(response.data.length > 0){
            var DistributorData =  response.data.filter(function(disdata) {
              return disdata.status == "Active";
            })
            this.setState({
              DistributorData : DistributorData,
            });
          }
          
        console.log("response.data.DistributorData = ",response.data);
        }
       })
       .catch((error)=>{
        console.log("Error during get Data = ", error);
        Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
       });    
  }


  
  handleChange(event){
    event.preventDefault();
    var name       = event.target.name;
    var disvalue      = event.target.value;
    if(disvalue.includes(")")){
      //console.log("disvalue", disvalue);
      var dis1 = disvalue.split("(");
      var dis2 = dis1[1].split(")");
      var distributorCode = dis2[0];
      //console.log(name, distributorCode);
      this.setState({ distributorCode : distributorCode })
    }    
    
  }

  Submit(event){
    event.preventDefault();
    if(this.state.distributorCode){
      var formvalues = {
        ID: this.state.clientId,
        distributorCode : this.state.distributorCode
      }
      console.log("formvalues", formvalues);
      Axios.patch("api/users/patch/mapping/distributorcode", formvalues)
       .then((response)=>{
         if(response.data){
         Swal.fire("Mapping successfull");
         this.props.history.push("/clientlist");
        }
        else{
          Swal.fire("Oops...","Something went wrong! <br/>");
        }
       })
       .catch((error)=>{
        console.log("Error during get Data = ", error);
        Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
       });  
    }
    else{
      Swal.fire("Please select distributor in specified format");
    }
    
  }

 
  
  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Map Client distributor</h4>
         </div>
          <hr className="compySettingHr"/>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
           { this.state.DistributorData && this.state.DistributorData.length > 0 && this.state.clientName ?
             <form id="researchreportForm"  >
               
                
                <div className="tab-content customTabContent col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                      
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  ">
	                    <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                    <label>Client</label><span className="astrick">*</span>
		                    <div className="">
		                      <input className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12" id="title" type="text" name="title"  ref="title" value={this.state.clientName}	disabled/>
		                      <div className="errorMsg"></div>

		                    </div>
	                  	</div>
                      <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Select Distributor</label><span className="astrick">*</span>
                        <div className="">
                          <input list="distributors" name="distributor" id="distributor" className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12"  onChange={this.handleChange.bind(this)}/>
                            <datalist id="distributors">
                            {
                              this.state.DistributorData.map((data, k) =>{
                                return (
                                   <option value={data.firstname+" "+data.lastname+": ("+data.distributorCode+")"} id={data.distributorCode} key={k} />
                                  )
                              })
                            }
                                                          
                            </datalist>
                          <div className="errorMsg"></div>

                        </div>
                      </div>
  	                  <div className="formcontent  col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div onClick={this.Submit.bind(this)} className="submitOffering pull-right" >Submit</div>
                      </div> 
                    </div>                    
                     
                  </div>
                  
                </div> 
           

            </form>

            :
            <div>Active distributor not found</div>

            }

          </div>
        </div>
      </div>

      );
  }

}

export default Clientmapping;