import axios from 'axios'
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_USER_CART = "FETCH_USER_CART"
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

///////////////// ACTION CREATORS /////////////////
const setCart = cart => {
    return {
        type: FETCH_USER_CART,
        cart
    }
}

const addToUserCart = productToAdd => {
    return {
        type: ADD_TO_CART, productToAdd
    }
}

const updateUserCart = productToUpdate => {
    return {
        type: UPDATE_CART, productToUpdate
    }
}
const removeFromUserCart = productRemove => {
    return {
        type: REMOVE_FROM_CART, productRemove
    }
}

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
                authorization: token
            }
        })
        dispatch(addToUserCart(data))
    }
}

////////////// UPDATE USER CART ////////////////////
export const updateCart = (productToUpdate) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.put('/api/cart', productToUpdate, {
            headers: {
                authorization: token
            }
        })
        dispatch(updateUserCart(data))
    }
}

/////////// REMOVE PRODUCT FROM USER CART ////////////////////
export const removeFromCart = (productId) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.delete(`/api/cart/${productId}`, {
            headers: {
                authorization: token
            }
        })
        dispatch(removeFromUserCart(data))
    }
}


////////////////// REDUCER ////////////////////
const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_CART:
            return action.cart
        case ADD_TO_CART:
            return { ...state, orderitems: action.productToAdd }
        case UPDATE_CART:
            return { ...state, orderitems: action.productToUpdate }
        case REMOVE_FROM_CART:
            return { ...state, orderitems: action.productRemove }
        default:
            return state
    }
}
