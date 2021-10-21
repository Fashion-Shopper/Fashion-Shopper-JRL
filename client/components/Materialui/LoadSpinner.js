import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const LoadSpinner = (props) => {
    const size = props.size || 100;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }}
        >
            <CircularProgress size={size} />
            <Typography variant="body2" color="text.secondary">
                LOADING...
            </Typography>
        </Box>
    );
}


export default LoadSpinner
