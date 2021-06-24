import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function ClientTable() {
    const dispatch = useDispatch();
    // On page load, grab the client
    // data associated with coach
    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, [])
    return (
        <h5>Client Table Here!</h5>
    )
}