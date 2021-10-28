
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const slides = [
    {
        name: "Comme des Garcons",
        description: "Browsing products by Comme des Garcons by Kendrick",
        image: "/slideshow/slide-03-view-comme-des-garcons.png",
        link: '/products'
    },
    {
        name: "Hat",
        description: "View all accessories",
        image: "/slideshow/slide-01-view-accesories.png",
        link: '/products'
    },
    {
        name: "Yellow Sweater",
        description: "View this specific product",
        image: "/slideshow/slide-02-new-product.png",
        link: '/products'
    },
]

const SlideShow = () => {

    return (
        // <Box sx={{ height: 3 }}>
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay stopOnHover={false} interval={2000}>
            {slides.map(slide => (
                <div>
                    <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.8)', height: 120, width: '100%', position: 'absolute', bottom: 0 }}>
                        <Typography variant='h4' sx={{ zIndex: '2', color: 'white' }}>
                            {slide.description}
                        </Typography>
                        <Button component={Link} to={slide.link} variant='outlined' color='secondary' sx={{ width: '20%', m: 1 }}>
                            Shop Now!
                        </Button>
                    </Box>
                    <img src={slide.image} style={{ display: "block", maxHeight: 650, height: 'auto', height: 'auto' }} />
                </div>
            ))}
        </Carousel>
        // </Box>
    );
}

export default SlideShow


