import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteApt(action) {
    const id = action.payload.aptId
    const date = action.payload.date
    const barberId = action.payload.barberId
    try {
        yield axios.delete(`/api/delete/${id}`)
        console.log('action.payload from confirmation delete saga', action.payload)
        yield put({type: 'FETCH_HISTORY', payload: action.payload.userId})
        yield put({type: 'FETCH_BARBER_APT', 
            payload: {id: barberId, date: date}})
    }catch(error){
        console.log('error in delete saga', error); 
    }
}

function* confirmationDeleteSaga() {
    yield takeLatest('DELETE', deleteApt);
}

export default confirmationDeleteSaga;