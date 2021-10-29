import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";
import { Grid, Slide, Typography, Container } from "@mui/material";

const Category = (props) => {
  const { brandId } = props.match.params;
  const brands = useSelector((state) => state.brands);
  const singleBrand = brands.find((brand) => brand.id === brandId * 1);
  const brandName = brands[brandId];

  const products = useSelector((state) => state.products);
  const productsOfBrand = products.filter(
    (product) => product.brandName === singleBrand.name
  );

  const getBrandName = () => {
    const brandNames = brands.map((brand) => brand.name)[brandId - 1];
    return brandNames;
  };

  const getBrandDesc = () => {
    const brandDescs = brands.map((brand) => brand.description);
    return brandDescs[brandId - 1];
  };

  console.log(getBrandName());

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 5 }}>
        {getBrandName()}
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mt: 2 }}>
        {getBrandDesc()}
      </Typography>
      <Slide
        in={true}
        direction="right"
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        <Grid container>
          <Grid item xs={false} sm={2} />
          <Grid container item xs={12} sm={8} spacing={4} sx={{ m: 0, mb: 18 }}>
            {productsOfBrand.map((product) => (
              <Grid xs={11} sm={6} md={6} lg={4} item key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Slide>
    </Container>
  );
};

export default Category;
