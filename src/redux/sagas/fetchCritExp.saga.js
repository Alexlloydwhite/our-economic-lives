import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* fetchCritExp(action) {
    try {
        const allCritExp = yield axios.get(`/api/coach/critical-experience/${action.id}`);
        
    } catch (err) {
        console.log(`In fetchCritExp: ${err}`);
    }
}