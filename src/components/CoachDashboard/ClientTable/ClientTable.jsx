// MUI
import {
    Table,
    TableBody,
    TableRow,
    Paper,
    Typography,
    Grid,
    Select,
    MenuItem,
    FormControl
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
// React
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ClientTableRow from './ClientTableRow';
// Styles
const useStyles = makeStyles((theme) => ({
    container: {
        width: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    table: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        maxWidth: 600
    },
    tableHeader: {
        padding: theme.spacing(1)
    },
    tableButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 0,
    },
    select: {
        marginLeft: 'auto',
        marginRight: theme.spacing(2)
    }
}));
// custom style for TableRow to display grey 
// background at every nth row.
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
    const [filter, setFilter] = useState(false);
    const clientList = useSelector(store => store.clients)
    const filteredClientList = clientList.filter((client) => client.is_active === false);
    const notFilteredClientList = clientList.filter((client) => client.is_active === true);
    // On page load, grab the client
    // data associated with coach
    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, [dispatch])
    return (
        <div className={classes.container}>
            <pre style={{ textAlign: 'center' }}>
                {JSON.stringify(clientList[0], null, 2)}
            </pre>
            {/* Check is the coach has any clients */}
            {clientList.length > 0 ?
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        className={classes.table}
                        xs={12}
                        component={Paper}
                    >
                        <Grid
                            container
                            alignItems="center"
                        >
                            <Grid item>
                                {/* Table Header */}
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
                                className={classes.select}
                            >
                                <FormControl>
                                    <Select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <MenuItem value={false}>Active</MenuItem>
                                        <MenuItem value={true}>Deactivated</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Table to display clients */}
                        <Table>
                            <TableBody>
                                {filter ?
                                    filteredClientList.map((client) => (
                                        <ClientTableRow
                                            key={client.id}
                                            client={client}
                                            clientList={filteredClientList}
                                            StyledTableRow={StyledTableRow}
                                            classes={classes}
                                        />
                                    ))
                                    :
                                    notFilteredClientList.map((client) => (
                                        <ClientTableRow
                                            key={client.id}
                                            client={client}
                                            clientList={notFilteredClientList}
                                            StyledTableRow={StyledTableRow}
                                            classes={classes}
                                        />
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                :
                // If client list is 0 return null, do not display an empty table
                null
            }
        </div>
    )
}