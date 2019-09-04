import React, { Component } from 'react';
import "./ProductPage.css";

export default class ProductPage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	productDetailsArray:[]
	    	
	    };
  	}  
  	componentDidMount(){
		const productDetails = [
			{"stockName":"Bajaj Finance","ytd":"17.73","oneMon":"17.73","threeMon":"17.73","oneYear":"17.73","threeYear":"17.73","fiveYear":"1.61","tenYear":"0.61"},
			{"image":"/images/biscuits.jpg","nameOfProducts":"Dark Fantacy Biscuits","price":"$2.00"},
			{"image":"/images/atta.jpg","nameOfProducts":"Ashirvad Atta","price":"$5.61"},
			{"image":"/images/44-home_default.jpg","nameOfProducts":"Berries","price":"$1.1"},
			{"image":"/images/33-home_default.jpg","nameOfProducts":"Green Peas","price":"$1.61"},
	        {"image":"/images/41-home_default.jpg","nameOfProducts":"Blue Berries","price":"$5.61"},
	        {"image":"/images/bakeryCakes.jpg","nameOfProducts":"Chocolate Bread","price":"$1.21"},
	        {"image":"/images/chocolate.jpeg","nameOfProducts":"Brookside Dark Chocolate","price":"$3.0"},
		];

		this.setState({
			productDetailsArray: productDetails,
		},()=>{});

	}
  render() {
  	console.log('parameter',this.prop);
		return (
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 productContainer">
			  	<div className="row">
			  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titleContainer">
			  			<label>Safe Heaven Moats</label>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
			  			<p>In 2014 , I met an old investor. I had no clue what was his portfolio or profile. We explained him a midcap idea he listened patiently. Asked him what he has.. he didn't say much but said I saw many bull and bear markets but it’s the quality of earnings and quality of management that prevails. Market is like "alawavarach paani" ...water drop on colocasia leaf.</p>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 imageContainer">
			  				<img src="/images/boat.jpg"/>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 imageContainer">
		  				<p >All these stories there rise and tell triggers of growth but at end you would again see HDFC Bank, nestle, gillette , asian paints kind of stocks. They also may fall but only ones that survive. 

							After fall of 2018 in small and midcap , thought has proved more right than any other time. Why such thing happens. 

							There only few companies that have consistency in high return on capital compared to their cost of capital. They generate huge cash and cash flow per share. Their incubation (initial time and competition ) period when industry and company are new entrants to the market is over and they had survived many storms of policies, government changes, crude oil up and down movements, currency changes and bull bear markets, booms and bursts. Now only few emerge as market leaders and winners. 

							These companies however many times appear expensive to analysts. Also habitually investors and analysts have biggest concerns only about temporary current problems.<br/> They ignore these stocks with next quarter slowdown of growth , volumes shrinkage or margin affected due to raw material or slow demamd. But as in markets , only longer lasting valuable information pays off , companies come back with better growth at some a period while remaining so called expensive. People miss it. most People even who know most of things. 

							As in carrom , Master players are identified by a quality that they dont miss the straight or the most obvious shots and they do it so effortlessly but majority of people miss it. Many people expert at cut shots or inclined ones miss it. These stocks in similar way are missed as investors thinking them too obvious. 

							In reality they rise and double every four years or sometimes even more. <br/>

							We do not think that most pms or mutual funds or advisors have beaten these obvious ones over 10 yr or 7 yr period . Though none of these stocks are beyond comprehension of common man. Their products or offerings have entered your home for long. These companies rise along with gdp and per capita incomes of middle class and also reap much better demographic dividend. </p>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-5 col-sm-5 col-xs-5 specifications">
			  	
			  			<label>CAGR Table</label>

			  		<table className="customTablePP">
						  <tr>
						    <th>Stock Name</th>
						    <th>YTD</th>
						    <th>1-Month</th>
						    <th>3-Month</th>
						    <th>1-Year</th>
						    <th>3-Year</th>
						    <th>5-Year</th>
						    <th>10-Year</th>
						  </tr>	 
						  {this.state.productDetailsArray.map((data,index) =>

						  <tr>
						    <td>Bajaj Finance</td>
						    <td>17.73</td>
						    <td>15.55</td>
						    <td>20.89</td>
						    <td>62.57</td>
						    <td>65.87</td>
						    <td>77.57</td>
						    <td>82.72</td>
						
						  </tr>
						/*  <tr>
						    <td>P&G Hygiene & Health Care</td>
						    <td>8.43</td>
						    <td>15.55</td>
						    <td>20.89</td>
						    <td>62.57</td>
						    <td>65.87</td>
						    <td>77.57</td>
						    <td>82.72</td>
						
						  </tr>
						  <tr>
						    <td>Pidilite Industries</td>
						    <td>8.43</td>
						    <td>15.55</td>
						    <td>20.89</td>
						    <td>62.57</td>
						    <td>65.87</td>
						    <td>77.57</td>
						    <td>82.72</td>
						
						  </tr>
						   <tr>
						    <td>Astral Poly Technik</td>
						    <td>8.43</td>
						    <td>15.55</td>
						    <td>20.89</td>
						    <td>62.57</td>
						    <td>65.87</td>
						    <td>77.57</td>
						    <td>82.72</td>
						
						  </tr>
						    <tr>
						    <td>Hindustan Unilever</td>
						    <td>8.43</td>
						    <td>15.55</td>
						    <td>20.89</td>
						    <td>62.57</td>
						    <td>65.87</td>
						    <td>77.57</td>
						    <td>82.72</td>
						
						  </tr>*/
						    )}
					</table>
					                          

			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 imageContainer">
			  				<p>our Safe heaven portfolio is designed only with such similar stocks where investors can sleep well and enjoy natural growth for next 5-7-10 years. </p>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-5 col-xs-5 specifications">
			  			<label>Product Description</label>
			  			<ol className="customOl">
			  				<li>
			  				Wealthyvia primary motto is to “Capital Protection. Risk Mitigation. Alpha generation”</li>
							<li>This portfolio is created keeping in mind that – “Protect your downside. Upside will take care of itself”.</li>
							<li>Portfolio consists of well researched large caps, with quality management & strong balance sheet. They are leaders in their respective sectors & are linked to Indian growth story.</li>
							<li>Preferred companies:-
								<ul>
									<li>Large Caps</li>
								     <li>Leaders in the sector</li>
								     <li>Quality Management</li>
								     <li> Strong Balance sheet</li>
								     <li> Decent growth</li>
								     <li>Earnings predictability / Non Cyclical stocks</li>
								     <li> Linked to Indian growth story </li>
								</ul>
							</li>
							<li>Companies we don’t invest in:-
								<ul>
									<li>Micro & Small caps</li>
								     <li>Cyclical stocks</li>
								     <li>No earnings predictability</li>
								     <li> Questionable management</li>
								     <li> One Trick Pony companies</li>
								     <li>High debt / Leverage.</li>
								</ul>
							</li>
							<li>Total number of stocks held in this portfolio at any given point of time will be less than 15.</li>
							
			  			</ol>
			  		</div>
			  		<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 specifications">
			  			<label>Who is it suitable for?</label>
			  			<ol>
			  				
							<li> This is a low risk portfolio created for investors who are having low risk appetite but at the same time want to generate alpha over a period of time vis-à-vis Debt fund returns.</li>
							<li>Suitable for investors who are in their Middle age or closer to retirement who are looking forward to invest a portion portfolio of their savings in Equities.</li>
			  			</ol>
			  		</div>

					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 specifications">
			  			<label>Pricing</label>
			  			<ol>
							<li> Keeping in mind the nature of product & the universe of stocks we manage in our portfolio – We are pricing it at Rs *****/- per year.</li>
			  			</ol>
			  		</div>
						<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
			  			<div className="buyNowButtonPP pull-right col-lg-2">Buy Now</div>
			  		
			  		</div>


				</div>		
			</div>
		);
	}
}
