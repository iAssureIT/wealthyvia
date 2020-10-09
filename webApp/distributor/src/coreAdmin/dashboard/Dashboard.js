import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import swal                     from 'sweetalert';
import Axios                    from "axios";
import moment                   from "moment";
import { Doughnut, Pie, Bar, Radar, Polar, Line, Chart, defaults } from 'react-chartjs-2';

import './Dashboard.css';

export default class Dashboard extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      noofclients        : 0,
      noofsubfranchise   : 0,
      noofpendingclients : 0,
      noofactiveclients  : 0,
      clientList         : [],
      clientSubscription : [],
      clientmonthlysignup: '',
      clientyearwisemonth   : {},
      clientcurrentyear     : '',
      subfranchisemonthlysignup : '',
      subfranchiseyearwisemonth   : {},
      subfranchisecurrentyear     : '',
      clientpiechartData          : ''
      
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
      if(res.data && res.data.length > 0){
        var clientlist = res.data;
        // console.log("clientlist", res.data);
        this.setState({
          noofclients : res.data.length, 
          clientList : res.data 
        },()=>{
          this.getclientofferingsubscription();
        });

        var k=0;
        var latestyear = moment(clientlist[0].createdAt).year(); 

        var yearwisemonth = new Object();
        var allyearsdata = new Object();
        for(k=0; k<clientlist.length; k++){
          // console.log("yearwisemonth", yearwisemonth);
          var yearprop = moment(clientlist[k].createdAt).year(); 
          let result = yearwisemonth.hasOwnProperty(yearprop);
          if(!result){
            yearwisemonth[yearprop] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            allyearsdata[yearprop] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          
        }
         console.log("allyearsdata", allyearsdata);
         
         if(k === clientlist.length){
            var i=0;
            for(i=0; i<clientlist.length; i++){
                var year = moment(clientlist[i].createdAt).year(); 
                var month = moment(clientlist[i].createdAt).month();                    
                  // montharr[month] = montharr[month] + 1; 
                  yearwisemonth[year][month] = yearwisemonth[year][month] + 1; 
                  allyearsdata[year][month] = allyearsdata[year][month] + 1; 
                // console.log("year", year);
              }
              if(i === clientlist.length){
                // console.log("montharr", montharr);
                // console.log("yearwisemonth", yearwisemonth);

                
                console.log("mycomponent", yearwisemonth);
              
              var clientsignupchartData = {
                      datasets: [{
                          
                        data: yearwisemonth[latestyear],
                        label: 'Monthly Client Signup',
                        backgroundColor: '#36a2eb',
                        hoverBackgroundColor: '#38954d',      

                      }],

                      // These labels appear in the legend and in the tooltips when hovering different arcs
                      labels: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                      ], 

                  }

                  this.setState({clientmonthlysignup : clientsignupchartData, clientyearwisemonth : allyearsdata, clientcurrentyear: latestyear});
              }
         }
        // var montharr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        

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
      // console.log("response from api=>client",res.data);

      if(res && res.data && res.data.length > 0){
        var subfranchiselist = res.data;
        this.setState({
          noofsubfranchise : res.data.length 
        });

        var k=0;
        var latestyear = moment(subfranchiselist[0].createdAt).year(); 

        var yearwisemonth = new Object();
        var allyearsdata = new Object();
        for(k=0; k<subfranchiselist.length; k++){
          // console.log("yearwisemonth", yearwisemonth);
          var yearprop = moment(subfranchiselist[k].createdAt).year(); 
          let result = yearwisemonth.hasOwnProperty(yearprop);
          if(!result){
            yearwisemonth[yearprop] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            allyearsdata[yearprop] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          
        }
         console.log("allyearsdata", allyearsdata);
         
         if(k === subfranchiselist.length){

        var i=0;
        var montharr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(i=0; i<subfranchiselist.length; i++){
          
          var year = moment(subfranchiselist[i].createdAt).year(); 
          var month = moment(subfranchiselist[i].createdAt).month(); 
          yearwisemonth[year][month] = yearwisemonth[year][month] + 1; 
          allyearsdata[year][month] = allyearsdata[year][month] + 1;         
        }
        if(i === subfranchiselist.length){
          // console.log("montharr", montharr);
        
        var subfranchisesignupchartData = {
                datasets: [{
                    
                  data: yearwisemonth[latestyear],
                  label: 'Monthly Sub Franchise Signup',
                  backgroundColor: '#36a2eb',
                  hoverBackgroundColor: '#38954d',      

                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ], 

            }

            this.setState({subfranchisemonthlysignup : subfranchisesignupchartData, subfranchiseyearwisemonth : allyearsdata, subfranchisecurrentyear: latestyear});
        }
      }

      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }

  getclientofferingsubscription(){
    // console.log("clientList", this.state.clientList);
    var query = {
      params: {
          clientList : JSON.stringify(this.state.clientList)
        }
    }
    Axios.get("api/offeringsubscriptions/get/allofferingsub/byclientist", query)
    .then(res=>{
       console.log("response from api=>client subscription",res.data);

      if(res && res.data){
        
        /*this.setState({
          clientSubscription : res.data.clientRevenue 
        });*/
        var clientrevenue = res.data.clientRevenue;
        var expiredsub = clientrevenue.filter((data)=>{
            if(data.endDate < moment().format('YYYY-MM-DD')){
              return data;
            }            
          });
        console.log("expiredsub", expiredsub);
        var expireuniquerecords = expiredsub.map(item => item.email)
          .filter((value, index, self) => self.indexOf(value) === index)
        console.log("expireuniquerecords", expireuniquerecords);

        var activesub = clientrevenue.filter((data)=>{
            if(data.endDate > moment().format('YYYY-MM-DD')){
              return data;
            }            
          });
        console.log("activesub", activesub);
        var activeuniquerecords = activesub.map(item => item.email)
          .filter((value, index, self) => self.indexOf(value) === index)
        
        for(var i=0; i<expireuniquerecords.length; i++){
          var index = activeuniquerecords.indexOf(expireuniquerecords[i]);

          if (index > -1) {
            activeuniquerecords.splice(index, 1);
          }
        }
        console.log("activeuniquerecords", activeuniquerecords);

        var piechartData = {
                datasets: [{
                    
                  data: [activeuniquerecords.length, expireuniquerecords.length],
                  label: 'Clients Subscription',
                  backgroundColor: ['#36a2eb', '#ffea6d'],
                  hoverBackgroundColor: '#38954d',      

                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                  'Active Clients', 'Pending Clients'
                ], 

            }

        
        this.setState({ noofpendingclients : expireuniquerecords.length, noofactiveclients: activeuniquerecords.length, clientpiechartData: piechartData});

      }
    })
    .catch(err=>{
      console.log("err",err);
      swal("Oops...","Something went wrong! <br/>"+err, "error");

    })
  }
  
  handleyearwiseclient(event){
    event.preventDefault();
    console.log("this.state.clientyearwisemonth", this.state.clientyearwisemonth);
    var year = event.currentTarget.value;
    // alert(year);
    var yearwisemonth = this.state.clientyearwisemonth;
    // console.log("yearwisemonth ", yearwisemonth );
    let result = yearwisemonth.hasOwnProperty(year);
    // console.log(result, yearwisemonth[year]);
    if(result){
      var clientsignupchartData = {
                datasets: [{
                    
                  data: yearwisemonth[year],
                  label: 'Monthly Client Signup',
                  backgroundColor: '#36a2eb',
                  hoverBackgroundColor: '#38954d',      

                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ], 

            }

            this.setState({clientmonthlysignup : clientsignupchartData, clientcurrentyear: year});
      }

  }

  handleyearwisesubfranchise(event){
    event.preventDefault();
    console.log("this.state.subfranchiseyearwisemonth", this.state.subfranchiseyearwisemonth);
    var year = event.currentTarget.value;
    // alert(year);
    var yearwisemonth = this.state.subfranchiseyearwisemonth;
    // console.log("yearwisemonth ", yearwisemonth );
    let result = yearwisemonth.hasOwnProperty(year);
    // console.log(result, yearwisemonth[year]);
    if(result){
      var subfranchisesignupchartData = {
                datasets: [{
                    
                  data: yearwisemonth[year],
                  label: 'Monthly Client Signup',
                  backgroundColor: '#36a2eb',
                  hoverBackgroundColor: '#38954d',      

                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ], 

            }

            this.setState({subfranchisemonthlysignup : subfranchisesignupchartData, subfranchisecurrentyear: year});
      }

  }

  render(){
    return(
      <div className="row partnernewdash">
        <div className="col-lg-12">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="info-box addinfobox">
                  <span class="info-box-icon bg-aqua userciclebox">
                    <i class="fa fa-users"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text titletexinfo">Total Clients</span>
                    <span class="info-box-number partnerdatanumbers"><small>{this.state.noofclients}</small></span>
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
                    <span class="info-box-number partnerdatanumbers"><small>{this.state.noofsubfranchise}</small></span>
                    <span class="rightArrowSign col-lg-12 col-md-12">
                      <a href="/subfranchise">
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
                    <span class="info-box-text titletexinfo">Total pending fees clients</span>
                    <span class="info-box-number partnerdatanumbers"><small>{this.state.noofpendingclients}</small></span>
                    <span class="rightArrowSign col-lg-12 col-md-12">
                      <a href="/myclients">
                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                      </a>
                    </span>
                  </div>
                </div>
            </div>
            {/*  <img src="/images/partner-dashboard.jpg" style={{width: '100%'}}/> */ }
           
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 piesectionpartner">
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12">

              <div className="clientchartbox col-lg-12 col-md-6 col-sm-12 col-xs-12">
                <div className="col-lg-12">
                  <div class="box-header with-borderbargraph text-center">
                    <h4 class="box-title chartheadingpart">Clients Subscription</h4>
                  </div>
                    {
                    this.state.clientpiechartData ?                    
                        <Pie 
                          data={this.state.clientpiechartData}  
                        />                       
                    :
                     <div className="text-center">
                      <img src='/images/norecord.png' alt="No record" className="norecordpartner" />
                      <h4 className="datanotfoundheading">Data not available</h4>
                     </div>   
                    }
                </div>  
              </div> 
            </div>
            
          </div>  

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="clientchartbox col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box-header with-borderbargraph">
                    <h4 class="box-title chartheadingpart">Month-wise Client Signup</h4>
                  </div>
                  {
                    this.state.clientmonthlysignup ? 
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 pull-right">
                      {
                        this.state.clientyearwisemonth ?
                        <select onChange={this.handleyearwiseclient.bind(this)} class="form-control" value={this.state.clientcurrentyear}>
                            {
                              Object.keys(this.state.clientyearwisemonth).map((key, index) =>{
                                return (
                                  <option value={key} key={index}>{key}</option>
                                  )
                                
                              })
                            }
                        </select>
                        :
                        null
                      }
                      </div>
                      <Bar 
                        data={this.state.clientmonthlysignup}  options={ {  scales: {
                                                                                yAxes: [{
                                                                                  ticks: {
                                                                                    stepSize: 1
                                                                                  }
                                                                                }]
                                                                             } } }
                      /> 
                      </div>                 
                    :
                     <div className="text-center">
                      <img src='/images/norecord.png' alt="No record" className="norecordpartner" />
                      <h4 className="datanotfoundheading">Data not available</h4>
                     </div>    
                   }
                </div> 
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="subfranchisechartbox col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="box-header with-borderbargraph">
                    <h4 class="box-title chartheadingpart">Month-wise Sub Franchise Signup</h4>
                  </div>
                  {
                    this.state.subfranchisemonthlysignup ? 
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 pull-right">
                      {
                        this.state.subfranchiseyearwisemonth ?
                        <select onChange={this.handleyearwisesubfranchise.bind(this)} class="form-control" value={this.state.subfranchisecurrentyear}>
                            {
                              Object.keys(this.state.subfranchiseyearwisemonth).map((key, index) =>{
                                return (
                                  <option value={key} key={index}>{key}</option>
                                  )
                                
                              })
                            }
                        </select>
                        :
                        null
                      }
                      </div>
                      <Bar 
                        data={this.state.subfranchisemonthlysignup}  options={ {  scales: {
                                                                                yAxes: [{
                                                                                  ticks: {
                                                                                    stepSize: 1
                                                                                  }
                                                                                }]
                                                                             } } }
                      />

                    </div>  
                    :
                     <div className="text-center">
                      <img src='/images/norecord.png' alt="No record" className="norecordpartner" />
                      <h4 className="datanotfoundheading">Data not available</h4>
                     </div>   
                  } 
                </div>
            </div>
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
