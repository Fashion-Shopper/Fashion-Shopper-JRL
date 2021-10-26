import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../../store";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import LoadSpinner from "../../Materialui/LoadSpinner";
import { Container, Button } from "@mui/material";
import Row from "./AdminProductsRow";

const ProductsTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products);

  if (!products) {
    return <LoadSpinner />;
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Button
        variant="outlined"
        // component={Link}
        // to={`/admin/products/create`}
      >
        Create New Product
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center"> Id </TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action: Update</TableCell>
              <TableCell align="center">Action: Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <Row key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductsTable;
