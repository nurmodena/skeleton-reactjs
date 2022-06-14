import axios from 'axios';

const getCategoryAll = (params, onSuccess, onError) => {
  axios
    .get ('v1/admin/category/get-all', {params})
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const getCategoryById = (id, onSuccess, onError) => {
  axios
    .get (`v1/admin/category/get/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const createCategory = (payload, onSuccess, onError) => {
  const headers = axios.defaults.headers;
  axios
    .post (`v1/admin/category/create`, payload, { headers: {...headers, 'Content-Type': 'multipart/form-data'}})
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const updateCategory = (payload, onSuccess, onError) => {
  axios
    .put (`v1/admin/category/update/${payload.id}`, payload)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const deleteCategory = (id, onSuccess, onError) => {
  axios
    .delete (`v1/admin/category/delete/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

export {getCategoryAll, getCategoryById, createCategory, updateCategory, deleteCategory};
