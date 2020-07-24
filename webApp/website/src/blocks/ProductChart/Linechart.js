import React, {Component} from 'react';
import { Doughnut, Pie, Bar, Radar, Polar, Line, Chart } from 'react-chartjs-2';
import ClipLoader from "react-spinners/ClipLoader";



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
         mobiledata : '',
         mobileoptions: '',
         loading : true
    }
  }
  
  componentDidMount(){
    var productData = this.props.productData;
    this.setchartdata(productData);
    //console.log("pr data", productData);
    
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if(this.props.productData){
		  if (this.props.productData.productID !== prevProps.productData.productID) {
			
					this.setchartdata(this.props.productData);
					
			}
    }	
  }
  
  setchartdata(productData){
      var rates= productData.rates;
      var date = rates.map((data)=>{
        return data.date;
      });

      var year = date.map((data)=>{
        return data.substr(0,4);
      });

      //console.log("year", year);

      var productRate = rates.map((data)=>{
        return data.productRate;
      });

      var indexRate = rates.map((data)=>{
        return data.indexRate;
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
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0,
              maxTicksLimit: 7
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
        const mobileoptions = {
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
              display: false
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
        this.setState({data : data, options: options, mobileoptions: mobileoptions, loading : false})
  }


	render(){
    console.log("loading", this.state.loading);
		return(
				<section>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboard extspace">
							
								{this.state.loading === false  ? 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 hidden-sm hidden-xs ">
                      <Line
                        data={this.state.data}
                        options={this.state.options}                    
                      />
                    </div>
                    <div className="hidden-lg hidden-md col-sm-12 col-xs-12 extspace">
                      <Line
                        data={this.state.data}
                        options={this.state.mobileoptions}
                        width={800} height={700}                    
                      />
                    </div>
                  </div>
                  :
                  <div className="pageloader">
                    <ClipLoader
                          size={120}
                          color={"#123abc"}
                          loading={this.state.loading}
                      />
                  </div>  
                }
                </div>
								
							

						</div>
           
				</section>
		);		
	}
}

