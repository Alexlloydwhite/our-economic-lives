import axios from "axios";
import { put } from "redux-saga/effects";

export default function* fetchClientBlocks(action) {
  try {
    const id = action.payload.id;
    const blocks = yield axios.get(`/api/block/${id}`)
    yield put({ type: 'SET_CLIENT_BLOCKS', payload: blocks.data })
  } catch (error) {
    console.log('Unable to fetch building blocks:', error);
  }
}