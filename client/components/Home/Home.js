import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { } from 'react-redux'
import SlideShow from './SlideShow'
import NewArrivals from './NewArrivals'

const Home = () => {

  return (
    <Box sx={{ mb: 15 }}>
      <SlideShow />
      <NewArrivals />
    </Box>
    
  )
}

export default Home
