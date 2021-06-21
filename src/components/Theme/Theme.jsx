import {createMuiTheme} from '@material-ui/core';

// Todo - adjust theme to match OEL color palette
export const theme = createMuiTheme(
    {
        palette: {
            background: {
                default: "#EdEFF2"
            },
            primary: {
                main: '#3ca6fe',
                light: '#cdecfa'
            },
            secondary: {
                main: '#4d5965'
            },
            info: {
                main: '#12ae5b',
                light: '#44bc74',
                dark: '#047246'
            }
        }
    }
)