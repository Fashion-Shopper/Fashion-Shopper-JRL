import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Row(props) {
  const { user } = props;

  return (
    <>
      <TableRow>
        <TableCell scope="row" align="center">
          {user.id}
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
