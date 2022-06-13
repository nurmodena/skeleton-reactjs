import axios from 'axios';

const getAll = (params, onSuccess, onError) => {
  axios
    .get ('v1/admin/language/get-all', {params})
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const getById = (id, onSuccess, onError) => {
  axios
    .get (`v1/admin/language/get/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const createLanguage = (payload, onSuccess, onError) => {
  axios
    .post (`v1/admin/language/create`, payload)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const updateLanguage = (payload, onSuccess, onError) => {
  axios
    .put (`v1/admin/language/update/${payload.code}`, payload)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const deleteLanguage = (id, onSuccess, onError) => {
  axios
    .delete (`v1/admin/language/delete/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

export {getAll, getById, createLanguage, updateLanguage, deleteLanguage};
