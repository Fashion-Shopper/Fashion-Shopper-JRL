import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { Button, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { destroyProduct } from "../../store";

////////////// REACT ICONS ///////////////////////
// import { MdOutlineAddShoppingCart } from 'react-icons/md'

function ProductCard(props) {
  const { isAdmin } = useSelector((state) => state.auth);

  const {
    id,
    name,
    brandName,
    imageURL,
    price,
    category,
    gender,
    size,
    rating,
    description,
    source,
  } = props.product;

  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(destroyProduct(productId));
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <CardMedia component="img" height="350" image={imageURL} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brandName}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary"> */}
        {/* Rating: {} */}
        <Rating name="half-rating-read" defaultValue={rating * 1} precision={0.5} readOnly />
        {/* </Typography> */}
        <Typography variant="body2" color="text.secondary">
          Price: ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <Button variant="outlined" component={Link} to={`/products/${id}`}>
          VIEW ITEM
        </Button>
        {!!isAdmin && (
          <Button
            onClick={() => handleDelete(id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
