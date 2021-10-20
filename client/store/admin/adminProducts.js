import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};


///////////////////// THUNK CREATOR ///////////////////////
export const fetchAdminProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/admin/products");
    dispatch(_setProducts(data));
  };
};


const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
