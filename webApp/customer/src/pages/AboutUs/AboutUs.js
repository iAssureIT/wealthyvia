import React, { Component } from 'react';
import $         from 'jquery';
import AboutUsCarousel from "../../blocks/AboutUsCarousel/AboutUsCarousel.js";
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
 
  } 

  render() {

    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 bannerContainerAU">
                    
                    <div className="col-lg-10  col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 headingAbout" >
                      <div className="row">
                      <svg  className="svgContent" >
                        <line x1="0" y1="0" x2="100" y2="0"/>
                      </svg>  HOW IT WORKS   <svg  className="svgContent" >
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
                        <p> Wealthyvia takes a unique approach to lending, offering lower interest rates and big savings.<br/>Scroll down and know how. </p>
                      </div>
                    </div>
                </div>
             
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
                          <img src="/images/team.png"/>
                          <p>Management Integrity, high shareholding , better reputation, Changes in shareholding patterns</p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="/images/address.png"/>
                          <p>Consistency in Revenue , EBIDTA , Profit Growth , ROE , ROCE and Margins </p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="/images/diagram.png"/>
                          <p>Business Scaleability, sustainability, market shares, product pricing powers, Durable competitive advantage </p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="/images/sign.png"/>
                          <p>Corporate Governance : Accounting redflags, promoter track/reputation  records, Third party transactions , tax and dividends</p>
                    
                      </div>
                    </div>

                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="/images/umbrella.png"/>
                          <p>Are Big investors, FII , DII interested in these stocks? Buying interest </p>
                    
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 hexDiv1">
                        <div className="row">
                          <img src="/images/house.png"/>
                          <p>We invest only when valuations are right</p>
                    
                      </div>
                    </div>
               
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nineYearImage">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivRisk"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 imgContentAU"><img src="/images/exp.png"/></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">9 Years of Experience</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">We are the one of experienced organization, we have 9 Years of Research Experience of working for our Institutional clients</label>
                    </div>  
                </div>  
            </div>
        

              </div>            
            </div>
                <ClientDeliverables />
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">We have</label>
                    <div className="borderBottomDiv"></div>
                    <p>Studied 324 books on stock market investment approaches & strategies alone along with 478 business success and failure case studies. </p>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm backColorBlack noPadding image1"> 
                      <img src="/images/books.jpg"/>
                    </div> 
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md backColorBlack noPadding image2"> 
                      <img src="/images/books.jpg"/>
                    </div>   
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">We have</label>
                    <div className="borderBottomDiv"></div>
                    <p>Studied 324 books on stock market investment approaches & strategies alone along with 478 business success and failure case studies. </p>
                    </div>  
                   
                </div>  
            </div>  
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm backColorBlack image1 noPadding"> 
                      <img src="/images/ourTeam.jpg"/>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Our team</label>
                    <div className="borderBottomDiv"></div>
                    <p>Team of 7 Research Analysts .Team mix of Industry specialists, business analysts, Operational and Marketing consultants and Stock Market equity specialists.</p>
                    </div>  
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md backColorBlack noPadding image2"> 
                      <img src="/images/ourTeam.jpg"/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Our team</label>
                    <div className="borderBottomDiv"></div>
                    <p>Team of 7 Research Analysts .Team mix of Industry specialists, business analysts, Operational and Marketing consultants and Stock Market equity specialists.</p>
                    </div>  
                </div>  
            </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">We are</label>
                    <div className="borderBottomDiv"></div>
                    <p>Self developed Software tools with 924 hours of hard work and 17000 lines of code  to screen and filter data and algorithm systems to find right trades. </p>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm backColorBlack noPadding image1"> 
                      <img src="/images/weAre.jpg"/>
                    </div>  
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md backColorBlack noPadding image2"> 
                      <img src="/images/weAre.jpg"/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">We are</label>
                    <div className="borderBottomDiv"></div>
                    <p>Self developed Software tools with 924 hours of hard work and 17000 lines of code  to screen and filter data and algorithm systems to find right trades. </p>
                    </div>  
                </div>  
            </div>  
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm backColorBlack noPadding image1"> 
                      <img src="/images/clearDirection.jpg"/>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Clear direction</label>
                    <div className="borderBottomDiv"></div>
                    <p>Finding trends direction and early deviations from expected trends. Having Right Direction is a must in journey of Wealth creation</p>
                    </div>  
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md backColorBlack noPadding image2"> 
                      <img src="/images/clearDirection.jpg"/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Clear direction</label>
                    <div className="borderBottomDiv"></div>
                    <p>Finding trends direction and early deviations from expected trends. Having Right Direction is a must in journey of Wealth creation</p>
                    </div>  
                   
                </div>  
            </div>
            <div className="col-lg-12 col-md-12 hidden-sm hidden-xs riskDiv">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDiv textAlignCenter"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 imgContentAU"><img src="/images/riskImg.png"/></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Risk Management</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Our job to manage the risk first, returns depend on cleverness of strategies and markets.Our uniquely defined “Risk management system” that measures volatility, still left growth potential.  </label>
                    </div>  
                </div>  
            </div>
             <div className="hidden-lg hidden-md col-sm-12 col-xs-12 riskDiv1">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBlack blackDivRisk textAlignCenter"> 
                    <div className="col-lg-2 col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 imgContentAU"><img src="/images/riskImg.png"/></div>
                    <p className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Risk Management</p>
                    <label className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">Our job to manage the risk first, returns depend on cleverness of strategies and markets.Our uniquely defined “Risk management system” that measures volatility, still left growth potential.  </label>
                    </div>  
                </div>  
            </div>
         
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Performance</label>
                    <div className="borderBottomDiv"></div>
                    <p>Out performance and Under performance measurement  of each stock returns  and portfolio returns with benchmarks </p>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm backColorBlack noPadding image1"> 
                      <img src="/images/performance.jpg"/>
                    </div> 
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md backColorBlack noPadding image2"> 
                      <img src="/images/performance.jpg"/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Performance</label>
                    <div className="borderBottomDiv"></div>
                    <p>Out performance and Under performance measurement  of each stock returns  and portfolio returns with benchmarks </p>
                    </div>  
                    
                </div>  
            </div>  
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm backColorBlack noPadding image1"> 
                      <img src="/images/management.jpg"/>
                    </div>  
                    <div className="col-lg-6 col-md-6 hidden-xs hidden-sm imageContent1"> 
                    <label className="nameOfImageHead">Management</label>
                    <div className="borderBottomDiv"></div>
                    <p>Investment Management committee Monthly review and Monitoring</p>
                    </div>  
                     <div className="col-sm-12 col-xs-12 hidden-lg hidden-md backColorBlack noPadding image2"> 
                      <img src="/images/management.jpg"/>
                    </div>  
                    <div className="col-sm-12 col-xs-12 hidden-lg hidden-md imageContent2"> 
                    <label className="nameOfImageHead">Management</label>
                    <div className="borderBottomDiv"></div>
                    <p>Investment Management committee Monthly review and Monitoring</p>
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
