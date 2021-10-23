import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Row(props) {
  const { id, username, isAdmin } = props.user;

  return (
    <>
      <TableRow>
        <TableCell scope="row" align="center">
          {id}
        </TableCell>
        <TableCell scope="row" align="center">
          {username}
        </TableCell>
        <TableCell scope="row" align="center">
          <Button variant="outlined">Update</Button>
        </TableCell>
        <TableCell scope="row" align="center">
          <Button
            scope="row"
            align="center"
            onClick={() => handleDelete(id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
