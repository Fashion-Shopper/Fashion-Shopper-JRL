import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Brands from "./components/Brands/Brands";
import SingleBrand from "./components/Brands/SingleBrand";
import Products from "./components/Products/Products";
import SingleProduct from "./components/Products/SingleProduct";
import Settings from './components/Settings'
import auth from "./store/auth";
import fetchCart from './store/cart'
import fetchProducts from './store/products'

const Admin = () =>{
  return (
    <div> TODO Add Admin Component </div>
  )
}

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

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
              {
                !!auth.isAdmin && <Route path='/admin' component = {Admin} />
              }
              
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
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: ()=> dispatch(fetchCart()),
    loadInitialData() {
      //dispatch(me());
      dispatch(fetchProducts())
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
