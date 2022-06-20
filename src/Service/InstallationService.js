import axios from 'axios';
import { handleResponse } from './HelperService';

const getInstallationAll = (params, onSuccess, onError) => {
    const response = axios.get('v1/admin/install/get-all', { params });
    return handleResponse(response, onSuccess, onError);
};

const getInstallationById = (id, onSuccess, onError) => {
    const response = axios.get(`v1/admin/install/get/${id}`);
    return handleResponse(response, onSuccess, onError);
};

const createInstallation = (payload, onSuccess, onError) => {
    const response = axios.post(`v1/admin/install/create`, payload);
    return handleResponse(response, onSuccess, onError);
};

const updateInstallation = (payload, onSuccess, onError) => {
    const id = payload.get('id');
    const response = axios.put(`v1/admin/install/update/${id}`, payload);
    return handleResponse(response, onSuccess, onError);
};

const deleteInstallation = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/install/delete/${id}`);
    return handleResponse(response, onSuccess, onError); 
};

export { getInstallationAll, getInstallationById, createInstallation, updateInstallation, deleteInstallation };
