import React, { Component } from 'react';
import $         from 'jquery';

import "./DashboardHeader.css";

export default class DashboardHeader extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"5gcpm",
          date:"14-10-2019",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
getDate() {
    var date = { currentTime: new Date().toLocaleString() };

    this.setState({
      date: date
    });
     this.getDate();
  }

  componentDidMount()
  {

  } 

  render() {
    

    return (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt40">
                <div className="row">
                  <div className="col-lg-4  col-md-8 col-sm-8 col-xs-12 textAlignCenter">   
                {/*   <form class="form-inline mt40 row">
                      <div class=" col-lg-1  col-md-2  col-sm-1 col-xs-2   SearchIN pull-right "><i className="fa fa-search"></i></div>
                      <input class="customInputBV col-lg-8 col-md-8  col-sm-11  col-xs-10 margin0 pull-right " type="text" placeholder="Search" aria-label="Search"/>
                    </form>*/}                  
                  </div>  
                  <div className="col-lg-4  col-md-8 col-sm-8 col-xs-12 textAlignCenter">   
                    <label className="headingofdashboard">Welcome to Wealthyvia</label>
                  </div>  
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">   
                    <label className="dateondashboard pull-right">Date : {this.state.date} </label>
                  </div>
                </div>
              </div>
    );
  }
}
