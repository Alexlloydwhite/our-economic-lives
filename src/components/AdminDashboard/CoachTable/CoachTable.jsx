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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoachTableRow from './CoachTableRow';
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

export default function CoachTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const coachList = useSelector(store => store.coaches);
    // On page load, GET coach data
    useEffect(() => {
        dispatch({
            type: 'FETCH_COACHES'
        });
    }, [dispatch]);
    return (
        <div className={classes.container}>
            {/* Only display table if coaches exist */}
            {coachList.length > 0 &&
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
                                    Coaches
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Table to display coaches */}
                        <Table>
                            <TableBody>
                                {coachList.map((coach) => (
                                    <CoachTableRow 
                                        key={coach.id}
                                        coach={coach}
                                        coachList={coachList}
                                        StyledTableRow={StyledTableRow}
                                        classes={classes}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            }
        </div>
    );
}