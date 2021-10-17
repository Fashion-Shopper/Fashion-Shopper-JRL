//////////////// REACT / REDUX //////////////
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

////////////// STORE ///////////////////
import { logout } from '../store'

/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const products = useSelector(state => state.products)
  const cart = useSelector(state => state.userCart)


  let quantity = 0;
  if (Array.isArray(cart) && isLoggedIn) {
    quantity = cart.reduce((acc, item) => acc + item.quantity, quantity)
  }

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
            <Button component={Link} to="/" onClick={handleClick} color="inherit">Logout</Button>


            {/* <Link to='/settings'>
              Settings
            </Link> */}
            {/* {
            !!auth.avatar && <img src={`${auth.avatar}`} /> 
            } */}
            {
              //  !!auth.isAdmin && <Link to = '/admin'> Admin </Link>
            }
            <Button component={Link} to="/products" color="inherit">Products ({products.length})</Button>
            {/* <Link to='/cart'>Cart ({1})</Link> */}

            <IconButton size="large" aria-label="show user cart quantity" color="inherit">
              <Badge badgeContent={quantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
            <Button component={Link} to="/products" color="inherit">Products ({products.length})</Button>
            <IconButton size="large" aria-label="show guess cart quantity" color="inherit">
              <Badge badgeContent={quantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
