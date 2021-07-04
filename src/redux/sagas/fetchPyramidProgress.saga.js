import axios from 'axios';
import { useSelector } from 'react-redux';
import { put } from 'redux-saga/effects'

export default function* fetchPyramidProgress(action) {
  try {
    const progress = yield axios.get(`/api/pyramid/progress/${action.payload}`);
    yield put({type: 'SET_PYRAMID_PROGRESS', payload: progress.data});
  } catch (error) {
    console.log('Unable to get pyramid progress', error);
    
  }
  
}