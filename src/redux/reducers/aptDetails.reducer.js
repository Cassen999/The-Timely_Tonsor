
// Holds info for apointment that the barber clicks on
const aptDetailsReducer = (state =[], action) => {
  switch (action.type) {
    case 'SET_APT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default aptDetailsReducer;
