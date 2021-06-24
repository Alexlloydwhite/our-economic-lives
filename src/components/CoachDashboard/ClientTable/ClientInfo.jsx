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

export default function ClientInfo({ clientList, client }) {
    // State of client detail dialog
    const [clientDetailsClicked, setClientDetailsClicked] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenClientInfo = (id) => {
        // Open the dialog
        setOpenDialog(true);
        // filter client list to grab client with matching ID
        const clientClicked = (clientList.filter(client => client.id === id));
        // set state of client details clicked to the results of filer
        setClientDetailsClicked(clientClicked);
        console.log(clientClicked);
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
                    <pre>
                        {JSON.stringify(clientDetailsClicked, null, 2)}
                    </pre>
                    <DialogContentText>
                        {clientDetailsClicked ?
                            <h3>no</h3>
                            :
                            <h3>yes</h3>
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}