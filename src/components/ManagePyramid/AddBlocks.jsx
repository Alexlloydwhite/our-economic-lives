// MUI
import {
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// React
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function AddBlocks() {
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
                <Typography>
                    Add New Building Block
                </Typography>
                <form action={routerPath} method="POST" encType="multipart/form-data">
                    <Grid item>
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
                                    ))
                                    :
                                    <MenuItem>No Career Paths</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
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
                            fullWidth
                        >
                            Add Blocks
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}