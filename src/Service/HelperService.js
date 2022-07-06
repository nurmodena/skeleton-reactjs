const handleResponse = (response, onSuccess, onError = err => { }) => {
    if (onSuccess) {
        response.then(onSuccess).catch(onError);
    }
    return response;
}

const setIsActiveTrue = params => {
    if (params.filterAnd) {
        const filters = params.filterAnd.split(',');
        if (filters.indexOf('is_active:1') == -1) {
            filters.push('is_active:1');
            params.filterAnd = filters.join(',');
        }
    } else {
        params.filterAnd = 'is_active:1';
    }
    return params;
}

const getMultipartOptions = axios => {
    const headers = axios.defaults.headers;
    return { headers: { ...headers, 'Content-Type': 'multipart/form-data' } };
}

export { handleResponse, getMultipartOptions, setIsActiveTrue };