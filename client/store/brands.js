import axios from "axios";

const SET_BRANDS = "SET_BRANDS";
const CREATE_BRAND = "CREATE_BRAND";
const DESTROY_BRAND = "DESTROY_BRAND";
const UPDATE_BRAND = "UPDATE_BRAND";

const _setBrands = (brands) => {
  return {
    type: SET_BRANDS,
    brands,
  };
};

const _createBrand = (brand) => {
  return {
    type: CREATE_BRAND,
    brand,
  };
};

const _destroyBrand = (brand) => {
  return {
    type: DESTROY_BRAND,
    brand,
  };
};

const _updateBrand = (brand) => {
  return {
    type: UPDATE_BRAND,
    brand,
  };
};

//thunk
export const fetchBrands = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/brands");
    dispatch(_setBrands(data));
  };
};

export const createBrand = (brand, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/brands", brand);
      dispatch(_createBrand(data));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateBrand = (brand, history) => {
  return async (dispatch) => {
    try {
      console.log(brand);
      const { data } = await axios.put(`/api/brands/${brand.id}`, brand);
      dispatch(_updateBrand(data));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyBrand = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/brands/${id}`);
      dispatch(_destroyBrand({ id: id * 1 }));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANDS:
      return action.brands;

    case CREATE_BRAND:
      return [...state, action.brand];

    case UPDATE_BRAND:
      return [
        ...state,
        state.map((brand) =>
          brand.id === action.brand.id ? action.brand : brand
        ),
      ];
    case DESTROY_BRAND:
      return state.filter((brand) => brand.id !== action.brand.id);

    default:
      return state;
  }
};
