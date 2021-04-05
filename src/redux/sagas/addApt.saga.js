import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Schedules a new appointment
function* addAppointment(action) {
    try {
        const response = yield axios.post('/api/addApt', 
        action.payload)
        yield put({type: 'SET_ADD_APT', payload: response.data})
    }
    catch(error) {
        console.log('Error in addAppointment saga error: ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('ADD_APPOINTMENT', addAppointment);
}

export default appointmentSaga