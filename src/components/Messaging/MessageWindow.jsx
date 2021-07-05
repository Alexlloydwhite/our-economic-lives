import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

export default function MessageWindow() {
    const dispatch = useDispatch();
    const params = useParams();
    const messages = useSelector(store => store.messages);

    useEffect(() => {
        dispatch({
            type: 'FETCH_MESSAGES',
            clientId: params.id
        });
    }, []);

    return (
        <pre>
            {JSON.stringify(messages, null, 2)}
        </pre>
    );
}