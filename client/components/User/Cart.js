import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

////////////////////////// MATERIAL UI ///////////////////////////////////////
import { Button, Card, CardContent, CardMedia, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';



const Cart = () => {
    const { userCart } = useSelector(state => state)

    /////////// THIS DISPLAY THE LOADING SPINNER ///////////////
    if (!userCart) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={100} />
                <Typography variant="body2" color="text.secondary">
                    LOADING...
                </Typography>
            </Box>
        )
    }

    if (userCart.length === 0 && userCart) {
        return (
            <>
                <Typography variant='h5' gutterBottom>
                    Shopping Cart
                </Typography>
                <Divider />
                <Typography>
                    Your Cart is Empty
                </Typography>
            </>
        )
    }

    return (
        <>
            <Typography variant='h5' gutterBottom>
                Shopping Cart
            </Typography>
            <Divider />

            <Grid container sx={{ pt: 5, pb: 12, m: 0 }}>
                {userCart.map(({ product, quantity }) => (
                    <Card sx={{ display: 'flex' }} key={product.id}>
                        <CardMedia
                            component="img"
                            sx={{ width: 250, p: 3 }}
                            image={product.imageURL}
                            alt={product.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {product.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <Stack direction="row" spacing={5} sx={{ pl: 3, pb: 5 }}>
                                <FormControl>
                                    <InputLabel>QTY</InputLabel>
                                    <Select
                                        label="QTY"
                                        variant='outlined'
                                        name="quantity"
                                        value={quantity}
                                    // onChange={handleChange}
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
                                <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Stack>
                        </Box>
                    </Card>
                ))}
            </Grid>
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