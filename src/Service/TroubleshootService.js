import axios from 'axios';

const getTraoubleshootAll = (params, onSuccess, onError) => {
    axios
        .get('v1/admin/troubleshoot/get-all', { params })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const getTraoubleshootById = (id, onSuccess, onError) => {
    axios
        .get(`v1/admin/troubleshoot/get/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const createTraoubleshoot = (payload, onSuccess, onError) => {
    const headers = axios.defaults.headers;
    axios
        .post(`v1/admin/troubleshoot/create`, payload, { headers: { ...headers, 'Content-Type': 'multipart/form-data' } })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const updateTraoubleshoot = (payload, onSuccess, onError) => {
    const headers = axios.defaults.headers;
    const id = payload.get('id');
    axios
        .put(`v1/admin/troubleshoot/update/${id}`, payload, { headers: { ...headers, 'Content-Type': 'multipart/form-data' } })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const deleteTraoubleshoot = (id, onSuccess, onError) => {
    axios
        .delete(`v1/admin/troubleshoot/delete/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

export { getTraoubleshootAll, getTraoubleshootById, createTraoubleshoot, updateTraoubleshoot, deleteTraoubleshoot };
