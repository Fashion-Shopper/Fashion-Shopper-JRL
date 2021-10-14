import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

//Material UI Imports
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.auth.id)

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fashion-JRL
        </Typography>
        {isLoggedIn ? (
          <>
            <Button component={Link} to="/home" color="inherit">Home</Button>
            <Button component={Link} to="/products" color="inherit">Products</Button>
            <Button component={Link} to="/" onClick={handleClick} color="inherit">Logout</Button>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

          </>
        ) : (
          <>
            <Button component={Link} to="/products" color="inherit">Products</Button>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
