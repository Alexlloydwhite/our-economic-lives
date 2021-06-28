import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CoachTable() {
    const dispatch = useDispatch();
    const coachList = useSelector(store => store.coaches);
    // On page load, GET coach data
    useEffect(() => {
        dispatch({
            type: 'FETCH_COACHES'
        });
    },[dispatch]);
    return (
        <pre>
            {JSON.stringify(coachList, null, 2)}
        </pre>
    );
}