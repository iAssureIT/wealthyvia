// import React,{Component}        from 'react';
// import { render }               from 'react-dom';
// import { BrowserRouter,Route }  from 'react-router-dom';
// import { Switch,Link,location,history } from 'react-router-dom';
// import $                        from "jquery";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import swal from 'sweetalert';
// import './cafeMenu.css';
// // import '../css/cafeSetting.css';
// import axios                    from 'axios';

// class cafeMenu extends Component{
  
//   constructor(props) {
//     super();
//     this.state = {
//      'itemName'   : "",
//      'cost'       : "",
//      'itemList'   : [{
//                       itemName  :"Tea",
//                       cost      : "30",
//                     }],
//      'id'         : '',
//      'totalCount' : 0,
//      'deleteId'   : "",
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.getItemList = this.getItemList.bind(this);
//   }

//   componentDidMount(){
//     this.getItemList();    
//     this.setState({
//       editId : this.props.match.params.id
//     })
 
//   }

//  /* componentDidMount(){
//     this.getItemList();
//     if(this.props.match.params.id){
//       var id = this.props.match.params.id;
//     this.setState({
//       id : id,
//       editId: id
//     })
//     this.props.history.push('/cafeMenu/'+id);
//      axios
//         .get('/api/cafeMenu/getItemList'+id)
//         .then((response)=> {

//           console.log("res------>",response.data);
//           this.setState({
//             'itemName'                 : response.data.itemName,
//             'cost'                     : response.data.cost,
          
//           })
            
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//       }
//   }
// */
//   submitValues=(event)=>{
//     event.preventDefault(); 
//     var formValues={
//          itemName  : this.state.itemName,
//          cost      : this.state.cost,
//         // 'workspaceID' : localStorage.getItem('user_ID')?localStorage.getItem('user_ID'):1,
//     }

//      if(this.state.itemName && this.state.cost){
//         if(!this.state.editId==''){
//           console.log("formValues",formValues ); 
//           axios.post('/api/cafeMenu/updateItem/'+this.state.id,formValues)
//                 .then( (response)=> {
//                   swal("Good job!", "Item Details Updated Successfully!", "success");
//                   this.getItemList();
//                   this.props.history.push('/cafeMenu');
//                   this.setState({
//                       itemName       : '',
//                       cost           : '',
//                   })
//                 })
//                 .catch(function (error) {
//                   console.log(error);
//                   swal("", "Amenities details updation failed!", "Danger");
//                 })
//         }else{
//           axios.post('/api/cafeMenu/submitItem',formValues)
//             .then( (response)=> {
//               console.log("response-------------->",response);
//               if(response.data=="Record Exists"){
//                 swal("", "Record Exists", "warning");
//               }else{
//                 swal("Good job!", "Item Details Submitted Successfully!", "success");
//                 this.getItemList();
//                 this.setState({
//                       itemName       : '',
//                       cost           : '',
//                   })
//               }
//             })
//             .catch(function (error) {
//               console.log(error);
//               swal("", "Amenities details submition failed!", "Danger");
//             })
         
//           }
//       }else{
//         swal("", "Please fill mandatory fields", "warning");
//       }
// }
//   getItemList(){
//     axios
//         .get('/api/cafeMenu/getItemList')
//         .then((response)=> {
//             if(response.data){
//                   var count = (response.data).length;
//                   this.setState({
//                     itemList : response.data,
//                     totalCount : count
//                 });
//               }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

//   }


//   handleChange = (event)=>{
//     event.preventDefault();
//     const target = event.target;
//     const name   = target.name;
//     this.setState({
//       [name]: event.target.value,
//     });

//   }

//   editItem=(event)=>{
//     event.preventDefault();
//     var id = event.target.getAttribute('data-id');
//     this.setState({
//       id : id
//     })
//     this.props.history.push('/cafeMenu/'+id);
//      axios
//         .get('/api/cafeMenu/getItem/'+id)
//         .then((response)=> {
//           this.setState({
//             'itemName' : response.data.itemName,
//             'cost'     : response.data.cost,
//           })
            
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//   }

//   deleteItem=(event)=>{
//     event.preventDefault();
//     var id = event.target.getAttribute('data-id');
//     this.setState({
//       deleteId : id
//     },()=>{
//       $('#myModalcafe'+id).css('display','block');
//     })
//   }

//   // confirmDelete=()=>{

//   //   axios
//   //       .delete('/api/cafeMenu/deleteItem/'+this.state.deleteId)
//   //       .then((response)=> {
//   //         if(response.data=='Deleted Successfully'){
//   //           this.getItemList(); 
//   //           $('#myModalcafe'+this.state.deleteId).css('display','none');                   
//   //         }
//   //       })
//   //       .catch(function (error) {
//   //           console.log(error);
//   //       });

//   // }

//   closeModal =()=>{
//     $('#myModalcafe'+this.state.deleteId).css('display','none');
//   }

  
//   render(){
//     return(
//       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
//           <h4 className="h5lettersp MasterBudgetTitle text-center custTableHead"></h4>
//         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center nopadding">
//           <div className="col-lg-4  col-md-4 col-sm-4 col-xs-4 text-left">
//             <lable className="textBtm">Beverage Name</lable>
//             <input type="text" name="itemName" value={this.state.itemName} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input_box1 nopadding" placeholder="Ex: Coffee" onChange={this.handleChange}/>
//           </div>
//           <div className="col-lg-4  col-md-4 col-sm-4 col-xs-4 text-left">
//             <lable className="textBtm">Cost</lable>
//             <input type="text" name="cost"  value={this.state.cost} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input_box1 nopadding" placeholder="40" onChange={this.handleChange}  />
//           </div>
//           <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left">
//             <button className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding  cafemenubtn" aria-hidden="true" id="checkbtn" onClick={this.submitValues.bind(this)}>{!this.state.editId==''?"Submit":"Update"}</button>
//           </div>
//         </div>
//         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center custTableHead1">Beverage List</div>
//           <table className="table tableCustom table-striped">
//             <thead className="bgTheadadmin">
//               <tr>
//                 <th>Sr.No.</th>
//                 <th>Beverage Name</th>
//                 <th>Cost</th>
//                 <th className="text-left">Action</th>
//               </tr>
//             </thead>
//             {this.state.itemList.length>0?
//               <tbody>
//                 {this.state.itemList.map((itemData,index)=>{
//                     return (
//                         <tr key={index}>
//                           <td>{index+1}.</td>
//                           <td>{itemData.itemName}</td>
//                           <td><i className='fa fa-inr'></i>{itemData.cost}</td>
//                           <td className="text-left"><i className="fa fa-pencil" data-id={itemData._id} onClick={this.editItem}></i>&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-trash" data-id={itemData._id} onClick={this.deleteItem} data-toggle="modal" aria-labelledby="myModalcafe" data-target={"myModalcafe"+itemData._id} aria-hidden="true"></i></td>
                          
//                         </tr>
//                       )
//                   })
//                 }
              
//               </tbody>
//               :
//               <tbody>
//                 <tr>
//                   <td>No record found</td>                 
//                 </tr>
//               </tbody>
//             }

//           </table>
//         <div className="modal fade in" id={"myModalcafe"+this.state.deleteId} role="dialog">
//           <div className="modal-dialog modal-xs">
//             <div className="modal-body cafemodal">
//              <div class="modal-header">
//                <button type="button" class="close" data-dismiss="modal">&times;</button>
//                  <h4 class="modal-title text-center">Are you sure you want to delete?</h4>
//             </div>
              
//               <div className="col-lg-12 ol-md-12 col-sm-12 col-xs-12 pstn btnCntnr modalbtn">
//                 <button type="button" className=" col-lg-4 col-md-4 col-sm-4 col-xs-4 btn btn-default btnClr1 shodowBox modalbtn1" data-dismiss="modal" onClick={this.confirmDelete}>Yes</button>
//                 <button type="button" className=" col-lg-4 col-md-4 col-sm-4 col-xs-4 btn btn-default btnClr2 pull-right shodowBox modalbtn1" data-dismiss="modal" onClick={this.closeModal}>No</button>
//               </div>   
//             </div>   
//           </div>
//          </div>
          
// {/*        <div className="text-center custTableFoot">Total Check-Ins = {this.state.totalCount<10?("0"+this.state.totalCount):this.state.totalCount}</div>*/}
//       </div>
//     );
//   }
// }
// export default cafeMenu;