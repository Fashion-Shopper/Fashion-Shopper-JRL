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
        <TableCell key="name" align="center">
          <TableSortLabel
            active={valueToOrderBy === "name"}
            direction={valueToOrderBy === "name" ? orderDirection : "asc"}
            onClick={createSortHandler("name")}
          >
            Title
          </TableSortLabel>
        </TableCell>
        <TableCell key="brandName" align="center">
          <TableSortLabel
            active={valueToOrderBy === "brandName"}
            direction={valueToOrderBy === "brandName" ? orderDirection : "asc"}
            onClick={createSortHandler("brandName")}
          >
            Brand
          </TableSortLabel>
        </TableCell>
        <TableCell key="category" align="center">
          <TableSortLabel
            active={valueToOrderBy === "category"}
            direction={valueToOrderBy === "category" ? orderDirection : "asc"}
            onClick={createSortHandler("category")}
          >
            Category
          </TableSortLabel>
        </TableCell>
        <TableCell key="size" align="center">
          <TableSortLabel
            active={valueToOrderBy === "size"}
            direction={valueToOrderBy === "size" ? orderDirection : "asc"}
            onClick={createSortHandler("size")}
          >
            Size
          </TableSortLabel>
        </TableCell>
        <TableCell key="price" align="center">
          <TableSortLabel
            active={valueToOrderBy === "price"}
            direction={valueToOrderBy === "price" ? orderDirection : "asc"}
            onClick={createSortHandler("price")}
          >
            Price
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">Action: Update</TableCell>
        <TableCell align="center">Action: Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ProductsTableHeader;
