import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchBlocks() {
  try{
    const blocks = yield axios.get(`api/pyramid/buildingBlocks`)
    yield put({ type: 'SET_BLOCKS', payload: blocks})
  } catch (error) {
    console.log('Unable to fetch building blocks:', error);
    
  }
  
}


export default function* buildingBlocks() {
  yield takeLatest('FETCH_BLOCKS', fetchBlocks);
}