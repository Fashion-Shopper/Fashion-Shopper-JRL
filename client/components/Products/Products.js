/////////////// REACT / REDUX ///////////////////////
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import FilterForm from "./filterForm";

///////////////// COMPONENT ///////////////////////
import ProductCard from "./ProductCard";

/////////////// MATERIAL UI //////////////////////
import { CircularProgress, Grid, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadSpinner from "../Materialui/LoadSpinner";

//import { fetchProducts, updateProduct, createProduct, destroyProduct } from '../../store/products';
//import CreateProduct from './CreateProduct';
//import DeleteProduct from './DeleteProduct';
//import brand from '../store/brand';

const Products = () => {
  const products = useSelector((state) => state.products);

  if (!products) {
    return <LoadSpinner />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ///////////////////// SECTION: FILTERING ///

  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    size: [],
  });
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilters = (filters, type) => {
    const newFilters = { ...filters };
    newFilters[type] = filters;

    // console.log(filters);
    console.log(newFilters);
    // showFilteredResults(newFilters);

    const newFilteredProducts = products.filter((products) => "PLACEHOLDER");

    // setFiltereProducts(newFilteredProducts);
    setFilters(newFilters);
  };

  /////////////////////

  return (
    <>
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 5 }}>
        All Products
      </Typography>
      <Slide
        in={true}
        direction="right"
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        <Grid container sx={{ mb: 15 }}>
          <Grid item xs={false} sm={2} >
            <Typography align='center'>
              Filters
            </Typography>
            <FilterForm
              handleFilters={(filters) => handleFilters(filters, "brands")}
              products={products}
            />
          </Grid>
          <Grid container item xs={12} sm={8} spacing={4} sx={{ m: 0, mb: 18 }}>
            {products.map((product) => (
              <Grid xs={11} sm={6} md={6} lg={4} item key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Slide>
    </>
  );
};

export default Products;
