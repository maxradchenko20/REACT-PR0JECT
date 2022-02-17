import React, {FC, useContext} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {SimpleCtx} from "../../context/Context";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {makeStyles} from "@material-ui/core/styles";
import {Form} from "../Form/Form";
import axios from "axios";
import {AlertDialog} from "../Modal/AlertDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
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

  const {products, setProducts,searchValue,setOpenModal} = useContext(SimpleCtx)

  const deleteTodo = (id: any, e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.delete(
      `http://localhost:4000/api/users/${id}`)
      .then(res => {
        console.log('deleted!!', res)
        setOpenModal(true)
        setProducts([...products.filter((list: { id: any; }) => list.id !== id)])
      }).catch(err => console.log(err))
  };

  // @ts-ignore
  const filteredNames = products.filter(user => {
    return user.name.toLowerCase().includes(searchValue.toLowerCase())

  })


  return (
    <>
      <Paper>
        <Form/>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHeader/>
            <TableBody>
              {/*@ts-ignore*/}
              {filteredNames.map((elem) => (
                <TableRow key={elem.id}>
                  <TableCell align="right">{elem.id}</TableCell>
                  <TableCell align="right">{elem.name}</TableCell>
                  <TableCell align="right">{elem.username}</TableCell>
                  <TableCell align="right">{elem.email}</TableCell>
                  <TableCell align="right">{elem.website}</TableCell>
                  <TableCell align="right">
                    {/*<a href=""> <EditIcon/></a>*/}
                    <AlertDialog/>

                    <button onClick={(e) => deleteTodo(elem.id, e)}><DeleteOutlineIcon style={{color: 'red'}}/></button>
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
