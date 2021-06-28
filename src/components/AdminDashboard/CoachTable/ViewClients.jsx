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
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
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
        setOpenDialog(true);
        dispatch({
            type: 'FETCH_CLIENTS',
            coachId: id
        });
    }
    return (
        <>
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
                        {/* Check is client details is !== null */}
                        {clientList.length > 1 ?
                            // Map over array to display data
                            clientList.map((client) => (
                                <div key={client.id}>
                                    {/* Client name */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PersonIcon />
                                        </ListItemAvatar>
                                        {client.is_registered ?
                                            <ListItemText>
                                                {client.first_name}{' '}{client.last_name}
                                            </ListItemText>
                                            :
                                            <ListItemText>
                                                {client.email}
                                            </ListItemText>
                                        }

                                    </ListItem>
                                </div>
                            ))
                            :
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