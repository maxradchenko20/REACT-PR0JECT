import React, {FC, useContext, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {SimpleCtx} from "../../context/Context";

import {fade, makeStyles} from "@material-ui/core/styles";
import {Form} from "../Form/Form";

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
});

const TableHeader: FC = () => {
  const rowArr = [
    {id: "ID", email: "Email", name: "Name", phone: "Phone", username: "Username", website: 'Website'}
  ]

  return (
    <TableHead>
      {rowArr.map((row) => (
        <TableRow key={row.id}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.username}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.website}</TableCell>
          <TableCell align="right">{row.phone}</TableCell>
        </TableRow>
      ))}
    </TableHead>
  )
}

export const BasicTable: FC = ({children}) => {
  const classes = useStyles();
  const {products, searchValue} = useContext(SimpleCtx)

  // @ts-ignore
  const filtered = products.filter(elem => {
    return elem.name.toLowerCase().includes(searchValue.toLowerCase())
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
              {filtered.map((elem) => (
                <TableRow key={elem.id}>
                  <TableCell align="right">{elem.id}</TableCell>
                  <TableCell align="right">{elem.name}</TableCell>
                  <TableCell align="right">{elem.username}</TableCell>
                  <TableCell align="right">{elem.email}</TableCell>
                  <TableCell align="right">{elem.website}</TableCell>
                  <TableCell align="right">{elem.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
