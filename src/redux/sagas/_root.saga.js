import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import barberAptSaga from './barberApt.saga';
import aptSlotSaga from './aptSlot.saga';
import barberSaga from './barber.saga';
import addAptSaga from './addApt.saga';
import deleteSaga from './delete.saga';
import historySaga from './history.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    barberAptSaga(),
    aptSlotSaga(),
    barberSaga(),
    addAptSaga(),
    deleteSaga(),
    historySaga(),
  ]);
}
