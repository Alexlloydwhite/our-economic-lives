import { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function ClientTable() {
    const dispatch = useDispatch();
    const clientList = useSelector(store => store.clients)
    // On page load, grab the client
    // data associated with coach
    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, [dispatch])
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Client Table Here!</h2>
            <pre>
                <h5>
                    {JSON.stringify(clientList, null, 2)}
                </h5>
            </pre>
        </div>
    )
}