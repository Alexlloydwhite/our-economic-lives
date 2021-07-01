import { put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
export default function* createClient(action) {
  try {
    // passes the username and password from the payload to the server
    yield axios.post('/api/coach/create-client', action.payload);
    yield put({ type: 'FETCH_CLIENTS' });
  } catch (error) {
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}