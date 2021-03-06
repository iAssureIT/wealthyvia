import React              		from 'react';
// import { ParallaxProvider } 	from 'react-scroll-parallax';
import Layout 					from "./Layout/Layout.js";
import axios                    from "axios";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
//axios.defaults.baseURL = 'https://api.wealthyvia.com';
//axios.defaults.baseURL = 'http://wealthyviapi.iassureit.com';
//axios.defaults.baseURL = 'http://localhost:3015';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div className="App">
	   <Layout />
    </div>
  );
}
export default App;
