import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
//import { fetchProducts, updateProduct, createProduct, destroyProduct } from '../../store/products';
//import CreateProduct from './CreateProduct';
//import DeleteProduct from './DeleteProduct';
//import brand from '../store/brand';

//Material UI
import { Grid } from "@mui/material";

const Products = () => {
  const products = useSelector((state) => state.products);

  if (!products) {
    return <h1>...loading</h1>;
  }

  return (
    <Grid container>
      <Grid item xs={false} sm={2} />
      <Grid container item xs={12} sm={8} spacing={4} sx={{ m: 0, mb: 18 }}>
        {products.map((product) => (
          <Grid xs={11} sm={6} md={6} lg={4} item key={product.id}>
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

export default Products;
