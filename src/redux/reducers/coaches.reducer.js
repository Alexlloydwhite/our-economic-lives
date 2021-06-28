// hold array of coach data
const coaches = (state=[], action) => {
    switch(action.type) {
        case 'SET_COACHES':
            return action.payload;
        default:
            return state;
    }
}

export default coaches;