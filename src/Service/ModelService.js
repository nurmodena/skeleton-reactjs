import axios from 'axios';
import { getMultipartOptions, handleResponse } from './HelperService';

const getModelAll = (params, onSuccess, onError) => {
  const response = axios.get ('v1/admin/model/get-all', {params});
  return handleResponse(response, onSuccess, onError);
};

const getModelById = (id, onSuccess, onError) => {
  const response = axios.get (`v1/admin/model/get/${id}`);
  return handleResponse(response, onSuccess, onError);
};

const getModelByCode = (code, onSuccess, onError) => {
  const response = axios.get (`v1/admin/model/get-with-content/${code}`);
  return handleResponse(response, onSuccess, onError);
};

const createModel = (payload, onSuccess, onError) => { 
  const response = axios.post (`v1/admin/model/create`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const updateModel = (id,payload, onSuccess, onError) => { 
  const response = axios.put (`v1/admin/model/update/${id}`, payload, getMultipartOptions(axios));
  return handleResponse(response, onSuccess, onError);
};

const deleteModel = (id, onSuccess, onError) => { 
  const response = axios.delete (`v1/admin/model/delete/${id}`);
  return handleResponse(response, onSuccess, onError);
};

export {getModelAll, getModelById,getModelByCode, createModel, updateModel, deleteModel};
