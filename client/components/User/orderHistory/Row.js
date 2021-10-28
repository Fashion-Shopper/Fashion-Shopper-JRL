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
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
currency.defaultFormat('$0,0.00');

function Row(props) {
    const { order } = props;
    const [open, setOpen] = useState(false);

    let total = 0;
    if (order.orderitems) {
        total = order.orderitems.reduce((acc, { product, quantity }) => acc + (product.price * quantity), 0)
    }

    let totalQty = 0;
    if (order.orderitems) {
        totalQty = order.orderitems.reduce((acc, { quantity }) => acc += quantity, 0)
    }

    return (
        <>
            <TableRow>
                <TableCell scope="row" align='center'>
                    <Typography variant='h4'>
                        Order #{order.id}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color='text.secondary'>
                        Date: {dateFormatter(order.updatedAt).format('MM/DD/YYYY')}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color='text.secondary'>
                        Total Qty: {totalQty}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color="text.secondary">
                        Total Price: {currency(total.toFixed(2)).format()}
                    </Typography>
                </TableCell>
                <TableCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        <Typography color='primary'>
                            View Details {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </Typography>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" align='center' fontWeight='700' gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding='none'>
                                            Shipping Information
                                        </TableCell>
                                        <TableCell align="center" padding='none'>
                                            Product
                                        </TableCell>
                                        <TableCell align="right" padding='none'>
                                            Price&nbsp;($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.orderitems.map(({ id, product, quantity }, idx) => (
                                        <TableRow key={id || idx}>
                                            <TableCell>
                                                <Box sx={{ width: 150 }}>
                                                    <Typography variant="body1">
                                                        Name: {order.shippingName}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Address: {order.shippingAddress}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ height: 100, width: '100%' }}>
                                                <Stack direction='row' spacing={1} justifyContent='center' sx={{ '@media screen and (max-width: 860px)': { flexDirection: 'column' } }}>
                                                    <Stack component={Link} to={`/products/${product.id}`}>
                                                        <img src={product.imageURL} width='150' />
                                                    </Stack>
                                                    <Stack justifyContent='space-around'>
                                                        <Box component={Link} to={`/products/${product.id}`} sx={{ color: 'inherit' }}>
                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                {product.brandName}
                                                            </Typography>
                                                            <Typography component="div" variant="h5">
                                                                {product.name}
                                                            </Typography>
                                                            <Typography variant="h6" color="text.secondary" component="div">
                                                                {product.category} / Size: {product.size}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography>
                                                                Qty: {quantity}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ height: 100, width: '100%' }} >
                                                <Stack
                                                    justifyContent="space-between"
                                                    alignItems="flex-end"
                                                    sx={{ height: '100%' }}
                                                >
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        {currency(product.price).format()}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
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