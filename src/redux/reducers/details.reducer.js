// Holds building block details for user to add/edit skills in detail view
const detail = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

export default detail;