import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import LoadSpinner from '../../Materialui/LoadSpinner'
import { Container } from '@mui/material';
import Row from './Row';

const PastOrders = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    const orders = useSelector(state => state.userOrders).filter(order => !order.isCart)

    if (!orders) {
        return (
            <LoadSpinner />
        )
    }

    return (
        <Container sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'> View Details </TableCell>
                            <TableCell align='center'>Oder #</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Order Status</TableCell>
                            <TableCell align='center'>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <Row key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default PastOrders