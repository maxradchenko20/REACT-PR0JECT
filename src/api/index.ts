import axios from "axios";

const URL = 'http://localhost:4000/api';
const BASE_NAME = '/users/'

axios.defaults.baseURL = URL;
axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*'
}

// GET
export const getUsers = () => {
    return axios.get('/users');
}


export const deleteUser = (id: string) => {
    return axios.delete(`${BASE_NAME}${id}`);
}

export const searchUser = (name: string) => {
    return axios.get(`http://localhost:4000/api/users?name=${name}`);
}
