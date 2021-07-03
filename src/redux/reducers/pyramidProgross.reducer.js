const pyramidProgress = (state=[], action) => {
  switch (action.type) {
    case 'SET_PYRAMID_PROGRESS':
      return action.payload;
    default:
      return state;
  }
}

export default pyramidProgress;