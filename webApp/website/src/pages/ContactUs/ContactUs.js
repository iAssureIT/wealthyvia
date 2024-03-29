import React, { Component } from 'react';

import "./ContactUs.css";

import ContactUsBanner      from "../../blocks/ContactUsBanner/ContactUsBanner.js";
import ContactMap         from "../../blocks/ContactMap/ContactMap.js";
import ContactUsForm      from "../../blocks/ContactUsForm/ContactUsForm.js";


export default class ContactUs extends Component {

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
          <div className="container-fluid col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding " style={{"marginTop":"38px"}}>
           <ContactUsBanner/>
            {/* <ContactAddress/>*/}
            <ContactMap/>
            <ContactUsForm/>
          </div>
    );
  }
}
    