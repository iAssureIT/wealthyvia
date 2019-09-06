import React, { Component } from 'react';
import $ 				 			from 'jquery';


import "./BlogViewPage.css";

export default class BlogViewPage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	productDetailsArray:[]
	    	
	    };
  	}  	
  	componentDidMount(){
	
	}
  render() {
  		
		return (
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 mainBlogView">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialInfoDiv">
						<div className="row">
						<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 ">
							<div className="col-lg-11 col-md-1 col-sm-1 col-xs-1 userImage">

							</div>	
						</div>	
						<div className="col-lg-6 col-md-1 col-sm-1 col-xs-1 nameDetailDiv row ">
								<span>Priyanka Lewade </span>&nbsp;<i className="fa fa-user"></i>&nbsp;&nbsp;
								<span>. 3 days ago </span>&nbsp;&nbsp;
								<span>6 min read </span>&nbsp;&nbsp;
						</div>	
						<div className="col-lg-2 col-md-1 col-sm-1 col-xs-1 pull-right nameDetailDiv ">
							<a data-toggle="tooltip" title="Share Post"><img src="/images/share.png"/></a> &nbsp;&nbsp;
							<a data-toggle="tooltip" title="Follow Post"><img src="/images/plusSquare.png"/></a> &nbsp;&nbsp;
						</div>	
						</div>
					</div>	
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 socialInfoDiv">
						<label className="nameOfBlog col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Why 5GCPM as framework</label>
						
					</div>	
					<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>A regular investor, new to the stock market usually goes through following cycles:</p>
			  			<ul className="customUlother noPadding">
			  				<li>
			  				Step 1: Reads about Warrenxxx Buffett, Munger, Peter Lynch and many other legendary investors and fund managers. Starts mentioning their quotes everywhere.</li>
							<li>Step 2: If he is lucky to be part of tide of bull market coinciding with his reading about stock, he safely assumes his thesis is going perfect.</li>
							<li>Step 3: He may choose mostly growth investing, value investing, Moat investing as approaches.</li>
							<li>Step 4: Later on may even pick Capex or Cyclical approaches.</li>
							
						
							
			  			</ul>
			  		</div>
			  		<div className="col-lg-4 col-lg-offset-4 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<img src="/images/blogImage.jpeg"/>
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>Though all of above have huge potential of making money, Problem starts with a stagnation year, bear market year or correction year or when the stocks he has bought start tanking. He says "I am Long term investor". I would invest with "large stomach" as favorite quote. The stock keeps falling and he may keep adding or stay invested as he was earlier.</p>
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>There are many problems with these approaches.</p>
			  			<ol className="customOl">
			  				<li>
			  				 Most people do not earn millions of dollars a week like Buffett to add on to stock at 30-50-60% % draw downs. They do not have that strong income or cash flow.</li>
							<li>The stocks chosen may not be having the actual quality in reality but it might be more of the investor's assumption about quality. The Moat or quality might be in Investor's mind. This may prove disastrous when you indeed have capacity to add.</li>
							<li>There are cycles. Economic, sector, particular business growth cycles and also an investment cycle in that business and its stock. Consumers' behavioral change also plays a big role against company. Inventions and disruptions may change the entire game all together for companies. When they reverse against the stock in consideration, Investor may not have any clue or it might be too late.</li>
							
			  			</ol>
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<label className="subHeading">5 Growths</label>
			  			<p>Value investor who buys below book value, below working capital or below liquidation value or any such value arbitrage of buying at lower price than his assumed deserving value , he may have to wait for infinite period or may not know that though their assumed deserving value is higher , in reality it might not be rightfully valued at all. The value arbitrage may never get realized.</p>
			  			<ol className="customUlother noPadding">
			  				<li><u>Top line sales</u> growth is real growth for a company and rest of them are improvements. It may come from new products or value added products.</li>
							<li><u>Value/Volume/Mind share/sales network</u>  growth and that too in right verticals. There can be volume or value or both increases. Distribution and reach might have increased or more acceptance of its products by customers can result in same store growths or same client growths scenarios.</li>
							<li><u>Profit growth</u>  ultimately decides how much company is succeeding in managing its costs, cash flows or NOPAT or return ratios will be better if company earns better profits and eps.
								Consistency and increment in profit is a factor that results in rerating of valuation.</li>
							<li><u>Margins</u>  : Markets react hard and sharply to vast margin declines and if margin cycle is on decline mode investment comes in troubles. How long this decline would last or come back also decides further movements. where as improvements and that too little long lasting in margins make stock prices stable or roaring. Market rewards such enhancement further depending upon source of increase in margins.</li>
							<li><u>Market share</u>  : this should either be intact or increasing. Big decline in Market share in revenue and also profit share shows peers getting ahead or further causes can be new entrants or arrival of better product services . The Leader in sector or at least in products or services that company offers can only command better valuations . No1 or no2 company in the circle would be preferred choice for investment.</li>
							
			  			</ol>
			  		</div>
			  		
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<label className="subHeading">Corporate Governance</label>
			  			<p>Corporate governance and perception of market about managements play bigger role in an idea working fruitful as an investment.Many managements talk big but execute far less.

							In Bhagwad Geeta , Lord Krishna says <br/>

							<b>"One who knows only truth but does not know difference between Truth and Lie is a fool"</b></p>
			  			<ol className="customUlother noPadding">
			  				<li>Failure in corporate governance occurs when difference between words and actions start increasing. Type of auditor, Loans to subsidiaries, related party transactions, overall reputation in business world and market, background and history and many more detailed factors tell lot about rightfulness of promoters.</li>
							<li>"<u>Business and sector environments are common to all companies yet every company differs in performance. Books are common to all readers, what one makes out of it is different.</u> " </li>
							<li><b>Managements set DNA of company and DNA rarely change.</b>   Rumors, bad news, shocks, accusations, frauds, tax evasions, malicious practices make stock tanks of 10-15-20% in a day. Therefore in our view framework must consider ways to identify such gaps in governance .</li>

			  			</ol>
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<label className="subHeading">Practicability</label>
			  			<p>Managements also venture into new products, value addition products, capex that can expand margins, also do mergers / acquisitions. Any business runs on four wheels : product/service designs , reach in target market, availability and distribution. Companies keep focusing and working on these four. Whether their efforts in those will indeed result in increased market share, profit share, customer preferences, distributors selling preferences and ultimately in increase of eps , cash flows and share price of stock still remains a question. Though there will not be perfect ways to gauge but still leading parameters about viability/ practicability give better idea.</p>
			  		
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<label className="subHeading">Magic : Management of RISK</label>
			  			<p>And Though all of above will give better clarity and intuitiveness about an investment ideas still can not guarantee sustainability of profit in the investment and can produce permanent or considerably long term loss in it. Therefore though fundamentally one needs to assure all of above , one also needs to give due consideration and equal or more importance to Risk Management.

						we worked on how one can know that the long term trend or for considerable amount of time trend has been reversed. Not only with technical parameters but also with consideration of categories of investor behaviors in peculiar type of situations, fundamental quantifiable parameters and classification of changes in business perspectives and Market perspective towards that stock , we came up with Management of RISK thesis calling it as Magic combination of above.

						These cases studies and analysis made us create such Framework 5GCPM.</p>
			  		
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<label className="subHeading">Practicability</label>
			  			<p>And Though all of above will give better clarity and intuitiveness about an investment ideas still can not guarantee sustainability of profit in the investment and can produce permanent or considerably long term loss in it. Therefore though fundamentally one needs to assure all of above , one also needs to give due consideration and equal or more importance to Risk Management.

						we worked on how one can know that the long term trend or for considerable amount of time trend has been reversed. Not only with technical parameters but also with consideration of categories of investor behaviors in peculiar type of situations, fundamental quantifiable parameters and classification of changes in business perspectives and Market perspective towards that stock , we came up with Management of RISK thesis calling it as Magic combination of above.

						These cases studies and analysis made us create such Framework 5GCPM.</p>
			  		
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>Our Small Case portfolio is composed of stocks that comply above framework as per our view. <a href="https://arthavruddhi.smallcase.com/smallcase/AVCMO_0002"> https://arthavruddhi.smallcase.com/smallcase/AVCMO_0002 </a></p>
			  		
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<img src="/images/file1.png"/>
			  		
			  		</div>
			  			<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>Download our presentation at <br/><a href="https://drive.google.com/file/d/1vbUggy7itBM4NNmEx6xzL5g7OpUaCx6i/view"> https://drive.google.com/file/d/1vbUggy7itBM4NNmEx6xzL5g7OpUaCx6i/view</a> </p>
			  		
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>We are in process of writing detailed thesis of this approach along with practical case studies in our book which may take time to come. These posts would continue to elaborate further and in much details.  </p>
			  		
			  		</div>
			  		<div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 blogData">
			  			<p>Pritam & Krishna  </p>
			  		
			  		</div>
				</div>	
			</div>
		);
	}
}
