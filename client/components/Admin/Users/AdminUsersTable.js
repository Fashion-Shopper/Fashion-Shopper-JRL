import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../../store/admin/users";

import AdminUsersHeader from "./AdminUsersHeader";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import LoadSpinner from "../../Materialui/LoadSpinner";
import { Container, Button } from "@mui/material";
import AdminUsersRow from "./AdminUsersRow";

const UsersTable = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users = useSelector((state) => state.adminUsers);

  if (!users) {
    return <LoadSpinner />;
  }

  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  ///////////////////// SECTION: SORTING FUNCTIONALTY ///

  function descendingComparator(a, b, orderBy) {
    if (orderBy === "price") {
      if (b[orderBy].length < a[orderBy].length) return -1;
      if (b[orderBy].length > a[orderBy].length) return 1;
      if (b[orderBy].length === a[orderBy].length) {
        if (b[orderBy] < a[orderBy]) return -1;
        if (b[orderBy] > a[orderBy]) return 1;
        return 0;
      }
    }
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInfo = (rowArr, comparator) => {
    const stabilizedRowArr = rowArr.map((el, idx) => [el, idx]);
    stabilizedRowArr.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedRowArr.map((el) => el[0]);
  };

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setOrderDirection(isAscending ? "desc" : "asc");
    setValueToOrderBy(property);
  };

  ///////////////////// SECTION: PAGINATION FUNCTIONALTY ///

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  /////////////////////

  return (
    <Container sx={{ mt: 3, pb: 25 }}>
      <Button variant="outlined" component={Link} to={`/admin/users/create`}>
        Create New User
      </Button>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table aria-label="collapsible table">
          <AdminUsersHeader
            orderDirection={orderDirection}
            valueToOrderBy={valueToOrderBy}
            handleRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedRowInfo(users, getComparator(orderDirection, valueToOrderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, idx) => (
                <AdminUsersRow key={idx} user={user} />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default UsersTable;
