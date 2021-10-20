import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
// import singleProductReducer from "./singleProduct"; // This is not needed. Just filter from all products
import ordersReducer from "./orders";
import cartReducer from './cart'
import adminProductsReducer from './admin/adminProducts'



const reducer = combineReducers({
  auth,
  products: productsReducer,
  // singleProduct: singleProductReducer, // this is not needed. Just filter from all products
  userOrders: ordersReducer,
  userCart: cartReducer,
  adminProducts: adminProductsReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from './products'
export * from './orders'
export * from './cart'

