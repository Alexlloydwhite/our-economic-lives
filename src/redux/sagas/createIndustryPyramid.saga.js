import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* createIndustryPyramid(action) {
    try {
        console.log(`IN createIndustryPyramid for ${action.payload}`);
        yield axios.post('/api/admin/create_industry_pyramid', {name: action.payload});
        yield put({ type: 'FETCH_INDUSTRY_PYRAMID' });
    } catch (err) {
        console.log(err);
    }
}