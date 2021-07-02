// React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
// M-UI
import {
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export default function CoachCritExpReview({ classes }) {
    const dispatch = useDispatch();
    const params = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const experiences = useSelector(store => store.criticalExperiences);

    // Grabbing unapproved experiences from DB on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_CRIT_EXP',
            id: params.id
        });
    }, []);

    return (
        <div className={classes.container}>
            <Grid
                container
                component={Paper}
                variant="outlined"
                direction="row"
            >
                <Grid
                    item
                    xs={12}
                    className={classes.header}
                >
                    <Typography variant="h4">
                        Review Critical Experiences
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {experiences.map((experience, i) => (
                        <>
                            {/* Critical Experience */}
                            <TextField
                                key={i}
                                className={classes.root}
                                label={experience.name}
                                multiline
                                rows={5}
                                variant="outlined"
                                value={experience.user_text}
                            />
                            <Box className={classes.button}>
                                {/* Approve */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    <ThumbUpIcon />
                                </Button>
                                {/* Comment */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => setOpenDialog(true)}
                                >
                                    <CommentIcon />
                                </Button>
                            </Box>
                        </>
                    ))}
                </Grid>
            </Grid>
            <Dialog open={openDialog}>
                <DialogTitle>
                    Coach Comment
                </DialogTitle>
            </Dialog>
        </div >
    );
}


// onChange={(e) => setNewExp(e.target.value)}