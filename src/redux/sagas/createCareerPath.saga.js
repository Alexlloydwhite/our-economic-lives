import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* createCareerPath(action) {
    try {
        console.log(`IN createCareerPath for ${action.payload}`);
        yield axios.post('/api/admin/create-career-path', {name: action.payload});
        yield put({ type: 'FETCH_CAREER_PATH' });
    } catch (err) {
        console.log(err);
    }
}