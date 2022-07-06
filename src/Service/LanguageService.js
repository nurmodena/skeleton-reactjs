import axios from 'axios';
import { handleResponse, setIsActiveTrue } from './HelperService';

const getLanguageAll = (_params, onSuccess, onError) => {
  const params = setIsActiveTrue(_params);
  const response = axios.get('v1/admin/language/get-all', { params });
  return handleResponse(response, onSuccess, onError);
};

const getById = (id, onSuccess, onError) => {
  const response = axios.get(`v1/admin/language/get/${id}`);
  return handleResponse(response, onSuccess, onError);
};

const createLanguage = (payload, onSuccess, onError) => {
  const response = axios.post(`v1/admin/language/create`, payload);
  return handleResponse(response, onSuccess, onError);
};

const updateLanguage = (payload, onSuccess, onError) => {
  const response = axios.put(`v1/admin/language/update/${payload.code}`, payload);
  return handleResponse(response, onSuccess, onError);
};

const deleteLanguage = (id, onSuccess, onError) => {
  const response = axios.delete(`v1/admin/language/delete/${id}`);
  return handleResponse(response, onSuccess, onError);
};

export { getLanguageAll, getById, createLanguage, updateLanguage, deleteLanguage };
