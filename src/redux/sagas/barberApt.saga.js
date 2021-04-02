import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBarberApt(action) {
    const id = action.payload.id
    const date = action.payload.date
    try {
        const response = yield axios.get(`/api/barberApt?id=${id}&date=${date}`)
        yield put({type: 'SET_BARBER_APT', payload: response.data})
    }
    catch (error) {
        console.log('Appointments GET request failed ', error)
    }
}

function* fetchAptDetails(action) {
  const aptSlot_id = action.payload
  console.log(aptSlot_id)
  try {
      const response = yield axios.get(`/api/barberApt/aptDetails?aptSlot_id=${aptSlot_id}`)
      console.log('fetchaptdetails response.data', response.data)
      yield put({type: 'SET_APT_DETAILS', payload: response.data})
  }
  catch (error) {
      console.log('Appointments GET request failed ', error)
  }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_BARBER_APT', fetchBarberApt);
    yield takeLatest('FETCH_APT_DETAILS', fetchAptDetails);
}

export default appointmentSaga