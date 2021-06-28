// MUI
import {
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// React
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Styles
const useStyles = makeStyles((theme) => ({
    blockForm: {
        marginTop: theme.spacing(1)
    },
}));
export default function AddBlocks() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [careerPath, setCareerPath] = useState(0);
    let routerPath = '/api/upload/' + careerPath;
    const setCareerPaths = useSelector(store => store.career_path)
    useEffect(() => {
        dispatch({ type: 'FETCH_CAREER_PATH' })
    }, [dispatch])

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <form action={routerPath} method="POST" encType="multipart/form-data">
                <Typography>
                    Add New Building Blocks
                </Typography>
                    <Grid item className={classes.blockForm}>
                        <FormControl
                            variant="outlined"
                            required
                            fullWidth
                        >
                            <InputLabel>Career Path</InputLabel>
                            <Select
                                name="Career Path"
                                value={careerPath || ''}
                                onChange={(e) => setCareerPath(e.target.value)}
                            >
                                {setCareerPaths ?
                                    setCareerPaths.map((path) => (
                                        <MenuItem key={path.id} value={path.id}>{path.name}</MenuItem>
                                    )) : <MenuItem>No Career Paths</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.blockForm}>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                            style={{ marginRight: 5 }}
                        >
                            Upload CSV
                            <input
                                type="file"
                                name="file"
                                accept=".csv"
                                hidden
                            />
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Add Blocks
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}