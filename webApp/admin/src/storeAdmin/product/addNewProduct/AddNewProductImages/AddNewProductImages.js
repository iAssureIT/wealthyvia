import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import S3FileUpload           from 'react-s3';
import 'bootstrap/js/tab.js';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class AddNewProductImages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allProductImages      : [],
            productImage          : [],
            allProductVideo       : [],
            productImageArray     : [],
            allProductPDF         : '',
            allProductType        : '',
            videoType             : '',
            productTitle          : '',
            allProductManualPDF   : '',
            allProductManualPDF   : '',
            allProductBrochurePDF : '',
            allProductInfoPDF     : '',
            product_ID            : this.props.match.params
        }
    }

    componentDidMount() {
        this.getData(this.props.match.params.productID);
    }
    componentWillReceiveProps(nextProps){             
        
    }
    getData(id){
        console.log('id',id);
        axios.get('/api/products/get/one/'+id)
        .then((response)=>{
            console.log('reas', response.data);
            this.setState({
                productImage : response.data.productImage ? response.data.productImage : []
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    componentWillUnmount() {
        // $("body").find("script[src='/js/adminLte.js']").remove();
        // if(this.basicPageTracker)
        //   this.basicPageTracker.stop();
    }

    uploadProductImage(event){
        event.preventDefault();
        var productImage = this.state.productImageArray;
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for(var i=0; i<event.currentTarget.files.length; i++){
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName  = file.name; 
                    var ext = fileName.split('.').pop();  
                    if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
                        if (file) {
                            var objTitle = { fileInfo :file }
                            productImage.push(objTitle);
                            
                        }else{          
                            swal("Images not uploaded","Something went wrong","error");  
                        }//file
                    }else{ 
                        swal("Please upload Image","Allowed images formats are (jpg,png,jpeg)","warning");   
                    }//file types
                }//file
            }//for 

            if(i >= event.currentTarget.files.length){
                this.setState({
                    productImage : productImage
                },()=>{
                    console.log('productImage', this.state.productImage)
                });  
                main().then(formValues=>{
                    this.setState({
                        productImageArray : formValues.productImage
                    },()=>{
                        console.log('form', this.state.productImageArray);
                    })
                });
                async function main(){
                    var config = await getConfig();
                    
                    var s3urlArray = [];
                    for (var i = 0; i<productImage.length; i++) {
                        var s3url = await s3upload(productImage[i].fileInfo, config, this);
                        s3urlArray.push(s3url);
                    }
                    console.log('s3urlArray',s3urlArray);
                    
                    // var videoUrl    = await s3uploadVideo(video, config, this);
                    // var manualPDF   = await s3uploadManualPDF(video, config, this);
                    // var brochurePDF = await s3uploadBrochurePDF(video, config, this);
                    // var infoPDF     = await s3uploadBrochurePDF(video, config, this);
                    // console.log(this.props.match.params ? this.props.match.params.productID : "");
                    const formValues = {
                        "product_ID"        : "fhfgf",
                        "productImage"      : s3urlArray,
                        // "video"             : videoUrl,
                        // "manualPDF"         : manualPDF,
                        // "brochurePDF"       : brochurePDF,
                        // "infoPDF"           : infoPDF,
                        "status"            : "New"
                    };
        
                    console.log("1 formValues = ",formValues);
                    return Promise.resolve(formValues);
                }
                function s3upload(image,configuration){
        
                    return new Promise(function(resolve,reject){
                        S3FileUpload
                           .uploadFile(image,configuration)
                           .then((Data)=>{
                                console.log("Data = ",Data);
                                resolve(Data.location);
                           })
                           .catch((error)=>{
                                console.log(error);
                           })
                    })
                }   
                function getConfig(){
                    return new Promise(function(resolve,reject){
                        axios
                           .get('/api/projectSettings/get/one/s3')
                           .then((response)=>{
                                console.log("proj set res = ",response.data);
                                const config = {
                                    bucketName      : response.data.bucket,
                                    dirName         : 'propertiesImages',
                                    region          : response.data.region,
                                    accessKeyId     : response.data.key,
                                    secretAccessKey : response.data.secret,
                                }
                                resolve(config);                           
                            })
                           .catch(function(error){
                                console.log(error);
                           })
        
                    })
                }        
            }
        }
    }

    uploadProductVideo(event){
        event.preventDefault();
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            var file = event.currentTarget.files[0];
            if (file) {
                var fileName  = file.name; 
                var ext = fileName.split('.').pop();  
                if(ext==="mp4" || ext==="avi" || ext==="ogv"){
                    if (file) {
                        this.setState({
                            video : { fileInfo : file }
                        });
                        console.log("video = ", file);
                    }else{          
                        swal("Video not uploaded","Something went wrong","error");  
                    }//file
                }else{ 
                    swal("Please upload Correct Video","Allowed Formats are .mp4, .avi, .ogv","warning");   
                }//file types
            }//file
        }
        
    }

    uploadProductManualPDF(event){
        event.preventDefault();
        var productManualPDF = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for(var i=0; i<event.currentTarget.files.length; i++){
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName  = file.name; 
                    var ext = fileName.split('.').pop();  
                    if(ext==="pdf"){
                        if (file) {
                            var objTitle = { fileInfo :file }
                            productManualPDF.push(objTitle);
                        }else{          
                            swal("Images not uploaded","Something went wrong","error");  
                        }//file
                    }else{ 
                        swal("Please upload Image","Allowed images formats are (jpg,png,jpeg)","warning");   
                    }//file types
                }//file
            }//for 

            if(i >= event.currentTarget.files.length){
                this.setState({
                    productManualPDF : productManualPDF
                },()=>{
                    console.log('productManualPDF', this.state.productManualPDF)
                });             
            }
        }
    }

    uploadProductBrochurePDF(event){
        event.preventDefault();
        var productBrochurePDF = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for(var i=0; i<event.currentTarget.files.length; i++){
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName  = file.name; 
                    var ext = fileName.split('.').pop();  
                    if(ext==="pdf"){
                        if (file) {
                            var objTitle = { fileInfo :file }
                            productBrochurePDF.push(objTitle);
                        }else{          
                            swal("Images not uploaded","Something went wrong","error");  
                        }//file
                    }else{ 
                        swal("Please upload Image","Allowed images formats are (jpg,png,jpeg)","warning");   
                    }//file types
                }//file
            }//for 

            if(i >= event.currentTarget.files.length){
                this.setState({
                    productBrochurePDF : productBrochurePDF
                },()=>{
                    console.log('productBrochurePDF', this.state.productBrochurePDF)
                });             
            }
        }
        
    }

    uploadProductInfoPDF(event){
        event.preventDefault();
        var productInfoPDF =[];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for(var i=0; i<event.currentTarget.files.length; i++){
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName  = file.name; 
                    var ext = fileName.split('.').pop();  
                    if(ext==="pdf"){
                        if (file) {
                            var objTitle = { fileInfo :file }
                            productInfoPDF.push(objTitle);
                        }else{          
                            swal("Images not uploaded","Something went wrong","error");  
                        }//file
                    }else{ 
                        swal("Please upload Image","Allowed images formats are (jpg,png,jpeg)","warning");   
                    }//file types
                }//file
            }//for 

            if(i >= event.currentTarget.files.length){
                this.setState({
                    productInfoPDF : productInfoPDF
                },()=>{
                    console.log('productInfoPDF', this.state.productInfoPDF)
                });             
            }
        }

    }
    saveProductImages(event){
        event.preventDefault();
        var productImage    = this.state.productImage;
        var video           = this.state.video
        var formValues = {
            "product_ID"        : this.props.match.params.productID,
            "productImage"      : this.state.productImageArray,
            "status"            : "New"
        };
        console.log('formValues', formValues);
        axios.patch('/api/products/patch/gallery',formValues)
            .then( (res) =>{
                // console.log('res', res);
                this.props.history.push('/product-list')
            })
            .catch((error) =>{
                console.log("error = ", error);
            });
        



        
        function s3uploadVideo(video,configuration){

            return new Promise(function(resolve,reject){
                S3FileUpload
                   .uploadFile(video,configuration)
                   .then((Data)=>{
                        // console.log("Data = ",Data);
                        resolve(Data.location);
                   })
                   .catch((error)=>{
                        console.log(error);
                   })
            })
        }
        function s3uploadManualPDF(pdf,configuration){
            return new Promise(function(resolve,reject){
                S3FileUpload
                   .uploadFile(pdf,configuration)
                   .then((Data)=>{
                        // console.log("Data = ",Data);
                        resolve(Data.location);
                   })
                   .catch((error)=>{
                        console.log(error);
                   })
            })
        }
        function s3uploadBrochurePDF(pdf,configuration){
            return new Promise(function(resolve,reject){
                S3FileUpload
                   .uploadFile(pdf,configuration)
                   .then((Data)=>{
                        // console.log("Data = ",Data);
                        resolve(Data.location);
                   })
                   .catch((error)=>{
                        console.log(error);
                   })
            })
        }
        function s3uploadInfoPDF(pdf,configuration){
            return new Promise(function(resolve,reject){
                S3FileUpload
                   .uploadFile(pdf,configuration)
                   .then((Data)=>{
                        resolve(Data.location);
                   })
                   .catch((error)=>{
                        console.log(error);
                   })
            })
        }
        function getConfig(){
            return new Promise(function(resolve,reject){
                axios
                   .get('/api/projectSettings/get/one/s3')
                   .then((response)=>{
                        console.log("proj set res = ",response.data);
                        const config = {
                            bucketName      : response.data.bucket,
                            dirName         : 'propertiesImages',
                            region          : response.data.region,
                            accessKeyId     : response.data.key,
                            secretAccessKey : response.data.secret,
                        }
                        resolve(config);                           
                    })
                   .catch(function(error){
                        console.log(error);
                   })

            })
        }
    }

    onChangeYTInput(event){
        var currentLink = $(event.currentTarget).val();
        // var productType = this.state.allProductType;
        // var productid = FlowRouter.getParam('id');

        // Meteor.call("updateProductYTLink", productid, productType, currentLink, (error, result)=>{

        // });
    }


    deleteProductImage(event){
        // console.log('delete');
        
        var id = event.target.id;
        var productImageArray = this.state.productImageArray;
        // console.log('productImage', productImageArray, id);

        productImageArray.splice(productImageArray.findIndex(v => v === id), 1);
        this.setState({
            productImageArray: productImageArray
        },()=>{
            // console.log('subcatgArr', this.state.subcatgArr);
        });
    }
    deleteProductVideo(event){
        // var productid = FlowRouter.getParam('id');
        // var urlLink = $(event.currentTarget).parent().attr('data-url');
        // var swalVal = swal({
        //     title: 'Are you sure?',
        //     text: "Are you sure?",
        //     type: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, Delete it!'
        //   },()=>{
        //         if(productid){
        //             if(this.state.allProductType == "ShopMode"){
        //                 Meteor.call('deleteShopProductVideo', productid, urlLink, (error, result)=>{
        //                     if(result){
        //                         // this.setState({
        //                         //     "allProductVideo":[],
        //                         // });
        //                     }
        //                 });
        //             } else {
        //                 Meteor.call('deleteProductVideo', productid, urlLink, (error, result)=>{
        //                     if(result){
        //                         // this.setState({
        //                         //     "allProductVideo":[],
        //                         // });
        //                     }
        //                 });
        //             }
        //         } 
        //   });


        
    }
    selectedProductVideo(event){
        // var productid = FlowRouter.getParam('id');
        // var urlLink = $(event.currentTarget).parent().attr('data-url');
        // if(productid){
        //     if(this.state.allProductType == "ShopMode"){
        //         Meteor.call('selectedShopProductVideo', productid, urlLink, (error, result)=>{
        //             if(result){
        //                 // this.setState({
        //                 //     "allProductVideo":[],
        //                 // });
        //             }
        //         });
        //     } else {
        //         Meteor.call('selectedProductVideo', productid, urlLink, (error, result)=>{
        //             if(result){
        //                 // this.setState({
        //                 //     "allProductVideo":[],
        //                 // });
        //             }
        //         });
        //     }
        // }
    }
    deleteProductManualPDF(event){
        // var productid = FlowRouter.getParam('id');
        // var pdfType = "Manual";
        // if(productid){
        //     if(this.state.allProductType == "ShopMode"){
        //         Meteor.call('deleteShopProductPDF', productid, pdfType, (error, result)=>{
        //             if(result){
        //                 this.setState({
        //                     "allProductManualPDF":"",
        //                 });
        //             }
        //         });
        //     } else {
        //         Meteor.call('deleteProductPDF', productid, pdfType, (error, result)=>{
        //             if(result){
        //                 this.setState({
        //                     "allProductManualPDF":"",
        //                 });
        //             }
        //         });
        //     }
        // }
    }
    deleteProductBrochurePDF(event){
        // var productid = FlowRouter.getParam('id');
        // var pdfType = "Brochure";
        
        // if(productid){
        //     if(this.state.allProductType == "ShopMode"){
        //         Meteor.call('deleteShopProductPDF', productid, pdfType, (error, result)=>{
        //             if(result){
        //                 this.setState({
        //                     "allProductBrochurePDF":"",
        //                 });
        //             }
        //         });
        //     } else {
        //         Meteor.call('deleteProductPDF', productid, pdfType, (error, result)=>{
        //             if(result){
        //                 this.setState({
        //                     "allProductBrochurePDF":"",
        //                 });
        //             }
        //         });
        //     }
        // }
    }
    deleteProductInfoPDF(event){
        // var productid = FlowRouter.getParam('id');
        // var pdfType = "Information";
        
        // if(productid){
        //     if(this.state.allProductType == "ShopMode"){
        //         Meteor.call('deleteShopProductPDF', productid, pdfType, (error, result)=>{
        //             if(result){
        //                 this.setState({
        //                     "allProductInfoPDF":"",
        //                 });
        //             }
        //         });
        //     } else {
        //         Meteor.call('deleteProductPDF', productid, pdfType, (error, result)=>{
        //             if(result){
        //                 this.setState({
        //                     "allProductInfoPDF":"",
        //                 });
        //             }
        //         });
        //     }
        // }
    }

    changeVideoType(event){
        // $('.commonVidUpCl').removeClass('vidUplComClassActive');
        // // $(event.currentTarget).removeClass('vidUplComClassInActive');
        // $(event.currentTarget).addClass('vidUplComClassActive');
    }


    getUploadImagePercentage(){
        // var uploadProgressPercent = Session.get("uploadImageProgressPercent");
        // if(uploadProgressPercent){
        //     var percentVal = parseInt(uploadProgressPercent);
        //     if(percentVal){
                
        //         var styleC = {
        //             width:percentVal + "%",
        //             display:"block",
        //         }
        //         var styleCBar = {
        //             display:"block",
        //             marginTop:5,
        //         }
        //     }
        //     if(!percentVal){
        //         var percentVal = 0;
    
        //         var styleC = {
        //             width:0 + "%",
        //             display:"none",
        //         }
        //         var styleCBar = {
        //             display:"none",
        //             marginTop:5,
        //         }
        //     }
        //     if(percentVal == 100){
        //         return(
        //             <div></div>
        //         );
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>
        //         );
        //     }
        // }
    }

    getUploadVideoPercentage(){
        // var uploadProgressPercent = Session.get("uploadVideoProgressPercent");
        // if(uploadProgressPercent){
        //     var percentVal = parseInt(uploadProgressPercent);
        //     if(percentVal){
                
        //         var styleC = {
        //             width:percentVal + "%",
        //             display:"block",
        //         }
        //         var styleCBar = {
        //             display:"block",
        //             marginTop:5,
        //         }
        //     }
        //     if(!percentVal){
        //         var percentVal = 0;
    
        //         var styleC = {
        //             width:0 + "%",
        //             display:"none",
        //         }
        //         var styleCBar = {
        //             display:"none",
        //             marginTop:5,
        //         }
        //     }
        //     if(percentVal == 100){
        //         return(<div></div>);
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>
        
        //         );
        //     }
        // }
    }


    getUploadPDFManualPercentage(){
        // var uploadProgressPercent = Session.get("uploadPDFManualProgressPercent");
        // if(uploadProgressPercent){
        //     var percentVal = parseInt(uploadProgressPercent);
        //     if(percentVal){
                
        //         var styleC = {
        //             width:percentVal + "%",
        //             display:"block",
        //         }
        //         var styleCBar = {
        //             display:"block",
        //             marginTop:5,
        //         }
        //     }
        //     if(!percentVal){
        //         var percentVal = 0;
    
        //         var styleC = {
        //             width:0 + "%",
        //             display:"none",
        //         }
        //         var styleCBar = {
        //             display:"none",
        //             marginTop:5,
        //         }
        //     }
        //     if(percentVal == 100){
        //         return(<div></div>);
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>        
        //         );
        //     }
        // }
    }


    getUploadPDFBrochurePercentage(){
        // var uploadProgressPercent = Session.get("uploadBrochureProgressPercent");
        // if(uploadProgressPercent){
        //     var percentVal = parseInt(uploadProgressPercent);
        //     if(percentVal){
                
        //         var styleC = {
        //             width:percentVal + "%",
        //             display:"block",
        //         }
        //         var styleCBar = {
        //             display:"block",
        //             marginTop:5,
        //         }
        //     }
        //     if(!percentVal){
        //         var percentVal = 0;
    
        //         var styleC = {
        //             width:0 + "%",
        //             display:"none",
        //         }
        //         var styleCBar = {
        //             display:"none",
        //             marginTop:5,
        //         }
        //     }
        //     if(percentVal == 100){
        //         return(<div></div>);
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>        
        //         );
        //     }
        // }
    }


    getUploadPDFInfoPercentage(){
        // var uploadProgressPercent = Session.get("uploadInfoProgressPercent");
        // if(uploadProgressPercent){
        //     var percentVal = parseInt(uploadProgressPercent);
        //     if(percentVal){
                
        //         var styleC = {
        //             width:percentVal + "%",
        //             display:"block",
        //         }
        //         var styleCBar = {
        //             display:"block",
        //             marginTop:5,
        //         }
        //     }
        //     if(!percentVal){
        //         var percentVal = 0;
    
        //         var styleC = {
        //             width:0 + "%",
        //             display:"none",
        //         }
        //         var styleCBar = {
        //             display:"none",
        //             marginTop:5,
        //         }
        //     }
        //     if(percentVal == 100){
        //         return(<div></div>);
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>        
        //         );
        //     }
        // }
    }
    render(){
        console.log('this', this.state.s3urlArray);
        return(
            <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <div className="row">
                <div className="formWrapper col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <section className="content">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
                                  Add Product Image                            
                               </div>
                              <hr className="hr-head container-fluid row"/>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="addProdImgVidTitle">
                                            Product Name : {this.state.productTitle}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Product Image<span className="imageUploadInstructions">(Upload Maximum 408px X 366px Image)</span></label>

                                        
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-image-o" aria-hidden="true"></i></span>
                                            <div aria-describedby="basic-addon1">
                                                <input type="file" className="form-control commonFilesUpld" accept=".jpg,.jpeg,.png" multiple onChange={this.uploadProductImage.bind(this)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="row productImgWrapper">
                                        {this.state.productImageArray && this.state.productImageArray.length > 0?
                                            this.state.productImageArray.map((imageData, index)=>{
                                                return(
                                                    <div className="col-lg-2 productImgCol" key={index}>
                                                        <div className="prodImage">
                                                            <div className="prodImageInner">
                                                                <span className="prodImageCross" title="Delete" data-imageUrl={imageData} id={imageData} onClick={this.deleteProductImage.bind(this)}>x</span>
                                                            </div>
                                                            <img aria-hidden="true" data-toggle="modal" data-target={"#openImageModal"+index} title="view Image" src={imageData} alt="Product Image" className="img-responsive" />
                                                        </div>

                                                        <div className="modal fade" id={"openImageModal"+index} role="dialog">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <a href="#" data-dismiss="modal" aria-hidden="true" className="close pull-right"><i className="fa fa-times-circle-o fa-lg venClosePadd" aria-hidden="true"></i></a>
                                                                        </div>
                                                                    <div className="modal-body">
                                                                        <div className="row">
                                                                            <div className="col-lg-12 text-left productImageModallMarginBtm">
                                                                                <img src={imageData} alt="Product Image" className="img-responsive" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            :
                                            null
                                        }
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>

                              {/* /.YouTube Video box-header */}
                              <div className="box-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <label><b>Note: Either enter link or upload video</b></label><br/>
                                        <label>YouTube Product Video Link</label>
                                        <div className="col-lg-12 input-group">
                                            <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-video-o" aria-hidden="true"></i></span>
                                            <div aria-describedby="basic-addon1">
                                                <input type="text" onChange={this.onChangeYTInput.bind(this)} className="upldYouTubeVidUrl form-control" />
                                            </div>
                                            <span onClick={this.changeVideoType.bind(this)} data-videoType="YouTubeVideo" className={this.state.videoType=="YouTubeVideo"? "vidUplComClassActive commonVidUpCl input-group-addon":"commonVidUpCl input-group-addon"} id="basic-addon1"><i title="Select as Product Video"  className="fa fa-check-circle" aria-hidden="true"></i></span>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>

                             {/* /.Local Video box-header */}
                             <div className="box-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Upload Product Video</label>
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-video-o" aria-hidden="true"></i></span>
                                            <div aria-describedby="basic-addon1">
                                                <input type="file" className="form-control ulpdVideoFromComp commonFilesUpld" accept=".mp4, .avi, .ogv" onChange={this.uploadProductVideo.bind(this)} />
                                            </div>
                                            <span onClick={this.changeVideoType.bind(this)} data-videoType="LocalVideo"  className={this.state.videoType=="LocalVideo"? "vidUplComClassActive commonVidUpCl input-group-addon":"commonVidUpCl input-group-addon"} id="basic-addon1"><i title="Select as Product Video"  className="fa fa-check-circle" aria-hidden="true"></i></span>
                                        </div>
                                        <div>{this.getUploadVideoPercentage()}</div>
                                    </div>
                                    {this.state.allProductVideo?
                                        <div className="col-lg-12">
                                            <div className="row productImgWrapper">
                                                {
                                                    this.state.allProductVideo.map((vidData,index)=>{
                                                        return(
                                                            <div key={index} className="col-lg-4 productImgCol">
                                                                <div className="prodVideo">
                                                                    <div className="prodImageInner prodImageInnerAdjm" data-url={vidData.url}>
                                                                        <span className="prodImageCross" title="Delete" onClick={this.deleteProductVideo.bind(this)}>x</span>
                                                                    </div>
                                                                    <video  width="320" height="240" controls className="prod-detail-video">
                                                                        <source src={vidData.url} type="video/mp4" />
                                                                        <source src={vidData.url} type="video/ogg" />
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                </div>
                                                                {/* <div className="prod-VideDetail-Out" data-url={vidData.url}>
                                                                    <div onClick={this.selectedProductVideo.bind(this)} className={vidData.selected == "selected" ?"prod-VideDetail-In1":"prod-VideDetail-In1 prod-VideDetail-In1Not"}>
                                                                        {vidData.selected == "selected"? "Activated" : "Inactive" }
                                                                    </div>
                                                                    <div onClick={this.deleteProductVideo.bind(this)} className="prod-VideDetail-In2">
                                                                        Delete
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        );
                                                    })
                                                }
                                               
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </div>

                            



                            {/* /.PDF Manual box-header */}
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Product Manual(PDF)</label>
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></span>
                                            <div aria-describedby="basic-addon1">
                                                <input type="file" accept=".pdf" className="form-control commonFilesUpld" onChange={this.uploadProductManualPDF.bind(this)} />
                                            </div>
                                        </div>
                                        <div>{this.getUploadPDFManualPercentage()}</div>
                                    </div>
                                    {this.state.allProductManualPDF?
                                        <div className="col-lg-12">
                                            <div className="row productImgWrapper">
                                                <div className="col-lg-4 productImgCol" >
                                                    <div className="prodPdf">
                                                        <div className="prodImageInner">
                                                            <span className="prodImageCross" title="Delete" onClick={this.deleteProductManualPDF.bind(this)}>x</span>
                                                        </div>
                                                        {/* <iframe src={this.state.allProductManualPDF} ></iframe> */}
                                                        <img src="/images/pdf.png" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                            

    
                             {/* /.PDF Brochure box-header */}
                             <div className="box-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Product Brochure(PDF)</label>
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></span>
                                            <div aria-describedby="basic-addon1">
                                                <input type="file" accept=".pdf" className="form-control commonFilesUpld" onChange={this.uploadProductBrochurePDF.bind(this)} />
                                            </div>
                                        </div>
                                        <div>{this.getUploadPDFBrochurePercentage()}</div>
                                        
                                    </div>
                                    {this.state.allProductBrochurePDF?
                                        <div className="col-lg-12">
                                            <div className="row productImgWrapper">
                                                <div className="col-lg-4 productImgCol" >
                                                    <div className="prodPdf">
                                                        <div className="prodImageInner">
                                                            <span className="prodImageCross" title="Delete" onClick={this.deleteProductBrochurePDF.bind(this)}>x</span>
                                                        </div>
                                                        {/* <iframe src={this.state.allProductBrochurePDF} ></iframe> */}
                                                        <img src="/images/pdf.png" alt=""/>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                            </div>

                             {/* /.PDF Information box-header */}
                             <div className="box-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Product Information(PDF)</label>
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></span>
                                            <div aria-describedby="basic-addon1">
                                                <input type="file" accept=".pdf" className="form-control commonFilesUpld" onChange={this.uploadProductInfoPDF.bind(this)} />
                                            </div>
                                        </div>
                                        <div>{this.getUploadPDFInfoPercentage()}</div>
                                        
                                    </div>
                                    {this.state.allProductInfoPDF?
                                        <div className="col-lg-12">
                                            <div className="row productImgWrapper">
                                                <div className="col-lg-4 productImgCol" >
                                                    <div className="prodPdf">
                                                        <div className="prodImageInner">
                                                            <span className="prodImageCross" title="Delete" onClick={this.deleteProductInfoPDF.bind(this)}>x</span>
                                                        </div>
                                                        {/* <iframe src={this.state.allProductInfoPDF} ></iframe> */}
                                                        <img src="/images/pdf.png" alt=""/>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                    <div className="col-lg-12">
                                        <button className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9 marginTop17" onClick={this.saveProductImages.bind(this)} >
                                            SAVE
                                        </button>
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
export default AddNewProductImages;