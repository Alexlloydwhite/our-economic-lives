// MUI imports
import { 
    Typography,
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
    const [open, setOpen] = useState(false);

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
            </Dialog>
        </div>
    );
};