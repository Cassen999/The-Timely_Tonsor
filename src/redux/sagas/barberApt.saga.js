import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBarberApt() {
    try {
        const response = yield axios.get('/api/barberApt')
        yield put({type: 'SET_BARBER_APT', payload: response.data})
    }
    catch (error) {
        console.log('Appointments GET request failed ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_BARBER_APT', fetchBarberApt);
}

export default appointmentSaga