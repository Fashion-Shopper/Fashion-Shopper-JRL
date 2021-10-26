import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminProducts } from '../../store/admin/adminProducts'
import {ProductForm} from './Products/ProductForm'

const AdminProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, []);

  const adminproducts = useSelector((state) => state.adminProducts);

  return <pre>{JSON.stringify(adminproducts, null, 2)}</pre>;
};

export default AdminProducts;
