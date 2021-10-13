import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

//Material UI Imports
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.auth.id)

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fashion-JRL
          </Typography>
          {isLoggedIn ? (
            <>
              <Button component={Link} to="/home" color="inherit">Home</Button>
              <Button component={Link} to="/" onClick={handleClick} color="inherit">Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

/**
 * CONTAINER
 */

export default Navbar
