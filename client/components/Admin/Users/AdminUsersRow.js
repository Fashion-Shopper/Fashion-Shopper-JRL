import React, { useState } from 'react'
import dateFormatter from 'dayjs'

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { order } = props;
    const [open, setOpen] = useState(false);

    let total = 0;
    if (order.orderitems) {
        total = order.orderitems.reduce((acc, { product, quantity }) => acc + (product.price * quantity), 0)
    }

    let orderStatus = 'Complete'
    if (order.isCart) {
        orderStatus = 'Pending'
    }

    return (
        <>
            <TableRow>
                <TableCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row" align='center'>
                    {order.id}
                </TableCell>
                <TableCell align="center">{dateFormatter(order.updatedAt).format('MM/DD/YYYY')}</TableCell>
                <TableCell align="center">{orderStatus}</TableCell>
                <TableCell align="center">${total.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                Shipping Address: 'some address'
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item(s)</TableCell>
                                        <TableCell align='center'>Quantity</TableCell>
                                        <TableCell align='center'>Unit Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.orderitems.map(({ id, product, quantity }) => (
                                        <TableRow key={id}>
                                            <TableCell component="th" scope="row">
                                                {product.name}
                                            </TableCell>
                                            <TableCell align='center'>{quantity}</TableCell>
                                            <TableCell align='center'>${product.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default Row