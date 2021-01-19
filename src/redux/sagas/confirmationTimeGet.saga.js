import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchConfTime(action) {
    console.log('fetchConfTime saga', action.payload)
    let id = action.payload
    try {
        const response = yield axios.get(`/api/confirmationTime/${id}`)
        yield put({type: 'SET_CONF_TIME', payload: response.data})
        console.log('confTime saga response.data',response.data)
    }
    catch (error) {
        console.log('ApptSlot saga GET request failed ', error)
    }
}

function* confTimeSaga() {
    yield takeLatest('FETCH_CONF_TIME', fetchConfTime);
}

export default confTimeSaga;