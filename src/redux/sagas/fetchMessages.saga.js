import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchMessages() {
    try {
        // Get data from end point
        const messages = yield axios.get('/api/chat');
        // Set reducer to store data
        yield put({
            type: 'SET_MESSAGES',
            payload: messages.data
        });
    } catch (err) {
        console.log(`IN fetchMessages saga. Error on GET request ${err}`);
    }
}