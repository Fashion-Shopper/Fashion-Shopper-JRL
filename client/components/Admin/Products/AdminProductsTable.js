import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../../store";

import AdminProductHeader from "./AdminProductHeader";
import { compareById } from "./AdminProductsOrdering";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

import LoadSpinner from "../../Materialui/LoadSpinner";
import { Container, Button } from "@mui/material";
import Row from "./AdminProductsRow";

const ProductsTable = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products).sort(compareById);

  if (!products) {
    return <LoadSpinner />;
  }

  const [orderDirection, setOrderDirection] = React.useState("asc");

  return (
    <Container sx={{ mt: 3 }}>
      <Button variant="outlined" component={Link} to={`/admin/products/create`}>
        Create New Product
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <AdminProductHeader />
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
