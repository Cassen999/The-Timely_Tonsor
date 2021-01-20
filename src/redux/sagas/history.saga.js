import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchHistory(action) {
    try {
        const response = yield axios.get(`/api/history/${action.payload}`)
        yield put({type: 'SET_HISTORY', payload: response.data})
    }
    catch (error) {
        console.log('Apt history GET request failed ', error)
    }
}

function* appointmentSaga() {
    yield takeLatest('FETCH_HISTORY', fetchHistory);
}

export default appointmentSaga