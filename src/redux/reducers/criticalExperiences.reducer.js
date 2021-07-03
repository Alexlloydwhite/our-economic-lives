// Hold data of client crit exp 
const criticalExperiences = (state=[], action) => {
    switch(action.type) {
        case 'SET_CRIT_EXP':
            return action.payload;
        default:
            return state;
    }
}

export default criticalExperiences;