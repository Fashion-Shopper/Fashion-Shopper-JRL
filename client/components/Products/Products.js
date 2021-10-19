/////////////// REACT / REDUX ///////////////////////
import React from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

///////////////// COMPONENT ///////////////////////
import ProductCard from "./ProductCard";

/////////////// MATERIAL UI //////////////////////
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

//import { fetchProducts, updateProduct, createProduct, destroyProduct } from '../../store/products';
//import CreateProduct from './CreateProduct';
//import DeleteProduct from './DeleteProduct';
//import brand from '../store/brand';

const Products = () => {
  const products = useSelector((state) => state.products);

  if (!products) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={100} />
        <Typography variant="body2" color="text.secondary">
          LOADING...
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item xs={false} sm={2} />
      <Grid container item xs={12} sm={8} spacing={4} sx={{ m: 0, mb: 18 }}>
        {products.map((product) => (
          <Grid xs={11} sm={6} md={6} lg={4} item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

export default Products;
