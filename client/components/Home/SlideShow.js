import { Button, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

function Item(props) {
    return (
        <Paper elevation={0} sx={{ position: 'relative', height: 500 }}>
            {/* <Box sx={{ position: 'absolute', color: 'blue', height: 500, width: '100%' }}> */}
            <img loading='lazy' src={props.item.image} width='100%' height='500px' />
            {/* </Box> */}
            {/* <Box sx={{ mt: 50, position: 'absolute', zIndex: '2', width: '100%', height: 130, bgcolor: 'yellow', opacity: '50%' }}> */}
            {/* <Button variant='contained' sx={{ bgcolor: 'red', color: "red", p: 10, m: 10 }}> */}
            {/* Testing */}
            {/* </Button> */}
            {/* </Box> */}
        </Paper >
    )
}

const SlideShow = () => {
    var items = [
        {
            name: "Comme des Garcons",
            description: "Browsing products by Comme des Garcons by Kendrick",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            link: ''
        },
        {
            name: "Hat",
            description: "View all accessories",
            image: "/slideshow/slide-01-view-accesories.png",
            link: ''
        },
        {
            name: "Yellow Sweater",
            description: "View this specific product",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            link: ''
        },

    ]

    return (
        <>
            <Box sx={{}}>
                <Carousel>
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
            </Box>


        </>
    )
}

export default SlideShow
