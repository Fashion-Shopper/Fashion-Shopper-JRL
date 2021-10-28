import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { destroyUser } from "../../../store/admin/users.js";

function AdminUsersRow(props) {
  const { id, username, isAdmin } = props.user;

  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(destroyUser(productId));
  };

  return (
    <TableRow>
      <TableCell scope="row" align="center">
        {id}
      </TableCell>
      <TableCell scope="row" align="center">
        {username}
      </TableCell>
      <TableCell scope="row" align="center">
        {isAdmin ? "Yes" : "No"}
      </TableCell>
      <TableCell scope="row" align="center">
        <Button
          variant="outlined"
          component={Link}
          to={`/admin/users/${id}/update`}
        >
          Update
        </Button>{" "}
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
  );
}

export default AdminUsersRow;
