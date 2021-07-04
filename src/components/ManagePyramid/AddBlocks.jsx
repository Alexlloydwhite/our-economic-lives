// MUI
import {
    Typography,
    Button,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Snackbar,
    IconButton,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// React
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Papa from 'papaparse';
import React from 'react';

export default function AddBlocks({ classes, setPreview }) {
    const formData = new FormData();
    const dispatch = useDispatch();
    const [industryPyramid, setIndustryPyramid] = useState(0);
    const [csv, setCsv] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const setIndustryPyramids = useSelector(store => store.industry_pyramid);
    // Grab list of industry pyramids to display in select
    useEffect(() => {
        dispatch({ type: 'FETCH_INDUSTRY_PYRAMID' })
    }, [dispatch]);
    // Handles files change of CSV
    // Creates Preview state to display CSV for review
    const handleFileChange = (e) => {
        setCsv(e.target.files[0]);
        Papa.parse(e.target.files[0], {
            header: true,
            complete: function (results) {
                setPreview(results.data)
            }
        });
    }
    // Handles upload of CSV, sends data to server,
    // On success, resets inputs and displays message
    const handleUpload = (e) => {
        e.preventDefault();
        formData.append('file', csv);
        axios.post(`/api/upload/${industryPyramid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setOpenSnackBar(true);
        setIndustryPyramid(0);
        setCsv(null);
        setPreview('');
    }
    // Handle closes of success snack bar
    const handleCloseSnackBar = (e, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
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
                    {/* Header */}
                    <Typography variant="h5">
                        Add New Building Blocks
                    </Typography>
                    <Grid item className={classes.blockForm}>
                        <FormControl
                            variant="outlined"
                            required
                            fullWidth
                        >
                            {/* Select Industry Pyramid */}
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
                        {/* Btn displays if industry pyramid is selected */}
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
                        {/* Btn displays if CSV is selected */}
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
                {/* Add New Building Block SUCCESS snackbar alert */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={openSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackBar}
                    message="Building Blocks Created"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </Grid>
        </Grid>
    );
}