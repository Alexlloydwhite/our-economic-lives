import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import createClient from './createClient.saga';
import userSaga from './user.saga';
import registerNewUser from './register.saga';
import fetchClients from './fetchClients.saga';
import deactivateClient from './deactivateClient.saga';
import fetchIndustryPyramid from './fetchIndustryPyramid.saga';
import updateClient from './updateClient.saga';
import activateClient from './activateClient.saga';
import createCoach from './createCoach.saga';
import fetchCoaches from './fetchCoaches.saga';
import buildingBlocks from './buildingBlocks.saga';
import fetchClientBlocks from './fetchClientBlocks.saga';
import fetchClientsByCoachId from './fetchClientByCoachId.saga';
import createCritExp from './createCritExp.saga';
import createIndustryPyramid from './createIndustryPyramid.saga';
import blockDetails from './blockDetails.saga';
import fetchDetail from './fetchDetail.saga';
import fetchClientPyramid from './fetchClientPyramid.saga';
import toggleBuildingBlock from './toggleBuildingBlock.saga';

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
  yield takeEvery('FETCH_CLIENTS_BY_ID', fetchClientsByCoachId);
  yield takeEvery('FETCH_COACHES', fetchCoaches);
  yield takeEvery('DEACTIVATE_CLIENT', deactivateClient);
  yield takeEvery('ACTIVATE_CLIENT', activateClient);
  yield takeEvery('FETCH_INDUSTRY_PYRAMID', fetchIndustryPyramid);
  yield takeEvery('ADD_INDUSTRY_PYRAMID', createIndustryPyramid);
  yield takeEvery('UPDATE_CLIENT', updateClient);
  yield takeEvery('FETCH_CLIENT_BLOCKS', fetchClientBlocks);
  yield takeEvery('CREATE_EXP', createCritExp);
  yield takeEvery('FETCH_DETAIL', fetchDetail);
  yield takeEvery('FETCH_CLIENT_PYRAMID', fetchClientPyramid);
  yield takeEvery('TOGGLE_RECOMMENDED_BLOCK', toggleBuildingBlock);

  yield all([
    loginSaga(), // login saga is now registered
    userSaga(),
    buildingBlocks(),
    blockDetails(),
  ]);
}