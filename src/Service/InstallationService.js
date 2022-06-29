import axios from 'axios';
import { getMultipartOptions, handleResponse } from './HelperService';

const getInstallationAll = (params, onSuccess, onError) => {
    const response = axios.get('v1/admin/install/get-all', { params });
    return handleResponse(response, onSuccess, onError);
};

const getInstallationById = (id, onSuccess, onError) => {
    const response = axios.get(`v2/admin/installation/get/${id}`);
    return handleResponse(response, onSuccess, onError);
};

const createInstallation = (payload, onSuccess, onError) => {
    const response = axios.post(`v2/admin/installation/create`, payload);
    return handleResponse(response, onSuccess, onError);
};

const updateInstallation = (payload, onSuccess, onError) => {
    const id = payload.get('id');
    const response = axios.put(`v2/admin/installation/update/${id}`, payload);
    return handleResponse(response, onSuccess, onError);
};

const deleteInstallation = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/install/delete/${id}`);
    return handleResponse(response, onSuccess, onError);
};

const uploadImage = (payload, onSuccess, onError) => {
    const response = axios.post(`v2/admin/installation/temp-image`, payload, getMultipartOptions(axios));
    return handleResponse(response, onSuccess, onError);
};

export { getInstallationAll, getInstallationById, createInstallation, updateInstallation, deleteInstallation, uploadImage };
