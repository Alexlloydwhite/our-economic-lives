import axios from 'axios';

export default function* createCritExp(action) {
    try {
        yield axios.post('/api/building-blocks/add_critical_experience',  action.payload);
        // yield put({ type: 'FETCH_CAREER_PATH' });
    } catch (err) {
        console.log(err);
    }
}