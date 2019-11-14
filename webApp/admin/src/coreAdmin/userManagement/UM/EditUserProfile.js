import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import axios 	 from 'axios';
import swal      from 'sweetalert';
import "./userManagement.css";
class EditUserProfile extends Component{
	constructor(props) {
	  	super(props);
	 	var UserId = this.props.match.params.id;
	  	this.state = {
	  		UserId    : UserId,
	  		fullname  : "",
	  		username  : "",
	  		mobNumber : "",
	  		email   : "",
	  		userProfile : "",
	  		firstName : "",
	  		lastName  : "",
	  		role 		:"",
		}	  	
		this.handleChange = this.handleChange.bind(this);
	}
	    
	handleSubmit(event) {
		var userid = this.state.UserId;
		// console.log("userid-----------------------------------------",userid);
		var formvalues = {
			// "fullName" 		: this.refs.firstName.value +" "+ this.refs.lastName.value,
			"firstname"		: this.state.firstName,
			"lastname" 		: this.state.lastName,
			"email"  		: this.state.email,
			"mobNumber"     : this.state.mobNumber,
		//	"role"		: this.state.role,
          // "officeLocation"  : this.refs.office.value,
		}
				/*axios.patch('/api/users/patch/one/'+userid, formvalues)*/
				axios.patch('/api/users/patch/'+userid, formvalues)

				.then((response)=> {		
					swal("User updated successfully","", "success");		
					 this.props.history.push('/umlistofusers');	
					// console.log('response --====================',response);


						var data = {
							"startRange"        : this.state.startRange,
				            "limitRange"        : this.state.limitRange, 
						}
						axios.post('/api/users/post/userslist', data)
						.then( (res)=>{      
							// console.log("here  list response==============",res);
							var tableData = res.data.map((a, i)=>{
								return {
									_id 			: a._id,
									fullName        : a.fullName,
					                email    		: a.email,
					                mobNumber       : a.mobNumber, 
					                status        	: a.status,	
					              //  role 			: a.role,
								}
							})
							this.setState({
					          completeDataCount : res.data.length,
					          tableData 		: tableData,          
					        },()=>{
					        })
						})
						.catch((error)=>{
							  if(error.message === "Request failed with status code 401")
					              {
					                   swal("Your session is expired! Please login again.","", "error");
					                   this.props.history.push("/");
					              }
							// alert("Something went wrong! Please check Get URL.");
						});

				})
				.catch(function (error) {
					// console.log('error============',error);
					  if(error.message === "Request failed with status code 401")
			              {
			                   swal("Your session is expired! Please login again.","", "error");
			                   this.props.history.push("/");
			              }
				});
	}

	
	handleChange(event){
        const target = event.target.value;
        const name   = event.target.name;
         var FirstName = this.refs.firstName.value 
			var LastName  =  this.refs.lastName.value 

			var Email=  this.refs.username.value 
			var Mnob= this.refs.mobNumber.value 
			//var role = this.refs.role.value
	         this.setState({
		          "firstName":FirstName,
		          "lastName":LastName,
		          "email":Email,
		          "mobNumber":Mnob,
		     //     "role":role

		        });
	}
	
	componentDidMount(){
		var userid = this.state.UserId;
		// console.log("userid-----------------------------------------",userid);
		 axios.get('/api/users/get/'+userid)
	      .then( (res)=>{
	        
	        var FName = res.data.fullName.split(' ');
	        var FirstName = FName[0];
	        var LastName = FName[1];

	       /* var Email = res.data.profile.email ? res.data.profile.email : null;
	        var Mnob  = res.data.profile.mobileNumber ? res.data.profile.mobileNumber : null;
	        var Role  = res.data.roles.length > 0 ? res.data.roles[0] : null;
	        console.log("Role", Role);
	        // console.log("L name", LastName);

	     /* this.refs.firstName.value = FirstName;
	      this.refs.lastName.value = LastName;
	      this.refs.fullname.value = FName 
	     this.setState({role:Role})
		  this.refs.username.value = Email;
		  this.setState({
		  	mobNumber : Mnob,
		  });
		  */
		   var FirstName = FName[0];
	        var LastName = FName[1];
	        var Email 	  = res.data.email;
	        var Mnob  	  = res.data.mobNumber;
	      
	        this.setState({
	        	  "firstName"	: FirstName,
		          "lastName"	: LastName,
		          "email"		: Email,
		          "mobNumber"	: Mnob,
	        })

	     /* this.refs.firstName.value = FirstName 
	      this.refs.lastName.value = LastName  
		  this.refs.username.value = Email
		  this.refs.mobNumber.value = Mnob*/

		 
	      })
	      .catch((error)=>{
	        alert("Something went wrong! Please check Get URL.");
	          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
	      });

// for office data 
	      //  axios
	      // .get('/api/tgkSpecificcompanysettings/list')
	      // .then(
	      //   (res)=>{
	      //     console.log('res------------------', res);
	      //     const postsdata = res.data;
	      //     console.log('postsdata',postsdata);
	      //     this.setState({
	      //       allPosts : postsdata,
	      //     });
	      //     // console.log("allPosts___________________",this.state.allPosts);
	      //     let locationArray =[];
	      //     if(this.state.allPosts!=null){
	      //       locationArray = this.state.allPosts.map(function(item) { return item.companyLocationsInfo });
	      //     }else{
	      //        locationArray = "no data";
	      //     }
	      //     this.setState({
	      //       office : locationArray,
	      //     });
	      //   console.log("office",this.state.office);  
	        
	      //   }
	      // )
	      // .catch((error)=>{

	      //   console.log("error = ",error);
	      //   // alert("Something went wrong! Please check Get URL.");
	      //    });  

	}
  	
	render(){      
		return (
				<div>
					<div>					        
					    <div className="">					        
					         <section className="content-header">
					          {/*  <h3 className="contentTitle">Edit User</h3>*/}
					         </section>					         
					          <section className="content viewContent">
					            <div className="row">
					              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					                <div className="box">					                 
					                  <div className="box-header with-border boxMinHeight">
								            <div className="box-header with-border">
								            <h4 className="reportTitle">Edit User Data</h4>
								            </div>										
											<div className="box-body">												
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12  EditUserProfileWrap">
													<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
														   <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                                          <label className="formLable">First Name <label className="requiredsign">*</label></label>
                                                          <span className="blocking-span">
                                                           <div className="input-group inputBox-main  new_inputbx " >
                                                             <div className="input-group-addon remove_brdr inputIcon">
                                                             <i className="fa fa-user-circle fa "></i>
                                                            </div>  
                                                              <input type="text" style={{textTransform:'capitalize'}}
                                                               className="form-control UMname inputText form-control  has-content"
                                                                id="firstName" ref="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange}  placeholder="First Name"/>
                                                           </div>   
                                                          </span>
                                                      </div>
                                                      <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                                          <label className="formLable">Last Name <label className="requiredsign">*</label></label>
                                                          <span className="blocking-span ">
                                                          <div className="input-group inputBox-main  new_inputbx " >
                                                             <div className="input-group-addon remove_brdr inputIcon">
                                                              <i className="fa fa-user-circle fa "></i>
                                                            </div>  
                                                             <input type="text"className="form-control UMname inputText form-control  has-content indexcls" 
                                                             id="lastName" ref="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}  placeholder="Last Name" />
                                                          </div>   
                                                          </span>
                                                      </div>


														<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin inputContent">
															<label className="formLable">Username/Email <label className="requiredsign">*</label></label>
                                                          	<input type="text" disabled  onChange={this.handleChange} className="disableInput inputMaterial form-control inputText" ref="username" value={this.state.email} name="username" required/>
														</div>
														<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group btmmargin inputContent">
															<label className="formLable">Mobile Number <label className="requiredsign">*</label></label>
	                                                          <span className="blocking-span">
	                                                           <div className="input-group inputBox-main  new_inputbx " >
	                                                             <div className="input-group-addon remove_brdr inputIcon">
	                                                            <i className="fa fa-mobile"></i>
	                                                            </div>  
	                                                              <InputMask  mask="9999999999"  type="text" 
	                                                               className="form-control UMname inputText form-control  has-content"
	                                                                id="mobNumber" ref="mobNumber" name="mobNumber" value={this.state.mobNumber} onChange={this.handleChange} placeholder="mobile number"/>
	                                                           </div>   
	                                                          </span>
														</div>	

													{/*	  <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 btmmargin inputContent">
                                                           <label className="formLable col-lg-12 col-md-12 padd0 btmmargin">Role <label className="requiredsign"></label></label>
                                                              <span className="blocking-span col-lg-12 col-md-12 col-xs-12 col-sm-12 emailfixdomain">
                                                             	
                                                               <select className="form-control" value={this.state.role} onChange={this.handleChange} ref ="role" id="role" name="role" data-text="role">
                                                                    <option  hidden> --Select-- </option>
                                                                    <option value="admin" > admin </option>
                                                                    <option value="vendor" > vendor </option>
                                                                    <option value="user" > user </option>
                                                                    </select>

                                                              </span>
                                                               
                                                          </div>*/}

													</div>
{/*														<div className="signuppp col-lg-12 col-md-12 col-sm-12 col-xs-12 createusr">
                                                       

                                                          <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent" >
                                                              <label className="formLable col-lg-12 col-md-12 mrgtop6">Office Location <label className="requiredsign"></label></label>
                                                                  <span className="blocking-span col-lg-12 col-md-12 col-xs-12 col-sm-12 emailfixdomain">
                                                                    <select className="form-control" value={this.state.officeid} ref ="office" id="office" name="office" data-text="office">
                                                                        <option hidden> --Select-- </option>
                                                                        <option value="Head Office">  Head Office </option>
                                                                        <option value="Sales Agent Office"> Sales Agent Office </option>
                                                                           { this.state.office != null ?
                                                                           	this.state.office[0] != null ?
                                                                          this.state.office[0].map( (locData, index)=>{
                                                                          // console.log('locData',locData);
                                                                           return( 

                                                                                 <option key={index} value={locData.officeLocationid ? locData.officeLocationid : null } > {locData.officeLocationid ? locData.officeLocationid : null}  </option>


                                                                                   )}
                                                                           )
                                                                          :
                                                                          null
                                                                          :
                                                                          null
                                                                        }
                                                                    </select>

                                                                  </span>
                                                           </div>
                                                     </div>*/}

													<br/>
														<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 pull-right btmmargin userProfileEditBtn">
																<button onClick={this.handleSubmit.bind(this)} className="btn btn-primary pull-right">&nbsp; &nbsp;Update Profile&nbsp; &nbsp;</button>
														</div>
													</div>
												</div>	
										</div>
									  </div>
									</div>
								  </div>
							    </section>
							  </div>
							</div>
					     		
						</div>
					);
					
				

	} 

}

export default EditUserProfile;


