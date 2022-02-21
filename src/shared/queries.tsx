import axios from "axios";
import * as React from "react";
import {useContext} from "react";

import {useQuery} from "react-query";
import {userContext} from "../context/Context";

export const URL = 'http://localhost:4000/api';

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*'
}

// GET
export const getUsers = () => {
  return axios.get('/users');
}

// GET DATA
export const GetData = () => {
  const {setUsers, users} = useContext(userContext);

  return useQuery('get-users', getUsers, {
    onSuccess: (data) => {
      setUsers(data.data)
    }
  })
}


//DELETE



