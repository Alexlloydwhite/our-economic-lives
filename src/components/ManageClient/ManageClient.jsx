import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import RecommendBuildingBlocks from './RecommendBuildBlocks/RecommendBuildingBlocks';

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
            <RecommendBuildingBlocks pyramidData={pyramidData} />
        </div>
    );
}