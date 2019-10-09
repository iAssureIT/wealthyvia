import React                                     from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Header                                    from "../blocks/common/Header/Header.js";
import Footer                                    from "../blocks/common/Footer/Footer.js";
import Homepage                                  from "../pages/Homepage/Homepage.js";
import AboutUs                                   from "../pages/AboutUs/AboutUs.js";
import ContactUs                                 from "../pages/ContactUs/ContactUs.js";
import ProductPage                               from "../pages/ProductPage/ProductPage.js";
import RiskProfilePage                           from "../pages/RiskProfilePage/RiskProfilePage.js";
import KycForm                                   from "../pages/KycForm/KycForm.js";
import BlogViewPage                              from "../pages/BlogViewPage/BlogViewPage.js";
import AllBlogs                                  from "../pages/AllBlogs/AllBlogs.js";
import SingleBlogPage                            from "../pages/SingleBlogPage/SingleBlogPage.js";
import InvoicePage                               from "../pages/InvoicePage/InvoicePage.js";
import OrderPage                                 from "../pages/OrderPage/OrderPage.js";
import BlogsFormPage                             from "../pages/BlogsForm/BlogsFormPage.js";

import offeringFormPage                          from "../pages/offeringFormPage/offeringFormPage.js";
import OfferingPage                              from "../pages/OfferingPage/OfferingPage.js";

import ClientDashboard                           from "../pages/ClientDashboard/ClientDashboard.js";



// Section: 1 - SystemSecurity ******************************************************
import Login            from '../systemSecurity/Login.js';
import ConfirmOtp       from '../systemSecurity/ConfirmOtp.js'; 
import ForgotPassword   from '../systemSecurity/ForgotPassword.js';
import ResetPassword    from '../systemSecurity/ResetPassword.js';
import SignUp           from '../systemSecurity/SignUp.js';
import VerifyAccount    from '../systemSecurity/VerifyAccount.js';

const WebLayout = () => (
  <div>
         
              <Route path="/ClientDashboard"                                 exact strict component={ClientDashboard}  />
              
              <Route path="/"                                 exact strict component={Homepage}  />
              <Route path="/about-us"                         exact strict component={AboutUs}  />
              <Route path="/contact-us"                       exact strict component={ContactUs}  />
              <Route path="/ProductPage"                      exact strict component={ProductPage}  />
              <Route path="/RiskProfilePage"                  exact strict component={RiskProfilePage}  />
              <Route path="/KycForm"                          exact strict component={KycForm}  />
              <Route path="/AllBlogs"                         exact strict component={AllBlogs}  />
              <Route path="/blogsform/:blogID"                exact strict component={BlogsFormPage}  />
              <Route path="/BlogViewPage"                     exact strict component={BlogViewPage}  />
              <Route path="/offerings/:divId"                 exact strict component={ProductPage}  />
              <Route path="/singleblogpage"                   exact strict component={SingleBlogPage}  />
              <Route path="/InvoicePage"                      exact strict component={InvoicePage}  />
              <Route path="/OrderPage"                        exact strict component={OrderPage}  />
              <Route path="/singleblogpage/:selectedID"       exact strict component={SingleBlogPage}  />
              <Route path="/blogsform"                        exact strict component={BlogsFormPage}  />
              <Route path="/offeringformpage"                 exact strict component={offeringFormPage}  />
              <Route path="/offeringformpage/:selectedID"     exact strict component={offeringFormPage}  />
              <Route path="/offeringpage"                     exact strict component={OfferingPage}  />
              <Route path="/offeringpage/:selectedID"         exact strict component={OfferingPage}  />



              <Route path="/login"                             exact strict component={ Login } />
              <Route path="/signup"                            exact strict component={ SignUp } />
              <Route path="/forgot-pwd"                        exact strict component={ ForgotPassword } />
              <Route path="/reset-pwd/:user_ID"                exact strict component={ ResetPassword } />
              <Route path="/verify-account"                    exact strict component={ VerifyAccount } />
              <Route path="/confirm-otp/:user_ID"              exact strict component={ ConfirmOtp } />
        </div>
);

 function Layout() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={ WebLayout } />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default Layout;