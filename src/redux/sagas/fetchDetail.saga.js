import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchDetail( action ) {
    // grab block details for specified block
    try {
        const details = yield axios.post( '/api/block/block_detail', action.payload );
        yield put({type: 'SET_DETAIL', payload: details.data});
    } catch (error) {
        // alert(`Sorry. Things aren't working at the moment.`);
        console.log('Error grabbing details', error);
    }
}

export default fetchDetail;
