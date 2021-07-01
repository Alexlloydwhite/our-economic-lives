import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";

import BuildingBlockChip from './BuildingBlockChip';

import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Styles
const useStyles = makeStyles((theme) => ({
    container: {
        width: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    chip: {
        padding: theme.spacing(0.5)
    },
    header: {
        padding: theme.spacing(1)
    }
}));

export default function RecommendedBuildBlocks() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const pyramidData = useSelector(store => store.clientPyramid);

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENT_PYRAMID',
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
                        Recommend Building Blocks
                    </Typography>
                    <Typography>
                        We suggest recommending 3 blocks at a time
                    </Typography>
                </Grid>
                {pyramidData.map((block) => (
                    <BuildingBlockChip
                        key={block.id}
                        block={block}
                        params={params}
                        classes={classes}
                    />
                ))}
            </Grid>
        </div>
    )
}