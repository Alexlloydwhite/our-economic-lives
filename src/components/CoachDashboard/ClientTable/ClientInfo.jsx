// MUI
import {
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'
// React
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ClientInfo({ clientList, client }) {
    const dispatch = useDispatch();
    // State of client detail dialog
    const [clientDetailsClicked, setClientDetailsClicked] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenClientInfo = (id) => {
        // Open the dialog
        setOpenDialog(true);
        dispatch({
            type: 'FETCH_CLIENT_BY_ID',
            payload: id
        });
    }
    return (
        <>
            <MenuItem
                onClick={() => handleOpenClientInfo(client.id)}
            >
                Client Info
            </MenuItem>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>
                    {"Client Info"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
            </Dialog>
        </>
    )
}