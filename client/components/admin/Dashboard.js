import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminProducts } from '../../store/admin/adminProducts'
import { ProductForm } from "./Products/ProductForm";

const AdminProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchAdminProducts());
  }, []);

  const adminproducts = useSelector((state) => state.adminProducts);

  return (
    <h1>Dashboard</h1>
  );
};

export default AdminProducts;
