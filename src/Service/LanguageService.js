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

export {getAll, getById};
