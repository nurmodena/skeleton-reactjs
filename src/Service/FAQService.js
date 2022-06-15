import axios from 'axios';

const getFAQAll = (params, onSuccess, onError) => {
    axios
        .get('v1/admin/faq/get-all', { params })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const getFAQById = (id, onSuccess, onError) => {
    axios
        .get(`v1/admin/faq/get/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const createFAQ = (payload, onSuccess, onError) => {
    const headers = axios.defaults.headers;
    axios
        .post(`v1/admin/faq/create`, payload, { headers: { ...headers, 'Content-Type': 'multipart/form-data' } })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const updateFAQ = (payload, onSuccess, onError) => {
    const headers = axios.defaults.headers;
    const id = payload.get('id');
    axios
        .put(`v1/admin/faq/update/${id}`, payload, { headers: { ...headers, 'Content-Type': 'multipart/form-data' } })
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

const deleteFAQ = (id, onSuccess, onError) => {
    axios
        .delete(`v1/admin/faq/delete/${id}`)
        .then(res => {
            if (onSuccess) onSuccess(res);
        })
        .catch(err => {
            if (onError) onError(err.response);
        });
};

export { getFAQAll, getFAQById, createFAQ, updateFAQ, deleteFAQ };
