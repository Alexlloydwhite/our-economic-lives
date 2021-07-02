import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* addCoachComment(action) {
    try {
        yield axios.put(`/api/coach/add_coach_comments`);
    } catch (err) {
        console.log(`IN addCoachComment : ${err}`);
    }
}