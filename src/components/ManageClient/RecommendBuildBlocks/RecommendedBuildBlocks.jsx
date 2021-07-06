import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";

import BuildingBlockChip from './BuildingBlockChip';

import {
    Typography,
    Grid,
    Paper
} from '@material-ui/core';

export default function RecommendedBuildBlocks({ classes }) {
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
                style={{ padding: 10 }}
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