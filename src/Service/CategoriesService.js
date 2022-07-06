import axios from 'axios';
import { getMultipartOptions, handleResponse, setIsActiveTrue } from './HelperService';

const getCategoryAll = (_params, onSuccess, onError) => {
  const params = setIsActiveTrue(_params);
  const response = axios.get('v1/admin/category/get-all', { params });
  return handleResponse(response, onSuccess, onError);
};

const getCategoryById = (id, onSuccess, onError) => {
  const response = axios.get(`v1/admin/category/get/${id}`);
  return handleResponse(response, onSuccess, onError);
};

const createCategory = (payload, onSuccess, onError) => {
  const response = axios.post(`v1/admin/category/create`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const updateCategory = (id, payload, onSuccess, onError) => {
  const response = axios.put(`v1/admin/category/update/${id}`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const deleteCategory = (id, onSuccess, onError) => {
  const response = axios.delete(`v1/admin/category/delete/${id}`);
  return handleResponse(response, onSuccess, onError);
};

export { getCategoryAll, getCategoryById, createCategory, updateCategory, deleteCategory };
