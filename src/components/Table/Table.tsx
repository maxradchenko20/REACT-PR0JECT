import React, {FC, useContext} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {makeStyles} from "@material-ui/core/styles";
import {Form} from "../Form/Form";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteUser} from "../../users";
import {getUsers} from "../../shared/queries";
import {userContext} from "../../context/Context";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pokedexContainer: {
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  searchInput: {
    width: 200,
    margin: 5,
  },
  headerTable: {
    backgroundColor: '#000000',
  }
});

const URL = 'http://localhost:4000/api';

axios.defaults.baseURL = URL;
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*'
}

const TableHeader: FC = () => {
  const rowArr = [
    {id: "ID", email: "Email", name: "Name", website: "Website", username: "Username", actions: 'Actions'}
  ]

  return (
    <TableHead style={{backgroundColor: 'silver'}}>
      {rowArr.map((row) => (
        <TableRow key={row.id}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.username}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.website}</TableCell>
          <TableCell align="right">{row.actions}</TableCell>
        </TableRow>
      ))}
    </TableHead>
  )
}

// type Props = {
//   deleteTodo: (id: any, e: React.MouseEvent<HTMLButtonElement>) => any
// }

// @ts-ignore
export const BasicTable: FC<Props> = () => {
  const classes = useStyles();

  const {users, userName, setUsers} = useContext(userContext);

  const client = useQueryClient();

  useQuery('get-users', getUsers, {
    onSuccess: (data) => {
      setUsers(data.data)
    }
  });

  const deleteMutation = useMutation('delete', deleteUser, {
    onSuccess: () => {
      client.invalidateQueries('get-users');
    }
  })

  //Delete list
  // const deleteTodo = (id: any, e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   axios.delete(
  //     `/api/users/${id}`)
  //     .then(res => {
  //       console.log('deleted!!', res)
  //       // setOpenModal(true)
  //       setProducts([...products.filter((list: { id: any; }) => list.id !== id)])
  //     }).catch(err => console.log(err))
  // };

  const deleteHandler = (id: string) => () => {
    console.log(id);
    deleteMutation.mutate(id);
  }

  const filteredNames = users.filter((user: any) => {
    return user?.name?.toLowerCase().includes(userName.toLowerCase())
  })

  return (
    <>
      <Paper>
        <Form/>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHeader/>
            <TableBody>
              {filteredNames.map((elem: any) => (
                <TableRow key={elem.id}>
                  <TableCell align="right">{elem.id}</TableCell>
                  <TableCell align="right">{elem.name}</TableCell>
                  <TableCell align="right">{elem.username}</TableCell>
                  <TableCell align="right">{elem.email}</TableCell>
                  <TableCell align="right">{elem.website}</TableCell>
                  <TableCell align="right">
                    {/*<a href=""> <EditIcon/></a>*/}
                    {/*<AlertDialog/>*/}

                    <button onClick={deleteHandler(elem.id)}>
                      <DeleteOutlineIcon/>
                    </button>
                    {/*<button onClick={() => removeTask(elem.id)}><DeleteOutlineIcon style={{color: 'red'}}/></button>*/}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
