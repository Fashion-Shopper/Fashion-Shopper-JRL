import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const UsersTableHeader = (props) => {
  const { orderDirection, valueToOrderBy, handleRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell key="id" align="center">
          <TableSortLabel
            active={valueToOrderBy === "id"}
            direction={valueToOrderBy === "id" ? orderDirection : "asc"}
            onClick={createSortHandler("id")}
          >
            Id
          </TableSortLabel>
        </TableCell>
        <TableCell key="username" align="center">
          <TableSortLabel
            active={valueToOrderBy === "username"}
            direction={valueToOrderBy === "username" ? orderDirection : "asc"}
            onClick={createSortHandler("username")}
          >
            Username
          </TableSortLabel>
        </TableCell>
        <TableCell key="isAdmin" align="center">
          <TableSortLabel
            active={valueToOrderBy === "isAdmin"}
            direction={valueToOrderBy === "isAdmin" ? orderDirection : "asc"}
            onClick={createSortHandler("isAdmin")}
          >
            Admin
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">Action: Update</TableCell>
        <TableCell align="center">Action: Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default UsersTableHeader;
