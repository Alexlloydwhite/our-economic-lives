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

export default function ClientTableRow({client, StyledTableRow}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }
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
                        <Button size="small" variant="outlined">
                            Critical Experiences
                        </Button>
                    </TableCell>
                    <TableCell>
                        <IconButton>
                            <MoreHorizIcon onClick={handleMenuOpen} />
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
                </>
            }
        </StyledTableRow>
    )
}