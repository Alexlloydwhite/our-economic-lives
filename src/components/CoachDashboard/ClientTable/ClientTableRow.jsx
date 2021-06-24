// MUI
import {
    TableCell,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// React
import { useState } from 'react';

export default function ClientTableRow({client, StyledTableRow, classes}) {
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <StyledTableRow>
            {client.is_registered ?
                <>
                    <TableCell>
                        <Typography>
                            {client.first_name}{' '}{client.last_name}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Button 
                        size="small" 
                        variant="outlined"
                        className={classes.tableButton}
                        >
                            Critical Experiences
                        </Button>
                    </TableCell>
                    <TableCell>
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
                        >
                            <MenuItem>View Pyramid</MenuItem>
                            <MenuItem>Client Info</MenuItem>
                            <MenuItem>Deactivate Client</MenuItem>
                        </Menu>
                    </TableCell>
                </>
                :
                <>
                    <TableCell>
                        <Typography>
                            {client.email}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>
                            Not Registered
                        </Typography>
                    </TableCell>
                    <TableCell>
                        {' '}
                    </TableCell>
                </>
            }
        </StyledTableRow>
    )
}