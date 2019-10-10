import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";
import './Amenities.css';

const formValid = formerrors=>{
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
const amenitiesNameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);

class Amenities extends Component{

  constructor(props) {
    super(props);
    this.state = {
      SubscriptionName             : "",
      Validity                     : "",
      Cost                         : "",
      maxCheckIns                  : "",
      formerrors                   :{amenitiesName  : "",},
      subscription                 : {},
      amenitiesIcon                : '',
      amenitiesName                : '',
      totalCount                   : '',
      id                           : '',
      editId                       : "",
      AmenitiesList                : [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getAmenitiesList = this.getAmenitiesList.bind(this);
  }

  componentDidMount() {
    this.getAmenitiesList();   
    this.setState({
      editId : this.props.match.params.id
    })
    // console.log("editId0",this.props.match.params.id);
  }

  submitAmenityInfo=(event)=>{
    event.preventDefault();  
    var amenitiesValue = {
        amenityName               : this.state.amenitiesName,
        icon                      : "flag",
      }    
      if(this.state.amenitiesName){
        if(!this.state.editId==''){
             axios.patch('/api/workAmenities/patch/update/'+this.state.id,amenitiesValue)
                .then( (response)=> {
                  swal("Good job!", "Amenities details updated!", "success");
                  this.getAmenitiesList();
                  this.props.history.push('/amenities');
                  this.setState({
                      amenitiesIcon       : '',
                      amenitiesName       : '',
                      editId              : null,
                  })
                })
                .catch(function (error) {
                  console.log(error);
                  swal("Oops...", "Amenities details updation failed!", "error");
                  if(error.message === "Request failed with status code 401")
                    {
                         swal("Your session is expired! Please login again.","", "error");
                         this.props.history.push("/");
                    }
                })
        }else{
          axios.post('/api/workAmenities/post',amenitiesValue)
            .then( (response)=> {
              if(response.data=="Record Exists"){
                swal("Sorry", "Record Exists", "warning");
              }else{
                swal("Good job!", "Amenities details submitted!", "success");
                this.getAmenitiesList();
                this.setState({
                      amenitiesIcon       : '',
                      amenitiesName       : '',
                  })
              }
            })
            .catch(function (error) {
              console.log(error);
              swal("Oops...", "Amenities details submition failed!", "error");
              if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
            })
        
          }
      }else{
        swal("", "Please fill mandatory fields", "warning");
      }
  }

  getAmenitiesList(){
    axios
      .get('/api/workAmenities/get/list')
      .then((response)=> {
          if(response.data){            
                var count = (response.data).length;
                this.setState({
                  AmenitiesList : response.data,
                  totalCount : count
              });
            }
      })
      .catch(function (error) {
          console.log(error);
          if(error.message === "Request failed with status code 401")
            {
                 swal("Your session is expired! Please login again.","", "error");
                 this.props.history.push("/");
            }
      });
  }

  handleChange=(event)=>{
    const target = event.target;
    const {name,value} = event.target;
    let formerrors = this.state.formerrors;
    this.setState({
      [name]: event.target.value,
    });

    // const datatype = event.target.getAttribute('data-text');
    // switch (datatype){
    //        case 'amenitiesName' :
    //                              formerrors.amenitiesName = amenitiesNameRegex.test(value)  && value.length>0 ? '' : "Please Enter Only Alphabates";
    //        break;
    //        default :
    //        break;
    // }

     // this.setState({formerrors,})

  }



  deleteItem=(event)=>{
    event.preventDefault();
    var id = event.target.getAttribute('data-id');
    if(id){
      swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this information!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                 axios
                      .delete('/api/workAmenities/delete/'+id)
                      .then((response)=> {
                        if(response.data=='Deleted Successfully'){
                          swal("Amenity deleted successfully");
                          this.getAmenitiesList();
                          // $('#myModal'+this.state.deleteId).css('display','none');                  
                        }
                      })
                      .catch(function (error) {
                          console.log(error);
                          if(error.message === "Request failed with status code 401")
                            {
                                 swal("Your session is expired! Please login again.","", "error");
                                 this.props.history.push("/");
                            }
                      });

            } else {
              swal("Your information is safe!");
            }
          });
    }
  }

  editItem=(event)=>{
    event.preventDefault();
    var id = event.target.getAttribute('data-id');
    this.setState({
      id : id,
      editId: id
    })
    this.props.history.push('/amenities/'+id);
     axios
        .get('/api/workAmenities/get/'+id)
        .then((response)=> {
          this.setState({
            'amenitiesName'     : response.data.amenityName,
            'amenitiesIcon'     : response.data.icon,
          })
           
        })
        .catch(function (error) {
            console.log(error);
            if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
        });
    $("html,body").scrollTop(0);
  }

  componentWillReceiveProps(nextProps) {

   
  }

  render(){
    const {formerrors} = this.state;
    // console.log("editId",this.state.editId);
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Amenities Details</h4>
         </div>
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noborder">
          <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Create Amenities</h5>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                      <label className="control-label statelabel locationlabel" >Amenity Name</label>
                      <span className="astrick">*</span>
                      <div className="input-group inputBox-main  new_inputbx " >
                        <div className="input-group-addon remove_brdr inputIcon">
                          <i className="fa fa-building"></i>
                        </div>
                        <input id="amenitiesName" placeholder="Amenities Name" onChange={this.handleChange}
                          type="text" name="amenitiesName" data-text="amenitiesName" ref="amenitiesName" value={this.state.amenitiesName}
                          className="form-control areaStaes newinputbox" title="Amenities Name" autoComplete="off"  />
                      </div>
                      {this.state.formerrors.amenitiesName &&
                        (<span className="text-danger errorMessage">{formerrors.amenitiesName}</span>)
                      }
                    </div>                     
                  </div> 
                  </div>
                 </div>          
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginBtmDiv">
                <button className="btn buttontAddEdit pull-right" id="btnCheck" onClick={this.submitAmenityInfo.bind(this)}>{this.state.editId==null?"Submit":"Update"}</button>
              </div>
              <div className="col-lg-12">
                <table className="table tableCustom table-striped">
                  <thead className="bgThead">
                    <tr>
                      <th>Sr.No.</th>
                      <th>Amenity Name</th>
                      <th className="text-center">Amenity Icon</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>Wi-Fi</td>
                      <td className="text-center"><i className="material-icons">wifi</i></td>
                      <td className="text-left"></td>
                    </tr>                     
                    <tr>
                      <td>2.</td>
                      <td>AC</td>
                      <td className="text-center"><i className="material-icons">toys</i>{/*<img src="https://img.icons8.com/material/20/000000/air-conditioner.png"/>*/}</td>
                      <td className="text-left"></td>
                    </tr>
                     <tr>
                      <td>3.</td>
                      <td>Restroom</td>
                      <td className="text-center"><i className="material-icons">wc</i></td>
                      <td className="text-left"></td>
                    </tr>
                     <tr>
                      <td>4.</td>
                      <td>Printer</td>
                      <td className="text-center"><i className="material-icons">print</i></td>
                      <td className="text-left"></td>
                    </tr>
                    <tr>
                      <td>5.</td>
                      <td>Power Plug</td>
                      <td className="text-center"><i className="material-icons">power</i></td>
                      <td className="text-left"></td>
                    </tr>
                      <tr>
                        <td colSpan="4" className="text-left"><b>Custom Amenities</b></td>                
                      </tr>
                  {this.state.AmenitiesList.length>5?
                      this.state.AmenitiesList.map((itemData,index)=>{
                          return (
                        index>4?        
                              <tr key={index}>
                                <td>{index+1}.</td>
                                <td>{itemData.amenityName}</td>
                                <td className="text-center"><i className="material-icons">flag</i></td>
                                <td className="text-left"><i className="fa fa-pencil cptr" title="Edit" data-id={itemData._id} onClick={this.editItem}></i>&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-trash cptr" title="Delete" data-id={itemData._id} onClick={this.deleteItem} data-toggle="modal" aria-labelledby="myModal" data-target={"myModal"+itemData._id} aria-hidden="true"></i></td>
                              </tr>
                        :
                          null
                            )
                        })
                      
                    :
                      <tr>
                        <td colSpan="4" className="text-center">Your custom amenities will appear here...</td>                
                      </tr>
                  }
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>

      );
  }

}

export default Amenities;