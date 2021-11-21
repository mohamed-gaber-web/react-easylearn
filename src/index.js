import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";


import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom'

axios.interceptors.request.use(req => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
    req.headers["x-access-token"] = token; // for Node.js Express back-end
  }
  return req;
})

// axios.interceptors.response.use(
//   (res) => {
//     console.log(res);
//     return res;
//   },
//     (err) => {
//     console.log('hay', err.response.status );
//     // const originalConfig = err.config;
//     if( err.response.status === 403 ) {
//       localStorage.clear();
//       <Redirect exact from='/' to='/login'  />
//       console.log('error 403 redirect to login page');
//     }

//     // if (originalConfig.url !== "/auth/signin" && err.response) {
//     //   // Access Token was expired
//     //   if (err.response.status === 401 && !originalConfig._retry) {
//     //     originalConfig._retry = true;
//     //   }
//     // }

//     // return Promise.reject(err);
//   }
// );

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

