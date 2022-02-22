import React, {FC, useContext} from "react";
import {FormSearch} from "../Form/FormSearch";
import {userContext} from "../../context/Context";
import TableRows from "./TableHeaderRows";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Alert from '@mui/material/Alert';
import {useMutation, useQueryClient} from "react-query";
import {deleteUser} from "../../api";
import {Table} from "@mui/material";

const UserTableList: FC = () => {
  const client = useQueryClient();
  const {users} = useContext(userContext);

  //DELETE USER
  const deleteMutation = useMutation('delete-user', deleteUser, {
    onSuccess: () => {
      client.invalidateQueries('get-users');
    }
  })

  const deleteHandler = (id: string) => () => {
    console.log(id);
    deleteMutation.mutate(id);
  }

  const ErrorNoUser = () => {
    return (
      <Alert severity="error">This is an error alert — check it out!</Alert>
    )
  }

  return (
    <>
      <Paper>
        <TableContainer>
          <FormSearch/>
          <Table style={{minWidth: 650}} aria-label="simple table">
            <TableRows/>
            <TableBody>
              {users.length > 0 ? users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.website}</TableCell>
                    <TableCell align="right">
                      <button onClick={deleteHandler(user.id)}>
                        <DeleteOutlineIcon/>
                      </button>
                    </TableCell>
                  </TableRow>
                ))
                : <ErrorNoUser/>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default UserTableList;