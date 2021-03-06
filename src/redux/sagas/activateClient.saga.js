import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* activateClient(action) {
    try {
        yield axios.put(`/api/coach/activate-client/${action.id}`);
        yield put({ type: 'FETCH_CLIENTS'});
    } catch (err) {
        console.log(`IN deactivateClient saga: ${err}`);
    }
}