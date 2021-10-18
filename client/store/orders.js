import axios from 'axios'
///////////// CONSTANT //////////////////////
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_USER_ORDERS = 'FETCH_USER_ORDERS'

///////////////// ACTION CREATORS /////////////////
const setOrders = orders => {
    return {
        type: FETCH_USER_ORDERS, orders
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

////////////////// REDUCER ////////////////////
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_ORDERS:
            return action.orders
        default:
            return state
    }
}
