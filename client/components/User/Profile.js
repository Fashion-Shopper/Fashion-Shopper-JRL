import React, { useState } from 'react'
import { Avatar, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import { Settings, Logout, History } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';

import { Link } from 'react-router-dom';

const Profile = () => {

    const user = useSelector(state => state.auth) || {};

    const [menu, setMenu] = useState(null);
    const open = Boolean(menu);

    const dispatch = useDispatch();

    const handleMenu = (evt) => {
        setMenu(evt.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <Tooltip title="User profile">
                <IconButton onClick={handleMenu}>
                    <Avatar src={user.avatar}>{user.username.charAt(0).toUpperCase()}</Avatar>
                    <ArrowDropDownIcon size='small' color="primary" />
                </IconButton>
            </Tooltip>
            <Typography>
                Hi, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </Typography>
            <Menu
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                            right: 14,
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
                {/* <MenuItem>
                    <ListItemIcon>
                        <FaUserEdit size='1.5rem' />
                    </ListItemIcon>
                    Edit Profile
                </MenuItem> */}
                <MenuItem component={Link} to='/orders'>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    Order History
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default Profile


// avatar: ""
// id: 1
// isAdmin: false
// username: "cody"