import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoadSpinner from '../../Materialui/LoadSpinner';
import { Avatar, Divider } from '@mui/material';

////////////// to convert to currency ////////////////
import currency from 'numeral'
currency.defaultFormat('$0,0.00');

export default function Review({ userCart, orderitems, total }) {

    if (!orderitems) {
        return (
            <LoadSpinner />
        )
    }
    return (
        <>
            <Typography variant="body1" align='center' sx={{ textDecoration: 'underline' }} gutterBottom>
                Review Your Order
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order # {userCart.id}
            </Typography>
            <List disablePadding>
                {orderitems.map(({ product, quantity }) => (
                    <Fragment key={product.id}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <Avatar variant="square" src={product.imageURL} sx={{ mx: 2, width: 70, height: 70 }} />
                            <ListItemText primary={product.name} secondary={`QTY: ${quantity}`} />
                            <Typography variant="body2">{currency((product.price * (quantity * 1)).toFixed(2)).format()}</Typography>
                        </ListItem>
                        <Divider />
                    </Fragment >
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {currency(total.toFixed(2)).format()}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
}