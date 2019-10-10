import React, { Component } from 'react';
import { render }           from 'react-dom';
import CreateUser 			from './CreateUser.js';
import axios                from 'axios';
import swal                 from 'sweetalert';
import './userManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import IAssureTableUM from '../../TGKIAssureTableUM/IAssureTable.jsx';
import $ from 'jquery';
import  UMDelRolRow from './UMDelRolRow.jsx';
import  UMAddRolRow from './UMAddRolRow.jsx';
import  UMSelectRoleUsers from './UMSelectRoleUsers.jsx';

axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class UMListOfUsers extends Component {
	constructor(props){
		super(props);
		this.state = {
		 	allPosts : [],
		 	"twoLevelHeader"    : {
                apply           : false,
            },
             "tableHeading"     : {

                fullName        : 'User Name',
                email   		: 'Email',
                mobNumber       : 'Mobile Number', 
                status        	: 'Status',
                role        	: 'Role',
                actions        	: 'Action',
            },
            "startRange"        : 0,
            "limitRange"        : 10, 

            blockActive			: "all",

            adminRolesListData   : [

            	{ roleName : "Technical Admin"},
            	{ roleName : "Executive Admin"},
            	{ roleName : "Sales Manager"},
            	{ roleName : "Sales Agent"},
            	{ roleName : "Field Manager"},
            	{ roleName : "Field Agent"},
            	{ roleName : "Client"},
            	
            	  
            ],

            checkedUser  : [],
            activeswal : false,
            blockswal : false,
            confirmDel : false,
            unCheckedUser : [],
		}
    	this.handleChange  = this.handleChange.bind(this);
			
	}
    
    

	handleChange(event){
	  	event.preventDefault();
        const target = event.target;
        const name   = target.name;  
    }

	componentDidMount(){
		var data = {
			"startRange"        : this.state.startRange,
            "limitRange"        : this.state.limitRange, 
		}
		axios.get('/api/users/get/list/1')
		.then( (res)=>{      
			console.log("herer==========Ashish======>>>>",res.data);

			var tableData = res.data.map((a, i)=>{
				return {
					_id 			: a._id,
					fullName        : a.fullName ? a.fullName : "-",
	                email   		: a.email ? a.email : "-",
	                mobNumber    : a.mobNumber ? a.mobNumber : "-", 
	                status        	: a.status ? a.status : "-",	
	                role 			: a.role[0] ? a.role[0] : "-",
	                checked        : false,
				}
			})
			this.setState({
	          completeDataCount : res.data.length,
	          tableData 		: tableData,          
	        },()=>{
	        	console.log('tableData', this.state.tableData);
	        })
		})
		.catch((error)=>{
			// console.log("error = ",error);
			// alert("Something went wrong! Please check Get URL.");
			  if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
		});
		// this.getData(this.state.startRange, this.state.limitRange)
	}
	getData(startRange, limitRange){    
		var data = {
			"startRange"        : startRange,
            "limitRange"        : limitRange, 
		}    
       axios.get('/api/users/get/list/1')
        .then( (res)=>{  
			console.log("herer==========Ashish AA======>>>>",res.data);
        	var tableData = res.data.map((a, i)=>{
				return {
					_id 			: a._id,
					fullName        : a.fullName ? a.fullName : "-",
	                email    		: a.email ? a.email : "-",
	                mobNumber    	: a.mobNumber ? a.mobNumber : "-", 
	                status        	: a.status ? a.status : "-",	
	                role 			: a.role ? a.role : "-",
	                checked         : false,
				}
			})
        	// console.log('res============', res.data);
          	this.setState({
              completeDataCount : res.data.length,
              tableData 		: tableData,          
            },()=>{
            })
        })
	    .catch((error)=>{
	      // console.log("error = ",error);
	      alert("Something went wrong! Please check Get URL.");
	        if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
	    }); 
    }
    getSearchText(searchText, startRange, limitRange){
        // console.log(searchText, startRange, limitRange);
        this.setState({
            tableData : []
        });
    }

    adminRolesListData(){
		// return  Meteor.roles.find({"name":{ $nin: ["superAdmin"] }}).fetch();
	}

	
	adminUserActions(event){
			event.preventDefault();
			var checkedUsersList     = this.state.checkedUser;
			// console.log('id array here', checkedUsersList);
			
			if( checkedUsersList.length > 0 ){
				var selectedValue        = this.refs.userListDropdown.value;
				var keywordSelectedValue = selectedValue.split('$')[0];
				var role                 = selectedValue.split('$')[1];
				// console.log("selectedValue",selectedValue);
				// console.log("role",role);
				// console.log("keywordSelectedValue",keywordSelectedValue);

				switch(keywordSelectedValue){
				  case '-':
				    // console.log('selectedValue:' + selectedValue);
				    break;

				  case 'block_selected':

				  for(var i=0;i< checkedUsersList.length;i++)
				  {
				  	var selectedId = checkedUsersList[i];
				  	var formValues ={
				  	 	userID : selectedId,
				  	 	status : 'Blocked',
				  	}
				  	// console.log("selected i",selectedId);
				  	 axios
				      .post('/api/users/statusaction',formValues)
				      .then(
				        (res)=>{
				          // console.log('res', res);
				          this.setState({
				          	blockswal : true,
				          	checkedUser : null,

				          })

				         
				          checkedUsersList = null;
				          // this.props.history.push('/umlistofusers');

				          	// update table here
				          		var data = {
											"startRange"        : this.state.startRange,
								            "limitRange"        : this.state.limitRange, 
										}
										axios.post('/api/users/userslist', data)
										.then( (res)=>{      
											// console.log("herer",res);
											var tableData = res.data.map((a, i)=>{
												return {
													_id 			: a._id,
													fullName        : a.fullName ? a.fullName : "-",
									                email    		: a.email ? a.email : "-",
									                mobNumber    : a.mobNumber ? a.mobNumber : "-", 
									                status        	: a.status ? a.status : "-",	
									                role 			: a.role ? a.role : "-",
									                checked        : false,
												}
											})
											this.setState({
									          completeDataCount : res.data.length,
									          tableData 		: tableData,          
									        },()=>{
									        	// console.log('tableData', this.state.tableData);
									        })
										})
										.catch((error)=>{
											// console.log("error = ",error);
											// alert("Something went wrong! Please check Get URL.");
											  if(error.message === "Request failed with status code 401")
								              {
								                   swal("Your session is expired! Please login again.","", "error");
								                   this.props.history.push("/");
								              }
										});



				        }).catch((error)=>{ 

				        // console.log("error = ",error);
				          if(error.message === "Request failed with status code 401")
				              {
				                   swal("Your session is expired! Please login again.","", "error");
				                   this.props.history.push("/");
				              }
				      });

				   }  


				   	if(this.state.blockswal == true)
				   	{
				   		 swal("Account blocked successfully","","success");
				   	}
				    break;

				  case 'active_selected':

				    for(var i=0;i< checkedUsersList.length;i++)
				  {
				  	var selectedId = checkedUsersList[i];
				  	var formValues ={
				  	 	userID : selectedId,
				  	 	status : 'Active',
				  	}
				  	// console.log("selected i",selectedId);

				  	 axios
				      .post('/api/users/statusaction',formValues)
				      .then(
				        (res)=>{
				          // console.log('res', res);
				          this.setState({
				          	activeswal : true,
				          	checkedUser : null,
				          });
				         
				          checkedUsersList = null;

				          	// update table here
				          		var data = {
											"startRange"        : this.state.startRange,
								            "limitRange"        : this.state.limitRange, 
										}
										axios.post('/api/users/userslist', data)
										.then( (res)=>{      
											// console.log("herer",res);
											var tableData = res.data.map((a, i)=>{
												return {
													_id 			: a._id,
													fullName        : a.fullName ? a.fullName : "-",
									                email   		: a.email ? a.email : "-",
									                mobNumber    : a.mobNumber ? a.mobNumber : "-", 
									                status        	: a.status ? a.status : "-",	
									                role			: a.role ? a.role : "-",
									                checked        : false,
												}
											})
											this.setState({
									          completeDataCount : res.data.length,
									          tableData 		: tableData,          
									        },()=>{
									        	// console.log('tableData', this.state.tableData);
									        })
										})
										.catch((error)=>{
											// console.log("error = ",error);
											// alert("Something went wrong! Please check Get URL.");
											  if(error.message === "Request failed with status code 401")
								              {
								                   swal("Your session is expired! Please login again.","", "error");
								                   this.props.history.push("/");
								              }
										});


				        }).catch((error)=>{ 

				        // console.log("error = ",error);
				          if(error.message === "Request failed with status code 401")
				              {
				                   swal("Your session is expired! Please login again.","", "error");
				                   this.props.history.push("/");
				              }
				      });

				   }  

					   if(this.state.activeswal == true)
					   {
					   	 swal("Account activated successfully","","success");
					   }
				    break;

				  case 'cancel_selected':

				 	 $('#deleteModal').addClass("in");
				 	 $('#deleteModal').css("display","block");

					break;

				  case 'add':

				   for(var i=0;i< checkedUsersList.length;i++)
				  {
				  	var selectedId = checkedUsersList[i];
				  	var formValues ={
				  	 	userID : selectedId,
				  	 	role   : role,
				  	}
				  	// console.log("selected i",selectedId);

				  	 axios
				      .post('/api/users/roleadd/',formValues)
				      .then(
				        (res)=>{
				          console.log('res----------------', res);
				          if(res.data.message =="Role is already exists")
				          {
				          	swal("Role is already assigned","","error");
				          	this.setState({
							   	unCheckedUser : []
							})
				          }
				          else{
							swal("Assigned Role Added Successfully","","success");
				          	checkedUsersList = null;

				          		// update table here
				          		var data = {
											"startRange"        : this.state.startRange,
								            "limitRange"        : this.state.limitRange, 
										}
										axios.post('/api/users/userslist', data)
										.then( (res)=>{      
											// console.log("herer",res);
											var tableData = res.data.map((a, i)=>{
												return {
													_id 			: a._id,
													fullName        : a.fullName ? a.fullName : "-",
									                email    		: a.email ? a.email : "-",
									                mobNumber       : a.mobNumber ? a.mobNumber : "-", 
									                status        	: a.status ? a.status : "-",	
									                role 			: a.role ? a.role : "-",
									                checked        : false,
												}
											})
											this.setState({
									          completeDataCount : res.data.length,
									          tableData 		: tableData,          
									        },()=>{
									        	// console.log('tableData', this.state.tableData);
									        })
										})
										.catch((error)=>{
											// console.log("error = ",error);
											// alert("Something went wrong! Please check Get URL.");
											 if(error.message === "Request failed with status code 401")
								              {
								                   swal("Your session is expired! Please login again.","", "error");
								                   this.props.history.push("/");
								              }
										});

				          }
				          
										
				        }).catch((error)=>{ 

				        // console.log("error = ",error);
				          if(error.message === "Request failed with status code 401")
				              {
				                   swal("Your session is expired! Please login again.","", "error");
				                   this.props.history.push("/");
				              }
				      });

				   }  

				   this.setState({
				   	unCheckedUser : []
				},()=>{
					console.log("unCheckedUser",this.state.unCheckedUser);
				})
				    break;

				  case 'remove':
					

					 for(var i=0;i< checkedUsersList.length;i++)
				  {
				  	var selectedId = checkedUsersList[i];
				  	var formValues ={
				  	 	userID : selectedId,
				  	 	role   : role,
				  	}
			
				  	 axios
				      .post('/api/users/roledelete/',formValues)
				      .then(
				        (res)=>{
				          // console.log('res', res);
				          swal("Assigned Role Removed Successfully","","success");
				          checkedUsersList = null;

				          		// update table here
				          		var data = {
											"startRange"        : this.state.startRange,
								            "limitRange"        : this.state.limitRange, 
										}
										axios.post('/api/users/userslist', data)
										.then( (res)=>{      
											// console.log("herer",res);
											var tableData = res.data.map((a, i)=>{
												return {
													_id 			: a._id,
													fullName        : a.fullName ? a.fullName : "-",
									                email    		: a.email ? a.email : "-",
									                mobNumber    : a.mobNumber ? a.mobNumber : "-", 
									                status        	: a.status ? a.status : "-",	
									                role 			: a.role ? a.role : "-",
									                checked         : false,
												}
											})
											this.setState({
									          completeDataCount : res.data.length,
									          tableData 		: tableData,          
									        },()=>{
									        	// console.log('tableData', this.state.tableData);
									        })
										})
										.catch((error)=>{
											// console.log("error = ",error);
											// alert("Something went wrong! Please check Get URL.");
											  if(error.message === "Request failed with status code 401")
								              {
								                   swal("Your session is expired! Please login again.","", "error");
								                   this.props.history.push("/");
								              }
										});
										
				        }).catch((error)=>{ 

				        // console.log("error = ",error);
				          if(error.message === "Request failed with status code 401")
				              {
				                   swal("Your session is expired! Please login again.","", "error");
				                   this.props.history.push("/");
				              }
				      });

				   }  

				    break;
				}
				this.setState({
				   	unCheckedUser : []
				},()=>{
					console.log("unCheckedUser",this.state.unCheckedUser);
				})
			}else{
				// this.refs.userListDropdown.value = '-';
				// swal({
		  //   			title:'abc',
		  //   			text:"Please select atleast one user."
		  //   		});
			}
			// {this.usersListData()}
	}

	selectedRole(event){
				event.preventDefault();
				var selectedValue        = this.refs.roleListDropdown.value;
				var keywordSelectedValue = selectedValue.split('$')[0];
				console.log("selectedValue",selectedValue);			
				console.log("keywordSelectedValue ------------------",keywordSelectedValue);
					var formValues ={
						searchText : selectedValue,
					}

					if(selectedValue == "all"){

						var data = {
								"startRange"        : this.state.startRange,
					            "limitRange"        : this.state.limitRange, 
							}
							axios.post('/api/users/userslist', data)
							.then( (res)=>{      
								// console.log("herer",res);
								// swal("Success! Showing "+selectedValue,"","success");
								var tableData = res.data.map((a, i)=>{
									return {
													_id 			: a._id,
													fullName        : a.fullName ? a.fullName : "-",
									                email    		: a.email ? a.email : "-",
									                mobNumber       : a.mobNumber ? a.mobNumber : "-", 
									                status        	: a.status ? a.status : "-",	
									                role 			: a.role ? a.role : "-",
									                checked         : false,
									}
								})
								this.setState({
						          completeDataCount : res.data.length,
						          tableData 		: tableData,          
						        },()=>{
						        	// console.log('tableData', this.state.tableData);
						        })
							})
							.catch((error)=>{
								// console.log("error = ",error);
								// alert("Something went wrong! Please check Get URL.");
								  if(error.message === "Request failed with status code 401")
						              {
						                   swal("Your session is expired! Please login again.","", "error");
						                   this.props.history.push("/");
						              }
							});

					}else{

						/* axios
					      .post('/api/users/searchValue',formValues)
					      .then(
					        (res)=>{
					          // console.log('res', res);
					          // swal("Success! Showing only "+selectedValue,"","success");
					          var data = res.data.data;
					          var tableData = data.map((a, i)=>{
									return {
										_id 			: a._id ? a._id : '-' ,
										fullName        : a.profile.fullName ? a.profile.fullName : '-',
						                emailId    		: a.emails[0].address ? a.emails[0].address : '-',
						                mobileNumber    : a.profile.mobileNumber ? a.profile.mobileNumber : '-', 
						                status        	: a.profile.status ? a.profile.status : "-",	
						                roles 			: ((a.roles.map((b, i)=>{return '<p>'+b+'</p>'})).toString()).replace(/,/g, " "),
										 checked        : false,
									}
								})
					          	this.setState({
					              tableData 		: tableData,          
					            },()=>{
					            }) 
					        }).catch((error)=>{ 
					            swal("Sorry there is no data of "+selectedValue,"","error");
					              if(error.message === "Request failed with status code 401")
					              {
					                   swal("Your session is expired! Please login again.","", "error");
					                   this.props.history.push("/");
					              }
					      });*/

					}

				    
	}

	selectedStatus(event){
			event.preventDefault();

			var selectedValue        = this.refs.blockActive.value;
				var keywordSelectedValue = selectedValue.split('$')[0];
				// console.log("selectedValue status",selectedValue);			
				// console.log("keywordSelectedValue status",keywordSelectedValue);
					var formValues ={
						searchText : selectedValue,
					}

					if(selectedValue == "all"){
						// console.log("here all data");

							var data = {
								"startRange"        : this.state.startRange,
					            "limitRange"        : this.state.limitRange, 
							}
							axios.post('/api/users/userslist', data)
							.then( (res)=>{      
								// console.log("herer",res);
								// swal("Success! Showing "+selectedValue,"","success");
								var tableData = res.data.map((a, i)=>{
									return {
													_id 			: a._id,
													fullName        : a.fullName ? a.fullName : "-",
									                email    		: a.email ? a.email : "-",
									                mobNumber    : a.mobNumber ? a.mobNumber : "-", 
									                status        	: a.status ? a.status : "-",	
									                role			: a.role ? a.role : "-",
									                checked         : false,
									}
								})
								this.setState({
						          completeDataCount : res.data.length,
						          tableData 		: tableData,          
						        },()=>{
						        	// console.log('tableData', this.state.tableData);
						        })
							})
							.catch((error)=>{
								// console.log("error = ",error);
								// alert("Something went wrong! Please check Get URL.");
								  if(error.message === "Request failed with status code 401")
						              {
						                   swal("Your session is expired! Please login again.","", "error");
						                   this.props.history.push("/");
						              }
							});


					}else{

						 axios
				      .post('/api/users/searchValue',formValues)
				      .then(
				        (res)=>{
				          // console.log('res', res);
				          // swal("Success! only "+selectedValue+" users are shown in the list", "","success");
				          var data = res.data.data;
				          var tableData = data.map((a, i)=>{
								return {
										_id 			: a._id ? a._id : '-' ,
										fullName        : a.profile.fullName ? a.profile.fullName : '-',
						                email    		: a.emails[0].address ? a.emails[0].address : '-',
						                mobNumber    : a.profile.mobNumber ? a.profile.mobNumber : '-', 
						                status        	: a.profile.status ? a.profile.status : "-",	
						                role 			: ((a.roles.map((b, i)=>{return '<p>'+b+'</p>'})).toString()).replace(/,/g, " "),
										 checked        : false,
								}
							})
				          	this.setState({
				              tableData 		: tableData,          
				            },()=>{
				            })
				        }).catch((error)=>{ 
				        	swal("Sorry there are no "+selectedValue+"users", "","error");
				        	  if(error.message === "Request failed with status code 401")
					              {
					                   swal("Your session is expired! Please login again.","", "error");
					                   this.props.history.push("/");
					              }
				      });
					}

				    

	}

	confirmDel(event){

			event.preventDefault();
			var checkedUsersList     = this.state.checkedUser;
			// console.log('id array here', checkedUsersList);
			
			if( checkedUsersList.length > 0 ){
				var selectedValue        = this.refs.userListDropdown.value;
				var keywordSelectedValue = selectedValue.split('$')[0];
				var role                 = selectedValue.split('$')[1];
		
				 for(var i=0;i< checkedUsersList.length;i++)
					  {
					  	var selectedId = checkedUsersList[i];
					  	
					  	// console.log("selected i",selectedId);
					  	const token = '';
					  	const url = '/api/users/'+selectedId ;
						const headers = {
							    "Authorization" : token,
							    "Content-Type" 	: "application/json",
							};
						axios({
							method: "DELETE",
							url : url,
							headers: headers,
							timeout: 3000,
							data: null,
						})
						.then((response)=> {
					    	// console.log('delete response',response);
					    	swal("User deleted successfully","", "success");
					    		 $('#deleteModal').removeClass("in");
								 $('#deleteModal').css("display","none");
					    		// update table here
					          		var data = {
												"startRange"        : this.state.startRange,
									            "limitRange"        : this.state.limitRange, 
											}
											axios.post('/api/users/userslist', data)
											.then( (res)=>{      
												// console.log("herer",res);
												var tableData = res.data.map((a, i)=>{
													return {
														_id 			: a._id,
														fullName        : a.fullName ? a.fullName : "-",
										                email    		: a.email ? a.email : "-",
										                mobNumber    : a.mobNumber ? a.mobNumber : "-", 
										                status        	: a.status ? a.status : "-",	
										                role 			: a.role ? a.role : "-",
										                checked         : false,
													}
												})
												this.setState({
										          completeDataCount : res.data.length,
										          tableData 		: tableData,          
										        },()=>{
										        	// console.log('tableData', this.state.tableData);
										        })
											})
											.catch((error)=>{
												// console.log("error = ",error);
												// alert("Something went wrong! Please check Get URL.");
												  if(error.message === "Request failed with status code 401")
										              {
										                   swal("Your session is expired! Please login again.","", "error");
										                   this.props.history.push("/");
										              }
											});


						}).catch((error)=> {
						    // console.log(error);
						      if(error.message === "Request failed with status code 401")
					              {
					                   swal("Your session is expired! Please login again.","", "error");
					                   this.props.history.push("/");
					              }
						});


					   }  
				}
				else{
					console.log("pleaseselect 1 user");
				}
	}
	selectedUser(checkedUsersList){
		// console.log('checkedUsersList', checkedUsersList);
		this.setState({
			checkedUser : checkedUsersList,
		})

		// console.log("this.state.checkedUser",this.state.checkedUser);

	}

	closeModal(event){

		 $('#deleteModal').removeClass("in");
		 $('#deleteModal').css("display","none");
		 // $('#deleteModal').css("display","none");


	}

render(){
	// console.log('this.state.completeDataCount', this.state.completeDataCount);
	var adminRolesListDataList = this.state.adminRolesListData;
	// console.log("adminRolesListDataList",adminRolesListDataList);
     return(
   		<div className="">
			<section className="">
		        <div className="">
		        <div className="">
		          	<div className="">
			            <div className="">
				            
							<div className="modal-bodyuser">

						        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 box-header with-border nopaddingum2">

									<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12  paddingright">

										<h4 className="usrmgnttitle weighttitle">User Management</h4>
									</div>
									<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 "  id="createmodalcl">
										<button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform userbtn clickforhideshow" data-toggle="modal" data-target="#CreateUserModal">Add User</button>
											<CreateUser getData={this.getData.bind(this)}/>
									</div>
								</div>
						        <form className="newTemplateForm">
									
									<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 usrmgnhead">
										<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Action</label>
											<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" id="userListDropdownId" ref="userListDropdown" name="userListDropdown" onChange={this.adminUserActions.bind(this)}>
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="-" name="userListDDOption">-- Select --</option>	
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="block_selected" name="userListDDOption">Block Selected</option>	
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="active_selected" name="userListDDOption">Active Selected</option>
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="cancel_selected" name="userListDDOption">Delete Selected Acccounts</option>	
												{ 	adminRolesListDataList.map( (rolesData,index)=>{
														return <UMAddRolRow key={index} roleDataVales={rolesData.roleName}/>
												  	})
												}
												{ adminRolesListDataList.map( (rolesData,index)=>{
													return <UMDelRolRow key={index} roleDataVales={rolesData.roleName}/>
													  })
												}
											</select>

										</div> 
										

										<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
											
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Role</label>
											<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="roleListDropdown" name="roleListDropdown" onChange={this.selectedRole.bind(this)} >
												<option name="roleListDDOption">-- Select --</option>
												<option value="all" name="roleListDDOption">Show All</option>		
												{ adminRolesListDataList.map( (rolesData,index)=>{
													return <UMSelectRoleUsers  key={index} roleDataVales={rolesData.roleName}/>
												  }) 
												}	
												 
											</select>
										</div>

				
										<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Status</label>
											<select className=" col-col-lg-12  col-md-12 col-sm-12 col-xs-12 noPadding  form-control " ref="blockActive"  name="blockActive" onChange={this.selectedStatus.bind(this)}>
												<option>-- Select --</option>	
												<option value="all"	>Show All</option>	
												<option value="Blocked">Blocked</option>	
												<option value="Active">Active </option>	
											</select>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  usrmgnhead">
										<IAssureTableUM
  										  completeDataCount={this.state.completeDataCount}
					                      twoLevelHeader={this.state.twoLevelHeader} 
					                      getData={this.getData.bind(this)} 
					                      tableHeading={this.state.tableHeading} 
					                      tableData={this.state.tableData} 
					                      getSearchText={this.getSearchText.bind(this)}
					                      selectedUser={this.selectedUser.bind(this)} 
					                      unCheckedUser={this.state.unCheckedUser ? this.state.unCheckedUser : [] } 
										/>			
									</div>

									<div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id="deleteModal"  role="dialog">
					                    <div className=" modal-dialog adminModal adminModal-dialog">
					                         <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
					                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
										        		<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
										        		<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
													        <button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)} aria-label="Close">
													          <span aria-hidden="true">&times;</span>
													        </button>
												        </div>
										      		</div>
					                              <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">

					                                 <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this User?</h4>
					                              </div>
					                              
					                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
					                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					                                        <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
					                                   </div>
					                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					                                        <button  onClick={this.confirmDel.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
					                                   </div>
					                              </div>
					                         </div>
					                    </div>
					               </div>
								</form>
						    </div>
						</div>
					</div>
				</div>
				</div>
			</section>
  		</div>
     );
    }

}


export default UMListOfUsers;