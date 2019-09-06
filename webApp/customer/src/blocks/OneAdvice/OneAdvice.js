import React, { Component } from 'react';
import $         from 'jquery';

import "./OneAdvice.css";

export default class OneAdvice extends Component {

  constructor(props) {
    super(props);
        this.state = {
          nameOfDiv:"safeHevenMoats"
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
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite" id="safeHevenMoats">
                <div className="row">
                
                  <div className="col-lg-6 col-md-6 hidden-sm hidden-xs oneOnOneAdvice learnMoreST">
                    <label><span className="iceBlueColor">Safe heaven moats</span></label><br/>

                    <p >Quality is something that is remembered long after its price paid is gone. Aspirations and needs of young newly settling middle class or married couples are catered by few dominant companies in India for very long period. Stability and scale of these companies makes them invincible. Many other companies come and try to 
                    compete or fetch market shares from such giants but these behemoth elephants continue to march North. 
                    How to make consistent wealth with them ?</p>
                     <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>
                   
                  </div>
                   <div className="col-lg-6 col-md-6 hidden-sm hidden-xs gifContainer">
                    <div>
                      <img src="/images/img3.jpg"/>
                    </div>  
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 gifContainer">
                    <div>
                      <img src="/images/img3.jpg"/>
                    </div>  
                  </div>
                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 oneOnOneAdvice learnMoreST">
                    <label><span className="iceBlueColor">Safe heaven moats</span></label><br/>

                    <p >Quality is something that is remembered long after its price paid is gone. Aspirations and needs of young newly settling middle class or married couples are catered by few dominant companies in India for very long period. Stability and scale of these companies makes them invincible. Many other companies come and try to 
                    compete or fetch market shares from such giants but these behemoth elephants continue to march North. 
                    How to make consistent wealth with them ?</p>
                     <a href={"/ProductPage/"+this.state.nameOfDiv} className="">Read More </a>
                   
                  </div>
                  
                </div>
              </div>
            </div>
    );
  }
}
