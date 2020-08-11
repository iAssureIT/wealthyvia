import React, { Component } from 'react';

import "./NoFees.css";

export default class NoFees extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"5gcpm"
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
           
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20 " id="5gcpm">
              <div className="row">

                <div className="col-lg-10 col-md-6 hidden-sm hidden-xs startTrandingContent  padding40 backColorGray">
                  <div className="row">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 learnMoreST">
                    <label><span className="iceBlueColor">5GCPM </span></label>
                    <p> Wealth is a function of investing in intelligent ideas with conviction. 
                        It's not only about patience but also about disciplined approach. Such gem stocks that compound at higher rate 
                        and produce significant growth of investments are rare. Our self-designed & developed 5GCPM framework 
                        helps you to invest in such stocks..</p><a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a>
                        &nbsp;&nbsp;
                        <a href={"/offerings/"+this.state.nameOfDiv+"#productchart"} className="">Check Performance </a>
                    </div>
                   
                  </div>
                </div>
               <div className="col-lg-6 col-lg-offset-6 col-md-6  hidden-sm hidden-xs padding40 fiveG para1 ">
                    <img className="row" src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/blog1.jpg" alt=""/>
                </div>
                  <div className="hidden-md hidden-lg col-sm-12 col-xs-12 backColorWhite  ">
                    <div className="row">
                      <div className="col-sm-12 col-sm-12 hidden-md hidden-lg small">
                            <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/blog1.jpg" alt=""/>
                        </div>
                        <div className="col-sm-12 col-xs-12 hidden-md hidden-lg startTrandingContentSmall  backColorGray">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right noPadding learnMoreST">
                            <label><span className="iceBlueColor">5GCPM </span></label>
                            <p>Wealth is a function of investing in intelligent ideas with conviction. Its not only about patience but also about disciplined approach. Such rare gem stocks that compound at higher rate and produce considerable growth In portfolio are Rare. Our self-designed & developed 5GCPM framework helps you to invest in such stocks..</p><a href={"/offerings/"+this.state.nameOfDiv} className="">Read More </a>
                            &nbsp;&nbsp;
                        <a href={"/offerings/"+this.state.nameOfDiv+"#productchart"} className="">Check Performance </a>
                            </div>
                          </div>
                        </div>
                     
                    </div>
              </div>
              </div>
            </div>
    );
  }
}
