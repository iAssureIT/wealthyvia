import React, { Component } from 'react';
import { render }           from 'react-dom';

import './addWorkspace.css';

class WorkInProgressPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount(){

  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workHeader"style={{height:"470px"}}>
            <div className="text-center" style={{fontSize:"64px",marginTop:"20%"}}>
              Work in Progress...
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WorkInProgressPage;