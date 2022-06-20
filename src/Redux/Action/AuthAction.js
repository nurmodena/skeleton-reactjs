import axios from "axios";
import Swal from "sweetalert2";
import { loginUser } from "../../Service/UserService";

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_LOGOUT = 'ACTION_LOGOUT';

const logout = () => dispatch => {
  delete axios.defaults.headers.common['Authorization'];
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  dispatch({ type: ACTION_LOGOUT });
}

const login = (payload, onError = err=>{}) => dispatch => {
  loginUser(payload, res => {
    console.log('Success ', res);
    const { access_token, refresh_token, fullname, office, role, image_filename } = res.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    const userInfo = { fullname, office, role, image_filename };
    Swal.fire({
      icon: 'success',
      title: 'Succes!',
      text: 'Login succes, please wait for a while, system will be redirected to the home page',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then(r => {
      dispatch({ type: ACTION_LOGIN, userInfo });
    })
    //
  }, onError)

}

export { ACTION_LOGIN, ACTION_LOGOUT, login, logout };