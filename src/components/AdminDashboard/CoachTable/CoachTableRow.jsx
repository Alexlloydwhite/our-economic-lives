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
import ViewClients from './ViewClients';

export default function CoachTableRow({ coach, coachList, StyledTableRow, classes }) {
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <StyledTableRow>
            <TableCell>
                <Typography>
                    {coach.first_name}{' '}{coach.last_name}
                </Typography>
            </TableCell>
            <TableCell>
                <ViewClients 
                    classes={classes}
                    coachList={coachList}
                    coach={coach}
                />
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
                    {/* Opens dialog to display coach data */}
                    <MenuItem>Info</MenuItem>
                    {/* Opens dialog to confirm deactivate */}
                    <MenuItem>Deactivate</MenuItem>
                </Menu>
            </TableCell>
        </StyledTableRow>
    );
}