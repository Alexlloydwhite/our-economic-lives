// MUI
import {
    Button,
} from '@material-ui/core';
// React
import { useDispatch, useSelector } from "react-redux"

export default function viewClients({ classes, coachList, coach }) {
    const dispatch = useDispatch();
    // List of clients from store
    const clientList = useSelector(store => store.clients);
    const handleOpenClientList = (id) => {
        dispatch({
            type: 'FETCH_CLIENTS',
            coachId: id
        });
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