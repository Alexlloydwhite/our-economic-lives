// MUI
import {
    TableCell,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core'

export default function CoachTableRow({ coach, coachList, StyledTableRow, classes }) {
    return (
        <StyledTableRow>
            <TableCell>
                <Typography>
                    {coach.first_name}{' '}{coach.last_name}
                </Typography>
            </TableCell>
        </StyledTableRow>
    )
}