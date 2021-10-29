import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";
import { Grid, Slide, Typography, Container } from "@mui/material";

const Category = (props) => {
  const { category } = props.match.params;

  const products = useSelector((state) => state.products);
  const productsOfCategory = products.filter(
    (product) => product.category === category
  );

  console.log(category);

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 5 }}>
        Product Category: {category}
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
            {productsOfCategory.map((product) => (
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
