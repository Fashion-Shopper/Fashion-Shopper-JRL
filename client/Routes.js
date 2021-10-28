///////////////////////LIBRARY ///////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

/////////////////////// COMPONENT AND PAGES  /////////////////////
import Home from "./components/Home/Home";
import { Login, Signup } from "./components/AuthForm";
import Brands from "./components/Brands/Brands";
import SingleBrand from "./components/Brands/SingleBrand";
import Products from "./components/Products/Products";
import SingleProduct from "./components/Products/SingleProduct";
import Cart from "./components/User/Cart";
import Settings from "./components/User/Settings/Settings";
import AdminDashboard from "./components/Admin/Dashboard";
import ProductCreateForm from "./components/Admin/Products/ProductCreateForm";
import ProductUpdateForm from "./components/Admin/Products/ProductUpdateForm";
import AdminProducts from "./components/Admin/Products/AdminProductsTable";
import AdminUsers from "./components/Admin/Users/AdminUsersTable";
import PastOrders from "./components/User/orderHistory/Table";
import Checkout from "./components/User/Checkout/Checkout";
import Success from "./components/User/Checkout/Success";

///////////////// STORE ////////////////////////
import { fetchCart, fetchOrders, me, consolidateCart } from "./store";

const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
    dispatch(fetchCart());

    if (isLoggedIn) {
      dispatch(fetchOrders())
      dispatch(consolidateCart())
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/brands" component={Brands} />
            <Route path="/brands/:brandId" component={SingleBrand} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orders" component={PastOrders} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkout/success" component={Success} />
            {!!isAdmin && (
              <>
                <Route exact path="/admin" component={AdminDashboard} />
                <Route exact path="/admin/products" component={AdminProducts} />
                <Route
                  path="/admin/products/create"
                  component={ProductCreateForm}
                />
                <Route
                  path="/admin/products/:productId/update"
                  component={ProductUpdateForm}
                />
                <Route path="/admin/users" component={AdminUsers} />
              </>
            )}
            <Redirect to="/home" />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/brands" component={Brands} />
            <Route path="/brands/:brandId" component={SingleBrand} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </>
      )}
    </div>
  );
};

////////////////////// EXPORT COMPONENT ///////////////////////////////
export default Routes;
