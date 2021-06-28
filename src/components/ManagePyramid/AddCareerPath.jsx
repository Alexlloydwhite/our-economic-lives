// MUI
import {
    Typography,
    makeStyles,
    Avatar,
    TextField,
    Button,
    Grid
} from '@material-ui/core/';
import { SettingsSystemDaydreamRounded } from '@material-ui/icons';
// React
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    // const [careerPath, setCareerPath] = useState(0);
    const [careerPath, setCareerPath] = useState('');
    let routerPath = '/api/upload/' + careerPath;
    const setCareerPaths = useSelector(store => store.career_path)

    const addCareerPath = (e) => {
        e.preventDefault();
        // check is name is not null
        if (careerPath) {
            dispatch({
                type: 'ADD_CAREER_PATH',
                payload: careerPath
            });
        }
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_CAREER_PATH' });
    }, [dispatch]);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <form onSubmit={addCareerPath} noValidate>
                    <Typography>
                        Add New Career Path
                    </Typography>
                    <pre>
                        {JSON.stringify(careerPath, null, 2)}
                    </pre>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            required
                            label="Career Path"
                            value={careerPath}
                            onChange={(e) => setCareerPath(e.target.value)}
                            style={{ marginRight: 5 }}
                        />
                        <Button
                            style={{ marginTop: 15, marginBottom: 10 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Submit
                        </Button>
                    </Grid>
                </form>
                <pre>
                    {JSON.stringify(setCareerPaths, null, 2)}
                </pre>
            </Grid>
        </Grid >
    )
}


{/* <div>
<form action={routerPath} method="POST" enctype="multipart/form-data">
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