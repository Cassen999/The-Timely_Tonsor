import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Deletes an appointment, used by user and barber
function* deleteApt(action) {
    const id = action.payload.aptId
    const date = action.payload.date
    const barberId = action.payload.barberId
    try {
        yield axios.delete(`/api/delete/${id}`)
        // Fetches the user's appointment history
        yield put({type: 'FETCH_HISTORY', payload: action.payload.userId})
        // Deletes the appointment
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