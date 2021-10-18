import axios from 'axios'
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_USER_CART = "FETCH_USER_CART"
const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY'

///////////////// ACTION CREATORS /////////////////
const setCart = cart => {
    return {
        type: FETCH_USER_CART,
        cart
    }
}
const addorupdateCart = addOrupdateProduct => {
    return {
        type: ADD_TO_CART, addOrupdateProduct
    }
}
// const removeFromOrders = cart =>  ({ type: REMOVE_FROM_CART, cart })
// const changeProductQuantity = cart =>  ({ type: CHANGE_PRODUCT_QUANTITY, cart })

///////////////////// THUNK CREATORS //////////////////
///////////////////// FETCH USER CART //////////////////////
export const fetchCart = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.get("/api/cart", {
            headers: {
                authorization: token
            }
        })
        dispatch(setCart(data))
    }
}
//////////////////////// ADD TO USER CART ////////////////////////
export const addToCart = (productToAdd) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.post('/api/cart', productToAdd, {
            headers: {
                authorization: token //to identify the user
            }
        })
        dispatch(addorupdateCart(data))
    }
}

//edit cart
//remove from Cart
//change product quantity



////////////////// REDUCER ////////////////////
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_CART:
            return action.cart
        case ADD_TO_CART:
            return [action.addOrupdateProduct, ...state.filter(item => item.id !== action.addOrupdateProduct.id)]
        // case REMOVE_FROM_CART:
        //     return
        // case CHANGE_PRODUCT_QUANTITY:
        //     return
        default:
            return state
    }
}
