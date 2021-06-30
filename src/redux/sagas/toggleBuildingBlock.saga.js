import { put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
export default function* toggleBuildingBlock(action) {
    try {
        console.log(`IN toggleBuildingBlock saga`);
        yield axios.post()
    } catch (err) {
        
    }
}