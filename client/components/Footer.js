import { Container, Paper, Typography, Link } from "@mui/material";
import React from "react";

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align='center'>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Fashion-Shopper/Fashion-Shopper-JRL">
                Fashion-JRL
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Footer = () => {
    return (
        <Paper square sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: "0",
            bottom: "0",
            width: "100%",
            zIndex: '1',
            py: 3,
            px: 2,
            borderTop: 'solid 2px black'
        }}>
            <Container>
                <Typography variant='body1' align='center'>
                    Developed by Riviere, Luna & Jonathan - Fullstack Academy
                </Typography>
                <Copyright />
            </Container>
        </Paper>
    )
}
export default Footer