import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

////////////////////////// MATERIAL UI ///////////////////////////////////////
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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
                <Typography variant='h5' gutterBottom aling='center'>
                    CART
                </Typography>
                <Divider />
                <Typography>
                    Your Cart is Empty
                </Typography>
            </>
        )
    }

    const handleChange = (evt, id) => {
        const updateOrderItem = { id, [evt.target.name]: evt.target.value }
        dispatch(updateCart(updateOrderItem))
    }

    const handleRemove = (orderItemId) => {
        dispatch(removeFromCart(orderItemId))
    }
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <>
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
                                {userCart.orderitems.map(({ id, product, quantity }) => (
                                    <TableRow key={id}>
                                        <TableCell padding='none' sx={{ height: 100, width: '100%' }}>
                                            <Stack direction='row' spacing={4} sx={{ '@media screen and (max-width: 840px)': { flexDirection: 'column' } }}>
                                                <Stack>
                                                    <img src={product.imageURL} width='200' />
                                                </Stack>
                                                <Stack justifyContent='space-between'>
                                                    <Box>
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
                                                        <FormControl sx={{ width: 150, pb: 2 }} >
                                                            <InputLabel>QTY</InputLabel>
                                                            <Select
                                                                label="QTY"
                                                                variant='outlined'
                                                                name="quantity"
                                                                value={quantity}
                                                                color='primary'
                                                                onChange={(evt) => handleChange(evt, id)}
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
                                                <Button sx={{ textDecoration: 'underline', p: 2 }} color='error' onClick={() => handleRemove(id)} startIcon={<DeleteIcon />}>
                                                    Remove
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* {userCart.orderitems.map(({ id, product, quantity }) => (
                        <Grid item xs={12} sx={{ p: 2 }} key={product.id}>
                            <Card sx={{
                                display: 'flex', '@media screen and (max-width: 800px)': { flexDirection: 'column' }
                            }} >
                                <CardMedia
                                    component="img"
                                    sx={{ maxWidth: 250, p: 3 }}
                                    image={product.imageURL}
                                    alt={product.name}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {product.brandName}
                                        </Typography>
                                        
                                        
                                    </CardContent>
                                    <Stack direction="row" spacing={2} sx={{ pl: 3, pb: 5 }}>
                                        <FormControl>
                                            <InputLabel>QTY</InputLabel>
                                            <Select
                                                label="QTY"
                                                variant='outlined'
                                                name="quantity"
                                                value={quantity}
                                                onChange={(evt) => handleChange(evt, id)}
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
                                        
                                    </Stack>
                                </Box>
                            </Card>
                        </Grid>
                    ))} */}
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
                            <Button component={Link} to='/checkout' variant='contained' sx={{ mt: 2, width: '75%' }}>
                                Checkout
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
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