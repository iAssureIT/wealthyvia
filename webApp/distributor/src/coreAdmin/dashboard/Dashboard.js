import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';



import './Dashboard.css';

export default class Dashboard extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
  componentDidMount(){}
    
  render(){
    return(
      <div className="">
        <div className="col-lg-12">
            <div className="log-lg-12 pull-left ">
              <h3>Dashboard</h3>
            </div>
          </div>
          
      </div>     
    );
  }
}
