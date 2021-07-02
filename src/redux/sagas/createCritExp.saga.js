import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* createCritExp(action) {
    try {
        console.log(action.payload);
        yield axios.post('/api/building-blocks/add_critical_experience', action.payload);
        yield put({ type: 'FETCH_UNAPPROVED', id: action.payload.user_id, bbId: action.payload.block_id })
    } catch (err) {
        console.log(err);
    }
}