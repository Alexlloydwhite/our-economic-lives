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
    Button,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
// React
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ClientTableRow from './ClientTableRow';
// Styles
const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 500,
        padding: theme.spacing(2)
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
        <div className={classes.table}>
            <TableContainer component={Paper}>
                <Typography
                    variant="h4"
                    color="primary"
                >
                    Your Clients
                </Typography>
                <Table>
                    <TableBody>
                        {clientList.map((client) => (
                            <ClientTableRow
                                key={client.id}
                                client={client}
                                StyledTableRow={StyledTableRow}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}