// MUI
import {
    Typography,
    TextField,
    Button,
    Grid
} from '@material-ui/core/';
// React
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    // const [careerPath, setCareerPath] = useState(0);
    const [industryPyramid, setIndustryPyramid] = useState('');

    const addIndustryPyramid = (e) => {
        e.preventDefault();
        // check is industry pyramid input is not null
        if (industryPyramid) {
            dispatch({
                type: 'ADD_INDUSTRY_PYRAMID',
                payload: industryPyramid
            });
            setIndustryPyramid('');
        }
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INDUSTRY_PYRAMID' });
    }, []);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <form onSubmit={addIndustryPyramid} noValidate>
                    {/* Form Header */}
                    <Typography variant="h5">
                        Add New Industry Pyramid
                    </Typography>
                    <Grid item xs={12}>
                        {/* Industry Pyramid Name Input */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Industry Pyramid"
                            value={industryPyramid}
                            onChange={(e) => setIndustryPyramid(e.target.value)}
                            style={{ marginRight: 5 }}
                        />
                        {/* Submit btn */}
                        <Button
                            style={{ marginBottom: 12 }}
                            type="submit"
                            fullWidth
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