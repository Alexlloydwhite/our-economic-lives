import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* editCritExp(action) {
    try {
        console.log(action.payload);
        yield axios.put('/api/building-blocks/edit_critical_experience', action.payload);
        yield put({ type: 'FETCH_UNAPPROVED', id: action.payload.user_id, bbId: action.payload.block_id })
    } catch (err) {
        console.log(err);
    }
}