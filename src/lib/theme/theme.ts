import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2CB0ED',
        },
        secondary: {
            main: '#666f73',
            light: '#f8f8f8',
        },
    },

    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    padding: '8px 24px',
                    textTransform: "capitalize",
                    boxShadow: "none",
                    '&:hover': {
                        backgroundColor: '#E5FAE5',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2CB0ED',
                    }
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'lg',
            },
        },
    },
    typography: {
        body1: {
            color: '#0B1134CC',
        },
    },
});

theme.shadows[1] = '0px 5px 22px lightgray';