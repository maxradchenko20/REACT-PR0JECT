import * as React from "react";
import {useContext} from "react";
import axios from "axios";
import {useQuery} from "react-query";

import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@mui/material/Alert";
import {BasicTable} from "../../components/Table/Table";
import {SimpleCtx} from "../../context/Context";

const URL = 'http://localhost:4000/api';

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*'
}

// GET
const getUsers = () => {
  return axios.get('/users');
}


const UseGetList = () => {
  const {setProducts} = useContext(SimpleCtx)

  return useQuery('get-users', getUsers, {
    onSuccess: (data) => {
      setProducts(data.data)
    }
  })
}


//DELETE
// @ts-ignore
export const deleteTodo = (id, e) => {
  e.preventDefault();
  axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => {
      console.log('deleted!!', res)
    }).catch(err => console.log(err))

};


export const BlogPage: React.FC = () => {
  const {products, searchValue, setProducts} = useContext(SimpleCtx)
  const {isLoading, isError, error, isFetching} = UseGetList();

  //Loader
  if (isLoading) return <CircularProgress/>;

//Error
  if (isError) {
    return <Alert variant="filled" severity="error">
      {/*@ts-ignore*/}
      {error.message}
    </Alert>;
  }

  const removeTask = (id: any) => {
    setProducts([...products.filter((list: { id: any; }) => list.id !== id)])
  }


  return (
    <div className='blogPage'>
      <h3>Users list </h3>
      {/*<Form/>*/}
      <br/>
      <BasicTable
        // @ts-ignore
        removeTask={removeTask}
      />
      {isFetching && <CircularProgress className='preloader'/>}
    </div>
  );
}

