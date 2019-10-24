import React, { Component }       from 'react';
import $                          from 'jquery';
import Blogs                      from "../../blocks/Blogs/Blogs.js";
import OwlCarousel                from 'react-owl-carousel';
import axios                      from "axios";
import swal                       from 'sweetalert';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import "./SubscribedServices.css";

export default class SubscribedServices extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv    : "5gcpm",
          date         : "09-10-2019",
          date1        : "08-10-2019 9:30PM",
          offeringTitle: "",

        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
    axios.get('http://api.wealthyvia.com/api/offerings/get/all/list/1')
    .then((res)=>{      
      console.log("offerings",res.data);

   
      this.setState({
            offeringTitle : res.data,
          },()=>{console.log("offeringTitle",this.state.offeringTitle);
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
  checkSubscribe(event)
  {
    event.preventDefault();
    console.log("in checkSubscribe");
   swal("You are not subscribed to this offering","", "error");

  }
  render() {
    var date = "09-10-2019  5:30PM";
    var subscribed =false;
    return (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding100">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 mt40 ">  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray planContainer ">
                      <label className="headerServices col-lg-12">Services you subscribed for</label>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 mt40 "> 
                          <ul class="nav nav-pills nav-stacked customStack textAlignCenter">
                            <li ><a data-toggle="pill" href="#performance">Performance</a></li>
                           {this.state.offeringTitle?
                             this.state.offeringTitle.map((a, i)=>{
                                return(
                                  <li>
                                    {subscribed == true ?
                                    <a data-toggle="pill" className="activeSubscription" href="#home">{a.offeringTitle}</a>
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
                       <div class="tab-content customTabContent mt40 col-lg-8 col-md-8 col-sm-8 col-xs-12 ">
                          <div id="home" class="tab-pane fade in active">
                            <h6 className="pull-right"><span>Start Date :  {this.state.date} </span> - <span>End Date :  {this.state.date} </span> </h6><br/>
                            <h3>5GCPM Reports & Statement</h3>
                            <h5>Last update date : {this.state.date} </h5>
                            <label className="mt20">{this.state.date1}</label>
                          </div>
                          <div id="performance" class="tab-pane fade">
                            <h6 className="pull-right"><span>Start Date :  {this.state.date} </span> - <span>End Date :  {this.state.date} </span> </h6><br/>
                            <h3>Performance Reports</h3>
                            <h5>Last update date : {this.state.date} </h5>
                            <label className="mt20">{this.state.date1}</label>
                          </div>
                          <div id="menu1" class="tab-pane fade">
                            <h6 className="pull-right"><span>Start Date :  {this.state.date} </span> - <span>End Date :  {this.state.date} </span> </h6><br/>
                           <h3>Safe Heaven Moats Reports & Statement</h3>
                            <h5>Last update date : {this.state.date} </h5>
                            <label className="mt20">{this.state.date1}</label>
                          </div>
                          <div id="menu2" class="tab-pane fade">
                            <h6 className="pull-right"><span>Start Date :  {this.state.date} </span> - <span>End Date :  {this.state.date} </span> </h6><br/>
                            <h3>Safe Heaven Stocks + Alpha Reports & Statement</h3>
                            <h5>Last update date : {this.state.date} </h5>
                            <label className="mt20">{this.state.date1}</label>
                          </div>
                          <div id="menu3" class="tab-pane fade">
                            <h6 className="pull-right"><span>Start Date :  {this.state.date} </span> - <span>End Date :  {this.state.date} </span> </h6><br/>
                             <h3>USA Stocks Portfolio Reports & Statement</h3>
                            <h5>Last update date : {this.state.date} </h5>
                            <label className="mt40">{this.state.date1}</label>
                          </div>
                           <div id="menu4" class="tab-pane fade">
                            <h6 className="pull-right"><span>Start Date :  {this.state.date} </span> - <span>End Date :  {this.state.date} </span> </h6><br/>
                            <h3>Unlisted Stocks Reports & Statement</h3>
                            <h5>Last update date : {this.state.date} </h5>
                            <label className="mt40">{this.state.date1}</label>
                           </div>
                        </div>  
                    </div>  
                  </div>  
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 mt40 ">   
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogContainCD">
                      {/*<h4 className="headerBlogCD"> Blog Subscription Plan</h4>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                        <ul className="customOl myULCD">
                            <li><a href="#">6 Months at   <span className="pull-right"> Rs 999 . &nbsp; <strike>Rs 1499 </strike></span></a></li>
                            <li><a href="#">1 Year at <span className="pull-right"> Rs 1499 . &nbsp;<strike> Rs 1999</strike></span></a></li>
                            <li><a href="#">2 Years at  <span className="pull-right"> Rs 1999 . &nbsp;<strike> Rs 2599</strike></span></a></li>

                        </ul>
                        <label className="clickToPlan pull-right">Click on plan name to subscribe.</label>
                      </div>            */}
                      <h4 className="headerBlogCD"> Your Blog Subscription</h4>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                        <ul className="myULCDSP">
                            <li><a href="">6 Month Subsription  <span className="pull-right"> Rs 999 </span></a></li>
                            <li><a href="">Subscribed on <span className="pull-right">02-10-2019 </span></a></li>
                            <li><a href="">Subscription end date  <span className="pull-right">02-02-2020 </span></a></li>

                        </ul>
                        <label className="mt40 priBlogHead">Premium Blogs</label>
                        <div>
                          <OwlCarousel
                            className="owl-theme  col-md-12 col-lg-12 col-sm-12 col-xs-12 boxShadow"
                             loop
                              margin={20}
                              items={1}
                              nav={0}
                              dots={0}
                              responsiveClass={true}
                              autoplay={true}
                            >
                        
                             <div className="item">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog  ">
                                  <div className="row">
                                    <img src="/images/blog1back.jpeg"/>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                                  <div className="row">
                                    <label>“Knock Knock” Who is it ? - Perception !</label>
                                    <p>Perceptions are good and helps us to avoid big accidents. They are in our genetics & investing is not above it...<br/><a href="/allblogs" target="_blank"> read more</a></p>
                                  </div>
                                </div>
                              </div>
                               <div className="item ">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                                  <div className="row">
                                    <img src="/images/monthly.png"/>

                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                                  <div className="row">
                                    <label>Monthly Communique : Effect of tax reforms and opportunity one can’t afford to miss!</label>
                                    <p>This is one of major reforms in Indian business ecosystem after 1991...<br/><a href="/allblogs" target="_blank"> read more</a></p>
                                  </div>
                                </div>
                              </div>
                               <div className="item ">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                                  <div className="row">
                                    <img src="/images/stockb.jpeg"/>

                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
                                  <div className="row">
                                    <label>Safe Heaven Stocks</label>
                                    <p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently...<a href="/allblogs" target="_blank"> read more</a></p>
                                  </div>
                                </div>
                              </div>
                          
                        </OwlCarousel>
                        </div>

                        <label className="clickToPlan pull-right mt20">Read more premium blog >></label>
                      </div>                    
                     </div>                    
                  </div>
                </div>
              </div>
    );
  }
}
