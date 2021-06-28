import axios from 'axios';

export default function* createCareerPath(action) {
    try {
        console.log(`IN createCareerPath for ${action.payload}`);
        yield axios.post('/api/admin/create-career-path', action.payload)
    } catch (err) {
        console.log(err);
    }
}