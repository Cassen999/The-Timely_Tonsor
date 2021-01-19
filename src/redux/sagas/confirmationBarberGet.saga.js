import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchConfBarber(action) {
    console.log('fetchConfBarber saga', action.payload)
    let id = action.payload
    try {
        const response = yield axios.get(`/api/confirmationBarber/${id}`)
        yield put({type: 'SET_CONF_BARBER', payload: response.data})
        console.log('confBarber saga response.data',response.data)
    }
    catch (error) {
        console.log('ApptSlot saga GET request failed ', error)
    }
}

function* confBarberSaga() {
    yield takeLatest('FETCH_CONF_BARBER', fetchConfBarber);
}

export default confBarberSaga;