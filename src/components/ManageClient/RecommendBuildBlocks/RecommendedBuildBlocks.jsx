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
import BuildingBlockChip from './BuildingBlockChip';

export default function RecommendedBuildBlocks({ classes }) {
    const dispatch = useDispatch();
    const params = useParams();
    const pyramidData = useSelector(store => store.clientPyramid);
    // On page load, grab client pyramid data
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
                {/* Page title */}
                <Grid
                    item
                    xs={12}
                    className={classes.header}
                >
                    <Typography variant="h4">
                        Recommend Building Blocks
                    </Typography>
                    <Typography gutterBottom>
                        We suggest recommending 3 blocks at a time
                    </Typography>
                </Grid>
                {/* Maps out building block chips */}
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