// MUI
import {
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Paper,
    Typography,
    Grid
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
// React
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ClientTableRow from './ClientTableRow';
// Styles
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        direction: 'rows',
        display: 'flex',
        position: 'relative',
        alignItems: ' center',
        justify: 'center'
    },
    tableHeader: {
        padding: theme.spacing(1)
    },
    tableButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 0,
    }
}));

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
        <div className={classes.container}>
            <Grid container>
                <Grid item>
                    <Typography
                        className={classes.tableHeader}
                        variant="h4"
                        color="primary"
                    >
                        Your Clients
                    </Typography>
                </Grid>
                <Grid
                    item
                    className={classes.table}
                >
                    <Table>
                        <TableBody>
                            {clientList.map((client) => (
                                <ClientTableRow
                                    key={client.id}
                                    client={client}
                                    StyledTableRow={StyledTableRow}
                                    classes={classes}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </div>
    )
}