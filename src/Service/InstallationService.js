import axios from 'axios';

const getInstallationAll = (params, onSuccess, onError) => {
    axios
        .get('v1/admin/install/get-all', { params })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const getInstallationById = (id, onSuccess, onError) => {
    axios
        .get(`v1/admin/install/get/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const createInstallation = (payload, onSuccess, onError) => {
    axios
        .post(`v1/admin/install/create`, payload)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const updateInstallation = (payload, onSuccess, onError) => {
    const id = payload.get('id');
    axios
        .put(`v1/admin/install/update/${id}`, payload)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const deleteInstallation = (id, onSuccess, onError) => {
    axios
        .delete(`v1/admin/install/delete/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

export { getInstallationAll, getInstallationById, createInstallation, updateInstallation, deleteInstallation };
