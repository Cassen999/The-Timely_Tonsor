import axios from 'axios';
import { response } from 'express';
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

function* addAppointment(action) {
    try {
        const response = yield axios.post('/api/appointments', 
        action.payload)
        // yield put({type: 'SET_APPOINTMENTS', payload: response.data})
    }
    catch(error) {
        console.log('Error in addAppointment saga error: ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_APPOINTMENTS', fetchAppointments);
    yield takeLatest('ADD_APPOINTMENT', addAppointment);
}

export default appointmentSaga