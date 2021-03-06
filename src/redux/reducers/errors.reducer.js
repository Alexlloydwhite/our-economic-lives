import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your email and password!';
    case 'LOGIN_FAILED':
      return "Oops! The email and password didn't match. Try again!";
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Please complete all required fields!';
    case 'REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

const createUserMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_CLIENT_INPUT_ERROR':
      return '';
    case 'CREATE_CLIENT_INPUT_ERROR':
      return 'Please enter your clients email and create a password'
    default:
      return state;
  }
}

const changePasswordMessage = (state = '', action) => {
  switch (action.type) {
    case 'SET_NEW_PASSWORD_ERROR':
      return 'The Confirm Password confirmation does not match'
    default:
      return state;
  }
}

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  createUserMessage,
  changePasswordMessage,
});
