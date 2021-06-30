import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchClientPyramid(action) {
    try {
        // Get data from end point
        const pyramid = yield axios.get(`/api/coach/client-pyramid/${action.id}`);
        console.log(`IN fetchClientPyramid saga. Response from GET request ${pyramid.data}`);
        yield put({
            type: 'SET_CLIENT_PYRAMID',
            payload: pyramid.data
        })
    } catch (err) {
        console.log(`IN fetchClientPyramid saga. Error on GET request ${err}`);
    }
}