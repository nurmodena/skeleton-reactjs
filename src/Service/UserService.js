import axios from 'axios';
import { ACTION_LOGOUT } from '../Redux/Action/AuthAction';
import { handleResponse } from './HelperService';

const logoutUser = () => dispatch => {
    dispatch({type: ACTION_LOGOUT, isLoggedIn: false});
}

const loginUser = (payload, onSuccess, onError) => {
    //const payload = { username: 'muhamad.nur@modena.com', password: 'P@ssw0rd'};
    const response = axios.post("v1/login", payload); 
    return handleResponse (response, onSuccess, onError);        
}

const getUserAll = (params, onSuccess, onError) => {
    const response = axios.get('v1/admin/user/get-all', { params });
    return handleResponse (response, onSuccess, onError); 
};

const getUserById = (id, onSuccess, onError) => {
    const response = axios.get(`v1/admin/user/get/${id}`);
    return handleResponse (response, onSuccess, onError); 
};

const createUser = (payload, onSuccess, onError) => {
    const response = axios.post(`v1/admin/user/create`, payload);
    return handleResponse (response, onSuccess, onError); 
};

const updateUser = (username, payload, onSuccess, onError) => { 
    const response = axios.put(`v1/admin/user/update/${username}`, payload);
    return handleResponse (response, onSuccess, onError); 
};

const deleteUser = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/user/delete/${id}`);
    return handleResponse (response, onSuccess, onError); 
};

export { logoutUser, loginUser,  getUserAll, getUserById, createUser, updateUser, deleteUser };