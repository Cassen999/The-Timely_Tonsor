import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAppointments() {
    try {
        const response = yield axios.get('/api/appointments')
        yield put({type: 'SET_APPOINTMENTS', payload: response.data})
    }
    catch (error) {
        console.log('Appointments GET request failed ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_APPOINTMENTS', fetchAppointments);
}

export default appointmentSaga