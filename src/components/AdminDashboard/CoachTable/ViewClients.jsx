// MUI
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
// React
import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react';

export default function viewClients({ classes, coachList, coach }) {
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    // List of clients from store
    const clientList = useSelector(store => store.clients);
    const handleOpenClientList = (id) => {
        // Open dialog
        setOpenDialog(true);
        // Dispatch to grab client list by coach ID
        dispatch({
            type: 'FETCH_CLIENTS',
            coachId: id
        });
    }
    return (
        <>
            {/* Btn opens dialog to show client list for coach clicked */}
            <Button
                variant="outlined"
                className={classes.tableButton}
                size="small"
                onClick={() => handleOpenClientList(coach.id)}
            >
                View Clients
            </Button>
            <Dialog
                open={openDialog}
            >
                {/* Dialog Title */}
                <DialogTitle>
                    <IconButton onClick={() => setOpenDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                    {"Client List"}
                </DialogTitle>
                {/* Dialog Body */}
                <DialogContent>
                    <List>
                        {/* Check if the coach has any clients */}
                        {clientList.length > 1 ?
                            // If the coach has clients map over array to display data
                            clientList.map((client) => (
                                <div key={client.id}>
                                    {/* Client name */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PersonIcon />
                                        </ListItemAvatar>
                                        {/* Check is client is registered */}
                                        {client.is_registered ?
                                            // If client is register display name
                                            <ListItemText>
                                                {client.first_name}{' '}{client.last_name}
                                            </ListItemText>
                                            :
                                            // if client is not registered display email
                                            <ListItemText>
                                                {client.email}
                                            </ListItemText>
                                        }

                                    </ListItem>
                                </div>
                            ))
                            :
                            // If the coach does not have any clients display message
                            <ListItem>
                                <ListItemText>
                                    This coach has no clients
                                </ListItemText>
                            </ListItem>
                        }
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}