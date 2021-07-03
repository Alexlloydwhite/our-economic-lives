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
import axios from 'axios';
import Papa from 'papaparse';

export default function AddBlocks({ classes }) {
    const dispatch = useDispatch();
    const [industryPyramid, setIndustryPyramid] = useState(0);
    const [csv, setCsv] = useState(null);
    const [preview, setPreview] = useState(null);
    const setIndustryPyramids = useSelector(store => store.industry_pyramid)
    useEffect(() => {
        dispatch({ type: 'FETCH_INDUSTRY_PYRAMID' })
    }, [dispatch]);

    const formData = new FormData();

    const handleFileChange = (e) => {
        setCsv(e.target.files[0]);
        Papa.parse(e.target.files[0], {
            complete: function (results) {
                setPreview(results.data);
            }
        });
    }

    const handleUpload = (e) => {
        e.preventDefault();
        formData.append('file', csv);
        axios.post(`/api/upload/${industryPyramid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setIndustryPyramid(0);
        setCsv(null);
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.addBlocks}
        >
            <Grid item>
                <form onSubmit={handleUpload}>
                    <Typography variant="h5">
                        Add New Building Blocks
                    </Typography>
                    <pre>
                        {JSON.stringify(preview, null, 2)}
                    </pre>
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
                        {industryPyramid !== 0 &&
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
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </Button>
                        }
                        {csv !== null &&
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Add Blocks
                            </Button>
                        }
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}