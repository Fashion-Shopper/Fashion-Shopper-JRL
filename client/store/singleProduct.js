import axios from "axios";

const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";

//Action Creator...
const setSelectedProduct = (product) => {
  return {
    type: SET_SELECTED_PRODUCT,
    product,
  };
};

//Thunk...
export const fetchSelectedProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(setSelectedProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer Function...
const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
