// MUI
import {
    Typography,
    TextField,
    Button,
    Grid
} from '@material-ui/core/';
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
        // check is career path input is not null
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
                    {/* Form Header */}
                    <Typography>
                        Add New Career Path
                    </Typography>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {/* Career Path Name Input */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            label="Career Path"
                            value={careerPath}
                            onChange={(e) => setCareerPath(e.target.value)}
                            style={{ marginRight: 5 }}
                        />
                        {/* Submit btn */}
                        <Button
                            style={{ marginTop: 18, marginBottom: 12 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid >
    );
}