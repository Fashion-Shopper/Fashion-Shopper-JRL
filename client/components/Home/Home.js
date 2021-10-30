import { Box } from '@mui/system'
import React from 'react'
import SlideShow from './SlideShow'
import NewArrivals from './NewArrivals'
import ShopBrand from './ShopBrand'

const Home = () => {

  return (
    <Box sx={{ mb: 15 }}>
      <SlideShow />
      <NewArrivals title={"Featuring"} />
      <ShopBrand />
    </Box>
  )
}

export default Home
