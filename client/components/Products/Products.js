import React from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchProducts, updateProduct, createProduct, destroyProduct} from '../../store/products';
//import CreateProduct from './CreateProduct';
//import DeleteProduct from './DeleteProduct';
//import brand from '../store/brand';

const products = (props) =>{
    //map dispatch is now in App
    //map state
    const products = useSelector((state) => {
        return {
            products: state.products
         }
        })
    console.log(products)
    return (
    <div>
      <div>
        {
         products.map(product => {
          const productStudents =students.find(student=>student.productId===product.id)||[];
          (
          <span key={product.id}>
            <Link to={`/products/${product.id}`} >
              <div className='product row'>
                <img src={product.imageUrl} />
                <p>{product.name}({productStudents ? productStudents.length : 0 })</p>
              </div>
            </Link>
            <Deleteproduct productId={product.id} history={props.history} />
            </span>
          )})
        }
      </div>
      <Createproduct match={props.match} history={props.history} key={products.length+1} />
      <hr />
    </div>
    )
  }
  //only use this when it is a class
  
export default products