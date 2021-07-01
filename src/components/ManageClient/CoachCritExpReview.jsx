// React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
// M-UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// Styling
const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'Center',
        marginLeft: '10%',
        marginTop: '2rem',
        width: '80%',
    },
    button: {
        textAlign: 'Center',
    },
  }));

export default function CoachCritExpReview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const experiences = useSelector(store => store.unapprovedExp);
    // console.log('experiences', experiences);

    // Grabbing unapproved experiences from DB on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_UNAPPROVED',
            id: params.id
        });
    }, [])

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                <Typography variant='h6'>
                   <b>Critical Experiences Awaiting Review</b> 
                </Typography>
            </div>
            <div>
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
                        >
                        <CommentIcon />
                    </Button>
                    </Box>
                    </>
                ))}
            </div>
        </div>
    );
}


// onChange={(e) => setNewExp(e.target.value)}