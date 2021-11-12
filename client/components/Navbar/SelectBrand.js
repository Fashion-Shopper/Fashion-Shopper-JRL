import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

/////////////////// MATERIAL UI ///////////////////////////
import { Button, Tooltip, MenuItem, Menu } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function SelectBrand(props) {
    const handleDrawerToggle = props.handleDrawerToggle || function () { return null }

    const { brands } = useSelector(state => state)

    //////// Brand Drop Down Menu ////////////////
    const handleBrand = (evt) => {
        setBrandMenu(evt.currentTarget);
    }

    const handleCloseBrand = () => {
        setBrandMenu(null);
    };

    const [brandMenu, setBrandMenu] = useState(null);
    const openBrand = Boolean(brandMenu);

    return (
        <>
            <Tooltip title="Select Brand">
                <Button onClick={handleBrand} color="inherit">Brands<ArrowDropDownIcon size='small' color="primary" /> </Button>
            </Tooltip>

            <Menu
                anchorEl={brandMenu}
                open={openBrand}
                onClose={handleCloseBrand}
                onClick={handleCloseBrand}
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
                            mr: 1,
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
            // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {brands.map(brand => (
                    < MenuItem onClick={() => handleDrawerToggle()} component={Link} to={`/brands/${brand.id}`} key={brand.id}>
                        {brand.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default SelectBrand
