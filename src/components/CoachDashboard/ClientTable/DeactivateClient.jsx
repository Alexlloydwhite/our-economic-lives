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
import { useDispatch } from 'react-redux';

export default function DeactivateClient({ client }) {
    const dispatch = useDispatch();
    // State for dialog open || !open
    const [openDialog, setOpenDialog] = useState(false);
    // Dispatches to remove client from coach
    const deactivateClient = (id) => {
        // Close dialog
        setDialogOpen(false);
        // Dispatch to remove client
        dispatch({
            type: 'DEACTIVATE_CLIENT',
            payload: id
        })
    }

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
                        onClick={() => deactivateClient(client.id)}
                    >
                        Deactivate
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}