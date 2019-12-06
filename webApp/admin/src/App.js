import React 				from 'react';
import axios   				from 'axios';
import Layout  				from './coreAdmin/Layout/Layout.js';
import SignIn  				from './coreAdmin/Layout/SignIn.js';
import LayoutSystemSecurity from './coreAdmin/LayoutSystemSecurity/LayoutSystemSecurity.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './lib/router.js';
import './App.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div>
      <Layout />
    </div>
  );  
} 
export default App;



