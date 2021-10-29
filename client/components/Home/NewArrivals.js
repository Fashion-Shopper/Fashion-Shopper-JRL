import React from "react";
import { Button, Card, CardMedia, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const newArrivals = [
    {
       name: "AW2008 A-POC Skeleton Denim",
       brandName: "Issey Miyake",
       image:"https://images.squarespace-cdn.com/content/v1/5aaf41dd3c3a53cc58416c61/1578627166364-Z0UZLUYDZWOHLMZA9AEU/isseymiyakeaw2008apocskeletondenimfront.jpg?format=1500w",
       price: "$600.00",
       link: '/products/10'
    },
    {
        name: "AW2005 Fur Alien Parka",
        brandName: "Issey Miyake",
        image: "https://images.squarespace-cdn.com/content/v1/5aaf41dd3c3a53cc58416c61/1585268487150-JOEDFH1BZ9HCV69GWJ8V/isseymiyakeaw2005alienjacketfront.jpg?format=1500w",
        price: "$500.00",
        link:"/products/13"
    }, 
    {
        name: "AW2006 Punk Mohair Sweater",
        brandName: "Junya Watanabe",
        image: "https://images.squarespace-cdn.com/content/v1/5aaf41dd3c3a53cc58416c61/1578091695614-TFRI3FYKPJ1S7ZYK4SI9/junyawatanabeaw2006mohairfront_1.jpg?format=1500w",
        price: "$500.00",
        link:"/products/16"
    } 
]

const NewArrivals = () => {
    return ( 
        <div>
        <h2 style = {{textAlign: "center"}} > New Arrivals </h2>

        <Box textAlign="center">
        <Grid container spacing={1} direction="row" align="center" >
        {newArrivals.map(item =>(
             <Grid item xs={4} >
                <Box component={Link} to={item.link} >
                <Card height='300' raised sx={{ maxWidth: 300, boxShadow: 'none', '&:hover': { boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)' } }}>
                    <CardMedia  component="img" image={item.image}  /> 
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">
                            {item.brandName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ zIndex: '2', color: 'black' }}>
                            {item.name}
                        </Typography>
                        {/* <Typography variant="subtitle2" color="text.secondary">
                            {item.price}
                        </Typography> */}
                    </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "column" }}>
                    </CardActions>
                </Card>
                </Box>
            </Grid>
        ))}
        </Grid>
        </Box>

        <Box textAlign="center">
           <Button component={Link} to='/products' sx={{bgcolor:'black', color:'white', width:'30%'}} >View All</Button>
        </Box>
    </div>

    )}

export default NewArrivals