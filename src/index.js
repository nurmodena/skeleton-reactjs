import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
import axios from 'axios';
import { ACTION_LOGIN, ACTION_LOGOUT } from './Redux/Action/AuthAction';
import Swal from 'sweetalert2';

const REFRESH_URL = 'v1/refresh';
const LOGIN_URL = 'v1/login';
const replaceUrl = obj => {
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      for (let a of obj[key]) {
        replaceUrl(a);
      }
    } else if (typeof obj[key] == 'object') {
      replaceUrl(obj[key]);
    } else {
      if (key == 'image_name') {
        obj[key] = obj[key].replace('tsm.modena.com', 'scstaging.modena.com');
      }
    }
  }
}

axios.defaults.baseURL = 'http://192.168.0.41:9502/';
axios.interceptors.response.use(
  res => {
    replaceUrl(res);
    return res;
  },
  async error => {
    const _orgRequest = error.config;
    // console.log('error', error); 
    if (error.response.status == 401 && !_orgRequest._retry) {
      _orgRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      // console.log('refresh_token', refreshToken);
      if (error.config.url === REFRESH_URL || error.config.url === LOGIN_URL) {
        return Promise.reject(error);
      } else {
        const response = await axios.post(REFRESH_URL, { refreshToken }).catch(errorRefresh => {
          console.log('get refresh token fail', errorRefresh);
          store.dispatch({ type: ACTION_LOGOUT });
          return Promise.reject(error);
        });
        console.log('refresh response', response);
        if (response && response.status == 200) {
          const { access_token, refresh_token } = response.data;
          const new_access_token = access_token;
          const new_refresh_token = refresh_token;
          const old_access_token = _orgRequest.headers['Authorization'];
          const [header, payload] = old_access_token.split('.');
          const { fullname, office, role, email, image_filename } = JSON.parse(atob(payload));

          _orgRequest.headers['Authorization'] = `Bearer ${new_access_token}`;
          axios.defaults.headers.common['Authorization'] = `Bearer ${new_access_token}`;
          localStorage.setItem('access_token', new_access_token);
          localStorage.setItem('refresh_token', new_refresh_token);

          store.dispatch({ type: ACTION_LOGIN, userInfo: { fullname, office, role, email, image_filename } });
          return axios(_orgRequest);
        } else {
          return Promise.reject(error);
        }
      }

    } else {
      console.log('general error', error);
      const { code } = error;
      if (code == 'ERR_NETWORK') {
        Swal.fire({
          icon: 'error',
          title: 'Network Error!',
          text: 'Request fail, please check your connection!'
        });
      }
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
        const [header, payload] = access_token.split('.');
        const { fullname, office, role, email, image_filename } = JSON.parse(atob(payload));
        store.dispatch({ type: ACTION_LOGIN, userInfo: { fullname, office, role, email, image_filename } });
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
