import axios from 'axios';

const getRoleAccessAll = (params, onSuccess, onError) => {
    axios
        .get('v1/admin/role/get-all', { params })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const getRoleAccessById = (id, onSuccess, onError) => {
    axios
        .get(`v1/admin/role/get/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const createRoleAccess = (payload, onSuccess, onError) => {
    axios
        .post(`v1/admin/role/create`, payload)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const updateRoleAccess = (payload, onSuccess, onError) => {
    const id = payload.get('id');
    axios
        .put(`v1/admin/role/update/${id}`, payload)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const deleteRoleAccess = (id, onSuccess, onError) => {
    axios
        .delete(`v1/admin/role/delete/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

export { getRoleAccessAll, getRoleAccessById, createRoleAccess, updateRoleAccess, deleteRoleAccess };
