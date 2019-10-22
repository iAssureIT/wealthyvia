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
          <h4 className="h5lettersp MasterBudgetTitle">Subscribed Users for Offerings</h4>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
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
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray planContainer mt40 NOpadding">
                    <ul className="nav nav-pills customStack textAlignCenter">
                      <li className="active col-lg-3"><a data-toggle="pill" href="#home">Active User</a></li>
                       <li className=" col-lg-3"><a data-toggle="pill" href="#menu1">Inactive User</a></li>
                      
                    </ul>

                      <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div id="home" className="tab-pane fade in active">
                          <div className="col-lg-12 NOpadding">
                              <table className="table tableCustom table-striped">
                                <thead className="bgThead">
                                  <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th className="text-center">Mobile</th>
                                    <th className="text-center">Mail </th>
                                    <th className="text-center">Start Date</th>
                                    <th className="text-center">End Date</th>
                                    <th className="text-center">Action</th>
                                 </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1.</td>
                                    <td>Priyanka Lewade</td>
                                    <td className="text-center">8208066599</td>
                                    <td className="text-center">priyankalewade96@gmail.com</td>
                                    <td className="text-center">11-10-2019</td>
                                    <td className="text-center">11-02-2019</td>
                                    <td className="text-center"><a href="/uploadStatement" data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a><a href="/uploadStatement" data-toggle="tooltip" title="Upload Performance Statements">&nbsp;&nbsp;&nbsp;<img src="/images/file.png"/></a></td>
                                  </tr>
                                   <tr>
                                    <td>2.</td>
                                    <td>Ashish Chavan</td>
                                    <td className="text-center">9156507131</td>
                                    <td className="text-center">ashish.chavan@iassureit.com</td>
                                    <td className="text-center">21-9-2019</td>
                                    <td className="text-center">21-11-2019</td>
                                    <td className="text-center"><a href="/uploadStatement" data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a><a href="/uploadStatement" data-toggle="tooltip" title="Upload Performance Statements">&nbsp;&nbsp;&nbsp;<img src="/images/file.png"/></a></td>
                                  </tr> 
                                   <tr>
                                    <td>3.</td>
                                    <td>Priyanka Lewade</td>
                                    <td className="text-center">8208066599</td>
                                    <td className="text-center">priyankalewade96@gmail.com</td>
                                    <td className="text-center">11-10-2019</td>
                                    <td className="text-center">11-02-2019</td>
                                    <td className="text-center"><a href="/uploadStatement" data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a><a href="/uploadStatement" data-toggle="tooltip" title="Upload Performance Statements">&nbsp;&nbsp;&nbsp;<img src="/images/file.png"/></a></td>
                                  </tr>                                                  
                                 
                                </tbody>
                              </table>
                          </div>    
                        </div>
                          <div id="menu1" className="tab-pane fade">
                          <div className="col-lg-12 NOpadding">
                              <table className="table tableCustom table-striped">
                                <thead className="bgThead">
                                  <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th className="text-center">Mobile</th>
                                    <th className="text-center">Mail </th>
                                    <th className="text-center">Start Date</th>
                                    <th className="text-center">End Date</th>
                                    <th className="text-center">Action</th>
                                 </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1.</td>
                                    <td>Priyanka Lewade</td>
                                    <td className="text-center">8208066599</td>
                                    <td className="text-center">priyankalewade96@gmail.com</td>
                                    <td className="text-center">11-10-2019</td>
                                    <td className="text-center">11-02-2019</td>
                                    <td className="text-center"><a href="/uploadStatement" data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a><a href="/uploadStatement" data-toggle="tooltip" title="Upload Performance Statements">&nbsp;&nbsp;&nbsp;<img src="/images/file.png"/></a></td>
                                  </tr>
                                   <tr>
                                    <td>2.</td>
                                    <td>Ashish Chavan</td>
                                    <td className="text-center">9156507131</td>
                                    <td className="text-center">ashish.chavan@iassureit.com</td>
                                    <td className="text-center">21-9-2019</td>
                                    <td className="text-center">21-11-2019</td>
                                    <td className="text-center"><a href="/uploadStatement" data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a><a href="/uploadStatement" data-toggle="tooltip" title="Upload Performance Statements">&nbsp;&nbsp;&nbsp;<img src="/images/file.png"/></a></td>
                                  </tr> 
                                   <tr>
                                    <td>3.</td>
                                    <td>Priyanka Lewade</td>
                                    <td className="text-center">8208066599</td>
                                    <td className="text-center">priyankalewade96@gmail.com</td>
                                    <td className="text-center">11-10-2019</td>
                                    <td className="text-center">11-02-2019</td>
                                    <td className="text-center"><a href="/uploadStatement" data-toggle="tooltip" title="Upload Statements"><i className="fa fa-upload"></i></a><a href="/uploadStatement" data-toggle="tooltip" title="Upload Performance Statements">&nbsp;&nbsp;&nbsp;<img src="/images/file.png"/></a></td>
                                  </tr>                                                  
                                 
                                </tbody>
                              </table>
                          </div>     
                          </div>
                        
                        </div>  
                    </div>
             
            </form>
          </div>
        </div>
      </div>

      );
  }

}

export default Amenities;