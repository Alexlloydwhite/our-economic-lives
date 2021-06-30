import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";

export default function ManageClient() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENT_BY_ID',
            id: params.id
        });
    }, [])

    return (
        <div>
            <h4>hello</h4>
        </div>
    );
}