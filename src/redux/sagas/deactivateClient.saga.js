import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* deactivateClient(action) {
    try {
        yield axios.put(`/api/coach/deactivate-client/${action.id}`);
        yield put({ type: 'FETCH_CLIENTS' });
    } catch (err) {
        console.log(`IN deactivateClient saga: ${err}`);
    }
}