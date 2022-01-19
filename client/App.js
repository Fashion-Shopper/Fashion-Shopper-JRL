import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";
import Footer from "./components/Footer";

import { fetchProducts } from "./store/products";
import { fetchBrands } from "./store/brands";

import theme from "./theme";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
