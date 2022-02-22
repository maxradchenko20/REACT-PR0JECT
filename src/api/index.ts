import axios from "axios";


/**
 *
 * USERS
 */



const BASE_NAME = '/users/'

export const deleteUser = (id: string) => {
    return axios.delete(`${BASE_NAME}${id}`);
}

export const searchUser = (name: string) => {
    return axios.get(`http://localhost:4000/api/users?name=${name}`);
}
