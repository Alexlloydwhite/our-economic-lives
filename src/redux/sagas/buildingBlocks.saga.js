import axios from "axios";
import { useSelector } from "react-redux";
import { put, takeLatest } from "redux-saga/effects";

function* fetchBlocks(action) {
  const tier = action.payload.tier;
  const pyramid = action.payload.pyramid;
  console.log('#####################################################################################################', tier, pyramid);
  
  try{
    // const tier = action.payload.tier;
    const blocks = yield axios.get(`api/pyramid/buildingBlocks/${tier}/${pyramid}`)
    yield put({ type: 'SET_BLOCKS', payload: blocks.data})
  } catch (error) {
    console.log('Unable to fetch building blocks:', error);
    
  }
  
}


export default function* buildingBlocks() {
  yield takeLatest('FETCH_BLOCKS', fetchBlocks);
}