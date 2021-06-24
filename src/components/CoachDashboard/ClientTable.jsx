// MUI
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
// React
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// Styles
const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 300,
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function ClientTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const clientList = useSelector(store => store.clients)
    // On page load, grab the client
    // data associated with coach
    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, [dispatch])
    return (
        <div style={{ textAlign: 'center' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <Typography>
                                    Your Clients
                                </Typography>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList.map((client) => (
                            <StyledTableRow key={client.id}>
                                {client.is_registered ?
                                    <>
                                        <TableCell>
                                            <Typography>
                                                {client.first_name}{ ' ' }{client.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined">
                                                Critical Experiences
                                            </Button>
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}