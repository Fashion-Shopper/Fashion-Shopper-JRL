import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
import ordersReducer from "./orders";
import cartReducer from "./cart";
import usersReducer from "./admin/users";
import addressesReducer from "./address";
import brandsReducer from "./brands";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  userOrders: ordersReducer,
  userCart: cartReducer,
  adminUsers: usersReducer,
  addresses: addressesReducer,
  brands: brandsReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./products";
export * from "./orders";
export * from "./cart";
export * from "./brands";
