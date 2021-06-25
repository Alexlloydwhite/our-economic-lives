// hold array of client data
const clients = (state=[], action) => {
    switch(action.type) {
        case 'SET_CLIENTS':
            return action.payload;
        default:
            return state;
    }
}

export default clients;