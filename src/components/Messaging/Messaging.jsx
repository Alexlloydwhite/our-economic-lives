import MessageWindow from './MessageWindow';
// MUI
import {
    Typography,
    Grid,
    Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Styles
const useStyles = makeStyles((theme) => ({
    container: {
        width: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    chip: {
        padding: theme.spacing(0.5)
    },
    header: {
        padding: theme.spacing(1)
    }
}));

export default function Messaging() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid
                container
                component={Paper}
                variant="outlined"
                direction="row"
            >
                <Grid item xs={12}>
                    <Typography
                        style={{ textAlign: 'center' }}
                        variant="h5"
                    >
                        Messaging
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <MessageWindow />
                </Grid>
            </Grid>
        </div>
    );
}