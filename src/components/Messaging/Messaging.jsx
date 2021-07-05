import MessageWindow from './MessageWindow';
import SendMessageForm from './SendMessageForm';
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
    messageRight: {
        textAlign: 'right',
        padding: 10,
        marginRight: 10,
    },
    messageLeft: {
        textAlign: 'left',
        padding: 10,
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
                        variant="h4"
                        gutterBottom
                    >
                        Messaging
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <MessageWindow classes={classes} />
                </Grid>
                <Grid item xs={12}>
                    <SendMessageForm />
                </Grid>
            </Grid>
        </div>
    );
}