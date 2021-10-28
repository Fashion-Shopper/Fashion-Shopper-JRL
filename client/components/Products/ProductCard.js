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
import { Button, Grow, Rating, Slide } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { destroyProduct } from "../../store";

////////////// REACT ICONS ///////////////////////
// import { MdOutlineAddShoppingCart } from 'react-icons/md'

////////////// to convert to currency ////////////////
import currency from 'numeral'
import { Box } from "@mui/system";
currency.defaultFormat('$0,0.00');

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
    <Slide in={true} direction='right' timeout={500} mountOnEnter unmountOnExit>
      <Box component={Link} to={`/products/${id}`} >
        <Card raised sx={{ maxWidth: 350, boxShadow: 'none', '&:hover': { boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)' } }}>
          <CardMedia component="img" height="400" image={imageURL} sx={{ p: 1 }} />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {brandName}
            </Typography>
            <Typography variant="h6">
              {name}
            </Typography>
            <Rating name="half-rating-read" defaultValue={rating * 1} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              Price: {currency(price).format()}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
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
      </Box>
    </Slide>
  );
}

export default ProductCard;
