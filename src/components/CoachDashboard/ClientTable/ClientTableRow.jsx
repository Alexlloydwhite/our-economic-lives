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

export default function ClientTableRow({client, StyledTableRow}) {
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
                            <MoreHorizIcon />
                        </IconButton>
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