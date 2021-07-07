// MUI
import {
    Grid,
    Paper, Typography
} from '@material-ui/core';
// React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
// Components
import CritExpReviewCard from './CritExpReviewCard';

export default function CoachCritExpReview({ classes }) {
    const dispatch = useDispatch();
    const params = useParams();
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
                style={{ padding: 10 }}
            >
                {/* Page Title */}
                <Grid
                    item
                    xs={12}
                    className={classes.header}
                >
                    <Typography variant="h4">
                        Review Critical Experiences
                    </Typography>
                </Grid>
                {/* Maps UNAPPROVED critical experiences onto cards */}
                {experiences.map((experience) => (
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ padding: 10 }}
                        key={experience.id}
                    >
                        <CritExpReviewCard
                            experience={experience}
                            classes={classes}
                        />
                    </Grid>
                ))}
            </Grid>
        </div >
    );
}
