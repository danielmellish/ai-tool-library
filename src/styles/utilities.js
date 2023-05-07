import {createTheme} from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#05445E',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#189AB4',
            contrastText: '#ffffff',
        },
        success: {
            main: '#4caf50'
        },
        error: {
            main: '#f44336',
            light: '#ffe0e0'
        },
        filled: {
            main: 'red'
        }
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
    },
    shape: {
        borderRadius: 2,
    },
});