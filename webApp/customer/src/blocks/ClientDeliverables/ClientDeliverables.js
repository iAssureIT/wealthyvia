import React, { Component } from 'react';
import $         from 'jquery';

import "./ClientDeliverables.css";

export default class ClientDeliverables extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
 
  } 

  render() {

    return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 heightAuto">
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite investContainerCD">
              <div className="row">
                <label className="investLabelCD col-lg-12 col-md-12 col-sm-12 col-xs-12">What we deliver to our clients </label>
              
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 subDivCD ">
                      <i class="fa fa-tachometer iconContainerCD"></i>
                    <label className="payZeroCD">Monthly reports  24*7 online view of portfolio with 100% transparency </label>
                    

                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 subDivCD ">
                      <i class="fa fa-briefcase iconContainerCD"></i>
                    <label className="payZeroCD">Idle money in 6% plus liquid bees </label>
                   

                </div>
                 <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 subDivCD ">
                    <i class="fa fa-volume-up iconContainerCD"></i><br/>
                    <label className="payZeroCD">Quarterly ConCall  </label>
                  

                  </div>
                   <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 subDivCD ">
                      <i class="fa fa-wrench iconContainerCD"></i><br/>
                    <label className="payZeroCD">Tax calculation at FY End </label>
                                          

                  </div>
                

              </div>
            </div>
             <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite investContainerCD">
              <div className="row">
              
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 subDivCD ">
                      <i class="fa fa-paper-plane iconContainerCD"></i>
                    <label className="payZeroCD">Prominent business updates </label>
                    

                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 subDivCD ">
                      <i class="fa fa-map iconContainerCD"></i>
                    <label className="payZeroCD">Fund ManagersMonthly Newsletter </label>
                   

                </div>
                 <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 subDivCD ">
                    <i class="fa fa-graduation-cap iconContainerCD"></i><br/>
                    <label className="payZeroCD">Queries and question Support of 24*7 </label>
                  

                  </div>
                   <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 subDivCD ">
                      <i class="fa fa-rocket iconContainerCD"></i><br/>
                    <label className="payZeroCD">Returns</label>
                                          

                  </div>
                

              </div>
              </div>
            </div>
    );
  }
}

