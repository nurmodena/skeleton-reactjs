import axios from 'axios';
import { getMultipartOptions, handleResponse } from './HelperService';

const getSubCategoryAll = (params, onSuccess, onError) => {
  const response = axios.get ('v1/admin/category-sub/get-all', {params});
  return handleResponse(response, onSuccess, onError);
};

const getSubCategoryById = (id, onSuccess, onError) => {
  const response = axios.get (`v1/admin/category-sub/get/${id}`)
  return handleResponse(response, onSuccess, onError);
};

const createSubCategory = (payload, onSuccess, onError) => {
  const response = axios.post (`v1/admin/category-sub/create`, payload, getMultipartOptions(axios))
  return handleResponse(response, onSuccess, onError);
};

const updateSubCategory = (payload, onSuccess, onError) => {
  const id = payload.get('id');
  const response = axios.put (`v1/admin/category-sub/update/${id}`, payload, getMultipartOptions(axios))
  return handleResponse(response, onSuccess, onError);
};

const deleteSubCategory = (id, onSuccess, onError) => {
  const response = axios.delete (`v1/admin/category-sub/delete/${id}`)
  return handleResponse(response, onSuccess, onError);
};

export {getSubCategoryAll, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory};
