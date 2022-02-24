import React, { FC, useContext } from 'react';
import { userContext } from '../../context/Context';
import { useMutation, useQueryClient } from 'react-query';

import TableRows from './TableHeaderRows';
import ErrorNoUser from '../Error';
import { deleteUser } from '../../api';
import FormSearch from '../FormSearch';

import { Paper, TableBody, TableContainer, TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Table } from '@mui/material';

const UserTableList: FC = () => {
  const client = useQueryClient();
  const { users } = useContext(userContext);

  //DELETE USER
  const deleteUserMutation = useMutation('delete-user', deleteUser, {
    onSuccess: () => {
      client.invalidateQueries('get-users');
    }
  });

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
