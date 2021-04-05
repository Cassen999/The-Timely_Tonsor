import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets barber's appointments and sends them to the barberApt reducer
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

// Gets a single appointment's details and sends to barberApt reducer
function* fetchAptDetails(action) {
  const aptSlot_id = action.payload
  console.log(aptSlot_id)
  try {
      const response = yield axios.get(`/api/barberApt/aptDetails?aptSlot_id=${aptSlot_id}`)
      yield put({type: 'SET_APT_DETAILS', payload: response.data})
  }
  catch (error) {
      console.log('Appointments GET request failed ', error)
  }
}

// Updates client's notes, used by the barber in barberAptView
function* updateClientNotes(action) {
  console.log('updateClientNotes action.payload', action.payload)
  try {
    yield axios.put(`/api/barberApt/notes`, action.payload)
  }
  catch(error) {
    console.log('Update saga error', error)
  }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_BARBER_APT', fetchBarberApt);
    yield takeLatest('FETCH_APT_DETAILS', fetchAptDetails);
    yield takeLatest('UPDATE_NOTE', updateClientNotes);
}

export default appointmentSaga