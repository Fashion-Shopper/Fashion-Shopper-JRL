import axios from "axios";

const SET_SINGLE_BRAND = "SET_SINGLE_BRAND";

//Action Creator...
const setSingleBrand = (brand) => {
  return {
    type: SET_SINGLE_BRAND,
    brand,
  };
};

//Thunk...
export const fetchSingleBrand = (brandId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/brands/${brandId}`);
      dispatch(setSingleBrand(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer Function...
const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_BRAND:
      return action.brand;
    default:
      return state;
  }
};
