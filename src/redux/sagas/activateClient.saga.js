import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* activateClient(action) {
    try {
        console.log(`IN activateClient saga for client with ID ${action.id}`);
        yield axios.put(`/api/coach/activate-client/${action.id}`);
        yield put({ type: 'FETCH_CLIENTS'});
    } catch (err) {
        console.log(`IN deactivateClient saga: ${err}`);
    }
}