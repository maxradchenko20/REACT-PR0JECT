import axios from 'axios';
import { FormInputs } from '../utils/types';

const URL = 'http://localhost:4000/api';
const BASE_NAME = '/users/';

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*'
};

export const getUsers = () => {
  return axios.get('/users');
};

export const deleteUser = (id: string) => {
  return axios.delete(`${BASE_NAME}${id}`);
};

export const searchUser = (name: string) => {
  return axios.get(`http://localhost:4000/api/users?name=${name}`);
};

export const createNewUser = (data: FormInputs) => {
  return axios.post(`http://localhost:4000/api/users`, data);
};
