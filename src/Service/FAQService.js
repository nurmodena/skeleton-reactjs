import axios from 'axios';
import { getMultipartOptions, handleResponse, setIsActiveTrue } from './HelperService';

const getFAQAll = (_params, onSuccess, onError) => {
    const params = setIsActiveTrue(_params);
    const response = axios.get('v1/admin/faq/get-all', { params });
    return handleResponse(response, onSuccess, onError);
};

const getFAQById = (id, onSuccess, onError) => {
    const response = axios.get(`v1/admin/faq/get/${id}`);
    return handleResponse(response, onSuccess, onError);
};

const createFAQ = (payload, onSuccess, onError) => {
    const response = axios.post(`v2/admin/faq/create`, payload, getMultipartOptions(axios));
    return handleResponse(response, onSuccess, onError);
};

const updateFAQ = (id, payload, onSuccess, onError) => {
    const response = axios.put(`v2/admin/faq/update/${id}`, payload, getMultipartOptions(axios));
    return handleResponse(response, onSuccess, onError);
};

const deleteFAQ = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/faq/delete/${id}`);
    return handleResponse(response, onSuccess, onError);
};

export { getFAQAll, getFAQById, createFAQ, updateFAQ, deleteFAQ };
