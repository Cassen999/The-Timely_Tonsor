import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBarberApt(action) {
    const id = action.payload.id
    const date = action.payload.date
    try {
        const response = yield axios.get(`/api/barberApt?id=${id}&date=${date}`)
        yield put({type: 'SET_BARBER_APT', payload: response.data})
        console.log('barber saga response.data then action.payload', response.data, action.payload)
    }
    catch (error) {
        console.log('Appointments GET request failed ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_BARBER_APT', fetchBarberApt);
}

export default appointmentSaga