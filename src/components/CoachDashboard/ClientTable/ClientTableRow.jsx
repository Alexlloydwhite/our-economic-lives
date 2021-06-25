// MUI
import {
    TableCell,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// React
import { useState } from 'react';
import ClientInfo from './ClientInfo';
import DeactivateClient from './DeactivateClient';

export default function ClientTableRow({ client, clientList, StyledTableRow, classes }) {
    // State for setting location of kabob menu
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <StyledTableRow>
            {/* Render row differently based on wether client is registered */}
            {client.is_registered ?
                <>
                    <TableCell>
                        {/* Client name */}
                        <Typography>
                            {client.first_name}{' '}{client.last_name}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        {/* Btn to open critical experiences view */}
                        <Button
                            size="small"
                            variant="outlined"
                            className={classes.tableButton}
                        >
                            Critical Experiences
                        </Button>
                    </TableCell>
                    <TableCell>
                        {/* Kebob menu with options */}
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            className={classes.tableButton}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            onClick={() => setAnchorEl(null)}
                        >
                            {/* TODO: add this */}
                            <MenuItem>View Pyramid</MenuItem>
                            {/* Opens dialog to display client data */}
                            <ClientInfo client={client} clientList={clientList} />
                            {/* Opens dialog to confirm deactivate */}
                            <DeactivateClient client={client} />
                        </Menu>
                    </TableCell>
                </>
                :
                <>
                    <TableCell>
                        {/* If client is not registered, display email instead of name */}
                        <Typography>
                            {client.email}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        {' '}
                    </TableCell>
                    <TableCell>
                        <Typography>
                            Not Registered
                        </Typography>
                    </TableCell>
                </>
            }
        </StyledTableRow>
    )
}