import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";

import BuildingBlockChip from './BuildingBlockChip';

import { Typography } from '@material-ui/core';
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
    }, [])

    return (
        <div className={classes.container}>
            <div style={{ textAlign: 'center' }}>
                <Typography>
                    Recommend Building Blocks
                </Typography>
                <Typography>
                    You may recommend up to 3 building blocks to your client
                </Typography>
            </div>
            <div>
                {pyramidData.map((block) => (
                    <BuildingBlockChip block={block} params={params} />
                ))}
            </div>
        </div>
    )
}