import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './Redux/Store/Store';
import axios from 'axios';
import {ACTION_LOGIN} from './Redux/Action/AuthAction';

axios.defaults.baseURL = 'http://192.168.0.41:9502/';
let _isRefreshingToken = false;
axios.interceptors.response.use (
  res => {
    return res;
  },
  async error => {
    // console.log ('error', error);
    if (error.response.status == 401 && _isRefreshingToken == false) {
      _isRefreshingToken = true;
      const refreshToken = localStorage.getItem ('refresh_token');
      // console.log ('refresh_token', refreshToken);
      const _orgRequest = error.config;
      const response = await axios.post ('v1/refresh', {refreshToken});
      // console.log ('refresh response', response);
      if (response && response.status == 200) {
        const new_access_token = response.data.access_token;
        const new_refresh_token = response.data.refresh_token;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${new_access_token}`;
        localStorage.setItem ('access_token', new_access_token);
        localStorage.setItem ('refresh_token', new_refresh_token);
        return axios (_orgRequest);
      }
    }
  }
);

const access_token = localStorage.getItem ('access_token');
if (access_token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  const params = {};
  axios
    .get ('v1/admin/role/get/1')
    .then (res => {
      console.log ('Token valid', res);
      if (res && res.status == 200) {
        store.dispatch ({type: ACTION_LOGIN, isLoggedIn: true});
      }
    })
    .catch (error => {
      console.log ('Token invalid', error);
    });
}

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals ();
