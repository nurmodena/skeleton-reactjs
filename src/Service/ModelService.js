import axios from 'axios';

const getModelAll = (onSuccess, onError) => {
    axios.get("v1/admin/model/get-all").then(res => {
        if (onSuccess) onSuccess(res);
    }).catch(err => {
        if (onError) onError(err.response);
    })

}

const getModelById = (id, onSuccess, onError) => {
    axios.get(`v1/admin/model/get/${id}`).then(res => {
        if (onSuccess) onSuccess(res);
    }).catch(err => {
        if (onError) onError(err.response);
    })

}

export { getModelAll, getModelById }