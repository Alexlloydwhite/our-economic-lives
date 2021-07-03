import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* addCoachComment(action) {
    try {
        yield axios.put(`/api/coach/add_coach_comments`, 
            {
                coach_comments: action.coachComment,
                id: action.id
            }
        );
        console.log(action.userId);
        yield put({ type: 'FETCH_CRIT_EXP', id: action.userId});
    } catch (err) {
        console.log(`IN addCoachComment : ${err}`);
    }
}