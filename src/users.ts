import axios from "axios";


/**
 *
 * USERS
 */



const BASE_NAME = '/users/'

export const deleteUser = (id: string) => {
  return axios.delete(`${BASE_NAME}${id}`);
}

export const searchUser = (userName: any) => {
  return axios.get(`${BASE_NAME}`, userName)
}

