// MUI
import {
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import CloseIcon from '@material-ui/icons/Close';
// React
import { useState } from 'react';

export default function ClientInfo({ clientList, client }) {
    // State of client detail dialog
    const [clientDetailsClicked, setClientDetailsClicked] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenClientInfo = (id) => {
        // Open the dialog
        setOpenDialog(true);
        // filter client list to grab client with matching ID
        const clientClicked = (clientList.filter((client) => client.id === id));
        setClientDetailsClicked(clientClicked);
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
            >
                <DialogTitle>
                    <IconButton onClick={() => setOpenDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                    {"Client Info"}
                </DialogTitle>
                <DialogContent>
                    <List>
                        {clientDetailsClicked ?
                            clientDetailsClicked.map((idx) => (
                                <div key={idx.id}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PersonIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.first_name}{' '}{idx.last_name}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PhoneIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.phone_number}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <HomeIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.city}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <WorkIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.current_profession}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <ChangeHistoryIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {idx.desired_career}
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