import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets barbers and sends them to the barber reducer
function* fetchBarbers() {
    try {
        const response = yield axios.get('/api/barbers')
        yield put({type: 'SET_BARBERS', payload: response.data})
    }
    catch (error) {
        console.log('Appointments GET request failed ', error)
    }
}

function* barberSaga() {
    yield takeLatest('FETCH_BARBERS', fetchBarbers);
}

export default barberSaga