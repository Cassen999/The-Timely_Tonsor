import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteApt(action) {
    const id = action.payload.aptId
    try {
        yield axios.delete(`/api/delete/${id}`)
        console.log('action.payload from confirmation delete saga', id)
        yield put({type: 'FETCH_HISTORY', payload: action.payload.userId})
    }catch(error){
        console.log('error in delete saga', error); 
    }
}

function* confirmationDeleteSaga() {
    yield takeLatest('DELETE', deleteApt);
}

export default confirmationDeleteSaga;