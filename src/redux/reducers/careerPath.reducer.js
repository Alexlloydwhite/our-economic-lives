// hold array of career path data
const career_path = (state=[], action) => {
    switch(action.type) {
        case 'SET_CAREER_PATHS':
            return action.payload;
        default:
            return state;
    }
}

export default career_path;