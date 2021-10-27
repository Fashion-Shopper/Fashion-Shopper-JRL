import axios from "axios";

const TOKEN = "token";
const SET_PRODUCTS = "SET_PRODUCTS";
const DESTROY_ADMIN_PRODUCT = "DESTROY_ADMIN_PRODUCT";

const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const _destroyAdminProduct = (product) => {
  return {
    type: DESTROY_ADMIN_PRODUCT,
    product,
  };
};

///////////////////// THUNK CREATOR ///////////////////////
export const fetchAdminProducts = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.get("/api/admin/products", {
      headers: { authorization: token },
    });
    dispatch(_setProducts(data));
  };
};

export const destroyAdminProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      dispatch(_destroyAdminProduct({ id: id * 1 }));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DESTROY_ADMIN_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
};
