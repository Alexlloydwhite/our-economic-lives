// MUI
import {
    Button,
} from '@material-ui/core';

export default function viewClients({ classes, coachList }) {
    return (
        <Button
            variant="outlined"
            className={classes.tableButton}
            size="small"
        >
            View Clients
        </Button>
    );
}