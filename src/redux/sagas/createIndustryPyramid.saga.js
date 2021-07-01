import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* createIndustryPyramid(action) {
    try {
        yield axios.post('/api/admin/create_industry_pyramid', { name: action.payload });
        yield put({ type: 'FETCH_INDUSTRY_PYRAMID' });
    } catch (err) {
        console.log(err);
    }
}