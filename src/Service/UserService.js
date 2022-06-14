import axios from 'axios';
import { ACTION_LOGOUT } from '../Redux/Action/AuthAction';

const logoutUser = () => dispatch => {
    dispatch({type: ACTION_LOGOUT, isLoggedIn: false});
}

const loginUser = (payload, onSuccess, onError) => {
    //const data = { username: 'muhamad.nur@modena.com', password: 'P@ssw0rd'};
    axios.post("v1/login", payload).then(res => {
        if(onSuccess) onSuccess(res);
    }).catch(err => {
        if(onError) onError(err.response);
    })
     
}

export {logoutUser, loginUser}