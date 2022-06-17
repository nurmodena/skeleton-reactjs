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

const getUserAll = (params, onSuccess, onError) => {
    axios
        .get('v1/admin/user/get-all', { params })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const getUserById = (id, onSuccess, onError) => {
    axios
        .get(`v1/admin/user/get/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const createUser = (payload, onSuccess, onError) => {
    axios
        .post(`v1/admin/user/create`, payload)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const updateUser = (payload, onSuccess, onError) => {
    const username = payload.get('username');
    axios
        .put(`v1/admin/user/update/${username}`, payload)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const deleteUser = (id, onSuccess, onError) => {
    axios
        .delete(`v1/admin/user/delete/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

export { logoutUser, loginUser,  getUserAll, getUserById, createUser, updateUser, deleteUser };