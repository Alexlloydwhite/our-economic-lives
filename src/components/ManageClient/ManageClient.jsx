import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import RecommendBuildingBlocks from './RecommendBuildBlocks/RecommendBuildingBlocks';
import { Typography } from '@material-ui/core';

export default function ManageClient() {
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
                    <RecommendBuildingBlocks block={block} params={params} />
                ))}
            </div>
            <pre>
                {JSON.stringify(pyramidData, null, 2)}
            </pre>
        </div>
    );
}