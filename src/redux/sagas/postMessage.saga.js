import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* postMessage(action) {
    console.log(`in postMessage saga`);
    try {
        yield axios.post('/api/chat', {message: action.message} );
    } catch (err) {
        console.log(`IN postMessage Saga: ${err}`);
    }
}