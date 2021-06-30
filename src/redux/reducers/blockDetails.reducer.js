const blockDetails = (state = [], action) => {
  switch(action.type) {
    case 'SET_BLOCK_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default blockDetails;