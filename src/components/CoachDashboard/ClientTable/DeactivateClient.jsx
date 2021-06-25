// MUI
import {
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core'
// React
import { useState } from 'react';

export default function DeactivateClient() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <MenuItem onClick={() => setOpenDialog(true)} >
                Deactivate Client
            </MenuItem>
            <Dialog open={openDialog}>
                <DialogTitle>
                    {"Deactivate This Client?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deactivating this client will remove them from your list 
                        of active clients.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* Cancel btn, closes dialog */}
                    <Button
                        onClick={() => setOpenDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                    >
                        Deactivate
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}