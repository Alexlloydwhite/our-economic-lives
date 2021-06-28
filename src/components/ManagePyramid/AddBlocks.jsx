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
                <form action={routerPath} method="POST" encType="multipart/form-data">
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
                    <FormControl
                        variant="outlined"
                        required
                    >
                        <InputLabel>Career Path</InputLabel>
                        <Select
                            name="Career Path"
                            value={careerPath || ''}
                            onChange={(e) => setCareerPath(e.target.value)}
                        >
                            {setCareerPaths ? setCareerPaths.map((path) => {
                                return (<MenuItem key={path.id} value={path.id}>{path.name}</MenuItem>)
                            }) : <MenuItem>No Career Paths</MenuItem>}
                        </Select>
                    </FormControl>
                    <Button type="submit">
                        Add Blocks
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

{/* <div>
<form action={routerPath} method="POST" encType="multipart/form-data">
    <input type="file" name="file" accept=".csv" />
    <select name="Career Path" onChange={(event) => setCareerPath(event.target.value)}>
        <option>Choose a Career Path</option>
        {setCareerPaths ? setCareerPaths.map((path, i) => {
            return (<option key={i} value={path.id}>{path.name}</option>)
        }) : <option>No Career Paths</option>}
    </select>
    <button type="submit">Add Blocks</button>
</form>
</div> */}