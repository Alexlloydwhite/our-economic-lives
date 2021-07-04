import axios from 'axios';
import { put } from 'redux-saga/effects'

export default function* fetchPyramidProgress() {
  try {
    const progress = yield axios.get('/api/pyramid/progress/6')
    yield put({type: 'SET_PYRAMID_PROGRESS', payload: progress.data})
  } catch (error) {
    console.log('Unable to get pyramid progress');
    
  }
  
}