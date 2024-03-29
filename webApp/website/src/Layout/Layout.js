import React                                     from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Header                                    from "../blocks/common/Header/Header.js";
import Footer                                    from "../blocks/common/Footer/Footer.js";
import AboutUsCarousel                           from "../blocks/AboutUsCarousel/AboutUsCarousel.js";
import Homepage                                  from "../pages/Homepage/Homepage.js";
import AboutUs                                   from "../pages/AboutUs/AboutUs.js";
import ContactUs                                 from "../pages/ContactUs/ContactUs.js";
import ProductPage                               from "../pages/ProductPage/ProductPage.js";
import RiskProfilePage                           from "../pages/RiskProfilePage/RiskProfilePage.js";
 
import JoinAsPartnerForm                         from "../pages/JoinAsPartnerForm/JoinAsPartnerForm.js";
import ConfirmPartnerEmailOtp                    from "../pages/JoinAsPartnerForm/ConfirmPartnerEmailOtp.js";
import AboutUsVideo                              from "../pages/AboutUsVideo/AboutUsVideo.js";

//import BlogViewPage                              from "../pages/BlogViewPage/BlogViewPage.js";
import AllBlogs                                  from "../pages/AllBlogs/AllBlogs.js";
import SingleBlogPage                            from "../pages/SingleBlogPage/SingleBlogPage.js";
import InvoicePage                               from "../pages/InvoicePage/InvoicePage.js";
import PlanPage                                  from "../pages/PlanPage/PlanPage.js";
import OrderPage                                 from "../pages/OrderPage/OrderPage.js";
import BlogsFormPage                             from "../pages/BlogsForm/BlogsFormPage.js";

import offeringFormPage                          from "../pages/offeringFormPage/offeringFormPage.js";
import OfferingPage                              from "../pages/OfferingPage/OfferingPage.js";

import ClientDashboard                           from "../pages/ClientDashboard/ClientDashboard.js";
import Addkycdetails                             from "../pages/ClientDashboard/Addkycdetails.js";
import RiskProfile                               from "../pages/ClientDashboard/RiskProfile.js";
import Productpricing                            from "../pages/ClientDashboard/Productpricing.js";

import InvoicePageView                          from "../pages/PaymentProcess/InvoicePageView.js";
import PaymentResponse                          from "../pages/PaymentProcess/PaymentResponse.js";
import PaymentSuccess                           from "../pages/PaymentProcess/PaymentSuccess.js";
import FreeResearchReport                       from "../pages/FreeResearchReport/FreeResearchReport.js";

import ProductInvoicePage                       from "../pages/ProductInvoicePage/ProductInvoicePage.js";
import ProductPaymentResponse                   from "../pages/ProductPaymentProcess/ProductPaymentResponse.js";


// Section: 1 - SystemSecurity ******************************************************
import Login            from '../systemSecurity/Login.js';
import ConfirmOtp       from '../systemSecurity/ConfirmOtp.js'; 
import ForgotPassword   from '../systemSecurity/ForgotPassword.js';
import ResetPassword    from '../systemSecurity/ResetPassword.js';
import SignUp           from '../systemSecurity/SignUp.js';
import VerifyAccount    from '../systemSecurity/VerifyAccount.js';

const WebLayout = () => (
  <div>
         
              <Route path="/ClientDashboard"                  exact strict component={ClientDashboard}  />
              <Route path="/addkyc"                           exact strict component={Addkycdetails}  />
              <Route path="/riskprofile"                           exact strict component={RiskProfile}  />
              <Route path="/product-pricing"                  exact strict component={Productpricing}  />
              <Route path="/ProductInvoicePage/:order_id"     exact strict component={ProductInvoicePage}  />
              <Route path="/product-payment-response/:orderId"  exact strict component={ProductPaymentResponse}  />
              
              <Route path="/"                                 exact strict component={Homepage}  />
              <Route path="/about-us"                         exact strict component={AboutUs}  />
              <Route path="/AboutUsCarousel"                  xact strict component={AboutUsCarousel}  />
              <Route path="/contact-us"                       exact strict component={ContactUs}  />
              <Route path="/ProductPage"                      exact strict component={ProductPage}  />
              <Route path="/RiskProfilePage"                  exact strict component={RiskProfilePage}  />
              <Route path="/AllBlogs"                         exact strict component={AllBlogs}  />
              <Route path="/blogsform/:blogID"                exact strict component={BlogsFormPage}  />
              <Route path="/offerings/:divId"                 exact strict component={ProductPage}  />
              <Route path="/InvoicePage/:order_id"            exact strict component={InvoicePage}  />
              <Route path="/PlanPage"                         exact strict component={PlanPage}  />
              <Route path="/join-as-partner"                  exact strict component={JoinAsPartnerForm}  />
              <Route path="/partner-emailotp/:user_ID"         exact strict component={ ConfirmPartnerEmailOtp } />
              <Route path="/tools"                            exact strict component={AboutUsVideo}  /> 
              <Route path="/MyOrders"                        exact strict component={OrderPage}  />
              <Route path="/blogsform"                        exact strict component={BlogsFormPage}  />
              <Route path="/offeringformpage"                 exact strict component={offeringFormPage}  />
              <Route path="/offeringformpage/:selectedID"     exact strict component={offeringFormPage}  />
              <Route path="/offeringpage"                     exact strict component={OfferingPage}  />
              <Route path="/offeringpage/:selectedID"         exact strict component={OfferingPage}  />
              <Route path="/blog/:selectedUrl"               exact strict component={SingleBlogPage}  />
              <Route path="/free-research-reports"            exact strict component={FreeResearchReport}  />

              <Route path="/invoicePageView/:order_Id"         exact strict component={InvoicePageView}  />
              <Route path="/payment-response/:orderId"         exact strict component={PaymentResponse}  />
              <Route path="/payment-success"                   exact strict component={PaymentSuccess}  />


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