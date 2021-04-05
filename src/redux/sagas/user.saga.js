import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Used when the user wants to update their profile information
function* updateUser(action) {
  try {
    console.log('Update saga success', action.payload)
    yield axios.put(`/api/user/id`, action.payload)
    yield fetchUser();
  }
  catch(error) {
    console.log('Update saga error', error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUser);
}

export default userSaga;