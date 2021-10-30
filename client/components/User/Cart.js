import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

////////////////////////// MATERIAL UI ///////////////////////////////////////
import { Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Slide, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/////////////// COMPONENTs //////////////////
import LoadSpinner from '../Materialui/LoadSpinner'

////////////// TO CONVERT TO CURRENCY ////////////////
import currency from 'numeral'
currency.defaultFormat('$0,0.00');

///////////////// REDUX STORE  /////////////////
import { removeFromCart, updateCart } from '../../store';


const Cart = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => !!state.auth.id);
    const { userCart } = useSelector(state => state)

    /////////// THIS DISPLAY THE LOADING SPINNER ///////////////
    if (!userCart.orderitems) {
        return (
            <LoadSpinner />
        )
    }
    let total = 0;
    if (userCart.orderitems) {
        total = userCart.orderitems.reduce((acc, { product, quantity }) => acc + (product.price * quantity), 0)
    }

    if (userCart.orderitems && userCart.orderitems.length === 0) {
        return (
            <>
                <Typography variant='h3' gutterBottom align='center' sx={{ mt: 5 }}>
                    Cart <ShoppingCartIcon fontSize="large" />
                </Typography>
                <Grid container
                    direction='column'
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 20 }}>
                    <Grid item xs={6}>
                        <Typography variant='h5' gutterBottom component='div'>
                            Your Cart is Empty!
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button component={Link} to='/products' variant='contained'>
                            Shop Now!
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }

    const handleChange = (evt, id, productId) => {
        const quantity = evt.target.value
        dispatch(updateCart(id, productId, quantity))
    }

    const handleRemove = (orderItemId, productId) => {
        dispatch(removeFromCart(orderItemId, productId))
    }

    return (
        <Slide direction="right" in={true} timeout={500}>
            <Container maxWidth="xl">
                <Typography variant='h3' gutterBottom align='center' sx={{ mt: 5 }}>
                    Cart <ShoppingCartIcon fontSize="large" />
                </Typography>
                <Grid container sx={{ pb: 12, '@media screen and (max-width: 600px)': { flexDirection: 'column-reverse' } }}>
                    <Grid container item xs={12} sm={8} md={8}>
                        <TableContainer sx={{ p: 8 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" padding='none'>
                                            Product
                                        </TableCell>
                                        <TableCell align="right" padding='none'>
                                            Price&nbsp;($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userCart.orderitems.map(({ id, product, quantity }, idx) => (
                                        <TableRow key={id || idx}>
                                            <TableCell padding='none' sx={{ height: 100, width: '100%' }}>
                                                <Stack direction='row' spacing={4} sx={{ '@media screen and (max-width: 860px)': { flexDirection: 'column' } }}>
                                                    <Stack component={Link} to={`/products/${product.id}`}>
                                                        <img src={product.imageURL} width='200' />
                                                    </Stack>
                                                    <Stack justifyContent='space-between'>
                                                        <Box component={Link} to={`/products/${product.id}`} sx={{ color: 'inherit' }}>
                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                {product.brandName}
                                                            </Typography>
                                                            <Typography component="div" variant="h5" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                                                {product.name}
                                                            </Typography>
                                                            <Typography variant="h6" color="text.secondary" component="div">
                                                                {product.category} / Size: {product.size}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <FormControl sx={{ width: 150, pb: 2 }} >
                                                                <InputLabel>QTY</InputLabel>
                                                                <Select
                                                                    label="QTY"
                                                                    variant='outlined'
                                                                    name="quantity"
                                                                    value={quantity}
                                                                    color='primary'
                                                                    onChange={(evt) => handleChange(evt, id, product.id)}
                                                                >
                                                                    <MenuItem value={1}>1</MenuItem>
                                                                    <MenuItem value={2}>2</MenuItem>
                                                                    <MenuItem value={3}>3</MenuItem>
                                                                    <MenuItem value={4}>4</MenuItem>
                                                                    <MenuItem value={5}>5</MenuItem>
                                                                    <MenuItem value={6}>6</MenuItem>
                                                                    <MenuItem value={7}>7</MenuItem>
                                                                    <MenuItem value={8}>8</MenuItem>
                                                                </Select>
                                                            </FormControl>
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
                                                    <Button sx={{ textDecoration: 'underline', p: 2 }} color='error' onClick={() => handleRemove(id, product.id)} startIcon={<DeleteIcon />}>
                                                        Remove
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item container xs={12} sm={4} md={4}>
                        <Grid item xs={12} sx={{ p: 2 }} >
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Typography variant="h5" align='center'>
                                    Order Summary
                                </Typography>
                                <Typography variant="h6" align='center' color='text.secondary'>
                                    Subtotal: &nbsp;{currency(total.toFixed(2)).format()}
                                </Typography>
                                {isLoggedIn ? (
                                    <Button component={Link} to='/checkout' variant='contained' sx={{ mt: 2, width: '75%' }}>
                                        Checkout
                                    </Button>
                                ) : (
                                    <>
                                        <Button disabled variant='contained' sx={{ mt: 2, width: '75%' }}>
                                            Checkout
                                        </Button>
                                        <Typography variant="h6" align='center' color='text.secondary'>
                                            Please Login to checkout!
                                        </Typography>
                                    </>
                                )}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Container>
        </Slide>
    )
}

export default Cart

/////////////// FOR REFERENCE THESE ARE ALL THE PROPERTIES INSIDE THE PRODUCT //////////////////
// {
//     "id": 1,
//     "quantity": 3,
//     "createdAt": "2021-10-17T22:56:14.307Z",
//     "updatedAt": "2021-10-17T22:56:14.307Z",
//     "orderId": 1,
//     "productId": 1,
//     "product": {
//         "id": 1,
//         "name": "SS2000 Patchwork Suit",
//         "brandName": "Comme des Garcons",
//         "imageURL": "https://images.squarespace-cdn.com/content/v1/5aaf41dd3c3a53cc58416c61/1571450168771-6FH64TRL2YLWAMSQ0YOS/commedesgarconsss2000patchworksuitfull.jpg?format=1500w",
//         "price": 2750,
//         "category": "jacket",
//         "gender": "men",
//         "size": "L",
//         "rating": "4",
//         "description": "Rei Kawakubo’s spring 2000 collection for Comme des Garçons featured a wide range of patchwork garments, including pants, shirts, and as featured here, suits. Each of the suits was one of a kind, as they were produced in small quantities as special orders for customers before the collection hit the shelves. The eclectic fabric was sourced from the Gobelins Manufactory, a legendary tapestry factory in Paris. Extreme proficiency and attention to detail went into the construction of this piece. Shown here in a rare size large in both the pants and jacket, brandName new with the original tag still attached.",
//         "createdAt": "2021-10-17T22:56:14.142Z",
//         "updatedAt": "2021-10-17T22:56:14.303Z",
//         "brandId": 1
//     }
// }