import React, { Component } from 'react';
import { render }           from 'react-dom';
import { Switch,Link,location } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import S3FileUpload         from 'react-s3';
import { deleteFile }       from 'react-s3';
import Geocode              from "react-geocode";
import QRCode               from 'qrcode.react';
import axios                from 'axios';
import swal                 from 'sweetalert';
import moment               from 'moment';
import TimePicker           from 'rc-time-picker';
import $                    from "jquery";
import 'rc-time-picker/assets/index.css';
import './addWorkspace.css';

const format = 'hh:mm a';
var openingtime = "";
function onChangeOT(value) {
  // console.log("OT",value && value.format(format));
  openingtime = value
  console.log("openingtime",openingtime, typeof openingtime);
}
var closingtime = "";
function onChangeCT(value) {
  // console.log("CT",value && value.format(format));
  closingtime = value
  // console.log("closingtime",closingtime, typeof closingtime);
}

  var array =[];
  var imgArrayWS = [];
  var imgTitleArrayWS = [];
  Geocode.setApiKey("AIzaSyDQCQgc686dlIhzkZkB1LGTokkhI-kFoUU");
  Geocode.enableDebug();

  const downloadQR = (event) => {
    var id = event.target.getAttribute('data-id');
    var name = event.target.getAttribute('data-name');
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = name+"_QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const formValid = formerrors=>{
    // console.log("formerrors",formerrors);
    let valid = true;
    Object.values(formerrors).forEach(val=>{
    val.length>0 && (valid = false);
    })
    return valid;
  }
  // /^[0-9][0-9]{9}$|^$/

  const mobileRegex  = RegExp(/^(?=.*[0-9])[- +()0-9]+$/);
  const addressRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);
  // const websiteRegex = RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
  const pincodeRegex = RegExp(/^[1-9][0-9]{5}$/);
  const seatsRegex   = RegExp(/^[1-9][0-9]{1}$/);
  const nameRegex    = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
  const numberRegex  = RegExp(/^[0-9\b]+$/);
  const emailRegex   = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^$/);
  const timeRegex    = RegExp(/(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))/);

  // const geocoder = new google.maps.Geocoder;
   var lattitude = "";
    var longitude = "";

class addWorkspace extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cafeName                : "",
      address                 : "",
      landmark                : "",
      area                    : "",
      city                    : "",
      country                 : "",
      pin                     : "",
      state                   : "",
      numberOfSeats           : "",
      fullAddress             : "",
      name                    : "",
      email                   : "",
      emailCheck              : "",
      mobile                  : "",
      cost                    : "",
      openingtime             : "",
      closingtime             : "",              
      banner                  : "",
      logo                    : "", 
      config                  : "",
      editId                  : "",
      tempImg                 : "",
      editStatus              : "",
      latitude                : "",
      longitude               : "",
      dataArray               : [],  
      amenitiesList           : [],
      workSpaceList           : [],
      imageArrayWS            : [],
      imgArrayWSaws           : [],
      imageTitleArrayWS       : [],
      facilities              : [],
      accHolderName           : "",
      bankName                : "",
      AccountNumber           : "",
      ifscCode                : "",
      branchName              : "",
      arrayData               : [],
      formerrors              :{
                                cafeName                : "",
                                address                 : "",
                                landmark                : "",
                                area                    : "",
                                city                    : "",
                                country                 : "",
                                pin                     : "",
                                state                   : "",
                                numberOfSeats           : "",
                                name                    : "",
                                email                   : "",
                                mobile                  : "",
                                cost                    : "",
                                openingTime             : "",
                                closingTime             : "",
                                accHolderName           : "",
                                bankName                : "",
                                AccountNumber           : "",
                                ifscCode                : "",
                                branchName              : "",
                              },
    };
    this.handleChange       = this.handleChange.bind(this);
    this.checkhandleChange  = this.checkhandleChange.bind(this);
    this.getAmenitiesList   = this.getAmenitiesList.bind(this);
    this.getWorkspaceList   = this.getWorkspaceList.bind(this);
  }

  componentDidMount(){
    this.getAmenitiesList();
    this.getWorkspaceList();

     if(this.props.match.params.id){
      var id = this.props.match.params.id;
      axios
        .get('/api/workspaceDetails/get/one/'+id)
        .then((response)=> {
          var responseData = response.data;
          console.log("props---responseData>",responseData);
          this.setState({
              arrayData              : responseData,
              cafeName               : responseData.nameOfCafe,
              area                   : responseData.area,
              address                : responseData.address,
              landmark               : responseData.landmark,
              city                   : responseData.city,
              state                  : responseData.state,
              country                : responseData.country,
              pin                    : responseData.pin,
              numberOfSeats          : responseData.numberOfSeats,
              name                   : responseData.name,
              email                  : responseData.email,
              emailCheck             : responseData.email,
              mobile                 : responseData.mobile,
              cost                   : responseData.cost,
              openingtime            : responseData.openingtime,
              closingtime            : responseData.closingtime,
              amenitiesList          : responseData.facilities, 
              lat                    : responseData.lat,
              long                   : responseData.long,
              logo                   : responseData.logo,
              banner                 : responseData.banner,
              // workspaceImages        : responseData.workspaceImages,  
              imgArrayWSaws          : responseData.workspaceImages,
              bankName               : responseData.bankDetails.bankName,
              AccountNumber          : responseData.bankDetails.AccountNumber,
              ifscCode               : responseData.bankDetails.ifscCode,
              branchName             : responseData.bankDetails.branchName,
              accHolderName          : responseData.bankDetails.accHolderName,     
              editId                 : this.props.match.params.id,         
              editStatus             : "Update"
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
      }

    axios
      .get('/api/projectSettings/get/one/S3')
      .then((response)=>{
        const config = {
                          bucketName      : response.data.bucket,
                          dirName         : 'photos',
                          region          : response.data.region,
                          accessKeyId     : response.data.key,
                          secretAccessKey : response.data.secret,
                       };
        console.log("S3 config = ",config);

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
      })
  }

  // componentWillMount(){
  //   console.log("props---responseData> will",this.props.match.params.id);
   
  // }
  // componentDidUpdate(){

  // }
  componentDidUpdate(nextProps, prevState){
       if(nextProps.match.params.id){
      var id = nextProps.match.params.id;
      axios
        .get('/api/workspaceDetails/get/one/'+id)
        .then((response)=> {
          var responseData = response.data;
          return 
          console.log("props---responseData>123",responseData);
          this.setState({
              arrayData              : responseData,
              cafeName               : responseData.nameOfCafe,
              area                   : responseData.area,
              address                : responseData.address,
              landmark               : responseData.landmark,
              city                   : responseData.city,
              state                  : responseData.state,
              country                : responseData.country,
              pin                    : responseData.pin,
              numberOfSeats          : responseData.numberOfSeats,
              name                   : responseData.name,
              email                  : responseData.email,
              emailCheck             : responseData.email,
              mobile                 : responseData.mobile,
              cost                   : responseData.cost, 
              openingtime            : responseData.openingtime,
              closingtime            : responseData.closingtime,
              amenitiesList          : responseData.facilities, 
              // workspaceImages        : responseData.workspaceImages,              
              imgArrayWSaws          : responseData.workspaceImages,
              bankName               : responseData.bankDetails.bankName,
              AccountNumber          : responseData.bankDetails.AccountNumber,
              ifscCode               : responseData.bankDetails.ifscCode,
              branchName             : responseData.bankDetails.branchName,
              accHolderName          : responseData.bankDetails.accHolderName,                 
          })
        // console.log("imgArrayWSaws111",this.state.imgArrayWSaws)
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
  }

  getAmenitiesList(){
    axios
        .get('/api/workAmenities/get/list')
        .then((response)=> {
            if(response.data){             
                  var count = (response.data).length;
                  var responsedata = response.data;
                  var allData = response.data.map((block)=>{                                       
                                  var o = Object.assign({}, block);
                                      o.checked = false;
                                      return o;
                  })                 
            // console.log('amenitiesList==',allData);
                  this.setState({
                    amenitiesList : allData,
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

  checkhandleChange(event){
    const target = event.target;
    const name   = target.name;
    const value  = target.type === "checkbox" ? target.checked : target.value
    var index    = event.target.getAttribute('data-index');
    this.state.amenitiesList[index].checked = value; 
      console.log("Check",value)
    this.setState({
      [name]: value,
    });

  }
  handleChange(event){
    const target = event.target;
    const name   = target.name;
    this.setState({
      [name]: event.target.value,
    });

    // const target = event.target;
    // const {name , value}   = event.target;
    const datatype = event.target.getAttribute('name');
    console.log('==>>',datatype);
    const {name1,value} = event.target;
    let formerrors = this.state.formerrors;

    switch (datatype){
      case 'cafeName' : 
       formerrors.cafeName = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Cafe Name";
      break;

      case 'address' : 
       formerrors.address = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Address";
      break;

      case 'landmark' : 
       formerrors.landmark = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Landmark";
      break;

      case 'area' : 
       formerrors.area = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Area Name";
      break;

      case 'city' : 
       formerrors.city = addressRegex.test(value)  && value.length>0 ? '' : "Invalid City Name";
      break;

      case 'state' : 
       formerrors.state = addressRegex.test(value)  && value.length>0 ? '' : "Invalid State Name";
      break;

      case 'country' : 
       formerrors.country = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Country Name";
      break;

      case 'pin' : 
        formerrors.pin = pincodeRegex.test(value)   && value.length>0? '' : "Invalid Pincode";
      break;

      case 'numberOfSeats' : 
        formerrors.numberOfSeats = numberRegex.test(value)   && value.length>0? '' : "Invalid count of seats";
      break;

      case 'name' : 
       formerrors.name = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Admin Name";
      break;     

      case 'mobile' : 
       formerrors.mobile = mobileRegex.test(value) && value.length>0 ? '' : "Invalid mobile number";
      break;

      case 'email' : 
        formerrors.email = emailRegex.test(value)  && value.length>0? "":"Invalid Email";
      break;

      case 'cost' : 
        formerrors.cost = numberRegex.test(value)   && value.length>0? '' : "Invalid Beverage Cost";
      break;

      case 'openingTime' : 
        formerrors.openingTime = timeRegex.test(value)   && value.length>0? '' : "Invalid Opening Time";
      break;

      case 'closingTime' : 
        formerrors.closingTime = timeRegex.test(value)   && value.length>0? '' : "Invalid Closing Time";
      break;

      case 'accHolderName' : 
       formerrors.accHolderName = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Account Holder Name";
      break; 
      
      case 'bankName' : 
       formerrors.bankName = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Bank Name";
      break; 
      
      case 'AccountNumber' : 
       formerrors.AccountNumber = numberRegex.test(value)  && value.length>0 ? '' : "Invalid Account Number";
      break; 
      
      case 'ifscCode' : 
       formerrors.ifscCode = addressRegex.test(value)  && value.length>0 ? '' : "Invalid IFSC Code";
      break; 
      
      case 'branchName' : 
       formerrors.branchName = addressRegex.test(value)  && value.length>0 ? '' : "Invalid Branch Name";
      break; 

      default :
      break;

    }
    // this.setState({formerrors,})
    this.setState({ formerrors,
      [name1]:value
    } );
  }

  editItem=(event)=>{
    event.preventDefault();
    $("html,body").scrollTop(0);
    var id = event.target.getAttribute('data-id');
    this.setState({
      id : id,
      editId: id,
      editStatus:"Update"
    })
    this.props.history.push('/addWorkspace/'+id);
     axios
        .get('/api/workspaceDetails/get/one/'+id)
        .then((response)=> {
          console.log("getdata/////////////////",response.data);
          var responseData = response.data;
          this.setState({
              arrayData              : responseData,
              cafeName               : responseData.nameOfCafe,
              area                   : responseData.area,
              address                : responseData.address,
              landmark               : responseData.landmark,
              city                   : responseData.city,
              state                  : responseData.state,
              country                : responseData.country,
              pin                    : responseData.pin,
              numberOfSeats          : responseData.numberOfSeats,
              name                   : responseData.name,
              email                  : responseData.email,
              emailCheck             : responseData.email,
              mobile                 : responseData.mobile,
              amenitiesList          : responseData.facilities, 
              openingtime            : responseData.openingtime, 
              closingtime            : responseData.closingtime, 
              cost                   : responseData.cost, 
              lat                    : responseData.lat,
              long                   : responseData.long,
              logo                   : responseData.logo,
              banner                 : responseData.banner,
              // workspaceImages        : responseData.workspaceImages,            
              imgArrayWSaws          : responseData.workspaceImages,
              bankName               : responseData.bankDetails.bankName,
              AccountNumber          : responseData.bankDetails.AccountNumber,
              ifscCode               : responseData.bankDetails.ifscCode,
              branchName             : responseData.bankDetails.branchName,
              accHolderName          : responseData.bankDetails.accHolderName,          
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
  }

 

  submitWorkspaceInfo=(event)=>{
    event.preventDefault();

    var lattitude = "";
    var longitude = "";

    var fullAddress = this.state.landmark + '+' + this.state.area + '+' + this.state.city + '+' + this.state.state + '+' + this.state.country + '+' + this.state.pin ;
      Geocode.fromAddress(fullAddress).then(
        response => {
          // console.log("google map API keay result--->",response.data);             
          const { lat, lng } = response.results[0].geometry.location;
          lattitude = lat;
          longitude = lng;
          // this.setState({
          //   latitude: lattitude,
          //   longitude: longitude
          // })
          // console.log("Jaipur",lat, lng);
          // console.log("openingtime", openingtime==""?"if"+this.state.openingtime:"else"+openingtime);
          // console.log("closingtime", closingtime==""?"if"+this.state.closingtime:"else"+closingtime);
        
          var workspaceInfoFormValue = {
            nameOfCafe             : this.state.cafeName,
            area                   : this.state.area,
            address                : this.state.address,
            landmark               : this.state.landmark,
            city                   : this.state.city,
            state                  : this.state.state,
            country                : this.state.country,
            pin                    : this.state.pin,
            numberOfSeats          : this.state.numberOfSeats,
            name                   : this.state.name,
            email                  : this.state.email,
            mobile                 : this.state.mobile,
            cost                   : this.state.cost,
            openingtime            : openingtime==""?this.state.openingtime:openingtime,
            closingtime            : closingtime==""?this.state.closingtime:closingtime,
            facilities             : this.state.amenitiesList,
            location               : {latitude: lattitude,longitude:longitude},
            banner                 : this.state.banner,
            logo                   : this.state.logo,
            workspaceImages        : this.state.imgArrayWSaws,
            bankDetails            : {
                                       bankName         :this.state.bankName,
                                       AccountNumber    :this.state.AccountNumber,
                                       ifscCode         :this.state.ifscCode,
                                       branchName       :this.state.branchName,
                                       accHolderName    :this.state.accHolderName,
                                      }
          }//close array
    
          const newUser={
            firstName               : this.state.name,
            lastName                : '',
            emailId                 : this.state.email,
            mobileNumber            : this.state.mobile,
            pwd                     : "coffic123",
            status                  : "Active",
            roles                   : 'vendor',
          }
          console.log("workspaceInfoFormValue-------------->",workspaceInfoFormValue);    
          console.log("newUser-------------->",newUser); 
        
          if(this.props.match.params.id){
            if(formValid(this.state.formerrors)){
              if(this.state.logo!==""&&this.state.imgArrayWSaws.length!==0){
              axios
                .patch('/api/workspaceDetails/patch/update/'+this.state.editId,workspaceInfoFormValue)
                .then((response)=> {
                  swal("Good job!", "Workspace details updated!", "success");
                    console.log('()',workspaceInfoFormValue);
                        this.getWorkspaceList();
                        this.getAmenitiesList();
                        this.props.history.push('/addWorkspace');

                      var responseData = this.state.arrayData;
                      var arrayChange= [
                        {condition : responseData.nameOfCafe  == this.state.cafeName ? true : false,name:"Cafe Name"},
                        {condition : responseData.area  == this.state.area ? true : false,name:"Area"},
                        {condition : responseData.address  == this.state.address ? true : false,name:"Address"},
                        {condition : responseData.landmark  == this.state.landmark ? true : false,name:"Landmark"},
                        {condition : responseData.city  == this.state.city ? true : false,name:"City"},
                        {condition : responseData.state  == this.state.state ? true : false,name:"State"},
                        {condition : responseData.country  == this.state.country ? true : false,name:"Country"},
                        {condition : responseData.pin  == this.state.pin ? true : false,name:"Pin-code"},
                        {condition : responseData.numberOfSeats  == this.state.numberOfSeats ? true : false,name:"Number of Seats"},
                        {condition : responseData.name  == this.state.name ? true : false,name:"Cafe Admin Name"},
                        {condition : responseData.email  == this.state.email ? true : false,name:"Email"},
                        {condition : responseData.mobile  == this.state.mobile ? true : false,name:"Mobile Number"},
                        {condition : responseData.cost  == this.state.cost ? true : false,name:"Beverage Cost"},
                        {condition : responseData.openingtime  == (openingtime==""?this.state.openingtime:openingtime) ? true : false,name:"Opening Time"},
                        {condition : responseData.closingtime  == (closingtime==""?this.state.closingtime:closingtime) ? true : false,name:"Closing Time"},
                        {condition : responseData.facilities  == this.state.amenitiesList ? true : false,name:"Amenities List"},
                        {condition : responseData.bankDetails.bankName  == this.state.bankName ? true : false,name:"Bank Name"},
                        {condition : responseData.bankDetails.AccountNumber  == this.state.AccountNumber ? true : false,name:"Account Number"},
                        {condition : responseData.bankDetails.ifscCode  == this.state.ifscCode ? true : false,name:"IFSC Code"},
                        {condition : responseData.bankDetails.branchName  == this.state.branchName ? true : false,name:"Branch Name"},
                        {condition : responseData.bankDetails.accHolderName  == this.state.accHolderName ? true : false,name:"AccHolder Name"},
                        {condition : responseData.banner  == this.state.banner ? true : false,name:"WorkSpace Banner"},
                        {condition : responseData.logo  == this.state.logo ? true : false,name:"Wprkspace Logo"},
                        {condition : responseData.workspaceImages  == this.state.imgArrayWSaws ? true : false,name:"Workspace Images"},
                      ]
                        // console.log("array",array);
                        var newArray = [];
                        for (var i = 0; i < arrayChange.length; i++) {
                          if(arrayChange[i].condition==false){
                            var obj = arrayChange[i].name;
                            newArray.push(obj);
                          }
                        }
                        var changedFields = newArray.toString()
                        // console.log("changedFields",changedFields);

                        var sendNotificationData = {
                                                    "templateName"        : "Vendor-Vendor Profile Changes",
                                                    "toUserId"            : responseData._id,
                                                    "variables"           : {
                                                                              "Edit" : changedFields!==""?changedFields:"No sigle field is changed",
                                                                            }
                                                   }
                        console.log("params id",responseData._id);
                        console.log("sendData",sendNotificationData);
                        axios
                          .post('/api/masternotifications/post/sendNotification',sendNotificationData)
                          .then((res) =>{
                              console.log("SendEmailNotificationToUser",res);           
                          })
                          .catch((error)=>{
                             console.log("error = ",error);
                             if(error.message === "Request failed with status code 401")
                             {
                                swal("Your session is expired! Please login again.","", "error");
                                this.props.history.push("/");
                             }
                          });
                          openingtime = "";
                          closingtime = "";
                          this.setState({
                            cafeName             : '',
                            area                 : '',
                            address              : '',
                            validity             : '',
                            landmark             : '',
                            city                 : '',
                            state                : '',
                            country              : '',
                            pin                  : '',
                            numberOfSeats        : '',
                            name                 : '',
                            email                : '',
                            emailCheck           : '',
                            mobile               : '',
                            cost                 : '',
                            facilities           : '',
                            openingtime          : '',
                            closingtime          : '',
                            banner               : '',
                            logo                 : '',
                            imgArrayWSaws        : [],
                            accHolderName        : "",
                            bankName             : "",
                            AccountNumber        : "",
                            ifscCode             : "",
                            branchName           : "",
                        })
              })
              .catch(function (error) {
                console.log(error);
                swal("Oops", "Workspace Information updation failed!", "danger")
              })
              .finally(function () {
              });
            }else{
                swal("Please enter mandatory fields", "Please ensure that you have uploaded 'Logo' & 'Workspace Images'", "warning");
            }
          }else{
              swal("Please enter mandatory fields", "", "warning");
          }
        }else{
            if(formValid(this.state.formerrors)){
              if(openingtime!==""&&closingtime!==""&&this.state.logo!==""&&this.state.imgArrayWSaws.length!==0){
                axios.post('/api/users/post/vendor',newUser)
                  .then((res)=>{
                    console.log('user id',res.data);
                    console.log('message',res.data.message);
                    var userid = res.data.user_id;
                    if(res.data.message!=="Email Id already exists" && res.data.message=="NEW-USER-CREATED") {
                      workspaceInfoFormValue.cafeAdmin = userid;
                      if(workspaceInfoFormValue.cafeAdmin){
                      console.log('workspaceInfoFormValue after adding user',workspaceInfoFormValue)
                        axios.post('/api/workspaceDetails/post',workspaceInfoFormValue)
                          .then((response)=>{
                            swal("Good job!", "Workspace information submitted! and QR code is generated", "success");
                            this.getWorkspaceList();
                            this.getAmenitiesList();
                            openingtime = "";
                            closingtime = "";
                            this.setState({
                              cafeName             : '',
                              area                 : '',
                              address              : '',
                              validity             : '',
                              landmark             : '',
                              city                 : '',
                              state                : '',
                              country              : '',
                              pin                  : '',
                              numberOfSeats        : '',
                              name                 : '',
                              email                : '',
                              emailCheck           : '',
                              mobile               : '',
                              cost                 : '',
                              facilities           : '',
                              openingtime          : '',
                              closingtime          : '',
                              banner               : '',
                              logo                 : '',
                              imgArrayWSaws        : [],
                              accHolderName        : "",
                              bankName             : "",
                              AccountNumber        : "",
                              ifscCode             : "",
                              branchName           : "",
                            }) 
                          })
                          .catch(function(error){
                            console.log('error',error);
                            if(error.message === "Request failed with status code 401")
                            {
                                 swal("Your session is expired! Please login again.","", "error");
                                 this.props.history.push("/");
                            }
                          });
                        }else{
                            swal("Oops...!", "Something went wrong", "warning");
                        }
                      }else{
                          swal("Oops...!", "Vendor already exist", "warning");
                      }
                  })
                  .catch((error)=>{
                    console.log('error',error);
                   if(error.message === "Request failed with status code 401")
                    {
                         swal("Your session is expired! Please login again.","", "error");
                         this.props.history.push("/");
                    }
                  })
                  .finally(function(){
                  });
                }else{
                  swal("Please enter mandatory fields", "Please ensure that you have entered 'Opening Time' & 'Closing Time' and uploaded 'Logo' & 'Workspace Images'", "warning");
                }
              }else{
                swal("Please enter mandatory fields", "", "warning");
              }
          }
        },
          error => {
            swal("Sorry...!", "Please enter all address fields carefully", "warning");
            console.error("map key error = ",error);
          }
        );  
  }

  getWorkspaceList(){
    // var object;
    var array = [];
    axios
    .get('/api/workspaceDetails/get/list/')
    .then((response)=> {
      console.log("Response 1 =",response.data);
        this.setState({
          dataArray : response.data
        },()=>{
          this.getseats();
        })

      // console.log("get---------response",response.data);
      if(response.data=="Workspace Details not found" || response.data==[]){
        this.setState({
          workSpaceList : []
        })
      }else{
        this.setState({
          workSpaceList : response.data
        })
      }
     
    })
    .catch(function (error) {
      console.log(error);
    if(error.message === "Request failed with status code 401")
          {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
    })

  }

  getseats(){
    var data = this.state.dataArray;
          for (var i = 0; i < data.length; i++) {
          var object = data[i];
          var arr=[];
                if(data[i]._id){
                  axios
                    .get('/api/seatbooking/get/availableSeats/'+data[i]._id)
                    .then((response)=> {
                      console.log("availableSeats----y-----",response.data);
                      var dataArr = this.state.dataArray;
                      // console.log("object-----j----",i,dataArr[i]);
                      arr.push(data[i]);
                    })
                    .catch(function (error) {
                      console.log(error);
                        if(error.message === "Request failed with status code 401")
                          {
                               swal("Your session is expired! Please login again.","", "error");
                               this.props.history.push("/");
                          }
                    })
                }
        }
  }

  uploadBannerImage(event){
    event.preventDefault();
    var index = event.target.getAttribute('id');
    var uId = event.target.getAttribute('id');
    // console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      // console.log("file",newFile);
      if (newFile) {
      // console.log("config--------------->",this.state.config);
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
          if (newFile) {
            if(this.state.banner==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{
                  console.log("Data = ",Data);
                  this.setState({
                    banner : Data.location
                  })
                  this.deleteimageBanner(index)
                })
                .catch((error)=>{
                  console.log("formErrors");
                  console.log(error);
                  if(error.message === "Request failed with status code 401")
                  {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
                  }
                })
            }else{
                  swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                    if (success) {
                      S3FileUpload
                        .uploadFile(newFile,this.state.config)
                        .then((Data)=>{
                          console.log("Data = ",Data);
                          this.setState({
                            banner : Data.location
                          })
                          this.deleteimageBanner(index)
                        })
                        .catch((error)=>{
                          console.log("formErrors");
                          console.log(error);
                          if(error.message === "Request failed with status code 401")
                          {
                           swal("Your session is expired! Please login again.","", "error");
                           this.props.history.push("/");
                          }
                        })
                    } else {
                      swal("Your information is safe!");
                    }
                  });
            }
          }else{          
            swal("File not uploaded","Something went wrong","error");  
          }     
        }else{ 
          swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
        }
      }
    }
  }

  deleteimageBanner(index){
    var data = index.split("/");
    var imageName = data[4];
    // console.log("index1--------------->",imageName);
      if(index){
        S3FileUpload
          .deleteFile(imageName,this.state.config)
          .then((response) =>{ 
            console.log("Deletedddd...",response)
            swal("Image deleted successfully");
          })
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
          })
      }
  }
  deleteimageBannerDirect(event){
    event.preventDefault();
    swal({
          title: "Are you sure you want to delete this image?",
          text: "Once deleted, you will not be able to recover this image!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
              swal("Your image is deleted!");
              this.setState({
                banner : ""
              })
            } else {
            swal("Your image is safe!");
          }
        });  
  }

  uploadLogoImage(event){
   event.preventDefault();
    var index = event.target.getAttribute('id');
    console.log("index--------------->",index);
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      console.log("file",newFile);
      if (newFile) {
      // console.log("config--------------->",this.state.config);
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
          if (newFile) {
            if(this.state.logo==""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{
                  console.log("Data = ",Data);
                  this.setState({
                    logo : Data.location
                  })
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log("formErrors");
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            console.log("Data = ",Data);
                            this.setState({
                              logo : Data.location
                            })
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
                            console.log("formErrors");
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }          
          }else{          
            swal("File not uploaded","Something went wrong","error");  
          }     
        }else{ 
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");   
        }
      }
    }
  }

  deleteimageLogo(index){
    var data = index.split("/");
    var imageName = data[4];
    console.log("index1--------------->",imageName);
      if(index){
        S3FileUpload
          .deleteFile(imageName,this.state.config)
          .then((response) =>{ 
            console.log("Deletedddd...",response)
            swal("Image deleted successfully");
          })
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
          })
      }
  }
  
  deleteimagelogoDirect(event){
    event.preventDefault();
    swal({
          title: "Are you sure you want to delete this image?",
          text: "Once deleted, you will not be able to recover this image!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
              swal("Your image is deleted!");
              this.setState({
                logo : ""
              })
            } else {
            swal("Your image is safe!");
          }
        });
  }

  uploadworkspaceImage(event){
   event.preventDefault();
   let self = this;
   if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      // console.log("file",newFile);
      if (newFile) {
      // console.log("config--------------->",this.state.config);
        var ext = newFile.name.split('.').pop();
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
          if (newFile) {
            S3FileUpload
              .uploadFile(newFile,this.state.config)
              .then((Data)=>{
                console.log("Data = ",Data);
                  var obj1={
                    imgPath : Data.location,
                  }
                  var imgArrayWSaws = this.state.imgArrayWSaws;
                  imgArrayWSaws.push(obj1);
                  this.setState({
                    // workspaceImages : imgArrayWSaws
                    imgArrayWSaws : imgArrayWSaws
                  })
              })
              .catch((error)=>{
                console.log("formErrors");
                console.log(error);
              })

            // var objTitle={   
            //   fileInfo :newFile
            // }
            // // var imgTitleArrayWS = [];
            // imgTitleArrayWS.push(objTitle);
            // this.setState({
            //   imageTitleArrayWS : imgTitleArrayWS
            // })
            //  console.log('imgArrayWS = ',imgTitleArrayWS);


          }else{          
            swal("File not uploaded","Something went wrong","error");  
          }
        }else{
          swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
        }
      }
    }
  }

  deleteimageWS(e){
    e.preventDefault();
    var index = e.target.getAttribute('id');
    var filePath = e.target.getAttribute('data-id');
    var data = filePath.split("/");
    var imageName = data[4];
    console.log("imageName==",imageName);

    if(index){
      swal({
            title: "Are you sure you want to delete this image?",
            text: "Once deleted, you will not be able to recover this image!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              var array = this.state.imgArrayWSaws; // make a separate copy of the array
              array.splice(index, 1);
              swal("Image deleted successfully");
              this.setState({
                imgArrayWSaws: array
              });
            }else {
              swal("Your image is safe!");
            }
          });
    }
  }

  deleteItem=(event)=>{
    event.preventDefault();
    console.log('innnnn.....')
    var id = event.target.getAttribute('data-id');
    if(id){
      swal({
            title: "Are you sure you want to delete this workspace?",
            text: "Once deleted, you will not be able to recover this workspace!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                 axios
                      .delete('/api/workspaceDetails/delete/'+id)
                      .then((response)=> {
                        if(response.data=='workspace deleted'){
                          swal("Workspace deleted successfully");
                          this.props.history.push('/addWorkspace');
                          window.location.reload();
                          this.getWorkspaceList(); 
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

  render(){
    let {facilities} = this.state;
     // console.log("facilities--",this.state.facilities);
    return(
      <div id="editDetails" className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader">
          <h4 className="h5lettersp MasterBudgetTitle">Workspace Details</h4>
         </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noborderC">
                <h5 className="h5Title  col-lg-12 col-md-12 col-sm-12 col-xs-12">Basic Info</h5>
            </div>    
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls"> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                   <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="control-label statelabel locationlabel" >Name of Cafe</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <span className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-coffee"></i>
                         </span>  
                        <input id="cafeName" ref="cafeName" onChange={this.handleChange}
                         type="text" name="cafeName" value={this.state.cafeName} placeholder="Enter Name of Cafe"
                        className="form-control areaStaes newinputbox" title="Please enter cafe name" />
                       </div> 
                       {this.state.formerrors.cafeName &&(
                          <span className="text-danger">{this.state.formerrors.cafeName}</span> 
                        )}
                    </div>  
                  </div>
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Address</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                           <span className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-map-marker"></i>
                         </span>  
                        <input id="address" placeholder="Enter Address" value={this.state.address}
                         type="text" name="address" ref="address" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Enter Address here" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.address &&(
                          <span className="text-danger">{this.state.formerrors.address}</span> 
                        )}
                    </div>  
                  </div>  
                 </div> 
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                   <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Near By Landmark</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx  col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                           <span className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-map-marker"></i>
                         </span>  
                        <input id="landmark" value={this.state.landmark} ref="landmark"
                         type="text" name="landmark" placeholder="Enter Near By Landmark" onChange={this.handleChange}
                        className="form-control areaStaes newinputbox" title="Please enter landmark" />
                       </div> 
                       {this.state.formerrors.landmark &&(
                          <span className="text-danger">{this.state.formerrors.landmark}</span> 
                        )}
                    </div>  
                  </div>
                  <div className=" formht col-lg-6 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Area</label>
                        <span className="astrick">*</span><label className="control-label statelabel locationlabel" >&nbsp;<i>(this will be used to detect location by users)</i></label>
                        <div className="input-group inputBox-main  new_inputbx  col-lg-12 col-md-12 col-sm-12 col-xs-12  " >
                           <span className="input-group-addon remove_brdr inputIcon">
                            <i className="fa fa-map-marker"></i>
                         </span>  
                        <input id="area" placeholder="Enter Area" value={this.state.area}
                         type="text" name="area" ref="area" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="User will use this data to search your cafe" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.area &&(
                          <span className="text-danger">{this.state.formerrors.area}</span> 
                        )}
                    </div>  
                  </div>  
                 </div> 
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >City</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <span className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-map-marker"></i>
                         </span>  
                        <input id="accessKeytype"  onChange={this.handleChange} 
                         type="text" name="city" placeholder="Enter City" ref="city" value={this.state.city}
                        className="form-control areaStaes newinputbox" title="Please enter city name" />
                        </div> 
                        {this.state.formerrors.city &&(
                          <span className="text-danger">{this.state.formerrors.city}</span> 
                        )}
                    </div>  
                  </div>
                  <div className=" formht col-lg-3 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="">
                        <label className="control-label statelabel locationlabel">State</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <span className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-map-marker"></i>
                         </span>  
                        <input id="state" placeholder="Enter State" value={this.state.state}
                         type="text" name="state" ref="state" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Please enter state name" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.state &&(
                          <span className="text-danger">{this.state.formerrors.state}</span> 
                        )}
                    </div> 
                   </div>  
                    <div className="formht col-lg-3 col-md-12 col-sm-12 col-xs-12 zzero">
                     <div className="">
                        <label className="control-label statelabel locationlabel" >Country</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx">
                           <div className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-map-marker"></i>
                         </div>  
                        <input id="country" placeholder="Enter Country" value={this.state.country}
                         type="text" name="country" ref="country" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Please enter country name" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.country &&(
                          <span className="text-danger">{this.state.formerrors.country}</span> 
                        )}
                    </div>  
                  </div>       
                  <div className=" formht col-lg-3 col-md-12 col-sm-12 col-xs-12 zzero">
                     <div className="">
                        <label className="control-label statelabel locationlabel" >Pin/Zip Code</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx">
                           <div className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-map-marker"></i>
                         </div>  
                        <input id="pin" placeholder="Enter Pin" value={this.state.pin}
                         type="number" name="pin" ref="pin" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Please enter pin code" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.pin &&(
                          <span className="text-danger">{this.state.formerrors.pin}</span> 
                        )}
                    </div>  
                  </div>               
                 </div>
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                  <h5 className="h5Title  col-lg-12 col-md-12 col-sm-12 col-xs-12">Work Amenities</h5>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                   <div className="form-group formht col-lg-2 col-md-12 col-sm-12 col-xs-12">
                     <div className="form-group">
                        <label className="control-label statelabel locationlabel">Number of Seats</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx"> 
                        <input id="numberOfSeats" placeholder="Enter No.(Ex: 10)" ref="numberOfSeats"  
                         onChange={this.handleChange} type="number" className="form-control seats newinputbox"
                         name="numberOfSeats" value={this.state.numberOfSeats} title="Please enter total no. of seats" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.numberOfSeats &&(
                          <span className="text-danger">{this.state.formerrors.numberOfSeats}</span> 
                        )}
                    </div> 
                   </div>
                   <div className="form-group formhtcol-lg-offset-1 col-lg-10 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                    <label className="control-label statelabel locationlabel addlabelprop" >Amenities</label>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="  col-lg-12 Facilities">
                     {this.state.amenitiesList.map((facilities,index)=>{
                      return(
                        <React.Fragment key={index}>
                         <div className="col-lg-3">
                          <input id="companyName" key={index} type="checkbox"  className="companyNamechkbx1" 
                          name={"companyNamechkbx-"+index} data-index={index} checked={facilities.checked}  onChange={this.checkhandleChange}  />
                          <span className="vertAlgn"><i className="material-icons">{facilities.icon}</i></span>&nbsp;&nbsp;{facilities.amenityName}
                         </div>
                        </React.Fragment>
                       )
                      })
                     } 
                    </div>
                  </div>   
                  </div> 
                 </div>
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                  <h5 className="h5Title  col-lg-12 col-md-12 col-sm-12 col-xs-12">Cafe Admin Details</h5>
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className=" formht col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <label className="control-label statelabel locationlabel" >Name</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <span className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-user"></i>
                         </span>  
                        <input id="accessKeytype"  onChange={this.handleChange} 
                         type="text" name="name" placeholder="Enter Name" ref="name" value={this.state.name}
                         className="form-control areaStaes newinputbox" title="Please enter admin name" />
                        </div> 
                        {this.state.formerrors.name &&(
                          <span className="text-danger">{this.state.formerrors.name}</span> 
                        )}
                    </div>  
                  </div>
                  <div className=" formht col-lg-4 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="">
                        <label className="control-label statelabel locationlabel">Mobile</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <span className="input-group-addon remove_brdr inputIcon">
                          <i className="fa fa-mobile"></i>
                         </span>  
                        <input id="mobile" placeholder="Enter Mobile" value={this.state.mobile}
                         type="text" name="mobile" ref="mobile" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Please enter mobile number" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.mobile &&(
                          <span className="text-danger">{this.state.formerrors.mobile}</span> 
                        )}
                    </div> 
                   </div>  
                    <div className="formht col-lg-4 col-md-12 col-sm-12 col-xs-12 zzero">
                     <div className="">
                        <label className="control-label statelabel locationlabel" >Email</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-envelope-square"></i>
                         </div>  
                        <input id="email" placeholder="Enter Email" value={this.state.email} disabled={this.state.emailCheck==""?false:true}
                         type="text" name="email" ref="email" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Please enter email Id" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.email &&(
                          <span className="text-danger">{this.state.formerrors.email}</span> 
                        )}
                    </div>  
                  </div>             
                 </div>
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <h5 className="h5Title  col-lg-12 col-md-12 col-sm-12 col-xs-12">Others</h5>
                   <div className="formht col-lg-4 col-md-12 col-sm-12 col-xs-12 zzero">
                     <div className="">
                        <label className="control-label statelabel locationlabel" >Beverage Cost (in Rs.)</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                           <i className="fa fa-rupee"></i>
                         </div>  
                        <input id="cost" placeholder="Enter Beverage Cost" value={this.state.cost}
                         type="number" name="cost" ref="cost" onChange={this.handleChange}
                         className="form-control areaStaes newinputbox" title="Please enter cost of menu" autoComplete="off"  />
                        </div> 
                        {this.state.formerrors.cost &&(
                          <span className="text-danger">{this.state.formerrors.cost}</span> 
                        )}
                    </div>  
                  </div>
                  <div className="formht col-lg-4 col-md-12 col-sm-12 col-xs-12 zzero">
                     <div className="">
                        <label className="control-label statelabel locationlabel" >Opening Time</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main  new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                           <i className="glyphicon glyphicon-time"></i>
                         </div>
                        <TimePicker
                            showSecond={false} 
                            defaultValue={this.state.openingtime}  
                            placeholder={this.state.openingtime!==""?moment(this.state.openingtime).format('hh:mm A'):"Enter Opening Time"} 
                            className="form-control areaStaes newinputbox" 
                            onChange={onChangeOT} 
                            title="Please enter opening time here"
                            name="openingTime"
                            format={format}
                            use12Hours
                            inputReadOnly
                          />
                        </div>
                        {this.state.formerrors.openingTime &&(
                          <span className="text-danger">{this.state.formerrors.openingTime}</span> 
                        )}
                      </div>  
                    </div>
                    <div className="ormht col-lg-4 col-md-12 col-sm-12 col-xs-12 zzero">
                        <label className="control-label statelabel locationlabel" >Closing Time</label>
                        <span className="astrick">*</span>
                        <div className="input-group inputBox-main new_inputbx " >
                           <div className="input-group-addon remove_brdr inputIcon">
                           <i className="glyphicon glyphicon-time"></i>
                         </div>  
                         <TimePicker
                            showSecond={false} 
                            defaultValue={this.state.closingtime}  
                            placeholder={this.state.closingtime!==""?moment(this.state.closingtime).format('hh:mm A'):"Enter Closing Time"} 
                            className="form-control areaStaes newinputbox" 
                            onChange={onChangeCT}  
                            title="Please enter closing time here"
                            name="closingTime"
                            format={format}
                            use12Hours
                            inputReadOnly
                          />
                        </div> 
                        {this.state.formerrors.closingTime &&(
                          <span className="text-danger">{this.state.formerrors.closingTime}</span> 
                        )}
                    </div>           
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                  <h5 className="h5Title  col-lg-12 col-md-12 col-sm-12 col-xs-12">Bank Details</h5>
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="formht col-lg-4 col-md-12 col-sm-12 col-xs-12 zzero">
                    <div className="">
                    <label className="control-label statelabel locationlabel" >Account Holder Name</label>
                    <span className="astrick">*</span>
                      <div className="input-group inputBox-main  new_inputbx " >
                        <div className="input-group-addon remove_brdr inputIcon">
                          <i className="fa fa-university"></i>
                        </div>  
                          <input id="accHolderName" placeholder="Enter Account Holder Name" value={this.state.accHolderName}
                           type="text" name="accHolderName" ref="accHolderName" onChange={this.handleChange}
                           className="form-control areaStaes newinputbox" title="Please Enter Account Holder Name here" autoComplete="off"  />
                          </div> 
                          {this.state.formerrors.accHolderName &&(
                            <span className="text-danger">{this.state.formerrors.accHolderName}</span> 
                          )}
                        </div> 
                      </div> 
                      <div className="formht col-lg-4 col-md-4 col-sm-4 col-xs-4 zzero">
                        <div className="">
                          <label className="control-label statelabel locationlabel" >Bank Name</label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon remove_brdr inputIcon">
                             <i className="fa fa-university"></i>
                           </div>  
                          <input id="bankName" placeholder="Enter Bank Name" value={this.state.bankName}
                           type="text" name="bankName" ref="bankName" onChange={this.handleChange}
                           className="form-control areaStaes newinputbox" title="Please Enter Bank Name here" autoComplete="off"  />
                          </div> 
                          {this.state.formerrors.bankName &&(
                            <span className="text-danger">{this.state.formerrors.bankName}</span> 
                          )}
                        </div> 
                      </div> 
                      <div className="formht col-lg-4 col-md-4 col-sm-4 col-xs-4 zzero">
                        <div className="">
                          <label className="control-label statelabel locationlabel" >Account Number</label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon remove_brdr inputIcon">
                             <i className="glyphicon glyphicon-time"></i>
                           </div>  
                          <input id="AccountNumber" placeholder="Enter Account Number" value={this.state.AccountNumber}
                           type="text" name="AccountNumber" ref="AccountNumber" onChange={this.handleChange}
                           className="form-control areaStaes newinputbox" title="Please Enter Account Number here" autoComplete="off"  />
                          </div> 
                          {this.state.formerrors.AccountNumber &&(
                            <span className="text-danger">{this.state.formerrors.AccountNumber}</span> 
                          )}
                        </div> 
                      </div>
                       <div className="formht col-lg-4 col-md-4 col-sm-4 col-xs-4 take_top compinfotp1 zzero">
                        <div className="">
                          <label className="control-label statelabel locationlabel" >Enter IFSC Code</label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main  new_inputbx " >
                             <div className="input-group-addon remove_brdr inputIcon">
                             <i className="glyphicon glyphicon-time"></i>
                           </div>  
                          <input id="ifscCode" placeholder="Enter IFSC Code" value={this.state.ifscCode}
                           type="text" name="ifscCode" ref="ifscCode" onChange={this.handleChange}
                           className="form-control areaStaes newinputbox" title="Please Enter IFSC Code here" autoComplete="off"  />
                          </div> 
                          {this.state.formerrors.ifscCode &&(
                            <span className="text-danger">{this.state.formerrors.ifscCode}</span> 
                          )}
                        </div> 
                      </div> 
                       <div className="formht col-lg-4 col-md-4 col-sm-4 col-xs-4 take_top compinfotp1 zzero">
                        <div className="">
                          <label className="control-label statelabel locationlabel" >Enter Branch Name</label>
                          <span className="astrick">*</span>
                          <div className="input-group inputBox-main new_inputbx " >
                             <div className="input-group-addon remove_brdr inputIcon">
                              <i className="fa fa-map-marker"></i>
                           </div>  
                           <input id="branchName" placeholder="Enter Branch Name" value={this.state.branchName}
                           type="text" name="branchName" ref="branchName" onChange={this.handleChange}
                           className="form-control areaStaes newinputbox" title="Please Enter Branch Code here" autoComplete="off"  />
                          </div> 
                          {this.state.formerrors.branchName &&(
                            <span className="text-danger">{this.state.formerrors.branchName}</span> 
                          )}
                        </div> 
                      </div> 
                  </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  {this.state.banner==""?
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Banner Image</h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-2 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Your Banner</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadBannerImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                    :null}
                  {this.state.banner==""?
                    null
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Banner Image</h5>
                      </div>
                      <div className="containerC">
                        <label id="" className="pull-right custFaTimes1" title="Delete image" onClick={this.deleteimageBannerDirect.bind(this)}>X</label>
                        <img src={this.state.banner} alt="Avatar" className="imageC"/>
                        <div className="middleC">
                          <div className="textC">
                            <input type="file" title="Click to change the photo" multiple name="userPic" id={this.state.banner} onChange={this.uploadBannerImage.bind(this)} ref="workspaceImg" className="form-control click_input" />
                            <i className="fa fa-camera fa-2x"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>       
                  }                  
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  {this.state.logo==""?
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Logo <span className="astrick">*</span></h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon move_hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-2 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Your Logo</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadLogoImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                    :null}
                  {this.state.logo==""?
                    null
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Logo <span className="astrick">*</span></h5>
                      </div>
                      <div className="containerC">
                        <label id="logoImage" className="pull-right custFaTimes1" title="Delete image" onClick={this.deleteimagelogoDirect.bind(this)}>X</label>
                        <img src={this.state.logo} alt="Avatar" className="imageC"/>
                        <div className="middleC">
                          <div className="textC">
                            <input type="file" title="Click to change the photo" name="userPic" id={this.state.logo} onChange={this.uploadLogoImage.bind(this)} ref="workspaceImg" className="form-control click_input" />
                            <i className="fa fa-camera fa-2x"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                  }                  
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  {this.state.imgArrayWSaws==null?
                    null
                  :
                    this.state.imgArrayWSaws.map((data,index)=>{
                      return(
                              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                                  <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Workspace Image {index+1}</h5>
                                </div> 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                  <div className="imgcss" key={index}>
                                    <label id={index} className="pull-right custFaTimes" title="Delete image" data-id={data.imgPath} onClick={this.deleteimageWS.bind(this)}>X</label>
                                    <img className="img-responsive" src={data.imgPath}/>
                                  </div>
                                </div>
                              </div>
                            )
                    })
                  }
                  {this.state.imgArrayWSaws.length<=0?
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Workspace Images <span className="astrick">*</span></h5>
                      </div> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k ">
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center below_text">
                           <b className="text_k11"></b>
                           <span className="under_ln">Choose Workspace Images</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadworkspaceImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgdetails">(max size: 1 Mb, Format: JPEG, jpg, png)</div>
                    </div>
                  :
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 row padTopC">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        <h5 className="h5Title col-lg-12 col-md-12 col-sm-12 col-xs-12">Add Images <span className="astrick">*</span></h5>
                      </div> 
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="clr_k" style={{height:"120px"}}>
                          <div className="col-lg-offset-1 col-lg-2 col-md-12 col-sm-12 col-xs-12 hand_icon1">
                            <img src="/images/Upload-Icon.png"/>
                          </div>
                          <div  className= "col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 below_text">
                           <b className="text_k11"></b>
                           <span className="text-center under_ln">Choose another image</span>
                          </div>      
                          <input  type="file" title="Click to attach file" multiple name="userPic" onChange={this.uploadworkspaceImage.bind(this)} ref="workspaceImg"  className="form-control click_input" id="upload-file2" />
                        </div> 
                      </div>
                    </div>
                }
                </div>
              </div>
                {/*<div className="border border-dark">
                  <img className="well" src={"https://qrickit.com/api/qr.php?d="+this.state.QRCode+"&addtext=Coffic&txtcolor=442EFF&fgdcolor=000000&bgdcolor=ffffff&logotext=Vendor&qrsize=50&margin=50&t=p&e=m"} alt="QR Code"/>
                </div>*/}
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginBtmDiv noborder">
                <button className="btn buttontAddEdit pull-right" id="btnCheck" onClick={this.submitWorkspaceInfo.bind(this)}>{this.props.match.params.id?"Update":"Submit"}</button>
              </div>
              <div className="col-lg-12">
                <table className="table tableCustom table-striped">
                  <thead className="bgThead">
                    <tr>
                      <th>Sr.No.</th>
                      <th>Workspace Name</th>
                      <th>Total no. of seats</th>
                      <th>Admin Email</th>
                      <th className="text-center">QR Code</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  {console.log("this.state.workSpaceList = ",this.state.workSpaceList)}
                  {this.state.workSpaceList && this.state.workSpaceList.length>0?
                    <tbody>
                      {this.state.workSpaceList.map((itemData,index)=>{
                          return (
                              <tr key={index}>
                                <td>{index+1}.</td>
                                <td>{itemData.nameOfCafe}</td>
                                <td className="text-center">{itemData.numberOfSeats}</td>
                                <td>{itemData.email}</td>
                                <td className="text-center"><i className="fa fa-qrcode fa-1x cptr" title="Click here to display / download the QR Code" data-toggle="modal" data-target={"#QRModal"+index}></i>
                                  <div className="modal fade in" id={"QRModal"+index} role="dialog">
                                    <div className="modal-dialog modal-md">
                                      <div className="modal-body dashboardModImg" style={{marginLeft:"90px"}}>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 closeBtn" data-dismiss="modal">
                                          <i class="fa fa-times"></i>
                                        </div>
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10" style={{top:'17%'}}>
                                          <p className="text-center" style={{lineHeight:1}}>QR Code of <b>: {itemData.nameOfCafe}</b></p>
                                        </div>
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 marTop16">
                                          <QRCode className="well marBtm0" id={"QRCodeGen"+index} value={itemData.workspace_id} size={200} level={"H"} includeMargin={true} />
                                        </div>  
                                        <span className="col-lg-offset-2 col-lg-6 col-md-offset-3 col-md-6 col-sm-offset-3 col-sm-6" title="Click to download QR Code"><Link data-name={itemData.nameOfCafe} data-id={"QRCodeGen"+index} onClick={downloadQR}>Download QR Code</Link></span>
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10" style={{top:"200px"}}>
                                        </div>     
                                      </div>   
                                    </div>
                                  </div>
                                </td>
                                <td className="text-left"><i className="fa fa-pencil cptr" title="Edit" data-id={itemData.workspace_id} onClick={this.editItem}></i> &nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-trash cptr" title="Delete" data-id={itemData.workspace_id} onClick={this.deleteItem} data-toggle="modal" aria-labelledby="myModal" data-target={"myModal"+itemData.workspace_id} aria-hidden="true"></i></td>
                              </tr>
                            )
                        })
                      }
                    </tbody>
                    :
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center">No record found</td>                 
                      </tr>
                    </tbody>
                  }
                </table>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}
export default addWorkspace;