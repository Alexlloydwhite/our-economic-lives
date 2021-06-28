const clientBlocks = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLIENT_BLOCKS':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default clientBlocks;