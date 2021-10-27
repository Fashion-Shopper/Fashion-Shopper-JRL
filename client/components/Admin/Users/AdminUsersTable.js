// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminUsers } from "../../../store/admin/adminUsers";

// const AdminUsers = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAdminUsers());
//   }, []);

//   const adminUsers = useSelector((state) => state.adminUsers);

//   return <pre>{JSON.stringify(adminUsers, null, 2)}</pre>;
// };

// export default AdminUsers;

//////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../../../store/admin/adminUsers";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import LoadSpinner from "../../Materialui/LoadSpinner";
import { Container } from "@mui/material";
import Row from "./AdminUsersRow";

const UsersTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, []);

  const users = useSelector((state) => state.adminUsers);

  if (!users) {
    return <LoadSpinner />;
  }

  return (
    <Container sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center"> View Details </TableCell>
              <TableCell align="center">Oder #</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Order Status</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <Row key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersTable;
