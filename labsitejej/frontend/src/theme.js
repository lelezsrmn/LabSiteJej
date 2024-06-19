import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e3a8a', // blue-950
        },
        secondary: {
            main: '#eab308', // yellow-500
        },
        background: {
            default: '#1e3a8a', // blue-950
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
