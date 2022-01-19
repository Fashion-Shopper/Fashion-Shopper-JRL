//////////////// REACT / REDUX //////////////
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

///////////// COMPONENTS //////////////////
import Profile from '../User/Profile';
import { Login, Signup } from "../AuthForm";
import SelectBrand from '../Navbar/SelectBrand'
import SelectCategory from '../Navbar/SelectCategory'

////////////////// LOGO ////////////////
const logo = '/logo/JRL-Logo.png'


/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Button, Badge, IconButton, Dialog, useMediaQuery, Drawer, Typography, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const cart = useSelector(state => state.userCart)

  let quantity = 0;
  if (cart.orderitems) {
    quantity = cart.orderitems.reduce((acc, item) => acc + item.quantity, quantity)
  }

  //////////////// Login / Sigup Forms /////////////////////
  const [openLogin, setopenLogin] = useState(false);
  const [loginForm, setloginForm] = useState(false);

  const handleChangeForm = () => {
    setloginForm(!loginForm)
  }

  const handleLoginClose = () => {
    setloginForm(false)
    setopenLogin(false)
  }

  const handleLoginOpen = () => {
    setopenLogin(true)
  }

  //// Responsive Menu /////
  const theme = useTheme()
  const mobileSize = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <AppBar position="static" color='secondary' sx={{ borderBottom: 'solid 2px black' }}>
      <Toolbar sx={{ display: 'flex', '@media screen and (max-width: 600px)': { flexDirection: 'column' } }}>
        <Box sx={{ borderRight: 'solid 2px black', '@media screen and (max-width: 600px)': { borderRight: 'none' } }} >
          <Button component={Link} to="/home" color="inherit">
            <img src={logo} width='120' />
          </Button>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            {mobileSize ? (
              <>
                <IconButton
                  color="primary"
                  aria-label="open menu"
                  // edge="start"
                  size='large'
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  <Typography align='center' sx={{ my: 3 }}>
                    MENU
                  </Typography>
                  <Divider />
                  <Button onClick={handleDrawerToggle} component={Link} to="/products" color="inherit">All Products</Button>
                  <SelectCategory handleDrawerToggle={handleDrawerToggle} />
                  <SelectBrand handleDrawerToggle={handleDrawerToggle} />
                </Drawer>
              </>
            ) : (
              <>
                <Button component={Link} to="/products" color="inherit">All Products</Button>
                <SelectCategory />
                <SelectBrand />
              </>
            )}

          </Box>

          <Box sx={{ display: 'flex' }}>
            <IconButton component={Link} to="/cart" size="large" aria-label="user cart" color="inherit">
              <Badge badgeContent={quantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <>
                <Profile handleLoginClose={handleLoginClose} />
              </>
            ) : (
              <>
                <Button onClick={handleLoginOpen} color="inherit">Login</Button>
                <Dialog open={openLogin} onClose={handleLoginClose}>
                  {loginForm ? (
                    <Signup handleChangeForm={handleChangeForm} loginForm={loginForm} />
                  ) : (
                    <Login handleChangeForm={handleChangeForm} loginForm={loginForm} />
                  )}
                </Dialog>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar
