// MUI imports
import {
    Typography,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
// React Imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function InviteNewClient() {
    const dispatch = useDispatch();
    const errors = useSelector(store => store.errors);
    const clientList = useSelector(store => store.clients)
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
            {/* Page Title */}
            <Typography variant="h5">
                You have {clientList.length} / 8 clients on your team
            </Typography>
            {/* Btn to invite new client */}
            {clientList.length < 8 ?
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
            {/* Dialog */}
            <Dialog open={open} onClose={handleClose}>
                {/* Title */}
                <DialogTitle>
                    Add a new client to your team
                </DialogTitle>
                <DialogContent>
                    {/* Helper text */}
                    <DialogContentText>
                        We recommend using the name of your organization as the password.
                    </DialogContentText>
                    {/* Errors */}
                    {errors.createUserMessage && (
                        <h3 className="alert" role="alert">
                            {errors.createUserMessage}
                        </h3>
                    )}
                    {/* Email */}
                    <TextField
                        label="Client's Email"
                        name="email"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* Password */}
                    <TextField
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