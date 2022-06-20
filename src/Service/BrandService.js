import axios from 'axios';
import { getMultipartOptions, handleResponse } from './HelperService';

const getBrandAll = (params, onSuccess, onError) => {
  const response = axios.get('v1/admin/brand/get-all', { params })
  return handleResponse(response, onSuccess, onError);
};

const getBrandById = (id, onSuccess, onError) => {
  const response = axios.get(`v1/admin/brand/get/${id}`)
  return handleResponse(response, onSuccess, onError);
};

const createBrand = (payload, onSuccess, onError) => { 
  const response = axios.post(`v1/admin/brand/create`, payload, getMultipartOptions(axios))
  return handleResponse(response, onSuccess, onError);
};

const updateBrand = (payload, onSuccess, onError) => {  
  const id = payload.get('id');
  const response = axios.put(`v1/admin/brand/update/${id}`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const deleteBrand = (id, onSuccess, onError) => {
  const response = axios.delete(`v1/admin/brand/delete/${id}`);
  return handleResponse(response, onSuccess, onError);
};

export { getBrandAll, getBrandById, createBrand, updateBrand, deleteBrand };
