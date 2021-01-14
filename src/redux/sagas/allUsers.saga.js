import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllUsers() {
    try {
        const response = yield axios.get('/api/users')
        yield put({type: 'SET_ALL_USERS', payload: response.data})
        console.log('allUsers response.data',response.data)
    }
    catch (error) {
        console.log('Appointments GET request failed ', error)
    }
}

function* allUsersSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
}

export default allUsersSaga