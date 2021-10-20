import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#035041',
        },
        secondary: {
            main: '#2e8fd8',
        },
    },
    shape: {
        borderRadius: 10,
    },
});

export default theme

// Link to all theme properties
// https://mui.com/customization/default-theme/#main-content