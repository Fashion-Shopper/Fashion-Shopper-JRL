import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";
import {
  Grid,
  Slide,
  Typography,
  Container,
} from "@mui/material";
import LoadSpinner from '../Materialui/LoadSpinner'

const SingleBrand = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const brandId = props.match.params.brandId * 1;
  const brands = useSelector((state) => state.brands);
  const singleBrand = brands.find((brand) => brand.id === brandId);

  if (!singleBrand) {
    return (
      <LoadSpinner />
    )
  }

  return (
    <Container maxWidth='xl'>
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 5 }}>
        {singleBrand.name}
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mt: 2 }}>
        {singleBrand.description}
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
            {singleBrand.products.map((product) => (
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

export default SingleBrand;
