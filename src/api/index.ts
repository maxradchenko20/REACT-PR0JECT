import axios from "axios";
import { INewUser } from "../containers/AddUser/AddUser";

const URL = "http://localhost:4000/api";
const BASE_NAME = "/users/";

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
};

// GET
export const getUsers = () => {
  return axios.get("/users");
};

export const deleteUser = (id: string) => {
  return axios.delete(`${BASE_NAME}${id}`);
};

export const searchUser = (name: string) => {
  return axios.get(`http://localhost:4000/api/users?name=${name}`);
};

export const createNewUser = (data: INewUser) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, data);
};
