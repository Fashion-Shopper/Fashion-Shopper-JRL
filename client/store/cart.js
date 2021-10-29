import axios from 'axios'
import { getGuestCart, setGuestCart, clearGuestCart } from './guestCart'
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

///// GUEST USER ACTION CREATORS ///////////////
const fetchGuestCart = () => {
    return (dispatch) => {
        return dispatch(setCart(getGuestCart()))
    }
}

const addToGuestCart = (product, quantity) => {
    return (dispatch) => {
        const cart = getGuestCart();
        let orderitem = cart.orderitems.find(item => item.productId === product.id)
        if (orderitem) {
            orderitem.quantity += quantity
        }
        else {
            cart.orderitems.push({ product, quantity: quantity, productId: product.id })
        }
        setGuestCart(cart);
        return dispatch(fetchGuestCart())
    }
}

const removeFromGuestCart = (productId) => {
    return (dispatch) => {
        const cart = getGuestCart();
        cart.orderitems = cart.orderitems.filter(item => item.productId !== productId)
        setGuestCart(cart);
        return dispatch(fetchGuestCart())
    }
}

const updateGuestCart = (productId, quantity) => {
    return (dispatch) => {
        const cart = getGuestCart();
        let orderitem = cart.orderitems.find(item => item.productId === productId)
        orderitem.quantity = quantity;

        setGuestCart(cart);
        return dispatch(fetchGuestCart())
    }
}

export const consolidateCart = () => {
    return async (dispatch) => {
        const cart = getGuestCart();

        if (cart.orderitems) {
            for (let i = 0; i < cart.orderitems.length; i++) {
                const orderitem = cart.orderitems[i];
                const product = orderitem.product;
                const quantity = orderitem.quantity;

                await dispatch(addToCart(product, quantity))
            }
        }
        clearGuestCart()
        return dispatch(fetchCart())
    }
}

// const changeProductQuantity = cart =>  ({ type: CHANGE_PRODUCT_QUANTITY, cart })

///////////////////// THUNK CREATORS //////////////////
///////////////////// FETCH USER CART //////////////////////
export const fetchCart = () => async (dispatch, getState) => {
    if (!getState().auth.id) {
        return dispatch(fetchGuestCart())
    }

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
export const addToCart = (product, quantity) => async (dispatch, getState) => {
    if (!getState().auth.id) {
        return dispatch(addToGuestCart(product, quantity))
    }

    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const orderItemToAdd = { productId: product.id, quantity }
        const { data } = await axios.post('/api/cart', orderItemToAdd, {
            headers: {
                authorization: token
            }
        })
        dispatch(addToUserCart(data))
    }
}

////////////// UPDATE USER CART ////////////////////
export const updateCart = (orderItemId, productId, quantity) => async (dispatch, getState) => {
    if (!getState().auth.id) {
        return dispatch(updateGuestCart(productId, quantity))
    }

    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const orderItemToUpdate = { id: orderItemId, quantity }
        const { data } = await axios.put('/api/cart', orderItemToUpdate, {
            headers: {
                authorization: token
            }
        })
        dispatch(updateUserCart(data))
    }
}

/////////// REMOVE PRODUCT FROM USER CART ////////////////////
export const removeFromCart = (orderItemId, productId) => async (dispatch, getState) => {
    if (!getState().auth.id) {
        return dispatch(removeFromGuestCart(productId))
    }

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
