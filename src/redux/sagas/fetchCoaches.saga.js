import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchCoaches() {
    try {
        // Get data from end point
        const coaches = yield axios.get('/api/admin/coach-list');
        console.log(`IN fetchCoaches saga. Response from GET request ${coaches.data}`);
        // Set reducer to store data
        yield put({ 
            type: 'SET_COACHES',
            payload: coaches.data
        });
    } catch (err) {
        console.log(`IN fetchCoaches saga. Error on GET request ${err}`);
    }
}