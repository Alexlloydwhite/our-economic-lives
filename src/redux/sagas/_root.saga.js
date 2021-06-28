import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import createClient from './CreateClient.saga';
import userSaga from './user.saga';
import registerNewUser from './register.saga';
import fetchClients from './fetchClients.saga';
import deactivateClient from './deactivateClient.saga';
import fetchCareerPath from './fetchCareerPath.saga';
import updateClient from './updateClient.saga';
import activateClient from './activateClient.saga';
import createCoach from './createCoach.saga';
import fetchCoaches from './fetchCoaches.saga';
import buildingBlocks from './buildingBlocks.saga';
import createCareerPath from './createCareerPath.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('REGISTER_USER', registerNewUser);
  yield takeEvery('CREATE_CLIENT', createClient);
  yield takeEvery('CREATE_COACH', createCoach);
  yield takeEvery('FETCH_CLIENTS', fetchClients);
  yield takeEvery('FETCH_COACHES', fetchCoaches);
  yield takeEvery('DEACTIVATE_CLIENT', deactivateClient);
  yield takeEvery('ACTIVATE_CLIENT', activateClient);
  yield takeEvery('FETCH_CAREER_PATH', fetchCareerPath);
  yield takeEvery('CREATE_CAREER_PATH', createCareerPath);
  yield takeEvery('UPDATE_CLIENT', updateClient);
  yield all([
    loginSaga(), // login saga is now registered
    userSaga(),
    buildingBlocks(),
  ]);
}
