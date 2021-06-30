import axios from "axios";
import { useSelector } from "react-redux";
import { put, takeLatest } from "redux-saga/effects";

function* fetchBlockDetails(action) {
  let block_id = action.payload
  try {
    let details = yield axios.get(`/api/building-blocks/info/${block_id}`)
    yield put({ type: 'SET_BLOCK_DETAILS', payload: details.data[0] })
    
  } catch (error) {
    console.log('Unable to fetch block details', error);
    
  }
}

export default function* blockDetails() {
  yield takeLatest('FETCH_BLOCK_DETAIL', fetchBlockDetails)
}