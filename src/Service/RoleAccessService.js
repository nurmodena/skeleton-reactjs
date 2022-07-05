import axios from 'axios';
import { handleResponse } from './HelperService';

const getRoleAccessAll = (params, onSuccess, onError) => {
    params.filter = params.filter ? params.filter + ',is_active:1' : 'is_active:1';
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

const updateRoleAccess = (id, payload, onSuccess, onError) => {
    const response = axios.put(`v1/admin/role/update/${id}`, payload);
    return handleResponse(response, onSuccess, onError);
};

const deleteRoleAccess = (id, onSuccess, onError) => {
    const response = axios.delete(`v1/admin/role/delete/${id}`);
    return handleResponse(response, onSuccess, onError);
};

const softDeleteRoleAccess = (id, onSuccess, onError) => {
    const response = axios.put(`v1/admin/role/delete/${id}`, { is_active: false });
    return handleResponse(response, onSuccess, onError);
};

const getMenuAll = (params, onSuccess, onError) => {
    const response = axios.get(`v1/admin/menu/get-all`, { params });
    return handleResponse(response, onSuccess, onError);
};

export { getRoleAccessAll, getRoleAccessById, createRoleAccess, updateRoleAccess, deleteRoleAccess, getMenuAll, softDeleteRoleAccess };
