import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkoutOrder } from '../../../store';

export default function Checkout() {

    const dispatch = useDispatch();

    const { userCart } = useSelector(state => state)
    const { orderitems } = userCart;

    let total = 0;
    if (orderitems) {
        total = orderitems.reduce((acc, { product, quantity }) => acc + (product.price * quantity), 0)
    }

    const handleOrder = (orderId) => {
        dispatch(checkoutOrder(orderId))
    }

    return (
        <Container component="main" sx={{ mb: 35 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant="h4" align="center">
                    Checkout
                </Typography>
                <Review userCart={userCart} orderitems={orderitems} total={total} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button component={Link} to="/cart" sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>
                    <Button
                        type='submit'
                        variant="contained"
                        onClick={() => handleOrder(userCart.id)}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Place order
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}