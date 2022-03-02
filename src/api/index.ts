import axios from "axios";
import { User } from "../utils/types";

const URL = "http://localhost:4000/api";
const BASE_NAME = "/users";

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*"
};

export const getUsers = () => {
  return axios.get(BASE_NAME);
};

export const deleteUser = (id: string) => {
  return axios.delete(`${BASE_NAME}/${id}`);
};

export const searchUser = (name: string) => {
  return axios.get(`${BASE_NAME}`, {
    params: {
      name
    }
  });
};

export const createNewUser = (data: User) => {
  console.log(data);
  return axios.post(`${BASE_NAME}`, data);

};

export const getUserById = (id: string) => {
  return axios.get(`${BASE_NAME}/${id}`);
};

// export const updateUser = (data: any) => {
//   return axios.put(`http://localhost:4000/api/users/${data.id}`, data);
// };
