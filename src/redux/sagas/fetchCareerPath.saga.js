import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchCareerPath() {
    try {
        // Get data from end point
        const careerPaths = yield axios.get('/api/admin/career_path');
        console.log(`IN fetchCareerPath saga. Response from GET request ${careerPaths.data}`);
        // Set reducer to store data
        yield put({ 
            type: 'SET_CAREER_PATHS',
            payload: careerPaths.data
        });
    } catch (err) {
        console.log(`IN fetchCareerPath saga. Error on GET request ${err}`);
    }
}