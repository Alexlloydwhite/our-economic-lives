// MUI
import {
    MenuItem,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import CloseIcon from '@material-ui/icons/Close';
// React
import { useState } from 'react';

export default function ClientInfo({ clientList, client }) {
    // State of client detail dialog
    const [clientDetailsClicked, setClientDetailsClicked] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    // Handles display of client data on click of "client info"
    const handleOpenClientInfo = (id) => {
        // Open the dialog
        setOpenDialog(true);
        // filter client list to grab client with matching ID
        const clientClicked = (clientList.filter((client) => client.id === id));
        // set local state to result of filter 
        setClientDetailsClicked(clientClicked);
    }
    return (
        <>
            <MenuItem
                onClick={() => handleOpenClientInfo(client.id)}
            >
                Client Info
            </MenuItem>
            {/* Dialog displays on click of menu item */}
            <Dialog
                open={openDialog}
            >
                {/* Dialog Title */}
                <DialogTitle>
                    <IconButton onClick={() => setOpenDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                    {"Client Info"}
                </DialogTitle>
                {/* Dialog Body */}
                <DialogContent>
                    <List>
                        {/* Check is client details is !== null */}
                        {clientDetailsClicked ?
                            // Map over array to display data
                            clientDetailsClicked.map((idx) => (
                                <div key={idx.id}>
                                    {/* Client name */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PersonIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.first_name}{' '}{idx.last_name}
                                        </ListItemText>
                                    </ListItem>
                                    {/* Client Phone Number */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PhoneIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.phone_number}
                                        </ListItemText>
                                    </ListItem>
                                    {/* Client City */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <HomeIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.city}
                                        </ListItemText>
                                    </ListItem>
                                    {/* Client Profession */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <WorkIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.current_profession}
                                        </ListItemText>
                                    </ListItem>
                                </div>
                            ))
                            :
                            null
                        }
                    </List>
                </DialogContent>
            </Dialog>
        </>
    )
}