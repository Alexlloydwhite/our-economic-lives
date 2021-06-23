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

export default function CoachDashboard() {
    const dispatch = useDispatch();
    const errors = useSelector(store => store.errors);
    // State for dialog. Is it open or closed?
    const [open, setOpen] = useState(false);
    // Local form state
    const [formState, setFormState] = useState({});
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
            dispatch({
                type: 'CREATE_CLIENT',
                payload: formState
            })
        } else {
            dispatch({
                type: 'CREATE_CLIENT_INPUT_ERROR'
            })
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography>
                You may have a maximum of 8 clients on your team
            </Typography>
            <Button onClick={() => setOpen(true)}>Invite a new client to your team</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    Add a new client to your team
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We recommend using the name of your organization as the password.
                    </DialogContentText>
                    {errors.loginMessage && (
                        <h3 className="alert" role="alert">
                            {errors.loginMessage}
                        </h3>
                    )}
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
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