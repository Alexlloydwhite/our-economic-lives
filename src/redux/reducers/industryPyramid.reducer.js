// hold array of industry pyramid data
const industry_pyramid = (state=[], action) => {
    switch(action.type) {
        case 'SET_INDUSTRY_PYRAMIDS':
            return action.payload;
        default:
            return state;
    }
}

export default industry_pyramid;