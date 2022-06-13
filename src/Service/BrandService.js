import axios from 'axios';

const getBrandAll = (params, onSuccess, onError) => {
  axios
    .get ('v1/admin/brand/get-all', {params})
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const getBrandById = (id, onSuccess, onError) => {
  axios
    .get (`v1/admin/brand/get/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const createBrand = (payload, onSuccess, onError) => {
  axios
    .post (`v1/admin/brand/create`, payload)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const updateBrand = (payload, onSuccess, onError) => {
  axios
    .put (`v1/admin/brand/update/${payload.code}`, payload)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

const deleteBrand = (id, onSuccess, onError) => {
  axios
    .delete (`v1/admin/brand/delete/${id}`)
    .then (res => {
      if (onSuccess) onSuccess (res);
    })
    .catch (err => {
      if (onError) onError (err.response);
    });
};

export {getBrandAll, getBrandById, createBrand, updateBrand, deleteBrand};
