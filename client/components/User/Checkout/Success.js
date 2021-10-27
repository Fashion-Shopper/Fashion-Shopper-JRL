import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'

import { Button, Container, Paper, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { successOrder } from '../../../store/orders';
import { fetchCart } from '../../../store';
import LoadSpinner from '../../Materialui/LoadSpinner';

const Success = () => {
    const [session, setSession] = useState({});
    const location = useLocation();
    const sessionId = location.search.replace('?session_id=', '');
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            async function fetchSession() {
                const { data } = await axios.get('/api/stripe/checkout-session?sessionId=' + sessionId)
                setSession(data)
            }
            fetchSession();

            const processPayment = async () => {
                const orderId = session.client_reference_id;
                const shippingName = session.shipping.name
                const { line1, line2, city, state, postal_code } = session.shipping.address;
                const shippingAddress = `${line1} ${city}, ${state} ${postal_code}`
                const orderInfo = { orderId, shippingName, shippingAddress }

                await dispatch(successOrder(orderInfo))
                await dispatch(fetchCart())
            }

            if (session.payment_status === 'paid') {
                processPayment()
            }

        }
        catch (err) {
            console.log(err)
        }
    }, [sessionId, session.payment_status]);


    if (!session.id) {
        return (
            <LoadSpinner />
        )
    }

    return (
        <Container component="main" maxWidth='md' sx={{ mb: 10 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, textAlign: 'center' }}>
                <Typography component="h1" variant="h4" align='center'>
                    Checkout
                </Typography>
                <Typography variant="body1" color="text.secondary" align='center' sx={{ textDecoration: 'underline' }} gutterBottom>
                    Confirmation
                </Typography>
                <Typography variant="h5" gutterBottom align='left'>
                    Thank you for your order.
                </Typography>
                <Typography variant="subtitle1" align='left'>
                    Your order confirmation number is #{session.client_reference_id}. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                </Typography>
                <Button variant='contained' component={Link} to="/products">Continue Shopping</Button>
            </Paper>
        </Container>
    )
}

export default Success

///////////////  the Session has the following object information /////////////////
// after_expiration: null
// allow_promotion_codes: null
// amount_subtotal: 187500
// amount_total: 187500
// automatic_tax: {enabled: false, status: null}
// billing_address_collection: null
// cancel_url: "http://localhost:8080/checkout"
// client_reference_id: "4"
// consent: null
// consent_collection: null
// currency: "usd"
// customer: "cus_KSvELneJocdNtS"
// customer_details: {email: 'testing@gmail.com', phone: null, tax_exempt: 'none', tax_ids: Array(0)}
// customer_email: null
// expires_at: 1635140134
// id: "cs_test_a1GRSlFqN4GQ7Gj81JoGqH5trlHlEydS9DIXF8ck5QtQ89sBcC1yosmWRt"
// livemode: false
// locale: null
// metadata: {}
// mode: "payment"
// object: "checkout.session"
// payment_intent: "pi_3JnzMoAEdYWBDgQn0z3JBM0N"
// payment_method_options: {}
// payment_method_types: ['card']
// payment_status: "paid"
// phone_number_collection: {enabled: false}
// recovered_from: null
// setup_intent: null
// shipping:
// address:
// city: "Bronx"
// country: "US"
// line1: "489 East 142nd Street"
// line2: null
// postal_code: "10454"
// state: "NY"
// [[Prototype]]: Object
// name: "John M"
// [[Prototype]]: Object
// shipping_address_collection: {allowed_countries: Array(1)}
// submit_type: null
// subscription: null
// success_url: "http://localhost:8080/checkout/success?session_id={CHECKOUT_SESSION_ID}"
// total_details: {amount_discount: 0, amount_shipping: 0, amount_tax: 0}
// url: null
// [[Prototype]]: Object