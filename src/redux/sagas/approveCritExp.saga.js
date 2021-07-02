import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* approveCritExp(action) {
    try {
        yield axios.put(`/api/coach/approve-crit-experience/${action.critId}`);
        yield put({ type: 'FETCH_CRIT_EXP', id: action.id})
    } catch (err) {
        console.log(`In approveCritExp: ${err}`);
    }
}