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
import CloseIcon from '@material-ui/icons/Close';
// React
import { useState } from 'react';

export default function CoachInfo({ coach, coachList }) {
    // State of coach detail dialog
    const [coachDetailsClicked, setCoachDetailsClicked] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    // Handles display of coach data on click of "info"
    const handleOpenCoachInfo = (id) => {
        // Open the dialog
        setOpenDialog(true);
        // filter coach list to grab coach with matching ID
        const coachClicked = coachList.filter((coach) => coach.id === id);
        // set local state to result of filter
        setCoachDetailsClicked(coachList.filter((coach) => coach.id === id));
    }

    return (
        <>
            <MenuItem
                onClick={() => handleOpenCoachInfo(coach.id)}
            >
                Coach Info
            </MenuItem>
            {/* Dialog displays on click of menu item */}
            <Dialog
                open={openDialog}
            >
                {/* Dialog Title */}
                <DialogTitle style={{ marginBottom: -25 }}>
                    <span
                        style={{ float: 'left', marginTop: 9, marginLeft: 8 }}
                    >
                        Client Info
                    </span>
                    <IconButton
                        onClick={() => setOpenDialog(false)}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {/* Dialog Body */}
                <DialogContent>
                    <List>
                        {/* Check is coach details is !== null */}
                        {coachDetailsClicked &&
                            // Map over array to display data
                            coachDetailsClicked.map((coach) => (
                                <div key={coach.id}>
                                    {/* Coach Name */}
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PersonIcon />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {coach.first_name}{' '}{coach.last_name}
                                        </ListItemText>
                                    </ListItem>
                                </div>
                            ))
                        }
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}