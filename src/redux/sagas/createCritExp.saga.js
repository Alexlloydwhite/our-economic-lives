import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* createCritExp(action) {
    try {
        console.log(`IN createCritExp for ${action.payload}`);
        yield axios.post('/api/client/exp', {name: action.payload});
        // yield put({ type: 'FETCH_CAREER_PATH' });
    } catch (err) {
        console.log(err);
    }
}