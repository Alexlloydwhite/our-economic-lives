import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* postMessage(action) {
    console.log(`in postMessage saga`);
    try {
        yield axios.post('/api/chat', {
            message: action.message,
            clientId: action.clientId
        });
        yield put({
            type: 'FETCH_MESSAGES',
            clientId: action.clientId
        });
    } catch (err) {
        console.log(`IN postMessage Saga: ${err}`);
    }
}