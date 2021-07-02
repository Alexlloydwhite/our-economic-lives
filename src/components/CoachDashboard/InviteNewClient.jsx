// MUI imports
import {
    Typography,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Grid,
    IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// React Imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    table: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        maxWidth: 600,
        padding: 15
    },
}));

export default function InviteNewClient({ activeClientList }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const errors = useSelector(store => store.errors);
    // State for dialog. Is it open or closed?
    const [open, setOpen] = useState(false);
    // Local form state
    const [formState, setFormState] = useState({});
    // Handle close of dialog
    const handleClose = () => {
        setOpen(false);
        // Clear error state
        dispatch({
            type: 'CLEAR_CLIENT_INPUT_ERROR'
        })
    }
    // Handle input change
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }
    // Handle dialog submit
    const handleSubmit = (e) => {
        // Check is both required field are entered
        if (Object.keys(formState).length === 2) {
            // Close dialog
            setOpen(false);
            // Dispatch data to sage
            dispatch({
                type: 'CREATE_CLIENT',
                payload: formState
            })
            // Reset form state
            setFormState({});
        } else {
            // Throw error
            dispatch({
                type: 'CREATE_CLIENT_INPUT_ERROR'
            })
        }
    }

    return (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Grid
                container
                className={classes.container}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid
                    item
                    component={Paper}
                    variant="outlined"
                    className={classes.table}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        You have {activeClientList.length} / 8 clients on your team
                    </Typography>
                    {/* Btn to invite new client */}
                    {activeClientList.length < 8 ?
                        <Button
                            onClick={() => setOpen(true)}
                            variant="outlined"
                        >
                            Invite a new client to your team
                        </Button>
                        :
                        <Typography variant="h6">
                            Your client list is full
                        </Typography>
                    }
                </Grid>
            </Grid>
            {/* Dialog */}
            <Dialog open={open}>
                {/* Dialog Title */}
                <DialogTitle style={{ marginBottom: -25 }}>
                    <span
                        style={{ float: 'left', marginTop: 9 }}
                    >
                        Invite a new client
                    </span>
                    <IconButton
                        onClick={handleClose}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {/* Errors */}
                    {errors.createUserMessage && (
                        <h3 className="alert" role="alert">
                            {errors.createUserMessage}
                        </h3>
                    )}
                    {/* Email */}
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* Password */}
                    <TextField
                        helperText="We recommend using the name of your organization as the password."
                        label="Create a Password"
                        name="password"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions style={{ marginRight: 10, marginBottom: 10 }}>
                    {/* CancelBtn */}
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        size="small"
                    >
                        Cancel
                    </Button>
                    {/* Add client btn */}
                    <Button
                        size="small"
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Add Client
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};