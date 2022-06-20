import axios from 'axios';
import { handleResponse } from './HelperService';

const getModelAll = (params, onSuccess, onError) => {
  const response = axios.get ('v1/admin/model/get-all', {params});
  return handleResponse(response, onSuccess, onError);
};

const getModelById = (id, onSuccess, onError) => {
  const response = axios.get (`v1/admin/model/get/${id}`);
  return handleResponse(response, onSuccess, onError);
};

export {getModelAll, getModelById};
