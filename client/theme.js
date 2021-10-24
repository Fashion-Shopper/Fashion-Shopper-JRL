import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#2e8fd8',
        },
    },
    shape: {
        borderRadius: 0,
    },
});

export default theme

// Link to all theme properties
// https://mui.com/customization/default-theme/#main-content