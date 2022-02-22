import * as React from "react";
import Table from "../../components/Table";

import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@mui/material/Alert";
import {GetData} from "../../api/users";

const BlogPage: React.FC = () => {
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
      {/*<FormSearch/>*/}
      <br/>
      <Table/>
      {isFetching && <CircularProgress className='preloader'/>}
    </div>
  );
}

export default BlogPage;