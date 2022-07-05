import axios from 'axios';

const getDashboardInfo = () => {
    return axios.get("v1/admin/dashboard");
}

export { getDashboardInfo }