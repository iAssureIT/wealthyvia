import React, { Component } from 'react';
import { render }           from 'react-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios                from 'axios';
import swal                 from 'sweetalert';
import $                    from "jquery";

import './ProductPricing.css';


class ProductPricing extends Component{

  constructor(props) {
    super(props);
    this.state = {
        offeringList       : [],
        offeringpriceList  : [],
        productName        : '',
        productID          : '',
        userID             : '',
        price              : '',
        action             : 'insert',
        errors             : {},
        fields             : {}
                
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    var productid = this.props.match.params.productid;
    //console.log("reportid", reportid);
    //console.log("reportid = ",reportid);
    if(productid){
      this.setState({productID : productid, action:"update"});
      this.getOneOffering(productid);
    }
    this.getofferings();
      
  }

  getOneOffering(productid){

    axios.get("/api/offerings/get/"+productid)
      .then(response => {
        if(response.data){          
          // console.log("response.data = ",response.data);
          if(response.data.price){
            this.setState({ price: response.data.price });
            let fields = this.state.fields;  
            fields["price"] = response.data.price.toString();
            this.setState({
              fields
            }); 
          }
          else{
            this.setState({ price: '' });
          }
          this.setState({productName :response.data.offeringTitle });
        }
      })
      .catch(error=>{
        console.log("Error while getting offerings", error);
        swal('Oops...', 'Something went wrong!', 'error')
      });   

  }

  getofferings(){
    axios.get('/api/offerings/get/all/list/1')
        .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
                offeringList : offerings.data,
            })
        })
        .catch((error)=>{
            if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
        }
    });

        axios.get('/api/offerings/get/all/price/list')
        .then( (offerings)=>{      
        // console.log("offerings = ",offerings.data);   
        this.setState({
                offeringpriceList : offerings.data,
            })
        })
        .catch((error)=>{
            if(error.message === "Request failed with status code 401"){
            swal("Error!","Something went wrong!!", "error");
        }
    });
  }


  handleChange=(event)=>{
      const target = event.target.value;
      
      if(event.target.name == "productName"){
        var productvalues = event.target[event.target.selectedIndex].id;
        // console.log("product values", productvalues);
        var product = productvalues.split("-");
        // console.log("product Name", product[0]);
          this.setState({ productName : product[0], productID: product[1], errors: false })
          this.getOneOffering(product[1]);
      }
      else{
        let fields = this.state.fields;  
        fields[event.target.name] = event.target.value;
        this.setState({
          fields
        });   
        this.setState({ [event.target.name] : target });
        this.validateprice();     
        
      }
  }

  validateprice() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    // console.log("fileds", fields);
    
    if (typeof fields["price"] !== "undefined") {
      if (!fields["price"].match(/^[0-9]/)) {
        formIsValid = false;
        errors["price"] = "Please enter valid price.";
      }

    } 
    
    // console.log("form valid", formIsValid);      
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  Submit(event)
  {
    event.preventDefault();
    // console.log("state", this.state);
    if(this.state.productName === '' || this.state.price === ''){
      swal("", "Please fill all mandatory fields", "error");
    }
    else if(this.validateprice()){

            var formvalues ={
                price          : this.state.price,
                
           } 
            //console.log("researchreport",formvalues);
            axios.patch('/api/offerings/patch/pricing/'+this.state.productID, formvalues)
            .then( (offering)=>{      
                    if(this.state.action == 'update'){
                      swal("Congrats..!","Product pricing updated successfully.", "success");
                    }
                    else{
                      swal("Congrats..!","Product pricing added successfully", "success");
                    }
                    
                    this.getofferings();
                    this.setState( this.baseState );
                    this.props.history.push("/product-pricing");
                  
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
        swal("", "Negative price value not allowed", "error");
      }
  }  
    
  deletePricing(event){
      var id = event.currentTarget.id;
    
    swal({
      title: 'Are you sure you want to Delete this Pricing?',
      text: 'You will not be able to recover this record after delete!',
      icon: "warning",
          buttons: true,
          dangerMode: true,
    }).then((result) => {
      if (result) {

       var formvalues ={
                price          : '',
                
           } 
            //console.log("researchreport",formvalues);
            axios.patch('/api/offerings/patch/pricing/'+id, formvalues)
            .then( (offering)=>{      
                  
                    swal("Congrats..!","Product pricing deleted successfully", "success");
                    this.getofferings();
                    this.setState( this.baseState );
                    this.props.history.push("/product-pricing");
                  
                })
                .catch((error)=>{
                  console.log(error);
                    if(error.message === "Request failed with status code 404"){
                      swal("Error!","Please select offering !!", "error");
                    }else{
                      swal("Error!","Something went wrong !!", "error");
                    }
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
          <h4 className="h5lettersp MasterBudgetTitle">Add Prices for Product/Offerings.</h4>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm" >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="productselection">
                      <label className="control-label statelabel locationlabel" >Select Product</label>
                      <span className="astrick">*</span>
                      <select 
                         type="text" name="productName" placeholder="Enter Product Name" 
                         className="selectbox" thisitle="Please enter product Name" ref="offeringList" onChange={this.handleChange} value={this.state.productName} >
                            <option value="">Select Product</option>
                             {
                              this.state.offeringList.map((a, i)=>{
                                return(
                                  <option value={a.offeringTitle} id={a.offeringTitle+"-"+a._id} key={i} disabled={this.state.action === 'update' ? true : null} >{a.offeringTitle}</option>
                                )
                              })
                            }
                        
                      </select>
                      <label className="errorlabel">{this.state.errors.product ? "Please select product" : ""}</label>
                    </div>
                  </div>
                  <div className=" formht col-lg-4 col-md-4 col-sm-12 col-xs-12">   
                      <div className="formcontent ">
                          <label>Price (₹)</label><span className="astrick">*</span>
                            <input className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12 priceinputtext" id="price" type="number" name="price"  ref="price" value={this.state.price}  onChange={this.handleChange.bind(this)}  min="0"  required/>
                            <label className="errorlabel col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.errors.price  ?
                              this.state.errors.price : null }
                            </label>
                      </div>
                  </div>
                  </div> 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                    <div className=" formht col-lg-8 col-md-8 col-md-12 col-sm-12 col-xs-12"> 
                      <div className="formcontent ">
                        <div onClick={this.Submit.bind(this)} className="submitOffering pull-right" >Submit</div>
                      </div> 
                    </div>
                  </div>                      
                                   
              </form>    
            </div>
          </div>

          
              <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 ">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th >Product Title</th>
                              <th >Price</th>                              
                              <th className="text-center">Actions</th>
                           </tr>
                          </thead>
                          
                          {
                           this.state.offeringpriceList.length > 0
                           ? 
                            this.state.offeringpriceList.map((product, j)=>{
                            return(
                              <tbody key={j} >{ product.price ? 
                                <tr key={j}>
                                    <td className="td_description" >{product.offeringTitle}</td>
                                    <td className="td_title">₹ {product.price.toLocaleString("en-IN")}</td>  
                                    <td className="text-center td_action">
                                      &nbsp;&nbsp;
                                      <a href={"/product-pricing/"+product._id}> <i className="fa fa-edit" title="Edit Price"> </i> </a>
                                      &nbsp;&nbsp;
                                      <i className="fa fa-trash" id={product._id} onClick={this.deletePricing.bind(this)} title="Delete Price"></i>                                     
                                    </td>
                                </tr>
                                :
                                null
                            
                              }
                              </tbody>
                              )
                            })
                            :
                            <tbody>
                            <tr > <td > No record found</td> 
                                  </tr>   
                            </tbody>
                          } 
                          
                        </table>
                    </div>    
                  </div>
              </div>  
            
        
      </div>

      );
  }

}

export default ProductPricing;