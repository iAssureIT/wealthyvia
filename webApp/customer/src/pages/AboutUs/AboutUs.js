import React, { Component } from 'react';
import ClientDeliverables from "../../blocks/ClientDeliverables/ClientDeliverables.js";
import ValuesWeCreate from "../../blocks/ValuesWeCreate/ValuesWeCreate.js";
import "./AboutUs.css";

export default class AboutUs extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
      var url = this.props.location.pathname;
      localStorage.setItem("lastUrl",url);
 
  } 

  render() {

    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nineYearImage">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  blackDivRisk"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-offset-5 col-md-2 hidden-sm hidden-xs imgContentAU"></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">9 Years of Experience</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">We are the one of experienced organization, we have 9 Years of Research Experience of working for our Institutional clients</label>
                    </div>  
                </div>  
            </div>
        
                {/*<div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 bannerContainerAU">
                    
                    <div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 headingAbout" >
                      <div className="row">
                      <svg  className="svgContent hidden-sm hidden-xs" >
                        <line x1="0" y1="0" x2="100" y2="0"/>
                      </svg>  HOW IT WORKS   <svg  className="svgContent hidden-sm hidden-xs" >
                        <line x1="0" y1="0" x2="100" y2="0" />
                      </svg>
                      </div>
                    </div>  
                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 bannerAUPara">
                      <div className="row">
                        <p> Know us better by understanding our secrets and work style. </p>
                      </div>
                    </div>
                     <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 descDivAU">
                      <div className="row">
                        <p> Wealthyvia has a unique approach to create strategies,investment ideas findings,business analysts,Wealth management and portfolio performance.<br/>Scroll down and know how. </p>
                      </div>
                    </div>
                </div>
             */}
          <div className="col-lg-12 col-md-12 hcol-sm-12 col-xs-12">
          {/*  <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aboutUsContainer">
                <div className="row">
                  <div className="triangle-bottomleft hidden-xs hidden-md hidden-sm col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <label className="outstandingTeam">Our Outstanding Team</label>
                  <ul className="customUlabout">
                  <li>Total  80 plus years of experience in stock market combined  founders and 7  analysts. </li>

                  <li>Well connects to Managements of Business </li>

                  <li>network of analysts and consultants </li>

                  <li>Experience of Bear Markets</li>

                  <li>Best of advanced analytical tools, self developed softwares  and algo systems for data collection, analysis and interpretations</li>
                  </ul>
                  
                </div>
                </div>
            </div>
            </div>*/}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                  <div className="row">
                   <label className="qfHead col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Qualitative Framework</label>

                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/team.png" alt=""/>
                          <p>Management Integrity, high shareholding , better reputation, Changes in shareholding patterns</p>                      
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/address.png" alt=""/>
                          <p>Consistency in Revenue , EBIDTA , Profit Growth , ROE , ROCE and Margins </p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/diagram.png" alt=""/>
                          <p>Business Scaleability, sustainability, market shares, product pricing powers, Durable competitive advantage </p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/sign.png" alt=""/>
                          <p>Corporate Governance : Accounting redflags, promoter track/reputation  records, Third party transactions , tax and dividends</p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/umbrella.png" alt=""/>
                          <p>Are Big investors, FII , DII interested in these stocks? Buying interest </p>
                    
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/house.png" alt=""/>
                          <p>We invest only when valuations are right</p>
                    
                      </div>
                    </div>
               
             {/*  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nineYearImage">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  blackDivRisk"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 imgContentAU"><img src="/images/exp.png"/></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">9 Years of Experience</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">We are the one of experienced organization, we have 9 Years of Research Experience of working for our Institutional clients</label>
                    </div>  
                </div>  
            </div>
        */}
          <div className="col-lg-12 col-md-12 hidden-sm hidden-xs riskDiv">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  blackDiv textAlignCenter"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-offset-5 col-md-2 hidden-xs hidden-sm imgContentAU"></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Risk Management</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Our job is to manage the risk first. Returns are something dependent on both cleverness of strategies and markets. Our uniquely designed "Risk Management System" measures early deviations from intended outcomes as well as help us protect your capital & profits.</label>
                    </div>  
                </div>  
            </div>
             <div className="hidden-lg hidden-md col-sm-12 col-xs-12 riskDiv1">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  blackDiv1 textAlignCenter"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-offset-5 col-md-2 hidden-xs hidden-sm imgContentAU"></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Risk Management</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Our job is to manage the risk first. Returns are something dependent on both cleverness of strategies and markets. Our uniquely designed "Risk Management System" measures early deviations from intended outcomes as well as help us protect your capital & profits.</label>
                    </div>  
                </div>  
            </div>

              </div>            
            </div>
                <ClientDeliverables />
         
            <div className="col-lg-12 col-md-12 hidden-xs hidden-sm  backColorGray padding40inDiv">
                <div className="row">
                  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1 backColorGray"> 
                    <label className="nameOfImageHead">Our Team</label>
                    <div className="borderBottomDiv"></div>
                    <p>We have team of great mixture and different strengths and expertise working together but with equal commitment. Our Team Comprises of Research Analysts from Industry specialists, business analysts, Operational and Marketing consultants and Stock Market equity specialists.</p>
                    </div>
                      <div className="col-lg-6 col-md-6 hidden-xs hidden-sm  image1 noPadding"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/ourTeam.jpg" alt=""/>
                    </div>  
                     
                </div>  
            </div>
            <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorGray">
                <div className="row">
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md  noPadding image2"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/ourTeam.jpg" alt=""/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Our Team</label>
                    <div className="borderBottomDiv"></div>
                    <p>We have team of great mixture and different strengths and expertise working together but with equal commitment. Our Team Comprises of Research Analysts from Industry specialists, business analysts, Operational and Marketing consultants and Stock Market equity specialists.</p>
                    </div>  
                </div>  
            </div>
             <div className="col-lg-12 col-md-12 hidden-xs hidden-sm padding40inDiv">
                <div className="row">
                  
                  <div className="col-lg-6   col-md-5 hidden-xs hidden-sm  noPadding image1"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/books.jpg" alt=""/>
                    </div> 
                    <div className="col-lg-6  col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Fondness For Reading</label>
                    <div className="borderBottomDiv"></div>
                    <p>We happily studied 324 books on stock market investment approaches & strategies alone along with 478 business success and failure case studies. We still consider it less and will be life long students</p>
                    </div>  
                     
                </div>  
            </div>
            <div className="hidden-lg hidden-md col-sm-12 col-xs-12 ">
                <div className="row">
                       <div className="col-sm-12 col-xs-12 hidden-lg hidden-md  noPadding image2"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/books.jpg" alt=""/>
                    </div>   
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Fondness For Reading</label>
                    <div className="borderBottomDiv"></div>
                    <p>We happily studied 324 books on stock market investment approaches & strategies alone along with 478 business success and failure case studies. We still consider it less and will be life long students</p>
                    </div>  
                </div>  
            </div>
            <div className="col-lg-12 col-md-12 hidden-xs hidden-sm padding40inDiv backColorGray">
                <div className="row">
                  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1 "> 
                    <label className="nameOfImageHead">Our Equipments & Tools </label>
                    <div className="borderBottomDiv"></div>
                    <p>self developed screening Software tools to scan Fundamentals and Technicals. It took 924 hours of hard work and 17000 lines of code to reach it to our requirements. These Systems help us a lot in being alert to find opportunities and direct our time to right efforts.</p>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm  noPadding image1"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/weAre.jpg" alt=""/>
                    </div>  
                </div>  
            </div>
            <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorGray ">
                <div className="row">
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md  noPadding image2"> 
                    <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/weAre.jpg" alt=""/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Our Equipments & Tools</label>
                    <div className="borderBottomDiv"></div>
                    <p>self developed screening Software tools to scan Fundamentals and Technicals. It took 924 hours of hard work and 17000 lines of code to reach it to our requirements. These Systems help us a lot in being alert to find opportunities and direct our time to right efforts.</p>
                    </div>  
                </div>  
            </div>
            <div className="col-lg-12 col-md-12 hidden-xs hidden-sm padding40inDiv ">
                <div className="row">
                  <div className="col-lg-6   col-md-5 hidden-xs hidden-sm  noPadding image1 "> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/clearDirection.jpg" alt=""/>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Clear Roadmap</label>
                    <div className="borderBottomDiv"></div>
                    <p>In the journey of wealth creation, right direction is everything. Like without roadmap one can not know where is he heading , without carved out plan one can not know whether Wealth is growing in anticipated manner.</p>
                    </div>  
                </div>  
            </div>
            <div className="hidden-lg hidden-md col-sm-12 col-xs-12  ">
                <div className="row">
                      <div className="col-sm-12 col-xs-12 hidden-lg hidden-md  noPadding image2"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/clearDirection.jpg" alt=""/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Clear Roadmap</label>
                    <div className="borderBottomDiv"></div>
                    <p>In the journey of wealth creation, right direction is everything. Like without roadmap one can not know where is he heading , without carved out plan one can not know whether Wealth is growing in anticipated manner.</p>
                    </div>  
                </div>  
            </div>
     
            <div className="col-lg-12 col-md-12 hidden-xs hidden-sm padding40inDiv backColorGray">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                      <label className="nameOfImageHead">Performance Measurement</label>
                      <div className="borderBottomDiv"></div>
                      <p> unless we measure, we can not know where we stand  viz a viz others others. Our monitoring policy and tools measure it continously where we are standing and can we outperperform benchmark indices.</p>
                      </div>  
                      <div className="col-lg-6 col-md-6 hidden-xs hidden-sm  noPadding image1"> 
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/performance.jpg" alt=""/>
                      </div> 
                  </div>  
                </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 backColorGray ">
                    <div className="row">
                           <div className="col-sm-12 col-xs-12 hidden-lg hidden-md  noPadding image2"> 
                          <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/performance.jpg"/>
                        </div>  
                        <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                        <label className="nameOfImageHead">Performance Measurement</label>
                        <div className="borderBottomDiv"></div>
                        <p> unless we measure, we can not know where we stand  viz a viz others others. Our monitoring policy and tools measure it continously where we are standing and can we outperperform benchmark indices.</p>
                        </div>  
                    </div>  
                </div>
                <div className="col-lg-12 col-md-12 hidden-xs hidden-sm padding40inDiv ">
                  <div className="row">
                     <div className="col-lg-6  col-md-5 hidden-xs hidden-sm  noPadding image1"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/management.jpg" alt=""/>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Management</label>
                    <div className="borderBottomDiv"></div>
                    <p>Our investment Management committee reviews the portfolios and investment decision.</p>
                    </div>  
                  </div>  
                </div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12  ">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12 hidden-lg hidden-md  noPadding image2"> 
                      <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/management.jpg" alt=""/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Management</label>
                    <div className="borderBottomDiv"></div>
                    <p>Our investment Management committee reviews the portfolios and investment decision.</p>
                    </div>  
                    </div>  
                </div>
    
          
            
             <div className="">
                <ValuesWeCreate />
            </div>
          </div>
          
           </div>
            </div>
            </div>
          
        
    );
  }
}
