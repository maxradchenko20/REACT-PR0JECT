import axios from "axios";
import * as React from "react";
import {useContext} from "react";
import {SimpleCtx} from "../context/Context";
import {useQuery} from "react-query";

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
  const {setProducts} = useContext(SimpleCtx)

  // const getUsersMutation = useMutation('get-users', getUsers, {
  //   onSuccess: data => {}
  // });
  //
  // useEffect(() => {
  //   getUsersMutation.mutate();
  // }, [])

  return useQuery('get-users', getUsers, {
    onSuccess: (data) => {
      setProducts(data.data)
    }
  })
}

//DELETE



