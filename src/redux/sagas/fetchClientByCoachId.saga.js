import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchClientsByCoachId(action) {
    try {
        // Get data from end point
        const clients = yield axios.get(`/api/coach/client-list/${action.coachId}`);
        console.log(`IN fetchClientsByCoachId saga. Response from GET request ${clients.data}`);
        // Set reducer to store data
        yield put({ 
            type: 'SET_CLIENTS',
            payload: clients.data
        });
    } catch (err) {
        console.log(`IN fetchClientsByCoachId saga. Error on GET request ${err}`);
    }
}