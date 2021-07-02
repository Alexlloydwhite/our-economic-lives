// Holds coach comment and details for user view in detail
const comments = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COMMENT_CLIENT':
            return action.payload;
        default:
            return state;
    }
};

export default comments;