import React, { Component } from 'react';
import $         from 'jquery';

import "./DashboardHeader.css";

export default class DashboardHeader extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"5gcpm",
          date:"09-10-2019",
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
                  <div className="col-lg-4 col-lg-offset-4 col-md-8 col-sm-8 col-xs-12 textAlignCenter">   
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
