import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchClientProfile() {
    try {
        // Get data from end point
        const profile = yield axios.get('/api/user/profile');
        console.log(`IN fetchClientProfile saga. Response from GET request ${profile.data}`);
        // Set reducer to store data
        yield put({ 
            type: 'SET_PROFILE',
            payload: profile.data
        });
    } catch (err) {
        console.log(`IN fetchClientProfile saga. Error on GET request ${err}`);
    }
}