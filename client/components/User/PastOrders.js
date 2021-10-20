import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store';


const PastOrders = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    const orders = useSelector(state => state.userOrders)
    const orderHistory = orders.filter(order => !order.isCart)

    return (
        <pre>
            {JSON.stringify(orderHistory, null, 2)}
        </pre>
    )
}

export default PastOrders
