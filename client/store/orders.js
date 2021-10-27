import axios from 'axios'
import history from '../history'

///////////// CONSTANT //////////////////////
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_USER_ORDERS = 'FETCH_USER_ORDERS'
const SUCCESS_USER_ORDER = 'SUCCESS_USER_ORDER'

///////////////// ACTION CREATORS /////////////////
const setOrders = orders => {
    return {
        type: FETCH_USER_ORDERS, orders
    }
}

const orderSuccess = order => {
    return {
        type: SUCCESS_USER_ORDER, order
    }
}

///////////////////// THUNK CREATORS //////////////////
export const fetchOrders = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.get('/api/orders', {
            headers: {
                authorization: token
            }
        })
        return dispatch(setOrders(data))
    }
}

export const checkoutOrder = (orderId) => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.post('/api/orders', { orderId }, {
            headers: {
                authorization: token
            }
        })
        window.location.href = data
    }
}

export const successOrder = (orderInfo) => async dispatch => {
    // console.log(orderInfo)
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.put('/api/orders', orderInfo, {
            headers: {
                authorization: token
            }
        })
        dispatch(orderSuccess(data))
    }
}


////////////////// REDUCER ////////////////////
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_ORDERS:
            return action.orders
        case SUCCESS_USER_ORDER:
            const success = state.find(order => order.isCart === true)
            if (success.id === action.order.id) {
                // console.log(state)
                return state
            }
            state = state.filter(order => order.isCart === false)
            // console.log([...state, { ...success, isCart: false }, action.order])
            return [...state, { ...success, isCart: false }, action.order]
        default:
            return state
    }
}
