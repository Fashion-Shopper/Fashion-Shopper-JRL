///////////////////////Library Imports///////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";

/////////////////////// COMPONENTS  /////////////////////
import Brands from "./components/Brands/Brands";
import SingleBrand from "./components/Brands/SingleBrand";
import Products from "./components/Products/Products";
import SingleProduct from "./components/Products/SingleProduct";
import Cart from "./components/User/Cart";

///////////////// STORE ////////////////////////
import { fetchCart } from "./store";
import AdminProducts from "./components/admin/AdminProducts";
import AdminUsers from "./components/admin/AdminUsers";
// import Settings from './components/Settings'
// import auth from "./store/auth";

// const Admin = () => {
//   return (
//     <div> TODO Add Admin Component </div>
//   )
// }

const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
    dispatch(fetchCart());
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
            <Route exact path="/cart" component={Cart} />

            {!!isAdmin && (
              <>
                <Route exact path="/admin" component={AdminProducts} />
                <Route path="/admin/users" component={AdminUsers} />
              </>
            )}
            <Redirect to="/home" />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/brands" component={Brands} />
            <Route path="/brands/:brandId" component={SingleBrand} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:productId" component={SingleProduct} />
          </Switch>
        </>
      )}
      {/* {isAdmin ? (

        ) */}
    </div>
  );
};

////////////////////// EXPORT COMPONENT ///////////////////////////////
export default Routes;
