import React, { Component } from 'react';
import $         from 'jquery';

import "./SubscribedServices.css";

export default class SubscribedServices extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"5gcpm",
          date : "09-10-2019",
          date1 : "08-10-2019 9:30PM",

        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {

  } 

  render() {
    var date = "09-10-2019  5:30PM";

    return (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding100">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 mt40 ">  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray planContainer ">
                      <label className="headerServices col-lg-12">Services you subscribed for</label>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 mt40 "> 
                          <ul class="nav nav-pills nav-stacked customStack textAlignCenter">
                            <li ><a data-toggle="pill" href="#performance">Performance</a></li>
                            <li class="active"><a data-toggle="pill" href="#home">5GCPM</a></li>
                             <li><a data-toggle="pill" href="#menu1">Safe Heavan Moats</a></li>
                              <li><a data-toggle="pill" href="#menu2">Safe Heavan Stocks + Alpha</a></li>
                              <li><a data-toggle="pill" href="#menu3">USA Stocks Portfolio</a></li>
                              <li><a data-toggle="pill" href="#menu4">Unlisted Stocks</a></li>
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
                         <ol className="customOl">
                            <li><a href="">Market Hidden Gems</a></li>
                            <li><a href="">Best bet during high Volatility</a></li>
                            <li><a href="">Smallcap Star Performers</a></li>
                            <li><a href="">Stocks given above 500% returns</a></li>
                            <li><a href="">Stocks given above 500% returns</a></li>
                            <li><a href="">Stocks given above 500% returns</a></li>

                        </ol>
                        <label className="clickToPlan pull-right">Read more premium blog >></label>
                      </div>                    
                     </div>                    
                  </div>
                </div>
              </div>
    );
  }
}
