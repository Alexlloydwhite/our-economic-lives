const unapprovedExp = (state = [], action) => {
    switch(action.type) {
      case 'SET_UNAPPROVED':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default unapprovedExp;