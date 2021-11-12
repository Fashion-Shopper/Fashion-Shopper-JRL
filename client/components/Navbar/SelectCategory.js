//////////////// REACT / REDUX //////////////
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, FormControl, InputLabel, NativeSelect, Tooltip, MenuItem, Menu, Dialog, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@emotion/react';


function SelectCategory(props) {
    const handleDrawerToggle = props.handleDrawerToggle || function () { return null }
    const products = useSelector(state => state.products)

    //////// Category Drop Down Menu ////////////////
    const handleCategory = (evt) => {
        setCategoryMenu(evt.currentTarget);
    }

    const handleCloseCategory = () => {
        setCategoryMenu(null);
    };

    const [categoryMenu, setCategoryMenu] = useState(null);
    const openCategory = Boolean(categoryMenu);

    const categories = Array.from(new Set(products.map(product => product.category)))

    return (
        <>
            <Tooltip title="Select Category">
                <Button onClick={handleCategory} color="inherit">Categories <ArrowDropDownIcon size='small' color="primary" /> </Button>
            </Tooltip>

            <Menu
                anchorEl={categoryMenu}
                open={openCategory}
                onClose={handleCloseCategory}
                onClick={handleCloseCategory}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            // mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {categories.map(category => (
                    < MenuItem onClick={() => handleDrawerToggle()} component={Link} to={`/category/${category}`} key={category}>
                        {category}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default SelectCategory
