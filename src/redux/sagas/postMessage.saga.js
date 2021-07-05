import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* postMessage(action) {
  try {
    yield axios.post('/api/chat', action.payload);
  } catch (error) {
      console.log(`IN postMessage Saga: ${err}`);
  }
}