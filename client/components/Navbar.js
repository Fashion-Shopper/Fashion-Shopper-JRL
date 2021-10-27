//////////////// REACT / REDUX //////////////
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

///////////// COMPONENTS //////////////////
import Profile from './User/Profile';

////////////////// LOGO ////////////////
const logo = '/logo/JRL-Logo.png'

////////////// STORE ///////////////////

/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const products = useSelector(state => state.products)
  const cart = useSelector(state => state.userCart)

  let quantity = 0;
  if (cart.orderitems && isLoggedIn) {
    quantity = cart.orderitems.reduce((acc, item) => acc + item.quantity, quantity)
  }

  return (
    <AppBar position="static" color='secondary' sx={{ boxShadow: 'none', borderBottom: 'solid 2px black' }}>
      <Toolbar>
        <Box sx={{ borderRight: 'solid 2px black', px: 2, py: 1 }} >
          <Button component={Link} to="/home" color="inherit">
            <img src={logo} width='120' />
          </Button>
        </Box>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fashion-JRL
        </Typography> */}
        {isLoggedIn ? (

          // <Link to='/settings'>
          //       Settings
          //     </Link>
          // {
          //     !!auth.avatar && <img src={`${auth.avatar}`} /> 
          //   }
          // {
          //   //  !!auth.isAdmin && <Link to = '/admin'> Admin </Link>
          // }
          <>
            <Button component={Link} to="/products" color="inherit">Products ({products.length})</Button>
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
              <IconButton component={Link} to="/cart" size="large" aria-label="user cart" color="inherit">
                <Badge badgeContent={quantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
            <Profile />
          </>
        ) : (
          <>
            <Button component={Link} to="/products" color="inherit">Products ({products.length})</Button>
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
              <IconButton size="large" aria-label="cart" color="inherit">
                <Badge badgeContent={quantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar >
  )
}

export default Navbar
