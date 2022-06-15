import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
import axios from 'axios';
import { ACTION_LOGIN } from './Redux/Action/AuthAction';

const REFRESH_URL = 'v1/refresh';
axios.defaults.baseURL = 'http://192.168.0.41:9502/'; 
axios.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    const _orgRequest = error.config;
    // console.log('error', error); 
    if (error.response.status == 401 && !_orgRequest._retry) {
      _orgRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      // console.log('refresh_token', refreshToken);
      if (error.config.url === REFRESH_URL) {
        return Promise.reject(error);
      } else {
        const response = await axios.post(REFRESH_URL, { refreshToken }).catch(errorRefresh => {
          console.log('get refresh token fail', errorRefresh);
          store.dispatch({ type: ACTION_LOGIN, isLoggedIn: false });
          return Promise.reject(error);
        });
        console.log('refresh response', response);
        if (response && response.status == 200) {
          const new_access_token = response.data.access_token;
          const new_refresh_token = response.data.refresh_token;
          _orgRequest.headers['Authorization'] = `Bearer ${new_access_token}`;
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${new_access_token}`;
          localStorage.setItem('access_token', new_access_token);
          localStorage.setItem('refresh_token', new_refresh_token);
          return axios(_orgRequest);
        } else {
          return Promise.reject(error);
        }
      }

    } else {
      console.log('general error');
      return Promise.reject(error);
    }
  }
);

const access_token = localStorage.getItem('access_token');
if (access_token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  const params = {};
  axios
    .get('v1/admin/role/get/1')
    .then(res => {
      console.log('Token valid', res);
      if (res && res.status == 200) {
        store.dispatch({ type: ACTION_LOGIN, isLoggedIn: true });
      }
    })
    .catch(error => {
      console.log('Token invalid', error);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
