import axios from 'axios';

export default function* registerNewUser(action) {
    try {
        yield axios.put('/api/client/register', action.payload);
    } catch (error) {
        console.log(error);
    }
}