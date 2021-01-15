import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchApptSlots(action) {
    console.log('aptSlot saga', action.payload)
    const id = action.payload.barber_id
    const date = action.payload.date
    try {
        const response = yield axios.get(`/api/slots/?id=${id}&date=${date}`)
        yield put({type: 'SET_APT_SLOTS', payload: response.data})
        console.log('apptSlot saga response.data',response.data)
    }
    catch (error) {
        console.log('ApptSlot saga GET request failed ', error)
    }
}

function* apptSlotSaga() {
    yield takeLatest('FETCH_APT_SLOTS', fetchApptSlots);
}

export default apptSlotSaga