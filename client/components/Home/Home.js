import { Box } from '@mui/system'
import React from 'react'
import SlideShow from './SlideShow'
import NewArrivals from './NewArrivals'
import ShopBrand from './ShopBrand'
import { Slide } from '@mui/material'

const Home = () => {

  return (
    <Slide direction="right" in={true} timeout={500}>
      <Box sx={{ mb: 25 }}>
        <SlideShow />
        <NewArrivals title={"Featuring"} />
        <ShopBrand />
      </Box>
    </Slide>
  )
}

export default Home
