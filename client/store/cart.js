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

const addToUserCart = orderItemToAdd => {
    return {
        type: ADD_TO_CART, orderItemToAdd
    }
}

const updateUserCart = orderItemToUpdate => {
    return {
        type: UPDATE_CART, orderItemToUpdate
    }
}
const removeFromUserCart = orderItemRemove => {
    return {
        type: REMOVE_FROM_CART, orderItemRemove
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
export const addToCart = (orderItemToAdd) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.post('/api/cart', orderItemToAdd, {
            headers: {
                authorization: token
            }
        })
        dispatch(addToUserCart(data))
    }
}

////////////// UPDATE USER CART ////////////////////
export const updateCart = (orderItemToUpdate) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.put('/api/cart', orderItemToUpdate, {
            headers: {
                authorization: token
            }
        })
        dispatch(updateUserCart(data))
    }
}

/////////// REMOVE PRODUCT FROM USER CART ////////////////////
export const removeFromCart = (orderItemId) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.delete(`/api/cart/${orderItemId}`, {
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
            return { ...state, orderitems: action.orderItemToAdd }
        case UPDATE_CART:
            return { ...state, orderitems: action.orderItemToUpdate }
        case REMOVE_FROM_CART:
            return { ...state, orderitems: action.orderItemRemove }
        default:
            return state
    }
}
