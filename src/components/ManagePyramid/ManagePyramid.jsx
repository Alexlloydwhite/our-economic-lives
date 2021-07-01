import AddCareerPath from './AddCareerPath';
import AddBlocks from './AddBlocks';
import { Grid, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
// Styles
const useStyles = makeStyles((theme) => ({
    blockForm: {
        marginTop: theme.spacing(1)
    },
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
}));
export default function ManagerPyramid() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.container}
            component={Paper}
            variant="outlined"
        >
            <AddCareerPath />
            <AddBlocks classes={classes} />
        </Grid>
    )
}