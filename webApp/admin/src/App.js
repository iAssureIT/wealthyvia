import React 				from 'react';
import axios   				from 'axios';
import Layout  				from './coreAdmin/Layout/Layout.js';
import SignIn  				from './coreAdmin/Layout/SignIn.js';
import LayoutSystemSecurity from './coreAdmin/LayoutSystemSecurity/LayoutSystemSecurity.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lib/router.js';
import './App.css';

// axios.defaults.baseURL = 'http://uatapi.coffic.com/';
// axios.defaults.baseURL = 'http://cofficapi.iassureit.com/';api.wealthyvia.com
/*axios.defaults.baseURL = 'http://prodapi.coffic.com/';*/
axios.defaults.baseURL = 'http://api.wealthyvia.com';


// axios.defaults.baseURL = 'http://localhost:5012/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div>
      <Layout />
    </div>
  );  
} 
export default App;
