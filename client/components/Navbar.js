//////////////// REACT / REDUX //////////////
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

///////////// COMPONENTS //////////////////
import Profile from './User/Profile';


////////////// STORE ///////////////////


/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const products = useSelector(state => state.products)
  const cart = useSelector(state => state.userCart)

  let quantity = 0;
  if (cart.orderitems && isLoggedIn) {
    quantity = cart.orderitems.reduce((acc, item) => acc + item.quantity, quantity)
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
            {/* <Button component={Link} to="/" onClick={handleClick} color="inherit">Logout</Button> */}


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
            <IconButton component={Link} to="/cart" size="large" aria-label="user cart" color="inherit">
              <Badge badgeContent={quantity} color="error">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
            <Profile />

          </>
        ) : (
          <>
            <Button component={Link} to="/home" color="inherit">Home</Button>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
            <Button component={Link} to="/products" color="inherit">Products ({products.length})</Button>
            <IconButton size="large" aria-label="show guess cart quantity" color="inherit">
              <Badge badgeContent={quantity} color="error">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
