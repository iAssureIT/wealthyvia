import React, { Component }       from 'react';
import OwlCarousel                from 'react-owl-carousel';
import axios                      from "axios";
import swal                       from 'sweetalert';
import $                          from 'jquery';
import moment               from 'moment';
import Moment                from 'moment';
import RiskProfile               from '../../pages/ClientDashboard/RiskProfile.js';
import Addkycdetails             from '../../pages/ClientDashboard/Addkycdetails.js';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import "./SubscribedServices.css";
var subscribed ="";
export default class SubscribedServices extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv             : "5gcpm",
          Blogs                 : "",
          calculatedDate        : "",
          date                  : "",
          date1                 : "",
          createdAt             : "",
          offeringTitle         : "",
          userOfferingsChecked  : "",
          listOfPerformanceDoc  : "",
          StartDate             : "",
          validityPeriod        : "",
          EndDate               : "",
          numPages              : null,
          pageNumber            : 1,
          subscribed            : false,
          blogSubscribed        : "",
          subscriptionData      : [],
          expiredproductSub     : []
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.Blogs.length!==this.state.Blogs.length){
      this.setState({
            Blogs:this.state.Blogs
          });
    }
  }

  closeproductexpiremodal(event){
    event.preventDefault();
    $("#productexpiredModal").hide();  
    $("body").removeClass("modal-open");
    $("#overlayproductexpired").hide(); 
    $("#productexpiredModal").removeClass('in'); 
  }

  componentDidMount()
  {
    var user_ID = localStorage.getItem("user_ID");
    axios.get("/api/offeringsubscriptions/get/offsubscription/"+user_ID)
            .then((response)=>{ 
              // console.log("off sub", response.data);
              var offeringsubscription = response.data;
              var expiredproductsub = [];
              if(offeringsubscription.length > 0){
                for(let i=0; i<offeringsubscription.length; i++){
                  // console.log("1->", offeringsubscription[i].endDate, Moment().format('YYYY-MM-DD'));
                  if(offeringsubscription[i].endDate < Moment().format('YYYY-MM-DD')){
                    // console.log("expired");
                    var expiredsub = {
                      productname : offeringsubscription[i].offeringTitle,
                      startdate   : offeringsubscription[i].startDate,
                      endDate     : offeringsubscription[i].endDate
                    }
                    expiredproductsub.push(expiredsub);
                    this.setState({expiredproductSub : expiredproductsub});
                    $("#productexpiredModal").show();  
                    $("body").addClass("modal-open ");
                    $("#overlayproductexpired").show(); 
                    $("#productexpiredModal").addClass('in'); 
                  }
                }
                
              }
                           

            })
            .catch((error)=>{
                  console.log('error', error);
            }) 

    
    var url = window.location.href;
    var activeTab = url.substring(url.indexOf("#") + 1);
    // console.log("hash", activeTab);
    if(url.includes("#")){
       $(".tab-pane").removeClass("active in");
       $("#" + activeTab).addClass("active in");

    }
    
    // console.log("user_ID",user_ID)
    axios
        .get('/api/subscriptionorders/paymentOrderDetailsUser/'+user_ID)
        .then((userStatus)=>{
          // console.log("userStatus",userStatus)
          this.setState({
              userStatus    :userStatus.data[0].paymentStatus,
              blogSubscribed:userStatus.data[0],
              validityPeriod:userStatus.data[0].validityPeriod,
              createdAt     :moment(userStatus.data[0].createdAt).format("YYYY-MM-DD"),
            });
          var currentDate = this.state.createdAt;
          var futureMonth = moment(currentDate).add(this.state.validityPeriod, 'M');
          
          var calculatedDate = moment(futureMonth._d).format("YYYY-MM-DD");
          this.setState({
            "calculatedDate" : calculatedDate,
          })
          
          if( this.state.userStatus == "Paid")
          {
            subscribed = true
          }else{
            subscribed = false
          }
        })
        .catch(function(error){
          // console.log(error);
            if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/");
                }
        })


     axios
        .get('/api/blogs/get/all/list/type/Premium/1')
        .then((response)=>{
        
            this.setState({
                Blogs:response.data
              });
      
        })
        .catch(function(error){
            if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     /*this.props.history.push("/");*/
                }
        })

    /*Get Offerings*/

    axios.get('/api/offerings/get/all/list/1')
    .then((res)=>{      
      this.setState({
            offeringTitle : res.data,
          })
    })
    .catch((error)=>{
      if(error.message === "Request failed with status code 401")
      {
           swal("Your session is expired! Please login again.","", "error");
           this.props.history.push("/");
      }
    });
    
    /*subscribed offerings*/

     axios.get('/api/offeringsubscriptions/get/'+ user_ID )
          .then( (res)=>{ 
          // console.log("res",res.data);     
            this.setState({
                  subscriptionData        : res.data.offering,
                  listOfPerformanceDoc    : res.data.performanceDoc,          
                },()=>{
            })
          })
          .catch((error)=>{
            // console.log("error",error);
            if(error.message === "Request failed with status code 401")
              { 
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
          });
  } 
  getData(event)
  {
      var Filekey  =  event.currentTarget.getAttribute("data-key");
      // console.log("Filekey",event.currentTarget.getAttribute("data-key"))
        axios.get('/api/fileUpload/image/'+Filekey) 
      .then( (UploadedImg)=>{      
        this.setState({
              UploadedImg : UploadedImg.data,
            })
    })
    .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          swal("Error!","Something went wrong!!", "error");
        }
    });  
  }


  getDate(event){
    event.preventDefault();
     var startDate = event.target.getAttribute("data-startDate");
     var endDate = event.target.getAttribute("data-endDate");
     this.setState({
        StartDate : startDate,
        EndDate   : endDate
     })
  }
  checkSubscribe(event)
  {
   event.preventDefault();
   swal("You are not subscribed to this offering","", "error");
  
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  render() {
    var date = "09-10-2019  5:30PM";
    var dateArray  = [];
    var FullDate = "";var month = "";
    var FullDateOnly = "";
    var dateArray1  = [];
    var FullDatePer = "";var monthPer = "";
    var FullDateOnlyPer = "";
    if(this.state.listOfPerformanceDoc){
      var lengthOfPer = this.state.listOfPerformanceDoc.length;
      var lastUpdatedDatePer = ""
      var lastUpdatedDateState = ""
      if(this.state.listOfPerformanceDoc[lengthOfPer-1]){
        lastUpdatedDatePer = moment(this.state.listOfPerformanceDoc[lengthOfPer-1].createdAt).format("DD-MM-YYYY")
      }
    }

   if(this.state.subscriptionData.length > 0){
      for(let j=0;j<this.state.subscriptionData.length;j++){
        if(this.state.subscriptionData[j].statements.length>0){
          for(let i=0; i<this.state.subscriptionData[j].statements.length; i++ ){
            FullDate = new Date(this.state.subscriptionData[j].statements[i].createdAt);
            month = FullDate.getMonth()+1 ;
            if(month < 10){
              month = '0' + month; 
            }
            FullDateOnly = FullDate.getDate() + "-" + month + "-" + (FullDate.getYear() + 1900) ;
            dateArray.push(FullDateOnly) ;
          }
          dateArray  = [...new Set(dateArray)];
        }
      }
      // console.log("2 dateArray 1 = ", dateArray);         
    }//if
    if(this.state.listOfPerformanceDoc && this.state.listOfPerformanceDoc.length > 0){
      for(let j=0;j<this.state.listOfPerformanceDoc.length;j++){
        if(this.state.listOfPerformanceDoc.length>0){
            FullDatePer = new Date(this.state.listOfPerformanceDoc[j].createdAt);
            monthPer = FullDatePer.getMonth()+1 ;
            if(monthPer < 10){
              monthPer = '0' + monthPer; 
            }
            FullDateOnlyPer = FullDatePer.getDate() + "-" + monthPer + "-" + (FullDatePer.getYear() + 1900) ;
            dateArray1.push(FullDateOnlyPer) ;
         
          dateArray1  = [...new Set(dateArray1)];
        }
      }
      // console.log("2 dateArray  = ", dateArray1);         
    }//if

    return (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mainContainerSS padding100">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 mt40 tab-content">  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite planContainer tab-pane fade in active " id="services">
                      <label className="headerServices col-lg-12">Services you subscribed for</label>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 mt40 "> 
                          <ul className="nav nav-pills nav-stacked customStack textAlignCenter">
                           {this.state.subscriptionData?
                             this.state.subscriptionData.map((a, i)=>{
                                return(
                                  <li key={i}>
                                    { 
                                      this.state.subscriptionData[i].offeringStatus == "Active" ?
                                        <a data-toggle="pill" className="activeSubscription" data-startDate={a.startDate?a.startDate:""} data-endDate={a.endDate?a.endDate:""} onClick={this.getDate.bind(this)} href={"#"+a.offering_ID}>{a.offeringTitle}</a>
                                      :
                                        <a  className="disabled" onClick={this.checkSubscribe.bind(this)}>{a.offeringTitle}</a>
                                    }
                                  </li>
                               
                                )
                              })
                              :null
                            }
                            
                          </ul>

                      </div>
                       <div className="tab-content customTabContent mt40 col-lg-8 col-md-8 col-sm-8 col-xs-12 ">
                          <div id="performance" className="tab-pane fade in active ">
                            <h3>Performance Reports</h3>
                            {
                              this.state.listOfPerformanceDoc &&this.state.listOfPerformanceDoc[lengthOfPer-1] ?
                            <h5 className="">Last update date : {lastUpdatedDatePer} </h5>
                            :
                            null

                            }
                            <label className="mt20 col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.date1}</label>
                          
                              {        
                              dateArray1.length > 0 
                              ? dateArray1.map((publishdate,index)=>{
                                  return(
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <label className="mt20">Date: {publishdate}</label><br/>
                                      {this.state.listOfPerformanceDoc
                                       ?
                                         this.state.listOfPerformanceDoc.map((a, i)=>{
                                          if( moment(a.createdAt).format("DD-MM-YYYY") === publishdate){
                                            return(
                                                  <div className="col-lg-4 col-md-4 breakAll col-xs-4 ht200 col-sm-4  textAlignCenter">
                                                    <a href={axios.defaults.baseURL+"/api/fileUpload/image/"+a.key} download target="_blank" Content-Type= "application/octet-stream" Content-Disposition= "inline" data-key={a.key?a.key:""} onClick={this.getData.bind(this)}>
                                                    <div >
                                                      <img className="" src="/images/pdf.png"/><br/>
                                                      {a.name} 
                                                    </div>
                                                    </a>
                                                  </div>
                                              )                                               
                                          }
                                          })
                                      :
                                        <h2 className="textAlignCenter">No documents found</h2>
                                      }
                                    </div>
                                  )
                                })
                              : 
                               <h2 className="textAlignCenter"> No Data Available </h2>
                            }
                            </div>
                       
                            {
                            this.state.subscriptionData
                            ?
                             this.state.subscriptionData.map((a, i)=>{
                                return(
                                    <div id={a.offering_ID} className="tab-pane fade in " key={i}>
                                    <h6 className="pull-right"><span>Start Date :  {this.state.StartDate} </span> - <span>End Date :  {this.state.EndDate} </span> </h6><br/>
                                     {/* <h6 className="col-lg-12"><span className=" col-lg-4 pull-right"><b className="pull-right">Start Date  <br/>{this.state.StartDate} </b> </span>
                                     <span className="col-lg-4  pull-right"><b className="pull-right">End Date<br/> {this.state.EndDate} </b> </span></h6><br/>
                                    */}
                                      <h3>{a.offeringTitle} Reports & Statement</h3>
                                      {
                                        this.state.subscriptionData[i].statements.length-1 >=0 ?
                                          <h5>Last update date : {moment((this.state.subscriptionData[i].statements[this.state.subscriptionData[i].statements.length-1]).createdAt).format("DD-MM-YYYY")}</h5>
                                          :
                                          null
                                      }


                                        {
                                      
                                          dateArray.length > 0 
                                          ? dateArray.map((publishdate,index)=>{
                                              return(
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <label className="mt20">Date: {publishdate}</label><br/>
                                                  {this.state.subscriptionData[i].statements
                                                   ?
                                                    this.state.subscriptionData[i].statements.map((a, i)=>{
                                                      if( moment(a.createdAt).format("DD-MM-YYYY") === publishdate){
                                                        return(
                                                            <div className="col-lg-4 col-md-4 breakAll curserPointer ht200 col-xs-4 col-sm-4  textAlignCenter" data-key={a.key?a.key:""} onClick={this.getData.bind(this)}>
                                                              <a href={axios.defaults.baseURL+"/api/fileUpload/image/"+a.key} download Content-Type= "application/octet-stream" Content-Disposition= "inline">
                                                              <div >
                                                                <img className="" src="/images/pdf.png"/><br/>
                                                                {a.name} 
                                                              </div>
                                                              </a>
                                                            </div>
                                                        )                                                        
                                                      }
                                                    })
                                                  :
                                                    <h4>No documents found</h4>
                                                  }
                                                </div>
                                              )
                                              

                                            })
                                          : 
                                            <h3> No Data Available </h3>


                                        }
                                    </div>
                                    )
                                })
                              :null


                            }
                        </div>  
                    </div> 
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite planContainer tab-pane" id="kycform">
                      <Addkycdetails history={this.props.history} />
                    </div> 
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite planContainer tab-pane" id="riskprofileform">
                      <RiskProfile history={this.props.history} />
                    </div>
                  </div>  
                  {
                    subscribed ?
                      
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogContainCD backColorWhite">
                      <ul className="nav nav-pills nav-stacked  textAlignCenter">
                        <li className="kycprofilebtnsmall hidden-lg hidden-md"><a  data-toggle="pill" href="#kycform">Add KYC details</a></li>
                        <li className=" kycprofilebtn hidden-xs hidden-sm"><a data-toggle="pill" href="#kycform">Add KYC details</a></li>
                        <li className=" kycprofilebtnsmall hidden-lg hidden-md"><a data-toggle="pill" href="#riskprofileform">Submit Risk Profile</a></li>
                        <li className=" kycprofilebtn hidden-xs hidden-sm"><a data-toggle="pill" href="#riskprofileform">Submit Risk Profile</a></li>
                        <li className="kycprofilebtnsmall hidden-lg hidden-md"><a href="/clientDashboard">Performance Report</a></li>
                        <li className=" kycprofilebtn hidden-xs hidden-sm"><a href="/clientDashboard">Performance Report</a></li>
                      </ul>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                            <ul className="customOl myULSS textAlignCenter mt20 productinvestbtn">
                              <a href="/product-pricing"><li>Click Here to Invest in product</li></a>
                             </ul>
                      </div>
                    <h4 className="headerBlogCD col-lg-12"> Your Blog Subscription</h4>
                      <ul className="myULCDSP mt20">
                          <li>{this.state.blogSubscribed.planName} Subsription  <span className="pull-right"><i className="fa fa-rupee">&nbsp;</i> {(this.state.blogSubscribed.amountPaid)/100} </span></li>
                          <li>Subscribed on <span className="pull-right">{this.state.createdAt}</span></li>
                          <li>Subscription end date  <span className="pull-right">{this.state.calculatedDate}</span></li>

                      </ul>
                      <label className="mt40 priBlogHead borderTop textAlignCenter col-lg-12">Premium Blogs</label>
                      <div>
                       <OwlCarousel
                            className="owl-theme  col-lg-10 col-md-10 col-lg-offset-1 col-sm-12 col-xs-12 boxShadow borderRadiusT"
                            loop
                            margin          =  {20}
                            items           =  {1}
                            nav             =  {0}
                            dots            =  {0}
                            responsiveClass =  {true}
                            autoplay        =  {true}
                        >
                        {
                        this.state.Blogs && this.state.Blogs.length>0?
                          this.state.Blogs .map((data, index) => {
                            return (
                              <div className="item" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                              <div className="row">
                                <img src={data.bannerImage.path}/>

                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                              <div className="row">
                                <label>{data.blogTitle}</label>
                                <p>{data.summary}<a href="/allblogs"> read more</a></p>
                              </div>
                            </div>
                              </div>
                            );
                          })
                          :
                          null
                        }
                      </OwlCarousel> 
                      </div>

                      <label className="clickToPlan pull-right mt20"><a href="/allblogs">Read more premium blog >></a></label>
                    </div>          
                  </div>          
                  : 
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12  ">   
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogContainCD backColorWhite ">
                          <ul className="nav nav-pills nav-stacked textAlignCenter">
                        <li className="kycprofilebtnsmall hidden-lg hidden-md"><a  data-toggle="pill" href="#kycform">Add KYC details</a></li>
                        <li className="kycprofilebtn hidden-xs hidden-sm"><a data-toggle="pill" href="#kycform">Add KYC details</a></li>
                        <li className="kycprofilebtnsmall hidden-lg hidden-md"><a data-toggle="pill" href="#riskprofileform">Submit Risk Profile</a></li>
                        <li className="kycprofilebtn  hidden-xs hidden-sm"><a data-toggle="pill" href="#riskprofileform">Submit Risk Profile</a></li>
                        <li className="kycprofilebtnsmall hidden-lg hidden-md"><a href="/clientDashboard">Performance Report</a></li>
                        <li className="kycprofilebtn hidden-xs hidden-sm"><a href="/clientDashboard">Performance Report</a></li>
                      </ul>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                            <ul className="customOl myULSS textAlignCenter mt20 productinvestbtn">
                              <a href="/product-pricing"><li>Click Here to Invest in product</li></a>
                             </ul>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                            <ul className="customOl myULSS textAlignCenter mt20 sbscribblogbtn">
                              <a href="/planPage"><li>Click Here to Subscribe Blogs</li></a>
                             </ul>
                          </div>
                          <div className="col-lg-12 textAlignCenter mt20 fs19 borderTop textAlignCenter" ><label>Premium Blogs</label></div>
                        <OwlCarousel
                            className="owl-theme  col-lg-10 col-md-10 col-lg-offset-1 col-sm-12 col-xs-12 boxShadow borderRadiusT"
                            loop
                            margin          =  {20}
                            items           =  {1}
                            nav             =  {0}
                            dots            =  {0}
                            responsiveClass =  {true}
                            autoplay        =  {true}
                        >
                        {
                        this.state.Blogs && this.state.Blogs.length>0?
                          this.state.Blogs .map((data, index) => {
                            return (
                              <div className="item" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                              <div className="row">
                                <img src={data.bannerImage.path}/>

                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                              <div className="row">
                                <label>{data.blogTitle}</label>
                                <p>{data.summary}<a href="/allblogs"> read more</a></p>
                              </div>
                            </div>
                              </div>
                            );
                          })
                          :
                          null
                        }
                      </OwlCarousel> 
                    </div>                    
                  </div>  
                              
                                  
                     }

                            <div className="modal fade in " id="productexpiredModal" role="dialog">
                              <div className="modal-dialog customModalEN productexpiredmodal-dialog" >
                                <div className="modal-header textAlignCenter ">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.closeproductexpiremodal.bind(this)}> <i className="fa fa-times"></i></button>
                                    
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40 pad50new">
                                   <h3>Your subscription for the following product(s) has been expired. Please renew your subscription.</h3>
                                    <br/>
                                    {
                                      this.state.expiredproductSub.length > 0 ?
                                      this.state.expiredproductSub.map((data, index) => {
                                        return(
                                          <div>
                                            <h4>ProductName: {data.productname}</h4>
                                            <h4>Expired Date: {data.endDate}</h4>                               
                                          </div>
                                          )
                                      })
                                      :
                                      null

                                    }
                                    <a className="col-lg-4 col-lg-offset-8 col-md-12 col-sm-12 col-xs-12 btn btn-primary productexpiredbtn" href="/product-pricing" >Renew</a> 
                                    
                                </div>                        
                              </div>
                            </div> 
                            <div id="overlayproductexpired"></div>

                </div>
              </div>
    );
  }
}
