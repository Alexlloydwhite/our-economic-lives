import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { Typography } from '@material-ui/core';

import BuildingBlockChip from './BuildingBlockChip';

export default function RecommendedBuildBlocks() {
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
        <div>
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