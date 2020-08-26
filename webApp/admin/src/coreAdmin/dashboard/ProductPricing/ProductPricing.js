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
        productName        : '',
        productID          : '',
        userID             : '',
        price              : '',
        action             : 'insert'
                
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
          console.log("response.data = ",response.data);
          if(response.data.price){
            this.setState({ price: response.data.price });
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
            },()=>{
              console.log("of titlt", this.state.offeringList);
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
        console.log("product values", productvalues);
        var product = productvalues.split("-");
        console.log("product Name", product[0]);
          this.setState({ productName : product[0], productID: product[1], errors: false })
          this.getOneOffering(product[1]);
      }
      else{
        this.setState({ [event.target.name] : target });
      }
  }

  Submit(event)
  {
    if(this.state.productName === '' ){
      swal("", "Please fill required fields", "error");
    }
    else{ 
    
            var formvalues ={
                price          : this.state.price,
                
           } 
            console.log("researchreport",formvalues);
            axios.patch('/api/offerings/patch/pricing/'+this.state.productID, formvalues)
            .then( (offering)=>{      
                  
                    swal("Congrats..!","Product pricing added successfully", "success");
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
  }  
    
    

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Add prices for product/offerings</h4>
         </div>
          <hr className="compySettingHr" />
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm" >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="productselection">
                      <label className="control-label statelabel locationlabel" >Select Product</label>
                      <span className="astrick">*</span>
                      <select 
                         type="text" name="productName" placeholder="Enter Product Name" 
                         className="selectbox" thisitle="Please enter product Name" ref="offeringList" onChange={this.handleChange} value={this.state.productName}>
                            <option value="">Select Product</option>
                             {
                              this.state.offeringList.map((a, i)=>{
                                return(
                                  <option value={a.offeringTitle} id={a.offeringTitle+"-"+a._id} key={i}>{a.offeringTitle}</option>
                                )
                              })
                            }
                        
                      </select>
                      <label className="errorlabel">{this.state.errors ? "Please select product" : ""}</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                    <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">   
                      <div className="formcontent ">
                          <label>Price</label><span className="astrick">*</span>
                            <input className="form-control nameSpaceUpper col-lg-12 col-md-12 col-sm-12 col-xs-12 priceinputtext" id="price" type="number" name="price"  ref="price" value={this.state.price}  onChange={this.handleChange.bind(this)}  required/>
                            <div className="errorMsg"></div>
                      </div>
                    </div>
                  </div> 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                    <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12"> 
                      <div className="formcontent ">
                        <div onClick={this.Submit.bind(this)} className="submitOffering pull-right" >Submit</div>
                      </div> 
                    </div>
                  </div>                      
                </div>                    
              </form>    
            </div>
          </div>

          { this.state.offeringList.length > 0 ?
              <div className="tab-content customTabContent mt40 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div id="home" className="tab-pane fade in active">
                    <div className="col-lg-12 NOpadding">
                        <table className="table tableCustom table-striped reserachtable">
                          <thead className="bgThead">
                            <tr>
                              <th >Product Title</th>
                              <th className="text-center">Price</th>                              
                              <th className="text-center">Action</th>
                           </tr>
                          </thead>
                          
                          {
                           this.state.offeringList
                           ? 
                            this.state.offeringList.map((product, j)=>{
                            return(
                              <tbody key={j} >{ product.price ? 
                                <tr key={j}>
                                    <td className="td_title">{product.offeringTitle}</td>
                                    <td className="td_description">{product.price}</td>
                                    
                                   
                                    <td className="text-center td_action">
                                      &nbsp;&nbsp;
                                      <a href={"/product-pricing/"+product._id}> <i className="fa fa-edit"> </i> </a>                                     
                                    </td>
                                </tr>
                                :
                                null
                              }
                              </tbody>
                              )
                            })
                            :
                            null

                          } 
                          
                        </table>
                    </div>    
                  </div>
              </div>  
            :
              null
          }


        
      </div>

      );
  }

}

export default ProductPricing;