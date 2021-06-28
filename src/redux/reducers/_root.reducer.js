import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import clients from './clients.reducer';
import career_path from './careerPath.reducer.js';
import detail from './details.reducer';
import buildingBlocks from './buildingBlocks.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  clients, // holds array of client data for each coach
  career_path, //holds an array of all the career path data
  buildingBlocks, //holds array of buildingBlocks for tier slider
  detail, // holds an array of building block details
});

export default rootReducer;
