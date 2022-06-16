import axios from 'axios';

const getSubCategoryAll = (params, onSuccess, onError) => {
  axios
    .get ('v1/admin/category-sub/get-all', {params})
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const getSubCategoryById = (id, onSuccess, onError) => {
  axios
    .get (`v1/admin/category-sub/get/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const createSubCategory = (payload, onSuccess, onError) => {
  const headers = axios.defaults.headers;
  axios
    .post (`v1/admin/category-sub/create`, payload, { headers: {...headers, 'Content-Type': 'multipart/form-data'}})
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const updateSubCategory = (payload, onSuccess, onError) => {
  const id = payload.get('id');
  axios
    .put (`v1/admin/category-sub/update/${id}`, payload)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const deleteSubCategory = (id, onSuccess, onError) => {
  axios
    .delete (`v1/admin/category-sub/delete/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

export {getSubCategoryAll, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory};
