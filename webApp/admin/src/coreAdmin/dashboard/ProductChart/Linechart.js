import React, {Component} from 'react';
import { Doughnut, Pie, Bar, Radar, Polar, Line, Chart, defaults } from 'react-chartjs-2';
//defaults.global.maintainAspectRatio = false;
import Moment                from 'moment';



Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.legend.bottom,
             bottomY = this.chart.chartArea.bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 1;
         ctx.strokeStyle = '#aaa';
         ctx.stroke();
         ctx.restore();
      }
   }
});



  
  const plugins = [{
	  afterDraw: (chartInstance, easing) => {
		  const ctx = chartInstance.chart.ctx;
		  ctx.fillText("This text drawn by a plugin", 100, 100);
	  }
  }];

export default class Linechart extends Component{
	constructor(props){
		super(props);
    this.state = {
         data: '',
         options: '',
         productName : '',
         indexName   : '',
         productinvestedvalue: '',
         indexinvestedvalue  : '',
         inceptiontext       : ''
    }
  }
  
  componentDidMount(){
    var productData = this.props.productData;
    var productkey = this.props.productkey;
    this.setchartdata(productData, productkey);
    //console.log("pr data", productData);
    
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if(this.props.productData){
		  if (this.props.productData.productID !== prevProps.productData.productID || this.props.productData.rates.length !== prevProps.productData.rates.length) {
			
					this.setchartdata(this.props.productData, this.props.productkey);
					
			}
    }	
  }
  
  setchartdata(productData, productkey){
    // console.log("productdata prname", productData.productName);
      //console.log("prkey",productkey);
      var rates= productData.rates;

      var rates= productData.rates;
      var productstartvalue = rates[0].productRate;
      var productendvalue = rates[rates.length - 1].productRate;
      var indexstartvalue = rates[0].indexRate;
      var indexendvalue = rates[rates.length - 1].indexRate;
      var productinvestedvalue = (productendvalue / productstartvalue )* 100;
      var indexinvestedvalue  = (indexendvalue / indexstartvalue)* 100;
      var inceptiontext = "on inception";

      if(productkey === "MAX") {
        inceptiontext = "on inception";        
      }
      else if(productkey === "1Y") {
        inceptiontext = "1 year ago";
      }
      else if(productkey === "2Y") {
        inceptiontext = "2 years ago";
      }
      else if(productkey === "1M") {
        inceptiontext = "1 month ago";
      }
      else if(productkey === "3M") {
        inceptiontext = "3 months ago";
      }
      else if(productkey === "6M") {
        inceptiontext = "6 months ago";
      }

      if(productkey === "MAX"){
          
          var date = rates.map((data)=>{
            return Moment(data.date).format("DD MMM YYYY");
          });

      }
      else if(productkey === "1Y" || productkey === "2Y" || productkey === "3Y"){
          
          var date = rates.map((data)=>{
            return Moment(data.date).format("DD MMM YYYY");
          });
      }
      else if(productkey === "3M" || productkey === "6M" ){
          
          var date = rates.map((data)=>{
            return Moment(data.date).format("DD MMM YYYY");
          });
      }
      else if(productkey === "1M" ){
          
          var date = rates.map((data)=>{
            return Moment(data.date).format("DD MMM YYYY");
          });
      }
      else{
        var date = rates.map((data)=>{
          return data.date;
        });
      }
      

      /*var year = date.map((data)=>{
        return data.substr(0,4);
      });*/

      //console.log("year", year);

      var productRate = rates.map((data)=>{
        return parseFloat((data.productRate / rates[0].productRate ) * 100).toFixed(2);
      });

      var indexRate = rates.map((data)=>{
        return parseFloat((data.indexRate / rates[0].indexRate ) * 100).toFixed(2);
      }); 

      const data = {
        datasets: [{
          label: productData.productName,
          radius: 0,
          type:'LineWithLine',
          data: productRate,
          fill: false,
          borderColor: '#518FD4',
          backgroundColor: '#518FD4',
          pointBorderColor: '#518FD4',
          pointBackgroundColor: '#518FD4',
          pointHoverBackgroundColor: '#FFF',
          pointHoverBorderColor: '#518FD4',
          pointHoverRadius: 5,
          yAxisID: 'y-axis-1'
          },{
          type: 'LineWithLine',
          radius: 0,
          label: productData.indexName,
          data: indexRate,
          fill: false,
          backgroundColor: '#E3AF64',
          borderColor: '#E3AF64',
          hoverBackgroundColor: '#E3AF64',
          hoverBorderColor: '#E3AF64',
          pointHoverBackgroundColor: '#FFF',
          pointHoverBorderColor: '#E3AF64',
          pointHoverRadius: 5,
          yAxisID: 'y-axis-1'
          }]
        };
        
        const options = {
        responsive: true,
        tooltips: {
          mode: 'label',
          intersect: false,
          gridLines: {
          display: true,
          backgroundColor: '#f7f7f7',
          
          
          },
          pointHoverRadius: 5,
          pointHoverBorderColor: '#E3AF64',
        },
        elements: {
          line: {
          fill: false
          }
        },
        scales: {
          xAxes: [
          {
            
            display: true,
            gridLines: {
            display: false,
            drawBorder: true,
            },
            ticks: {
            labelOffset: 70,
            padding:10,
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 7,
            
            },
            labels: date,
        
          }
          ],
          yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
            display: true,
            drawBorder: false,
            },
            labels: {
            show: true
            },
            
          }
          ]
        }
        };
        this.setState({data : data, options: options, productName: productData.productName, indexName: productData.indexName,
          productinvestedvalue: productinvestedvalue, indexinvestedvalue: indexinvestedvalue, inceptiontext: inceptiontext })
  }


	render(){
		return(
				<section>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 chartdiv">
							
								{this.state.data  ? 
                  <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productchartcontent">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              Current value of <b>₹ 100</b> invested once <b>{this.state.inceptiontext}</b> would be
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  {this.state.productName} <br /> <b>₹ {this.state.productinvestedvalue ? parseFloat(this.state.productinvestedvalue).toFixed(2) : 0}</b>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  {this.state.indexName} <br/> <b>₹ {this.state.indexinvestedvalue ? parseFloat(this.state.indexinvestedvalue).toFixed(2) : 0 }</b>
                              </div>
                          </div>
                        </div>
                  <Line
                    data={this.state.data}
                    options={this.state.options}
                    
                  />
                  </div>
                  :null
                }
                </div>
								
							

						</div>
           
				</section>
		);		
	}
}

