import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchBlocks(action) {
  try{
    const tier = action.payload.tier;
    const blocks = yield axios.get(`api/pyramid/buildingBlocks/${tier}`)
    yield put({ type: 'SET_BLOCKS', payload: blocks.data})
  } catch (error) {
    console.log('Unable to fetch building blocks:', error);
    
  }
  
}


export default function* buildingBlocks() {
  yield takeLatest('FETCH_BLOCKS', fetchBlocks);
}