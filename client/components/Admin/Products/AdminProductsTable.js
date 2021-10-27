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
import AdminProductRow from "./AdminProductsRow";

const ProductsTable = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products);

  if (!products) {
    return <LoadSpinner />;
  }

  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  // a & b refer to the objects in product arr?
  // Comparing the the selected value of a to the selected value of b?
  function descendingComparator(a, b, orderBy) {
    console.log(
      `via descendingComparator: a=${a[orderBy]}, b= ${b[orderBy]}, orderBy= ${orderBy}`
    );
    if (b[orderBy] < a[orderBy]) {
      return -1;
    } else if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    console.log(`order: ${order}, orderBy: ${orderBy}`);
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  //getComparator is the comparator -> getComparator is taking in.....?
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

  return (
    <Container sx={{ mt: 3 }}>
      <Button variant="outlined" component={Link} to={`/admin/products/create`}>
        Create New Product
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <AdminProductHeader
            orderDirection={orderDirection}
            valueToOrderBy={valueToOrderBy}
            handleRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedRowInfo(
              products,
              getComparator(orderDirection, valueToOrderBy)
            ).map((product, idx) => (
              <AdminProductRow key={idx} product={product} />
            ))}
          </TableBody>
          {/* <TableBody>
            {products.map((product) => (
              <AdminProductRow key={product.id} product={product} />
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductsTable;
