// MUI
import {
    Button,
} from '@material-ui/core';

export default function viewClients({ classes, coachList, coach }) {

    const handleOpenClientList = (id) => {
        
    }
    return (
        <Button
            variant="outlined"
            className={classes.tableButton}
            size="small"
            onClick={() => handleOpenClientList(coach.id)}
        >
            View Clients
        </Button>
    );
}