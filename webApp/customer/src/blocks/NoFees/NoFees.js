import React, { Component } from 'react';
import $         from 'jquery';

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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite onHoverEffect" id="5gcpm">
                <div className="row">

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/img2.gif"/>
                    </div>

                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 gifTextContainer learnMoreST">
                    <label><span className="iceBlueColor">5GCPM </span></label>
                    <p>Wealth is a function of investing in intelligent ideas with conviction. Its not only about patience but also about disciplined approach. Such rare gem stocks that compound at higher rate and produce considerable growth In portfolio are Rare. Our self-designed& developed 5GCPM framework helps you to invest in such stocks..</p><a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>
                  </div>
                </div>
              </div>
    );
  }
}
