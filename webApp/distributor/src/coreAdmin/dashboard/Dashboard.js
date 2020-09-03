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
      <div className="row">
        <div className="col-lg-12">
            
              
              <img src="/images/partner-dashboard.jpg" style={{width: '100%'}}/>
           
          </div>
          
      </div>     
    );
  }
}
