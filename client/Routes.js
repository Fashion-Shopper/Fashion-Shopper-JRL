import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";

/////////////////////// IMPORT COMPONENTS  /////////////////////
import Brands from "./components/Brands/Brands";
import SingleBrand from "./components/Brands/SingleBrand";
import Products from "./components/Products/Products";
import SingleProduct from "./components/Products/SingleProduct";
import { fetchOrders } from "./store/orders";
// import Settings from './components/Settings'

/////////////////////// HOOK COMPONENT  /////////////////////
const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => !!state.auth.id)

  useEffect(() => {
    dispatch(me())
    dispatch(fetchOrders())
  }, [isLoggedIn])

  const state = useSelector(state => state)
  console.log(state)

  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey

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
}

////////////////////// EXPORT COMPONENT ///////////////////////////////
export default Routes;
