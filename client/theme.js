import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ffffff',
        },
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: "Oswald",
        h3: {
            fontFamily: 'Bebas Neue',
        },
        h4: {
            fontFamily: 'Bebas Neue',
        },
        h5: {
            fontFamily: 'Bebas Neue',
        },
        h6: {
            fontFamily: 'Bebas Neue',
        },
    },
});

export default theme

// Link to all theme properties
// https://mui.com/customization/default-theme/#main-content