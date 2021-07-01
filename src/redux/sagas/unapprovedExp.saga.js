import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* unapprovedExp(action) {
    try {
        // Get data from end point
        const exp = yield axios.get(`/api/coach/unapproved_Exp/${action.id}`);
        console.log(`IN unapprovedExp saga. Response from GET request ${exp.data}`);
        // Set reducer to store data
        yield put({ 
            type: 'SET_UNAPPROVED',
            payload: exp.data
        });
    } catch (err) {
        console.log(`IN unapprovedExp saga. Error on GET request ${err}`);
    }
}