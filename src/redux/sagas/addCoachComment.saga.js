import axios from 'axios';

export default function* addCoachComment(action) {
    try {
        yield axios.put(`/api/coach/add_coach_comments`, 
            {
                coach_comments: action.coachComment,
                id: action.id
            }
        );
    } catch (err) {
        console.log(`IN addCoachComment : ${err}`);
    }
}