import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* updateClient(action) {
    try {
        yield axios.put('/api/client/update', action.payload);
        // Set reducer to store data
        yield put({
            type: 'SET_USER',
            payload: action.payload
        });
    } catch (err) {
        console.log(`IN updateClient saga. Error on PUT request ${err}`);
    }
}