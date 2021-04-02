const appointmentReducer = (state = {}, action) => {
    const newData = Object.entries(state)
    const initialState = []
    switch (action.type) {
      case 'SET_BARBER_APT':
        return action.payload;
      case 'UNSET_BARBER_APT':
        return [];
      case 'UPDATE_BARBER_APT':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return initialState;
    }
  };

export default appointmentReducer