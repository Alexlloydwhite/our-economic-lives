import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchDetail( action ) {
    // grab block details for specified block
    try {
        details = yield axios.post( '/api/block', action.payload );
        yield put({type: 'SET_DETAIL', payload: details});
    } catch (error) {
        // alert(`Sorry. Things aren't working at the moment.`);
        console.log('Error adding batch', error);
    }
}

export default fetchDetail;
