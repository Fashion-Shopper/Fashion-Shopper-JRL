import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const ProductsTableHeader = (props) => {
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
        <TableCell align="center">Image</TableCell>
        <TableCell key="title" align="center">
          <TableSortLabel
            active={valueToOrderBy === "title"}
            direction={valueToOrderBy === "title" ? orderDirection : "asc"}
            onClick={createSortHandler("title")}
          >
            Title
          </TableSortLabel>
        </TableCell>
        <TableCell key="brand" align="center">
          <TableSortLabel>Brand</TableSortLabel>
        </TableCell>
        <TableCell key="category" align="center">
          <TableSortLabel>Category</TableSortLabel>
        </TableCell>
        <TableCell key="size" align="center">
          <TableSortLabel>Size</TableSortLabel>
        </TableCell>
        <TableCell key="price" align="center">
          <TableSortLabel>Price</TableSortLabel>
        </TableCell>
        <TableCell align="center">Action: Update</TableCell>
        <TableCell align="center">Action: Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ProductsTableHeader;
