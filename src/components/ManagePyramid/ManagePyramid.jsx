// Local imports
import PreviewTable from './PreviewTable';
import AddCareerPath from './AddCareerPath';
import AddBlocks from './AddBlocks';
// MUI
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
    addBlocks: {
        marginBottom: theme.spacing(2)
    }
}));
export default function ManagerPyramid() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.container}
            component={Paper}
            variant="outlined"
            spacing={10}
        >
            <Grid item xs={12} sm={6}>
                <AddCareerPath />
            </Grid>
            <Grid item xs={12} sm={6}>
                <AddBlocks classes={classes} />
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <PreviewTable />
                </Grid>
            </Grid>
        </Grid>
    )
}