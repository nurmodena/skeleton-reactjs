import axios from 'axios';
import { handleResponse } from './HelperService';

const getRoleAccessAll = (params, onSuccess, onError) => {
    const response = axios.get('v1/admin/role/get-all', { params });
    return handleResponse(response, onSuccess, onError);
};

const getRoleAccessById = (id, onSuccess, onError) => {
    const response = axios.get(`v1/admin/role/get/${id}`);
    return handleResponse(response, onSuccess, onError); 
};

const createRoleAccess = (payload, onSuccess, onError) => {
    const response = axios.post(`v1/admin/role/create`, payload);
    return handleResponse(response, onSuccess, onError); 
};

const updateRoleAccess = (payload, onSuccess, onError) => {
    const id = payload.get('id');
    const response = axios.put(`v1/admin/role/update/${id}`, payload);
    return handleResponse(response, onSuccess, onError);
};

const deleteRoleAccess = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/role/delete/${id}`);
    return handleResponse(response, onSuccess, onError); 
};

const getMenuAll = (id, onSuccess, onError) => {
    const response = axios.get(`v1/admin/menu/get-all`);
    return handleResponse(response, onSuccess, onError);
};

export { getRoleAccessAll, getRoleAccessById, createRoleAccess, updateRoleAccess, deleteRoleAccess, getMenuAll };
