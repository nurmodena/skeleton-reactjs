import axios from 'axios';
import { getMultipartOptions, handleResponse } from './HelperService';

const getTraoubleshootAll = (params, onSuccess, onError) => {
    params.filter = params.filter ? params.filter + ',is_active:1' : 'is_active:1';
    const response = axios.get('v1/admin/troubleshoot/get-all', { params });
    return handleResponse(response, onSuccess, onError);
};

const getTraoubleshootById = (id, onSuccess, onError) => {
    const response = axios.get(`v2/admin/troubleshoot/get/${id}`);
    return handleResponse(response, onSuccess, onError);
};

const createTraoubleshoot = (payload, onSuccess, onError) => {
    const response = axios.post(`v2/admin/troubleshoot/create`, payload)
    return handleResponse(response, onSuccess, onError);
};

const updateTraoubleshoot = (id, payload, onSuccess, onError) => {
    const response = axios.put(`v2/admin/troubleshoot/update/${id}`, payload);
    return handleResponse(response, onSuccess, onError);
};

const deleteTraoubleshoot = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/troubleshoot/delete/${id}`)
    return handleResponse(response, onSuccess, onError);
};

const uploadImage = (payload, onUploadProgress = e => { }, onSuccess, onError) => {
    const options = { ...getMultipartOptions(axios), onUploadProgress };
    const response = axios.post(`v2/admin/troubleshoot/temp-image`, payload, options);
    return handleResponse(response, onSuccess, onError);
};

export { getTraoubleshootAll, getTraoubleshootById, createTraoubleshoot, updateTraoubleshoot, deleteTraoubleshoot, uploadImage };
