// MUI imports
import {
    Typography,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
// React Imports
import { useState } from 'react';

export default function CoachDashboard() {
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
                        Please enter your clients email address, followed by a password.
                        We recommend using the name of your organization as the password
                    </DialogContentText>
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
            </Dialog>
        </div>
    );
};