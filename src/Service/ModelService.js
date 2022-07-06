import axios from 'axios';
import { getMultipartOptions, handleResponse, setIsActiveTrue } from './HelperService';

const getModelAll = (_params, onSuccess, onError) => {
  const params = setIsActiveTrue(_params);
  const response = axios.get('v1/admin/model/get-all', { params });
  return handleResponse(response, onSuccess, onError);
};

const getModelById = (id, onSuccess, onError) => {
  const response = axios.get(`v1/admin/model/get/${id}`);
  return handleResponse(response, onSuccess, onError);
};

const getModelByCode = (code, onSuccess, onError) => {
  const response = axios.get(`v1/admin/model/get-with-content/${code}`);
  return handleResponse(response, onSuccess, onError);
};

const createModel = (payload, onSuccess, onError) => {
  const response = axios.post(`v1/admin/model/create`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const updateModel = (id, payload, onSuccess, onError) => {
  const response = axios.put(`v2/admin/model/update/${id}`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const deleteModel = (id, onSuccess, onError) => {
  const response = axios.delete(`v1/admin/model/delete/${id}`);
  return handleResponse(response, onSuccess, onError);
};

export { getModelAll, getModelById, getModelByCode, createModel, updateModel, deleteModel };
