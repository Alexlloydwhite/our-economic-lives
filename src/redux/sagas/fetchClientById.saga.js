import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchClientId(action) {
    try {
        // Get data from end point
        const clients = yield axios.get(`/api/coach/`);
        console.log(`IN fetchClientId saga. Response from GET request ${clients.data}`);
    } catch (err) {
        console.log(`IN fetchClientId saga. Error on GET request ${err}`);
    }
}