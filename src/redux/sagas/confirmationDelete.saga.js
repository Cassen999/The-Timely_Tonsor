import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* deleteApt(action) {
    const id = action.payload
    try {
        yield axios.delete(`/api/confirmationDelete/${id}`)
        console.log('action.payload from confirmation delete saga', id)
    }catch(error){
        console.log('error in delete saga', error);
        
    }
}

function* confirmationDeleteSaga() {
    yield takeLatest('CON_DELETE', deleteApt);
}

export default confirmationDeleteSaga;