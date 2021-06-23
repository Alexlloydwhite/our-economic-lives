import {createMuiTheme} from '@material-ui/core';

// Todo - adjust theme to match OEL color palette
export const theme = createMuiTheme(
    {
        palette: {
            // looks like white... but it's not. Trust me this is better
            background: {
                default: "#F3F5F7"
            },
            // lightish blue color
            primary: {
                main: '#3ca6fe',
                light: '#cdecfa'
            },
            // grey
            secondary: {
                main: '#4d5965'
            },
            success: {
                main: '#2dfa21',
            },
            //green
            info: {
                main: '#12ae5b',
                light: '#44bc74',
                dark: '#047246'
            }
        }
    }
)