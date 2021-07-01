// hold array of client pyramid data
const clientPyramid = (state=[], action) => {
    switch(action.type) {
        case 'SET_CLIENT_PYRAMID':
            return action.payload;
        default:
            return state;
    }
}

export default clientPyramid;