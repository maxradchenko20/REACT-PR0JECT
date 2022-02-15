import * as React from "react";
import {useContext} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {getUsers} from "../../shared/queries";

import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@mui/material/Alert";
import {BasicTable} from "../../components/Table/Table";
import {SimpleCtx} from "../../context/Context";


const URL = 'http://localhost:4000/api';

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*'
}

export const BlogPage = () => {
  const {setProducts} = useContext(SimpleCtx)

  const useGetList = () => {
    return useQuery('get-users', getUsers, {
      onSuccess: (data) => {
        setProducts(data.data)
      }
    })
  }

  const {isLoading, isError, error, isFetching} = useGetList();

  //Loader
  if (isLoading) return <CircularProgress/>;

//Error
  if (isError) {
    return <Alert variant="filled" severity="error">
      {/*@ts-ignore*/}
      {error.message}
    </Alert>;
  }

  return (
    <div className='blogPage'>
      <h3>Users list </h3>
      {/*<Form/>*/}
      <br/>
      <BasicTable/>
      {isFetching && <CircularProgress className='preloader'/>}
    </div>
  );
}

