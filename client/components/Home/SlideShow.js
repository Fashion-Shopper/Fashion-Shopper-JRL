
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const slides = [
    {
        name: "Comme des Garcons",
        description: "New Arrivals",
        image: "/slideshow/slide-03-view-comme-des-garcons.png",
        link: '/products'
    },
    {
        name: "Hat",
        description: "View all accessories",
        image: "/slideshow/slide-01-view-accesories.png",
        link: '/category/accessory'
    },
    {
        name: "Yellow Sweater",
        description: "New Trends - Layered Sweater",
        image: "/slideshow/slide-02-new-product.png",
        link: '/products/3'
    },
]

const SlideShow = () => {

    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay stopOnHover={false} interval={3000}>
            {slides.map((slide, idx) => (
                <div key={idx}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: 'rgba(0, 0, 0, 0.8)', height: 120, width: '100%', position: 'absolute', bottom: 0 }}>
                        <Typography variant='h4' sx={{ zIndex: '2', color: 'white' }}>
                            {slide.description}
                        </Typography>
                        <Button component={Link} to={slide.link} variant='contained' color='secondary' sx={{ width: '15%' }} >
                            Shop Now!
                        </Button>
                    </Box>
                    <img src={slide.image} style={{ display: "block", height: 'auto', height: 'auto' }} />
                </div>
            ))}
        </Carousel>
    );
}

export default SlideShow


