import React from "react";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { destroyProduct } from "../../../store";

function Row(props) {
  const { id, imageURL, name, brandName, category, size, price } =
    props.product;

  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(destroyProduct(productId));
  };

  return (
    <>
      <TableRow>
        <TableCell scope="row" align="center">
          {id}
        </TableCell>
        <TableCell scope="row" align="center">
          <CardMedia
            component="img"
            sx={{ maxWidth: 150, p: 3 }}
            image={imageURL}
            alt={name}
          />{" "}
        </TableCell>
        <TableCell scope="row" align="center">
          {name}
        </TableCell>
        <TableCell scope="row" align="center">
          {brandName}
        </TableCell>
        <TableCell scope="row" align="center">
          {category}
        </TableCell>
        <TableCell scope="row" align="center">
          {size}
        </TableCell>
        <TableCell scope="row" align="center">
          {price}
        </TableCell>
        <TableCell scope="row" align="center">
          <Button variant="outlined">Update</Button>
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
    </>
  );
}

export default Row;
