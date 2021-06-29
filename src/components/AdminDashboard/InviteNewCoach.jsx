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
import { useHistory } from 'react-router-dom';

export default function InviteNewCoach() {
    const history = useHistory();
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
            type: 'CLEAR_REGISTRATION_ERROR'
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
    const handleSubmit = () => {
        // Check is both required field are entered
        if (Object.keys(formState).length === 4) {
            // Close dialog
            setOpen(false);
            // Dispatch data to sage
            dispatch({
                type: 'CREATE_COACH',
                payload: formState
            })
            // Reset form state
            setFormState({});
        } else {
            // Throw error
            dispatch({
                type: 'REGISTRATION_INPUT_ERROR'
            })
        }
    }

    return (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Typography
                variant="h3"
                gutterBottom
            >
                Admin Dashboard
            </Typography>
            <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                style={{ marginRight: 10 }}
            >
                Add a new coach
            </Button>
            <Button
                variant="outlined"
                onClick={() => history.push('/managepyramids')}
            >
                Manage Pyramids
            </Button>
            {/* Dialog */}
            <Dialog open={open} onClose={handleClose}>
                {/* Title */}
                <DialogTitle>
                    Add a new coach
                </DialogTitle>
                <DialogContent>
                    {/* Errors */}
                    {errors.registrationMessage && (
                        <h3 className="alert" role="alert">
                            {errors.registrationMessage}
                        </h3>
                    )}
                    {/* Organization */}
                    <TextField
                        label="Organization"
                        name="organization_name"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* First Name */}
                    <TextField
                        label="First Name"
                        name="first_name"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* Last Name */}
                    <TextField
                        label="Last Name"
                        name="last_name"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* Phone Number */}
                    <TextField
                        label="Phone Number"
                        name="email"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* Email */}
                    <TextField
                        label="Email"
                        name="phone_number"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    {/* Password */}
                    <TextField
                        helperText="We recommend using the name of your organization as their password."
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
                        Add Coach
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};