import { put } from 'redux-saga/effects';
import axios from 'axios';

export default function* toggleBuildingBlock(action) {
    try {
        console.log(`IN toggleBuildingBlock saga`);
        yield axios.post('/api/coach/toggle-building-block', {
            user_id: Number(action.user_id),
            block_id: action.block_id
        });
    } catch (err) {
        console.log(`IN toggleBuildingBlock saga ${err}`);
    }
}