import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchIndustryPyramid() {
    try {
        // Get data from end point
        const industryPyramids = yield axios.get('/api/admin/industry_pyramid');
        console.log(`IN fetchIndustryPyramid saga. Response from GET request ${industryPyramids.data}`);
        // Set reducer to store data
        yield put({ 
            type: 'SET_INDUSTRY_PYRAMIDS',
            payload: industryPyramids.data
        });
    } catch (err) {
        console.log(`IN fetchIndustryPyramid saga. Error on GET request ${err}`);
    }
}