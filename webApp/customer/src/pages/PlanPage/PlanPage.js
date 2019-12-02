import React, { Component } from 'react';
import $         from 'jquery';

import "./PlanPage.css";

export default class PlanPage extends Component {

  constructor(props) {
    super(props);
        this.state = {
          "sixmonths":"999",
          "oneyear":"1499",
          "twoyear":"1999"
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  render() {

    return (
            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite PlanContainer ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 selectedPlanPP noPadding">
                    <label className="col-lg-12"> Select Plan</label>
                </div>
                <a href={"/invoicePage/"+this.state.sixmonths}>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsPlan">
                       <label className="planName"> <i class="fa fa-rupee">&nbsp;</i>999</label><br/>
                       <label className="">was <strike><i class="fa fa-rupee">&nbsp;</i>1499</strike></label><br/>
                       <label className="timePeriod mt20">for 6 months</label><br/>
                       <span className=" buyNowPlan"> Buy Now </span>
                    </div> 
                  </div>
                </a> 
                <a href={"/invoicePage/"+this.state.oneyear}>
                 <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsPlan">
                       <label className="planName"> <i class="fa fa-rupee">&nbsp;</i>1499</label><br/>
                       <label className="">was <strike><i class="fa fa-rupee">&nbsp;</i>1999</strike></label><br/>
                       <label className="timePeriod mt20">for 1 year</label><br/>
                       <span className=" buyNowPlan"> Buy Now </span>
                    </div>  
                </div>
                </a> 
                <a href={"/invoicePage/"+this.state.twoyear}>

                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PlanDetailsPlan">
                   <label className="planName"> <i class="fa fa-rupee">&nbsp;</i>1999</label><br/>
                     <label className="">was <strike><i class="fa fa-rupee">&nbsp;</i>2500</strike></label><br/>
                     <label className="timePeriod mt20">for 2 year</label><br/>
                     <span className=" buyNowPlan"> Buy Now </span>
                  </div>  
                 </div>
                 </a>
               
            </div>
    );
  }
}
