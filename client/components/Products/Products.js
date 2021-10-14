import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
//import { fetchProducts, updateProduct, createProduct, destroyProduct } from '../../store/products';
//import CreateProduct from './CreateProduct';
//import DeleteProduct from './DeleteProduct';
//import brand from '../store/brand';

//Material UI
import { Grid } from '@mui/material';

const Products = () => {
  const products = useSelector((state) => state.products)

  if (!products) {
    return (<h1>...loading</h1>)
  }

  return (
    <Grid container>
      <Grid item xs={false} sm={2} />
      <Grid container item xs={12} sm={8} spacing={4} justifyContent='center' sx={{ m: 0 }}>
        {products.map(product => (
          <Grid xs={10} sm={6} md={6} lg={4} item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid >
  )
}

export default Products

// <div>
{/* <div>
        {
          products.map(product => {
            const productStudents = students.find(student => student.productId === product.id) || [];
            (
              <span key={product.id}>
                <Link to={`/products/${product.id}`} >
                  <div className='product row'>
                    <img src={product.imageUrl} />
                    <p>{product.name}({productStudents ? productStudents.length : 0})</p>
                  </div>
                </Link>
                <Deleteproduct productId={product.id} history={props.history} />
              </span>
            )
          })
        }
      </div>
      <Createproduct match={props.match} history={props.history} key={products.length + 1} />
      <hr /> */}
{/* </div> */ }