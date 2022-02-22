import React, {FC} from "react";
import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import {TableHead} from "@mui/material";

const StateRow = [{
  id: "ID",
  email: "Email",
  name: "Name",
  website: "Website",
  username: "Username",
  actions: 'Actions'
}];

const TableRows: FC =  () => {

  return (
      <TableHead style={{backgroundColor: 'silver'}}>
        {StateRow.map((row) => (
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

export default TableRows;