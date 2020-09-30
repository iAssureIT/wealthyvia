import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import swal                     from 'sweetalert';
import Axios                    from "axios";
import { Doughnut, Pie, Bar, Radar, Polar, Line, Chart, defaults } from 'react-chartjs-2';

import './Dashboard.css';

export default class Dashboard extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      noofclients        : 0,
      noofsubfranchise   : 0,
      clientList         : [],
      clientSubscription : [],
    }
  }
   
  componentDidMount(){
    
    var ID = localStorage.getItem('user_id');
      //console.log("response from api=>", ID);
    Axios.get("api/distributormaster/get/one/byuserid/"+ID)
    .then(res=>{      
      if(res && res.data){
        var distributorCode = res.data.distributorCode;
        this.getclients(distributorCode);    
        this.getmySubfranchise(distributorCode)     
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getclients(distributorCode){
    Axios.get("api/users/get/list/bydistributorcode/user/"+distributorCode)
    .then(res=>{
      if(res && res.data){
        this.setState({
          noofclients : res.data.length, 
          clientList : res.data 
        },()=>{
          this.getclientofferingsubscription();
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getmySubfranchise(distributorCode){
    
    Axios.get("api/distributormaster/get/all/myfranchiselist/"+distributorCode)
    .then(res=>{
      console.log("response from api=>client",res.data);

      if(res && res.data){
        
        this.setState({
          noofsubfranchise : res.data.length 
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getclientofferingsubscription(){
    console.log("clientList", this.state.clientList);
    var query = {
      params: {
          clientList : JSON.stringify(this.state.clientList)
        }
    }
    Axios.get("api/offeringsubscriptions/get/allofferingsub/byclientist", query)
    .then(res=>{
      console.log("response from api=>client subscription",res.data);

      if(res && res.data){

       const  data= {
        labels: ['A', 'B', 'C'],
        datasets: [{
          label: 'My data',
          data: res.data.clientRevenue ,
          backgroundColor: ['#0000ff','#ff0000','f3f4f5']
        }]
      }
        this.setState({data : data})
        
        this.setState({
          clientSubscription : res.data.clientRevenue 
        });
      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }
    
  render(){
    return(
      <div className="row backgroundextrs">
        <div className="col-lg-12">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="info-box addinfobox">
                  <span class="info-box-icon bg-aqua userciclebox">
                    <i class="fa fa-users"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text titletexinfo">Total Clients</span>
                    <span class="info-box-number"><small>{this.state.noofclients}</small></span>
                    <span class="rightArrowSign col-lg-12 col-md-12">
                      <a href="/myclients">
                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                      </a>
                    </span>
                  </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="info-box addinfobox">
                  <span class="info-box-icon bg-aqua userciclebox">
                    <i class="fa fa-users"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text titletexinfo">Total Subfranchise</span>
                    <span class="info-box-number"><small>{this.state.noofsubfranchise}</small></span>
                    <span class="rightArrowSign col-lg-12 col-md-12">
                      <a href="/subfranchise">
                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                      </a>
                    </span>
                  </div>
                </div>
            </div>

           {/* <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="info-box addinfobox">
                  <span class="info-box-icon bg-aqua userciclebox">
                    <i class="fa fa-users"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text titletexinfo">Total Users</span>
                    <span class="info-box-number"><small>0</small></span>
                    <span class="rightArrowSign col-lg-12 col-md-12">
                      <a href="/Admin/UMListOfUsers">
                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                      </a>
                    </span>
                  </div>
                </div>
            </div>
            {/*  <img src="/images/partner-dashboard.jpg" style={{width: '100%'}}/> */ }
           
          </div>

          {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Line
                    data={this.state.data}
                    
              />
          </div>*/}
          
      </div>     
    );
  }
}
