import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addAppointment(action) {
    try {
        const response = yield axios.post('/api/addApt', 
        action.payload)
        console.log('add apt action.payload: ', action.payload)
        yield put({type: 'SET_ADD_APT', payload: response.data})
        console.log('appointment saga addApt response: ', response.data)
    }
    catch(error) {
        console.log('Error in addAppointment saga error: ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('ADD_APPOINTMENT', addAppointment);
}

export default appointmentSaga