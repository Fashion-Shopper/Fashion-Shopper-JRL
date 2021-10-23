import axios from 'axios'
///////////// CONSTANT //////////////////////
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_USER_ADDRESSES = 'FETCH_USER_ADDRESSES'
const CREATE_USER_ADDRESS = "CREATE_USER_ADDRESS";
const DESTROY_USER_ADDRESS = "DESTROY_USER_ADDRESS";
const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";
///////////////// ACTION CREATORS /////////////////
const setAddresses = addresses => {
    return {
        type: FETCH_USER_ADDRESSES, 
        addresses
    }
}

const _createAddress = address => {
    return {
        type: CREATE_USER_ADDRESS, 
        address
    }
}

const _destoryAddress = address => {
    return {
        type: DESTROY_USER_ADDRESS, 
        address
    }
}

const _updateAddress = address => {
    return {
        type: UPDATE_USER_ADDRESS, 
        address
    }
}

///////////////////// THUNK CREATORS //////////////////
export const fetchAddresses = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.get('/api/addresses', {
            headers: {
                authorization: token
            }
        })
        return dispatch(setAddresses(data))
    }
}

export const createAddress = (address) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
          const { data } = await axios.post("/api/addresss", address, {
            headers: {
                authorization: token
            }
          });
          return dispatch(_createAddress(data));
      }
};

  
  export const updateAddress = (id, address) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
          const { data } = await axios.put(`/api/addresss/${id}`, address, {
            headers: {
                authorization: token
            }
          });
          return dispatch(_updateAddress(data));
      }
  };
  
  export const destroyAddress = (id) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
          await axios.delete(`/api/addresss/${id}`, {
            headers: {
                authorization: token
            }
          });
          return dispatch(_destroyAddress({ id: id * 1 }));
    }
  };

////////////////// REDUCER ////////////////////
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_ADDRESSES:
            return action.addresses
        case CREATE_USER_ADDRESS:
            return [...state, action.address];
        case UPDATE_USER_ADDRESS:  
            return [...state,state.map((address) => address.id === action.address.id ? action.address : address)];
        case DESTROY_USER_ADDRESS:
            return state.filter((address) => address.id !== action.address.id);
        default:
            return state
    }
}

