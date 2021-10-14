import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

//React Icons
import { MdOutlineAddShoppingCart } from 'react-icons/md'


function ProductCard(props) {
    const { name, brandName, imageURL, price, category, gender, size, rating, description, source } = props.product;

    return (
        <Card sx={{ maxWidth: 350 }}>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <CardMedia
                component="img"
                height="350"
                image={imageURL}
            />
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {brandName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {rating}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography variant="body2" color="text.secondary">
                    Price: ${price}.99
                </Typography>
                <IconButton>
                    <MdOutlineAddShoppingCart size='2rem' />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ProductCard