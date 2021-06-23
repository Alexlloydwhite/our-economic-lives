import axios from 'axios';

export default function* registerNewUser(action) {
    try {
        console.log(`IN registerUser saga. Data:`, action.payload);
        yield axios.put('/api/user/register', action.payload);
    } catch (error) {
        console.log(error);
    }
}