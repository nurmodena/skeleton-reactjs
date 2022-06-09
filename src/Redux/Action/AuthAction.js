import axios from "axios";
import { loginUser } from "../../Service/UserService";

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_LOGOUT = 'ACTION_LOGOUT';

const logout = () => dispatch => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch({ type: ACTION_LOGOUT, isLoggedIn: false });
}

const login = () => dispatch => {
    loginUser(res => {
        console.log('Success ', res);
        const { access_token, refresh_token } = res.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        dispatch({ type: ACTION_LOGIN, isLoggedIn: true });
    }, err => {
        console.log('Error', err);
    })

}

export { ACTION_LOGIN, ACTION_LOGOUT, login, logout };