import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
export default function* createUser(action) {
  try {
    console.log(`IN createUser Saga`);
    // passes the username and password from the payload to the server
    yield axios.post('/api/user/create', action.payload);
  } catch (error) {
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}
