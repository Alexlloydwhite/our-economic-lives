// MUI
import {
    Typography,
    Button,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// React
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export default function AddBlocks({ classes }) {
    const dispatch = useDispatch();
    const [industryPyramid, setIndustryPyramid] = useState(0);
    let routerPath = '/api/upload/' + industryPyramid;
    const setIndustryPyramids = useSelector(store => store.industry_pyramid)
    useEffect(() => {
        dispatch({ type: 'FETCH_INDUSTRY_PYRAMID' })
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
                <Typography variant="h5">
                    Add New Building Blocks
                </Typography>
                    <Grid item className={classes.blockForm}>
                        <FormControl
                            variant="outlined"
                            required
                            fullWidth
                        >
                            <InputLabel>Industry Pyramid</InputLabel>
                            <Select
                                name="Industry Pyramid"
                                value={industryPyramid || ''}
                                onChange={(e) => setIndustryPyramid(e.target.value)}
                            >
                                {setIndustryPyramids ?
                                    setIndustryPyramids.map((path) => (
                                        <MenuItem key={path.id} value={path.id}>{path.name}</MenuItem>
                                    )) : <MenuItem>No Industry Pyramids</MenuItem>
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