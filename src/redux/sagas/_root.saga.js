import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import createUserSaga from './createUser.saga';
import userSaga from './user.saga';
import registerNewUser from './register.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('REGISTER_USER', registerNewUser);
  yield all([
    loginSaga(), // login saga is now registered
    createUserSaga(),
    userSaga(),
  ]);
}
