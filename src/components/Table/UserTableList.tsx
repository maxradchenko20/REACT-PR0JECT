import React, { FC, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import TableRows from "./TableHeaderRows";
import ErrorNoUser from "../Error";
import { deleteUser, getUserById } from "../../api";
import FormSearch from "../FormSearch";

import { Paper, TableBody, TableContainer, TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Table } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useHistory } from "react-router";
import { userContext } from "../../context/Context";

const UserTableList: FC = () => {
  const history = useHistory();

  const client = useQueryClient();

  const { users, editUser, setEditUser } = useContext(userContext);
  //DELETE USER

  const deleteUserMutation = useMutation("delete-user", deleteUser, {
    onSuccess: (data) => {
      console.log(data);
      // @ts-ignore
      client.invalidateQueries("get-users");

    },
    onError: () => {
      alert("there was an error");
    }
  });

  const getUserByIdMutation = useMutation("edit-user", getUserById, {
    onSuccess: (data) => {
      console.log(data.data);
      setEditUser(data.data);
      console.log("editUser>>>", editUser);
    },
    onError: () => {
      alert("there was an error");
    }
  });

  const getUserId = (id: string) => () => {
    history.push(`/users/${id}/edit`);
    getUserByIdMutation.mutate(id);
  };


  const deleteHandler = (id: string) => () => {
    console.log(id);
    deleteUserMutation.mutate(id);
  };


  return (
    <>
      <Paper>
        <TableContainer>
          <FormSearch />
          <Table style={{ minWidth: 650 }} aria-label="simple table">
            <TableRows />
            <TableBody>
              {users.length > 0 ? (
                users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.website}</TableCell>
                    <TableCell align="right">
                      <button onClick={deleteHandler(user.id)}>
                        <DeleteOutlineIcon />
                      </button>

                      <Link to={{
                        pathname: `/users/${user.id}/edit`,
                        state: {
                          editUser: editUser
                        }
                      }}>
                        <button onClick={getUserId(user.id)}>
                          <EditOutlinedIcon />
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <ErrorNoUser />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default UserTableList;
