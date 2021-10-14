import axios from "axios";

const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

//Action Creator...
const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

//Thunk...
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(setSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer Function...
const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
