import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

///////////////// DATES FORMATTER PACKAGE /////////////
import dateFormatter from 'dayjs'

////////////// TO CONVERT TO CURRENCY ////////////////
import currency from 'numeral'
currency.defaultFormat('$0,0.00');

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
                <TableCell align="center">{currency(total.toFixed(2)).format()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" align='center' fontWeight='700' gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div" sx={{ textDecoration: 'underline' }}>
                                Shipping Information
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                Name: {order.shippingName}
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                Address: {order.shippingAddress}
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
                                            <TableCell align='center'>{currency(product.price).format()}</TableCell>
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