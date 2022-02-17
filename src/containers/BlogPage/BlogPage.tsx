import * as React from "react";
import {useContext} from "react";
import {BasicTable} from "../../components/Table/Table";
import {SimpleCtx} from "../../context/Context";
import {GetData} from "../../shared/queries";

import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@mui/material/Alert";
import axios from "axios";


export const BlogPage: React.FC = () => {

  const {isLoading, isError, error, isFetching} = GetData();

  //Loader
  if (isLoading) return <CircularProgress/>;

//Error
  if (isError) {

    return (
      <Alert variant="filled" severity="error">
        {/*@ts-ignore*/}
        {error.message}
      </Alert>
    )
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

